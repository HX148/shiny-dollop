# Tasks

- [x] Task 1: 创建音频系统 - 使用 Web Audio API 实现背景音乐播放和节拍合成音
  - [x] SubTask 1.1: 初始化 AudioContext 和音频加载
  - [x] SubTask 1.2: 创建节拍合成音函数（用于反馈音效）
  - [x] SubTask 1.3: 实现音乐播放控制（播放、暂停）

- [x] Task 2: 重构3D场景 - 调整相机视角和光照以适配俯视角度的音游玩法
  - [x] SubTask 2.1: 调整相机位置为俯视角度
  - [x] SubTask 2.2: 修改光照系统聚焦于判定区域
  - [x] SubTask 2.3: 保留粒子和视觉效果

- [x] Task 3: 实现节拍音符系统 - 创建三种颜色（粉、黄、蓝）的下落音符
  - [x] SubTask 3.1: 定义音符颜色和位置参数
  - [x] SubTask 3.2: 创建音符生成函数
  - [x] SubTask 3.3: 实现音符动态生成和回收

- [x] Task 4: 实现判定系统 - 检测玩家按键时机，计算 Perfect/Good/Miss
  - [x] SubTask 4.1: 定义判定时间窗口（±50ms/±100ms）
  - [x] SubTask 4.2: 创建按键事件监听
  - [x] SubTask 4.3: 实现音符命中检测逻辑
  - [x] SubTask 4.4: 显示判定反馈文字

- [x] Task 5: 实现分数和连击系统 - 记录得分、连击数和最大连击
  - [x] SubTask 5.1: 创建分数显示 UI
  - [x] SubTask 5.2: 实现连击计数和重置逻辑
  - [x] SubTask 5.3: 计算并显示最终评价等级

- [x] Task 6: 实现游戏状态管理 - 添加开始界面、游戏中和结束界面
  - [x] SubTask 6.1: 创建开始界面（标题和开始按钮）
  - [x] SubTask 6.2: 创建结束界面（显示最终得分）
  - [x] SubTask 6.3: 实现状态切换逻辑

- [x] Task 7: 添加视觉特效 - 击中音符时的环形扩散和粒子效果
  - [x] SubTask 7.1: 实现音符消失特效
  - [x] SubTask 7.2: 添加判定线闪光效果
  - [x] SubTask 7.3: 优化整体视觉表现

- [x] Task 8: 测试和优化 - 确保游戏流畅运行
  - [x] SubTask 8.1: 测试不同屏幕尺寸的响应式布局
  - [x] SubTask 8.2: 优化性能（减少不必要的渲染）
  - [x] SubTask 8.3: 测试音频同步准确性

# Task Dependencies
- Task 3 依赖于 Task 1 和 Task 2
- Task 4 依赖于 Task 3
- Task 5 依赖于 Task 4
- Task 6 依赖于 Task 5
- Task 7 与 Task 4 并行进行
- Task 8 依赖于所有其他任务
