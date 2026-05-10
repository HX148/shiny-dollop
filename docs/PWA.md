# 🎮 机甲对决 - PWA 版本

## ✨ PWA (渐进式 Web 应用) 已成功配置完成！

您的游戏现在已经是完整的 PWA 应用了！可以像桌面应用一样安装和运行，支持离线使用！

---

## 📦 已创建的文件

1. **[manifest.json](file:///workspace/manifest.json)** - 应用清单文件
2. **[sw.js](file:///workspace/sw.js)** - Service Worker（离线缓存
3. **[generate-icons.html](file:///workspace/generate-icons.html)** - 图标生成器
4. **[index.html](file:///workspace/index.html)** - 游戏文件（已添加 PWA 支持）

---

## 🚀 快速开始

### 步骤 1：生成应用图标（可选但推荐）

1. 在浏览器中打开 **[generate-icons.html](file:///workspace/generate-icons.html)**
2. 点击每个尺寸下方的「下载」按钮
3. 将下载的图标重命名为 `icon-192.png`、`icon-512.png`、`icon-1024.png`
4. 将图标放在项目根目录（与 index.html 一起）

### 步骤 2：启动本地服务器

确保使用 HTTP 服务器（已启动）：

```bash
# Python 3
python3 -m http.server 8080

# 或者使用其他 HTTP 服务器
```

### 步骤 3：访问并安装应用

1. 在 Chrome/Edge 浏览器中访问：`http://localhost:8080/index.html`

2. 点击浏览器地址栏右侧会出现「安装应用」图标（📥 或 +）

3. 点击安装！游戏现在会像桌面应用一样运行！

---

## 📱 移动端也可以！

PWA 支持在手机上完美运行！

### Android:
- 使用 Chrome/Edge 浏览器
- 点击菜单 → 添加到主屏幕

### iOS:
- 使用 Safari 浏览器
- 点击分享按钮 → 添加到主屏幕

---

## 🎯 PWA 优势

✅ **像桌面应用体验** - 全屏运行，独立窗口
✅ **离线可用** - 第一次加载后可断网玩
✅ **快速启动** - 缓存技术，极速启动
✅ **无需应用商店安装** - 直接从浏览器安装
✅ **跨平台** - 同时支持 Windows/Mac/Linux/Android/iOS
✅ **自动更新** - 访问时自动更新
✅ **节省空间** - 比传统应用更小体积

---

## 🔧 开发说明

### 文件功能：

- **Service Worker** ([sw.js](file:///workspace/sw.js)**
  - 自动缓存游戏资源
  - 离线访问时提供离线支持
  - 智能更新检查
  - 缓存优先策略

- **Manifest** ([manifest.json](file:///workspace/manifest.json)**
  - 应用名称和描述
  - 显示模式设置（独立全屏）
  - 主题颜色（科技蓝）
  - 图标配置

---

## 💡 提示

- 需要 HTTPS 或 localhost 才能安装 PWA
- 第一次访问后自动安装
- 已支持离线后，应用会
  - 缓存，
---

## 🌐 部署到生产环境

部署到任何静态托管服务（如 GitHub Pages、Vercel、Netlify 等），这样所有人都可以安装您的游戏了！

---

## 📋 文件位置

所有已创建文件：
- manifest.json
- sw.js
- generate-icons.html
- index.html (已修改)
- README_PWA.md (本文档)

---

## 🎉 开始玩吧！

现在您的游戏同时有两个版本都已准备就绪！🎊

- **Electron 桌面应用** ([README_APP.md](file:///workspace/README_APP.md)
- **PWA 渐进式应用** (本文档)
