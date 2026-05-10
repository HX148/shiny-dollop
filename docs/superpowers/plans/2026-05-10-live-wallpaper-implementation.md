# 动态壁纸应用实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个Android动态壁纸应用，支持从本地选择视频、编辑裁剪并设为动态壁纸

**Architecture:** MVVM + Clean Architecture，使用 Jetpack Compose 构建UI，ExoPlayer 播放视频，Android Live Wallpaper Service 实现动态壁纸

**Tech Stack:** Kotlin, Jetpack Compose, Material Design 3, ExoPlayer (Media3), Hilt, Coroutines

---

## 任务概览

### 第一阶段：项目基础（Tasks 1-3）
- 项目初始化和依赖配置
- 主题和基础组件
- 领域层数据模型

### 第二阶段：核心功能（Tasks 4-8）
- 数据层实现
- 视频列表页面
- 视频预览页面
- 视频编辑页面
- 动态壁纸服务

### 第三阶段：完善功能（Tasks 9-10）
- 页面导航和动画
- 测试和构建验证

---

## Task 1: 项目初始化和依赖配置

**Files:**
- Create: `app/build.gradle.kts`
- Create: `app/src/main/AndroidManifest.xml`
- Create: `settings.gradle.kts`
- Create: `build.gradle.kts` (project level)
- Create: `gradle.properties`

- [ ] **Step 1: 创建项目级 build.gradle.kts**
- [ ] **Step 2: 创建 settings.gradle.kts**
- [ ] **Step 3: 创建 app/build.gradle.kts**
- [ ] **Step 4: 创建 AndroidManifest.xml**
- [ ] **Step 5: 创建资源文件**
- [ ] **Step 6: 创建 Application 类**
- [ ] **Step 7: 创建基础 Activity**
- [ ] **Step 8: 运行构建验证**

---

## Task 2: 主题配置和基础组件

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/presentation/theme/Color.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/theme/Type.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/theme/Theme.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/components/LoadingIndicator.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/components/VideoThumbnail.kt`

- [ ] **Step 1: 创建颜色主题**
- [ ] **Step 2: 创建字体主题**
- [ ] **Step 3: 创建 Theme.kt**
- [ ] **Step 4: 创建加载指示器组件**
- [ ] **Step 5: 创建视频缩略图组件**
- [ ] **Step 6: 提交代码**

---

## Task 3: 领域层 - 数据模型

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/domain/model/VideoItem.kt`
- Create: `app/src/main/java/com/livewallpaper/app/domain/model/WallpaperConfig.kt`
- Create: `app/src/main/java/com/livewallpaper/app/domain/repository/VideoRepository.kt`
- Create: `app/src/main/java/com/livewallpaper/app/domain/repository/WallpaperRepository.kt`

- [ ] **Step 1: 创建视频数据模型**
- [ ] **Step 2: 创建壁纸配置模型**
- [ ] **Step 3: 创建视频仓库接口**
- [ ] **Step 4: 创建壁纸仓库接口**
- [ ] **Step 5: 提交代码**

---

## Task 4: 数据层实现

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/data/repository/VideoRepositoryImpl.kt`
- Create: `app/src/main/java/com/livewallpaper/app/data/repository/WallpaperRepositoryImpl.kt`
- Create: `app/src/main/java/com/livewallpaper/app/data/di/RepositoryModule.kt`

- [ ] **Step 1: 创建视频仓库实现**
- [ ] **Step 2: 创建壁纸仓库实现**
- [ ] **Step 3: 创建依赖注入模块**
- [ ] **Step 4: 提交代码**

---

## Task 5: 视频列表页面

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/home/HomeUiState.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/home/HomeViewModel.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/home/HomeScreen.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/home/VideoGridItem.kt`

- [ ] **Step 1: 创建 HomeUiState**
- [ ] **Step 2: 创建 HomeViewModel**
- [ ] **Step 3: 创建视频网格项组件**
- [ ] **Step 4: 创建 HomeScreen**
- [ ] **Step 5: 提交代码**

---

## Task 6: 视频预览页面

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/preview/PreviewUiState.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/preview/PreviewViewModel.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/preview/PreviewScreen.kt`

- [ ] **Step 1: 创建 PreviewUiState**
- [ ] **Step 2: 创建 PreviewViewModel**
- [ ] **Step 3: 创建 PreviewScreen**
- [ ] **Step 4: 提交代码**

---

## Task 7: 视频编辑页面

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/edit/EditUiState.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/edit/EditViewModel.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/edit/EditScreen.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/ui/components/RangeSlider.kt`

- [ ] **Step 1: 创建 EditUiState**
- [ ] **Step 2: 创建 EditViewModel**
- [ ] **Step 3: 创建时间范围滑块组件**
- [ ] **Step 4: 创建 EditScreen**
- [ ] **Step 5: 提交代码**

---

## Task 8: 动态壁纸服务

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/service/wallpaper/VideoWallpaperService.kt`
- Create: `app/src/main/java/com/livewallpaper/app/service/wallpaper/VideoWallpaperEngine.kt`

- [ ] **Step 1: 创建壁纸服务**
- [ ] **Step 2: 创建壁纸引擎**
- [ ] **Step 3: 更新仓库以启动服务**
- [ ] **Step 4: 提交代码**

---

## Task 9: 页面导航和动画

**Files:**
- Create: `app/src/main/java/com/livewallpaper/app/presentation/MainApp.kt`
- Create: `app/src/main/java/com/livewallpaper/app/presentation/Navigation.kt`
- Update: `app/src/main/java/com/livewallpaper/app/presentation/MainActivity.kt`

- [ ] **Step 1: 创建导航组件**
- [ ] **Step 2: 创建 MainApp 入口**
- [ ] **Step 3: 添加页面转场动画**
- [ ] **Step 4: 提交代码**

---

## Task 10: 测试和构建验证

**Files:**
- Test: 运行完整构建
- Verify: 检查所有功能是否正常

- [ ] **Step 1: 运行 assembleDebug 构建**
- [ ] **Step 2: 验证生成的 APK**
- [ ] **Step 3: 最终提交**

---

## 执行说明

建议使用 subagent-driven-development 方法执行计划：
1. 每个 Task 由一个子代理独立完成
2. Task 之间有依赖关系，需要按顺序执行
3. 每个 Task 完成后进行代码提交
4. 最后进行整体测试验证
