# 音乐节奏游戏 Spec

## Why
将现有的 Three.js 弹跳球游戏转换为音乐节奏游戏，在保持3D视觉效果的同时增加音乐同步的节奏玩法。玩家需要根据音乐节拍在正确的时机操作，以获得分数。

## What Changes
- 将轨道系统改造为节拍/音符下落系统
- 添加 Web Audio API 音频播放和节拍检测
- 实现按键时机判定系统（Perfect/Good/Miss）
- 添加分数、连击和评价系统
- 保留原有的3D视觉效果和粒子特效
- 添加游戏状态管理（开始、游戏中、结束）

## Impact
- Affected specs: 视觉特效、音效系统、用户交互系统
- Affected code: index.html 完整重构

## ADDED Requirements
### Requirement: 节拍音符系统
系统 SHALL 提供三种颜色的下落音符（粉、黄、蓝），音符从远处向玩家方向匀速下落。

#### Scenario: 音符下落
- **WHEN** 游戏开始时
- **THEN** 音符以固定速度从远处向判定线移动

### Requirement: 判定系统
系统 SHALL 记录玩家的按键时机与音符到达判定线时间的差值，并判定为 Perfect（±50ms）、Good（±100ms）或 Miss（>100ms）。

#### Scenario: Perfect 判定
- **WHEN** 玩家按键且时间差在 ±50ms 内
- **THEN** 显示 "PERFECT" 反馈，增加 100 分和连击数

#### Scenario: Good 判定
- **WHEN** 玩家按键且时间差在 ±100ms 内
- **THEN** 显示 "GOOD" 反馈，增加 50 分和连击数

#### Scenario: Miss 判定
- **WHEN** 玩家按键且时间差超过 ±100ms，或音符通过判定线未被击中
- **THEN** 显示 "MISS" 反馈，重置连击数

### Requirement: 音频系统
系统 SHALL 使用 Web Audio API 播放背景音乐，并提供合成节拍音用于反馈。

#### Scenario: 音乐播放
- **WHEN** 玩家点击开始按钮
- **THEN** 背景音乐开始播放，音符同步生成

### Requirement: 视觉效果反馈
系统 SHALL 在击中音符时显示对应的视觉特效和判定文字。

#### Scenario: 击中特效
- **WHEN** 玩家成功击中音符
- **THEN** 在音符位置显示环形扩散特效，颜色与音符对应

### Requirement: 游戏状态管理
系统 SHALL 提供开始界面、游戏进行中和游戏结束三个状态，并支持重新开始。

#### Scenario: 游戏结束
- **WHEN** 音乐播放完毕
- **THEN** 显示最终得分、总连击数、最大连击数和评价等级

## MODIFIED Requirements
### Requirement: 3D 场景（保留）
保留原有的深色背景、相机视角、光照系统和球体元素。

### Requirement: 用户输入（扩展）
在原有鼠标/触摸横向移动基础上，增加空格键或点击触发判定。

## REMOVED Requirements
### Requirement: 随机轨道生成（移除）
移除原有的随机轨道类型生成逻辑，改为预设的节拍模式。
