# 每日 AI 新闻 - AI 新闻聚合平台

一个现代化的 AI 新闻聚合应用，自动抓取和整理来自多个来源的人工智能领域最新动态。

## 功能特性

- 📰 自动抓取 TechCrunch、VentureBeat、机器之心等多个新闻源
- 🔍 新闻搜索和分类筛选
- 📱 响应式设计，支持移动端
- 🌙 现代化用户界面
- 🔄 定时自动更新新闻内容

## 技术栈

- **前端**: React 18 + TypeScript + Vite + Tailwind CSS
- **后端**: Express.js + TypeScript
- **爬虫**: Python + BeautifulSoup
- **路由**: React Router DOM

## 快速开始

### 环境要求

- Node.js 18+ 
- Python 3.x
- npm 或 yarn

### 安装依赖

1. 安装 Node.js 依赖：
```bash
npm install
```

2. 安装 Python 依赖（用于爬虫功能）：
```bash
pip install -r requirements.txt
```

### 启动开发服务器

**方式一：同时启动前端和后端（推荐）**
```bash
npm run dev
```

这会同时启动：
- 前端开发服务器：http://localhost:5173
- 后端 API 服务器：http://localhost:3001

**方式二：分别启动**

启动后端：
```bash
npm run server:dev
```

启动前端（新开一个终端）：
```bash
npm run client:dev
```

### 访问应用

打开浏览器访问：http://localhost:5173

## 项目结构

```
/workspace
├── api/              # 后端 API 代码
│   ├── routes/       # API 路由
│   ├── services/     # 业务逻辑服务
│   ├── data/         # 数据存储和种子数据
│   └── utils/        # 工具函数
├── src/              # 前端代码
│   ├── components/   # React 组件
│   ├── pages/        # 页面组件
│   ├── services/     # API 调用
│   └── types/        # TypeScript 类型
├── scripts/          # Python 爬虫脚本
└── public/           # 静态资源
```

## 可用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 同时启动前端和后端开发服务器 |
| `npm run client:dev` | 仅启动前端开发服务器 |
| `npm run server:dev` | 仅启动后端开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run check` | 运行 TypeScript 类型检查 |
| `npm run lint` | 运行代码 lint 检查 |

## API 端点

- `GET /api/news` - 获取新闻列表（支持分页和分类筛选）
- `GET /api/news/:id` - 获取单条新闻详情
- `GET /api/search` - 搜索新闻
- `GET /api/crawler` - 爬虫相关操作
- `GET /api/health` - 健康检查

## 常见问题

**Q: 前端显示 API 连接错误？**
A: 确保后端服务器正在运行（端口 3001），可以使用 `npm run dev` 同时启动前后端。

**Q: 新闻内容是如何更新的？**
A: 后端配置了定时任务，每 6 小时自动抓取一次新闻。也可以通过 API 手动触发。

## License

MIT
