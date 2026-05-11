# 动态壁纸 Android 应用 - 完整项目

## 📱 项目概述

这是一个功能完整的 Android 动态壁纸应用，具有以下特点：

- ✅ 使用 Jetpack Compose 构建现代化 UI
- ✅ MVVM + Clean Architecture 架构
- ✅ 本地视频选择和预览
- ✅ 视频时间范围剪辑
- ✅ 实时视频壁纸服务
- ✅ 深色主题设计
- ✅ 流畅的动画效果

## 🛠️ 环境要求

1. **Android Studio** Hedgehog (2023.1.1) 或更高版本
2. **JDK** 17 或更高版本
3. **Android SDK** API 34 (Android 14)
4. **Gradle** 8.2 或更高版本（Android Studio 会自动配置）

## 📥 安装步骤

### 步骤 1: 下载项目

将整个 `android_app` 文件夹下载到本地。

### 步骤 2: 在 Android Studio 中打开项目

1. 打开 Android Studio
2. 选择 "Open an existing project"
3. 导航到 `android_app` 文件夹
4. 点击 "OK"

### 步骤 3: 等待 Gradle 同步

Android Studio 会自动下载所需的依赖项。这可能需要几分钟时间。

如果遇到同步问题：
- 点击 "File" → "Invalidate Caches / Restart"
- 选择 "Invalidate and Restart"

### 步骤 4: 构建项目

1. 连接 Android 手机（或启动模拟器）
2. 点击 Android Studio 顶部的绿色 "Run" 按钮
3. 选择你的设备
4. 应用会自动安装并启动

## 📂 项目结构

```
android_app/
├── app/
│   ├── build.gradle.kts          # 应用模块配置
│   └── src/main/
│       ├── AndroidManifest.xml   # 应用清单
│       ├── java/com/livewallpaper/app/
│       │   ├── LiveWallpaperApp.kt       # Application 类
│       │   ├── data/
│       │   │   ├── di/AppModule.kt       # 依赖注入
│       │   │   └── repository/           # 数据仓库
│       │   ├── domain/
│       │   │   ├── model/               # 数据模型
│       │   │   └── repository/           # 仓库接口
│       │   ├── presentation/
│       │   │   ├── MainActivity.kt      # 主活动
│       │   │   ├── Navigation.kt        # 导航配置
│       │   │   ├── theme/               # 主题
│       │   │   ├── screens/             # 页面
│       │   │   └── ui/components/       # UI 组件
│       │   └── service/
│       │       └── VideoWallpaperService.kt  # 壁纸服务
│       └── res/                          # 资源文件
├── build.gradle.kts                # 项目配置
├── settings.gradle.kts             # Gradle 设置
└── gradle.properties              # Gradle 属性
```

## 🎯 使用方法

### 首次使用

1. **打开应用** → 会请求视频访问权限
2. **授予权限** → 选择 "允许"
3. **浏览视频** → 应用会显示手机上的所有视频
4. **选择视频** → 点击视频缩略图进入预览

### 预览视频

1. 在预览页面可以：
   - 播放/暂停视频
   - 开启/关闭声音
   - 点击"编辑并设为壁纸"进入编辑页面

### 编辑并设置

1. **调整时间范围** → 使用滑块选择视频的起始和结束时间
2. **预览效果** → 点击播放按钮预览
3. **设为壁纸** → 点击"设为壁纸"按钮

### 设置壁纸

应用会：
1. 将视频复制到应用私有存储
2. 打开系统壁纸选择器
3. 你需要手动选择"动态壁纸" → 选择"视频壁纸服务"

## 🔧 自定义配置

### 修改主题颜色

编辑 `app/src/main/java/com/livewallpaper/app/presentation/theme/Color.kt`：

```kotlin
val Primary = Color(0xFF6366F1)      // 主色
val Secondary = Color(0xFFEC4899)    // 次要色
val Background = Color(0xFF0F0F23)    // 背景色
```

### 修改最低支持的 Android 版本

编辑 `app/build.gradle.kts`：

```kotlin
defaultConfig {
    minSdk = 26  // 修改这个值（推荐: 26 或更高）
}
```

## ❓ 常见问题

### Q: 为什么壁纸服务没有出现在列表中？

A: 确保：
1. 应用已正确安装
2. Android 版本 >= 7.0 (API 24)
3. 在设置 → 应用中找到该应用，查看"默认应用"中的壁纸设置

### Q: 视频无法播放？

A: 检查：
1. 视频格式是否被支持（MP4, MOV, AVI 等）
2. 视频文件是否损坏
3. 应用是否有存储权限

### Q: 壁纸设置失败？

A: 尝试：
1. 重启手机
2. 清除应用缓存
3. 在设置中重置壁纸为默认，再重新设置

## 📄 许可证

本项目仅供学习和参考使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
