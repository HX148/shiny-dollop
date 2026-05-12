# Unity 动态壁纸应用

## 项目简介

本项目是一个基于 Unity 引擎和 C# 编程语言开发的动态壁纸应用程序。项目采用 Clean Architecture 架构设计，提供了完整的视频壁纸功能，包括视频播放、视频编辑、壁纸管理等核心模块。通过 Unity 的跨平台能力，该应用可以构建为 Android APK 并作为动态壁纸服务运行。

### 核心特性

该项目具有以下核心功能特性。首先是视频播放功能，应用支持多种视频格式的播放，包括 MP4、AVI、MOV、MKV、WebM 等常见格式，并且支持循环播放、播放速度调节、静音等控制选项。其次是视频编辑功能，用户可以对视频进行裁剪区域的设置，选择起始和结束时间，应用还提供了亮度、饱和度、对比度等图像效果调节功能。第三是壁纸管理功能，应用支持多壁纸预设的保存和加载，用户可以轻松切换不同的壁纸配置，所有设置都会自动保存到本地存储中。

### 技术架构

项目采用 MVVM 架构模式，将业务逻辑、数据管理和用户界面分离。核心脚本包括 `LiveWallpaperApp.cs` 作为应用入口类，负责全局状态管理；`VideoPlayerController.cs` 负责视频播放控制；`VideoEditorController.cs` 负责视频编辑功能；`WallpaperSettings.cs` 负责壁纸配置管理；`VideoSelector.cs` 负责视频文件选择和管理。此外，项目还包含了原生 C 语言模块 `livewallpaper_core.c`，用于处理底层的视频文件验证和壁纸引擎状态管理。

---

## 环境配置

### 必要条件

在开始配置项目之前，需要确保开发环境满足以下必要条件。Unity 编辑器需要安装 2021.3 LTS 或更高版本，推荐使用 2022.3 版本以获得更好的稳定性和兼容性。Android 构建支持需要安装 Android SDK API Level 21 或更高版本，并确保已安装 Android Build Tools 和 Platform Tools。如果需要使用原生 C 模块进行编译，还需要安装 Android NDK。

### 安装步骤

配置开发环境的具体步骤如下。首先，访问 Unity 官方下载页面（https://unity.com/download）下载并安装 Unity Hub。然后在 Unity Hub 中点击"安装"按钮，添加所需版本的 Unity 编辑器，在模块选择中勾选"Android Build Support"选项。接下来，通过 Unity Hub 安装 Android SDK 和 NDK，或者手动配置已有的 Android SDK 路径。最后，在 Unity 编辑器中通过"Edit"菜单打开"Preferences"，在"External Tools"中设置 Android SDK 和 NDK 的路径。

---

## 项目结构

### 目录组织

项目采用清晰的目录结构组织不同类型的资源文件。`Assets/Scripts` 目录包含所有 C# 脚本文件，按功能模块分类存放。`Assets/Shaders` 目录存放自定义的着色器代码，用于实现视频裁剪和图像效果。`Assets/Scenes` 目录包含应用的场景文件。`Assets/Prefabs` 目录存放预制体资源。`android/app/src/main/jni` 目录包含原生 C 语言代码，用于底层功能实现。

### 核心脚本说明

应用的核心脚本文件及其功能说明如下。`LiveWallpaperApp.cs` 是应用程序的主入口类，使用单例模式管理全局状态，处理应用初始化和设置保存。`VideoPlayerController.cs` 是视频播放控制器，封装了 Unity 的 VideoPlayer 组件，提供了统一的播放控制接口，支持网络视频和本地视频两种来源。`VideoEditorController.cs` 是视频编辑控制器，负责管理视频的时间范围和裁剪区域设置，提供设置的应用和导出功能。`WallpaperSettings.cs` 是壁纸设置管理器，使用 JSON 格式保存壁纸配置，支持预设的添加、删除和加载操作。`VideoSelector.cs` 是视频选择器，负责扫描和搜索本地视频文件，提供视频信息的提取和排序功能。

---

## 使用指南

### 快速开始

首次使用应用时，按以下步骤进行操作。首先，在 Unity 编辑器中打开项目，在场景中可以看到预置的视频播放组件。然后，将需要的视频文件放入 `Assets/StreamingAssets` 目录，或者通过网络 URL 加载视频。接着，在场景中找到 `LiveWallpaperApp` 组件，设置默认的播放参数。最后，点击播放按钮测试视频播放效果。

### 视频播放控制

视频播放控制功能的使用方法如下。播放和暂停可以通过 `VideoPlayerController` 的 `Play()`、`Pause()` 和 `TogglePlayPause()` 方法实现。播放速度调节使用 `SetPlaybackSpeed(float speed)` 方法，参数范围为 0.5 到 2.0。循环播放设置使用 `SetLoop(bool loopEnabled)` 方法。静音控制使用 `SetMuted(bool muted)` 方法。进度跳转使用 `SeekTo(float time)` 方法，参数为秒数。

### 视频编辑功能

视频编辑功能允许用户精确控制壁纸的显示效果。时间范围设置使用 `VideoEditorController` 的 `SetTimeRange(float start, float end)` 方法，参数为 0.0 到 1.0 的百分比值。裁剪区域设置使用 `SetCropRegion(float x, float y, float width, float height)` 方法，可以只显示视频的特定区域。亮度、饱和度和对比度的调节通过修改对应的材质属性实现。自定义着色器 `VideoCropShader` 提供了 GPU 加速的图像处理能力。

### 壁纸管理

壁纸管理功能帮助用户保存和管理多个壁纸配置。保存当前壁纸调用 `WallpaperSettings` 的 `SaveCurrentWallpaper()` 方法。添加到预设调用 `AddToPresets()` 方法。从预设加载调用 `LoadFromPreset(int index)` 方法，参数为预设索引。删除预设调用 `DeletePreset(int index)` 方法。导出配置为 JSON 调用 `ExportConfigToJson()` 方法，可以用于配置的备份和迁移。

---

## Android 构建

### 构建设置

将应用构建为 Android APK 的步骤如下。首先，在 Unity 编辑器中选择"File"菜单，点击"Build Settings"。然后，在平台列表中选择"Android"，点击"Switch Platform"切换到 Android 平台。接着，点击"Player Settings"打开播放器设置，在"Other Settings"中配置包名（Package Name），建议使用反向域名格式如 com.example.livewallpaper。之后，在"Publishing Settings"中配置签名密钥，如果没有可以创建新的密钥。最后，点击"Build"按钮开始构建。

### 运行时权限

应用在 Android 设备上运行需要以下权限。`READ_EXTERNAL_STORAGE` 权限用于读取存储设备上的视频文件。`WRITE_EXTERNAL_STORAGE` 权限用于在某些设备上保存配置数据。`INTERNET` 权限用于加载网络视频。`WAKE_LOCK` 权限用于保持壁纸服务运行。这些权限在 `AndroidManifest.xml` 文件中声明。

### 动态壁纸服务

应用作为动态壁纸服务运行时，需要在 Android 系统设置中激活。在设备上打开"设置"应用，进入"壁纸"或"显示"设置，选择"动态壁纸"或"视频壁纸"选项。从列表中找到并选择本应用。系统会提示选择要使用的视频文件，选择后即可预览和应用动态壁纸效果。

---

## 扩展开发

### 添加新功能

在现有基础上添加新功能的开发建议如下。首先，在 `Assets/Scripts` 目录中创建新的脚本文件，遵循项目的命名规范。其次，将新脚本添加到对应的 GameObject 上，配置必要的组件引用。然后，在需要的地方调用现有模块的公共方法。最后，测试新功能在不同平台上的表现。

### 原生模块扩展

如果需要使用 C 语言实现性能关键的功能，可以扩展原生模块。在 `android/app/src/main/jni` 目录中添加新的 C 源文件。在 `CMakeLists.txt` 中添加源文件引用。实现 JNI 接口函数与 Java/Kotlin 代码交互。在 C# 脚本中使用 `DllImport` 调用原生函数。编译原生模块并将生成的 SO 库打包到 APK 中。

### 自定义着色器

项目提供的视频裁剪着色器可以进一步扩展以支持更多效果。可以添加模糊、锐化等图像处理算法。可以实现渐变遮罩或自定义形状的裁剪。可以添加特效如马赛克、老电影滤镜等。可以添加多个效果的无缝混合功能。

---

## 常见问题

### 视频无法播放

如果遇到视频无法播放的问题，请按以下步骤排查。首先，确认视频文件格式是否受支持，推荐使用 H.264 编码的 MP4 格式。其次，检查视频文件是否完整，可以尝试在其他播放器中打开。然后，如果是本地视频，确认文件路径正确，相对路径应相对于 StreamingAssets 目录。最后，查看 Unity 控制台的错误日志，根据提示进行修复。

### 构建失败

Android 构建失败通常由以下原因导致。SDK 版本不兼容，需要在 Player Settings 中调整 Minimum API Level。签名配置错误，需要重新生成或使用有效的签名密钥。NDK 版本不匹配，需要安装正确版本的 NDK 或禁用原生模块构建。存储空间不足，需要清理磁盘空间或更改构建输出路径。

### 壁纸服务不工作

动态壁纸服务在某些设备上可能无法正常工作。某些设备制造商对动态壁纸有限制，需要联系设备厂商获取支持。系统版本过旧可能导致不支持某些 API，建议升级到最新的 Android 版本。应用可能被系统优化功能禁用，需要在电池设置中将应用设为"不受限制"。

---

## 技术支持

如果在开发过程中遇到其他问题，可以通过以下方式获取帮助。查看 Unity 官方文档了解 VideoPlayer 组件的详细用法。参考 Android 开发者文档了解动态壁纸服务的实现规范。在 Unity 社区论坛搜索相关话题或发帖提问。

---

## 许可证

本项目仅供学习和参考使用，商业使用请遵守相关法律法规。
