# 实时新闻抓取实现计划

## 1. 仓库研究结论

当前项目是一个 AI 新闻应用，具有以下特点：

- **技术栈**: 前端使用 React + TypeScript + Vite，后端使用 Express + TypeScript
- **当前数据来源**: 使用静态 mock 数据 ([api/data/seedData.ts](file:///workspace/api/data/seedData.ts))
- **已有爬虫脚本**: [tech_news_spider.py](file:///workspace/tech_news_spider.py) 可以抓取新浪、网易、腾讯新闻
- **已有自动化流程**: GitHub Actions 工作流配置用于每日推送

**关键发现**:
- 现有爬虫是通用新闻爬虫，不是专门针对 AI 领域的
- 需要整合爬虫能力到 Express 后端，替代静态数据
- 项目已有 Python 环境配置 ([requirements.txt](file:///workspace/requirements.txt))

## 2. 需要编辑/创建的文件

### 新建文件
1. `api/services/newsCrawler.ts` - 新闻抓取服务
2. `api/services/aiNewsSources.ts` - AI 新闻源配置
3. `api/data/newsStorage.ts` - 新闻数据存储管理
4. `api/utils/pythonBridge.ts` - Python 脚本桥接工具
5. `api/routes/crawler.ts` - 爬虫管理 API 路由
6. `scripts/crawl_ai_news.py` - AI 专用新闻爬虫
7. `scripts/crawl_arxiv_papers.py` - arXiv 论文爬虫
8. `scripts/crawl_research_papers.py` - 研究论文综合爬虫

### 修改文件
1. `api/app.ts` - 添加爬虫路由
2. `api/routes/news.ts` - 集成实时新闻数据
3. `package.json` - 添加新的依赖和脚本
4. `requirements.txt` - 添加论文解析依赖
5. `README.md` - 更新功能说明

## 3. 实现步骤

### 步骤 1: 创建 AI 专用新闻爬虫 (Python)
- **国外 AI 新闻源**: TechCrunch AI、VentureBeat AI、MIT Tech Review AI、Wired AI、The Verge AI、Nature Machine Intelligence
- **国外论文源**: 
  - arXiv (cs.AI、cs.LG、cs.CV 等分类) 
  - Hugging Face Papers 
  - OpenAI Research Blog 
  - DeepMind Blog 
  - Google Research Blog 
  - Meta AI Research
  - Papers with Code
  - arXiv Sanity
- **国内新闻源**: 机器之心、36Kr AI、量子位
- 实现针对 AI 新闻和论文的专门爬虫
- 支持新闻分类（LLM、计算机视觉、机器人、生成式 AI、AI 研究等）
- 生成符合项目 News 类型的数据结构
- arXiv 论文特别处理：标题、摘要、作者、PDF链接、分类标签

### 步骤 2: 创建 Express 后端爬虫服务
- 创建 Python 桥接模块，从 Node.js 调用 Python 爬虫
- 实现新闻数据存储和缓存机制
- 创建爬虫管理 API（手动触发、状态检查）
- 集成到现有新闻路由

### 步骤 3: 更新新闻 API 路由
- 修改 `/api/news` 路由以支持实时抓取数据
- 保留静态数据作为后备方案
- 实现缓存策略（避免频繁抓取）
- 添加论文分类过滤选项

### 步骤 4: 添加定时任务
- 使用 node-cron 实现定时新闻更新
- 配置每日更新新闻和论文的定时任务
- 添加健康检查和错误处理

### 步骤 5: 更新项目配置
- 添加必要的 npm 依赖
- 更新 package.json 脚本
- 创建环境变量配置示例
- 更新 requirements.txt 添加论文解析库

## 4. 潜在依赖和注意事项

### 技术依赖
- **Python**: 已有依赖 (requests, beautifulsoup4, python-dateutil)
- **Python 新增依赖**: 
  - `feedparser`: RSS/Atom feed 解析（用于 arXiv）
  - `arxiv`: arXiv API 客户端
  - `PyPDF2` 或 `pdfplumber`: PDF 处理（可选）
- **Node.js 新增依赖**: 
  - `node-cron`: 定时任务
  - `node-python` 或类似: Python 桥接
  - `cache-manager`: 缓存管理

### 注意事项
- **网站爬取限制**: 遵守 robots.txt，设置合理的请求间隔
- **数据一致性**: 确保抓取的数据格式与现有类型定义一致
- **错误处理**: 爬虫失败时优雅降级到静态数据
- **性能优化**: 实现有效的缓存策略
- **安全性**: 防止外部资源攻击，验证抓取的内容
- **arXiv API 限制**: 遵守 arXiv API 使用政策，合理使用官方 API

## 5. 风险处理

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 新闻源网站结构变化导致爬虫失效 | 高 | 保持静态数据作为后备，监控爬虫状态 |
| 爬虫被网站封禁 | 中 | 设置合理的请求头和延迟，轮换 User-Agent |
| 性能问题（抓取耗时过长） | 中 | 实现异步抓取和缓存，后台更新数据 |
| 数据格式不一致 | 中 | 严格的数据验证和转换层 |
| arXiv API 限制 | 中 | 使用官方 API，合理设置请求频率 |
| 依赖冲突 | 低 | 版本锁定，充分测试 |
