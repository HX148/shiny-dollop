package com.livewallpaper.app.domain.model

import android.graphics.RectF
import android.net.Uri

data class WallpaperConfig(
    val videoUri: Uri,
    val cropRect: RectF = RectF(0f, 0f, 1f, 1f),
    val startTimeMs: Long = 0,
    val endTimeMs: Long = 0,
    val isLooping: Boolean = true,
    val isMuted: Boolean = true
)
