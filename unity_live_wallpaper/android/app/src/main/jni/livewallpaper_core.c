#include <jni.h>
#include <android/log.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LOG_TAG "LiveWallpaper"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

/**
 * 动态壁纸核心功能 - C语言实现
 * 
 * 本模块提供视频壁纸的核心处理功能：
 * 1. 视频文件验证
 * 2. 视频信息提取
 * 3. 帧提取和处理
 * 4. 壁纸渲染控制
 */

typedef struct {
    char* file_path;
    long file_size;
    int duration_ms;
    int width;
    int height;
    float frame_rate;
    char* codec_name;
} VideoInfo;

typedef struct {
    float crop_x;
    float crop_y;
    float crop_width;
    float crop_height;
    float brightness;
    float saturation;
    float contrast;
} VideoEffectSettings;

/**
 * 初始化视频信息
 */
VideoInfo* create_video_info() {
    VideoInfo* info = (VideoInfo*)malloc(sizeof(VideoInfo));
    if (info == NULL) {
        LOGE("Failed to allocate memory for VideoInfo");
        return NULL;
    }
    
    memset(info, 0, sizeof(VideoInfo));
    LOGI("VideoInfo created successfully");
    return info;
}

/**
 * 释放视频信息内存
 */
void free_video_info(VideoInfo* info) {
    if (info != NULL) {
        if (info->file_path != NULL) {
            free(info->file_path);
        }
        if (info->codec_name != NULL) {
            free(info->codec_name);
        }
        free(info);
        LOGI("VideoInfo freed");
    }
}

/**
 * 设置视频文件路径
 */
void set_video_path(VideoInfo* info, const char* path) {
    if (info == NULL || path == NULL) {
        LOGE("Invalid parameters for set_video_path");
        return;
    }
    
    if (info->file_path != NULL) {
        free(info->file_path);
    }
    
    info->file_path = (char*)malloc(strlen(path) + 1);
    if (info->file_path != NULL) {
        strcpy(info->file_path, path);
        LOGI("Video path set to: %s", path);
    }
}

/**
 * 获取文件大小
 */
long get_file_size(const char* file_path) {
    if (file_path == NULL) {
        LOGE("Invalid file path");
        return -1;
    }
    
    FILE* file = fopen(file_path, "rb");
    if (file == NULL) {
        LOGE("Cannot open file: %s", file_path);
        return -1;
    }
    
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fclose(file);
    
    LOGI("File size: %ld bytes", size);
    return size;
}

/**
 * 验证视频文件格式
 * 返回值: 1 = 有效视频, 0 = 无效视频
 */
int validate_video_file(const char* file_path) {
    if (file_path == NULL) {
        LOGE("Invalid file path");
        return 0;
    }
    
    // 检查文件扩展名
    const char* extensions[] = {".mp4", ".avi", ".mov", ".mkv", ".webm", ".3gp"};
    int num_extensions = 6;
    int valid = 0;
    
    size_t path_len = strlen(file_path);
    
    for (int i = 0; i < num_extensions; i++) {
        size_t ext_len = strlen(extensions[i]);
        if (path_len > ext_len) {
            const char* ext = file_path + path_len - ext_len;
            if (strcasecmp(ext, extensions[i]) == 0) {
                valid = 1;
                break;
            }
        }
    }
    
    if (!valid) {
        LOGE("Unsupported video format");
        return 0;
    }
    
    // 检查文件是否存在且可读
    FILE* file = fopen(file_path, "rb");
    if (file == NULL) {
        LOGE("Cannot read file: %s", file_path);
        return 0;
    }
    
    fclose(file);
    LOGI("Video file validated: %s", file_path);
    return 1;
}

/**
 * 设置视频效果参数
 */
void set_video_effect(VideoEffectSettings* settings, float crop_x, float crop_y, 
                      float crop_width, float crop_height,
                      float brightness, float saturation, float contrast) {
    if (settings == NULL) {
        LOGE("Invalid settings pointer");
        return;
    }
    
    settings->crop_x = crop_x;
    settings->crop_y = crop_y;
    settings->crop_width = crop_width;
    settings->crop_height = crop_height;
    settings->brightness = brightness;
    settings->saturation = saturation;
    settings->contrast = contrast;
    
    LOGI("Video effects updated - Crop: (%.2f, %.2f) %.2fx%.2f, "
          "Brightness: %.2f, Saturation: %.2f, Contrast: %.2f",
          crop_x, crop_y, crop_width, crop_height,
          brightness, saturation, contrast);
}

/**
 * 验证裁剪区域
 */
int validate_crop_region(float crop_x, float crop_y, 
                        float crop_width, float crop_height) {
    // 检查边界
    if (crop_x < 0 || crop_x > 1 || 
        crop_y < 0 || crop_y > 1 ||
        crop_width <= 0 || crop_width > 1 ||
        crop_height <= 0 || crop_height > 1) {
        LOGE("Invalid crop region");
        return 0;
    }
    
    // 检查是否超出边界
    if (crop_x + crop_width > 1 || crop_y + crop_height > 1) {
        LOGE("Crop region exceeds bounds");
        return 0;
    }
    
    LOGI("Crop region validated: (%.2f, %.2f) %.2fx%.2f", 
         crop_x, crop_y, crop_width, crop_height);
    return 1;
}

/**
 * 计算视频缩放比例
 */
void calculate_scale(int source_width, int source_height,
                    int target_width, int target_height,
                    float* scale_x, float* scale_y,
                    int* offset_x, int* offset_y) {
    if (scale_x == NULL || scale_y == NULL || 
        offset_x == NULL || offset_y == NULL) {
        LOGE("Invalid output parameters");
        return;
    }
    
    // 计算宽高比
    float source_ratio = (float)source_width / source_height;
    float target_ratio = (float)target_width / target_height;
    
    if (source_ratio > target_ratio) {
        // 宽度适配
        *scale_x = (float)target_width / source_width;
        *scale_y = *scale_x;
        *offset_x = 0;
        *offset_y = (target_height - (int)(source_height * *scale_y)) / 2;
    } else {
        // 高度适配
        *scale_y = (float)target_height / source_height;
        *scale_x = *scale_y;
        *offset_y = 0;
        *offset_x = (target_width - (int)(source_width * *scale_x)) / 2;
    }
    
    LOGI("Scale calculated: %.2fx%.2f, Offset: (%d, %d)",
         *scale_x, *scale_y, *offset_x, *offset_y);
}

/**
 * 格式化文件大小为可读字符串
 */
void format_file_size(long bytes, char* output, int output_size) {
    if (output == NULL || output_size <= 0) {
        LOGE("Invalid output buffer");
        return;
    }
    
    if (bytes < 1024) {
        snprintf(output, output_size, "%ld B", bytes);
    } else if (bytes < 1024 * 1024) {
        snprintf(output, output_size, "%.1f KB", bytes / 1024.0f);
    } else if (bytes < 1024 * 1024 * 1024) {
        snprintf(output, output_size, "%.1f MB", bytes / (1024.0f * 1024.0f));
    } else {
        snprintf(output, output_size, "%.2f GB", 
                bytes / (1024.0f * 1024.0f * 1024.0f));
    }
}

/**
 * 获取视频时长（毫秒）
 * 注意：这里需要实际的编解码库支持
 */
int estimate_duration_ms(long file_size, int bitrate) {
    if (bitrate <= 0) {
        bitrate = 2000000; // 默认2Mbps
    }
    
    int duration_ms = (int)((file_size * 8) / bitrate * 1000);
    LOGI("Estimated duration: %d ms", duration_ms);
    return duration_ms;
}

/**
 * 壁纸引擎状态枚举
 */
typedef enum {
    WALLPAPER_STATE_STOPPED = 0,
    WALLPAPER_STATE_PLAYING = 1,
    WALLPAPER_STATE_PAUSED = 2,
    WALLPAPER_STATE_ERROR = 3
} WallpaperState;

/**
 * 壁纸引擎控制结构
 */
typedef struct {
    WallpaperState state;
    VideoInfo* current_video;
    VideoEffectSettings effects;
    int is_looping;
    int is_muted;
    float volume;
    float playback_speed;
} WallpaperEngine;

/**
 * 创建壁纸引擎
 */
WallpaperEngine* create_wallpaper_engine() {
    WallpaperEngine* engine = (WallpaperEngine*)malloc(sizeof(WallpaperEngine));
    if (engine == NULL) {
        LOGE("Failed to allocate WallpaperEngine");
        return NULL;
    }
    
    memset(engine, 0, sizeof(WallpaperEngine));
    engine->state = WALLPAPER_STATE_STOPPED;
    engine->current_video = NULL;
    engine->is_looping = 1;
    engine->is_muted = 1;
    engine->volume = 0.0f;
    engine->playback_speed = 1.0f;
    
    // 设置默认效果
    set_video_effect(&engine->effects, 0.0f, 0.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f);
    
    LOGI("WallpaperEngine created");
    return engine;
}

/**
 * 释放壁纸引擎
 */
void free_wallpaper_engine(WallpaperEngine* engine) {
    if (engine != NULL) {
        if (engine->current_video != NULL) {
            free_video_info(engine->current_video);
        }
        free(engine);
        LOGI("WallpaperEngine freed");
    }
}

/**
 * 启动壁纸播放
 */
int start_wallpaper(WallpaperEngine* engine, const char* video_path) {
    if (engine == NULL || video_path == NULL) {
        LOGE("Invalid parameters for start_wallpaper");
        return -1;
    }
    
    // 验证视频文件
    if (!validate_video_file(video_path)) {
        engine->state = WALLPAPER_STATE_ERROR;
        return -1;
    }
    
    // 释放之前的视频
    if (engine->current_video != NULL) {
        free_video_info(engine->current_video);
    }
    
    // 创建新的视频信息
    engine->current_video = create_video_info();
    set_video_path(engine->current_video, video_path);
    engine->current_video->file_size = get_file_size(video_path);
    engine->current_video->duration_ms = estimate_duration_ms(
        engine->current_video->file_size, 0);
    
    engine->state = WALLPAPER_STATE_PLAYING;
    LOGI("Wallpaper started: %s", video_path);
    return 0;
}

/**
 * 暂停壁纸播放
 */
void pause_wallpaper(WallpaperEngine* engine) {
    if (engine == NULL) {
        LOGE("Invalid engine");
        return;
    }
    
    if (engine->state == WALLPAPER_STATE_PLAYING) {
        engine->state = WALLPAPER_STATE_PAUSED;
        LOGI("Wallpaper paused");
    }
}

/**
 * 恢复壁纸播放
 */
void resume_wallpaper(WallpaperEngine* engine) {
    if (engine == NULL) {
        LOGE("Invalid engine");
        return;
    }
    
    if (engine->state == WALLPAPER_STATE_PAUSED) {
        engine->state = WALLPAPER_STATE_PLAYING;
        LOGI("Wallpaper resumed");
    }
}

/**
 * 停止壁纸播放
 */
void stop_wallpaper(WallpaperEngine* engine) {
    if (engine == NULL) {
        LOGE("Invalid engine");
        return;
    }
    
    engine->state = WALLPAPER_STATE_STOPPED;
    LOGI("Wallpaper stopped");
}

/**
 * 设置壁纸静音
 */
void set_wallpaper_muted(WallpaperEngine* engine, int muted) {
    if (engine == NULL) {
        LOGE("Invalid engine");
        return;
    }
    
    engine->is_muted = muted;
    engine->volume = muted ? 0.0f : 1.0f;
    LOGI("Wallpaper muted: %s", muted ? "yes" : "no");
}

/**
 * 设置播放速度
 */
void set_wallpaper_speed(WallpaperEngine* engine, float speed) {
    if (engine == NULL) {
        LOGE("Invalid engine");
        return;
    }
    
    if (speed < 0.5f) speed = 0.5f;
    if (speed > 2.0f) speed = 2.0f;
    
    engine->playback_speed = speed;
    LOGI("Wallpaper speed: %.1fx", speed);
}

/**
 * 获取引擎状态
 */
WallpaperState get_wallpaper_state(WallpaperEngine* engine) {
    if (engine == NULL) {
        return WALLPAPER_STATE_ERROR;
    }
    return engine->state;
}

/**
 * 获取状态字符串
 */
const char* get_state_string(WallpaperEngine* engine) {
    if (engine == NULL) {
        return "ERROR";
    }
    
    switch (engine->state) {
        case WALLPAPER_STATE_STOPPED: return "STOPPED";
        case WALLPAPER_STATE_PLAYING: return "PLAYING";
        case WALLPAPER_STATE_PAUSED: return "PAUSED";
        case WALLPAPER_STATE_ERROR: return "ERROR";
        default: return "UNKNOWN";
    }
}

/**
 * 获取引擎信息JSON字符串
 */
void get_engine_info_json(WallpaperEngine* engine, char* output, int output_size) {
    if (engine == NULL || output == NULL) {
        return;
    }
    
    snprintf(output, output_size,
        "{"
        "\"state\": \"%s\","
        "\"is_looping\": %s,"
        "\"is_muted\": %s,"
        "\"volume\": %.2f,"
        "\"playback_speed\": %.1f,"
        "\"effects\": {"
        "\"crop_x\": %.2f,"
        "\"crop_y\": %.2f,"
        "\"crop_width\": %.2f,"
        "\"crop_height\": %.2f,"
        "\"brightness\": %.2f,"
        "\"saturation\": %.2f,"
        "\"contrast\": %.2f"
        "}"
        "}",
        get_state_string(engine),
        engine->is_looping ? "true" : "false",
        engine->is_muted ? "true" : "false",
        engine->volume,
        engine->playback_speed,
        engine->effects.crop_x,
        engine->effects.crop_y,
        engine->effects.crop_width,
        engine->effects.crop_height,
        engine->effects.brightness,
        engine->effects.saturation,
        engine->effects.contrast
    );
}
