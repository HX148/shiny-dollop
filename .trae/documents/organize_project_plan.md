# 📂 GitHub 项目整理计划

## 项目现状分析

当前项目包含以下内容：

### 主要文件
- **index.html** - 游戏主文件（完整机甲对决游戏）
- **package.json** - Electron 配置
- **main.js, preload.js** - Electron 主进程
- **manifest.json, sw.js** - PWA 配置
- **generate-icons.html** - 图标生成器

### 文档
- README.md (空)
- README_APP.md (Electron)
- README_PWA.md (PWA)

### 旧文件
- auto_visit.py, tech_news_spider.py
- requirements.txt
- .github/workflows/tech_news_push.yml

### 计划目录
- .trae/documents/ - 各种计划文档

---

## 整理方案

### 1. 清理旧文件
移除不相关的爬虫文件（与游戏无关）
- 删除 auto_visit.py
- 删除 tech_news_spider.py
- 删除 requirements.txt
- 删除 .github/workflows/tech_news_push.yml

### 2. 组织项目结构
创建目录结构：
```
/workspace/
├── README.md (主文档)
├── docs/
│   ├── ELECTRON.md
│   └── PWA.md
├── src/
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   └── generate-icons.html
└── electron/
    ├── main.js
    ├── preload.js
    └── package.json
```

### 3. 完善主 README
- 项目介绍
- 功能特点
- 快速开始
- 两个版本说明
- 截图/展示
- 贡献指南

### 4. 优化 .gitignore
清理并完善 .gitignore

---

## 执行步骤

1. 清理旧的不相关文件
2. 创建目录结构
3. 移动文件到对应位置
4. 更新 package.json 路径
5. 重新编写主 README.md
6. 整理文档
7. 验证功能正常

---

## 保留文件清单

✅ index.html - 核心游戏
✅ package.json - 项目配置  
✅ main.js / preload.js - Electron
✅ manifest.json / sw.js - PWA
✅ generate-icons.html - 工具
✅ .trae/ - 项目历史
✅ .gitignore - 忽略配置

---

## 最终目标

- 清晰的项目结构
- 完善的 README 文档
- 两个版本的详细说明
- 可直接使用的项目
