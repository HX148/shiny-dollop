package com.livewallpaper.app.domain.repository

import android.graphics.RectF
import android.net.Uri

interface WallpaperRepository {
    suspend fun setWallpaper(videoUri: Uri, cropRect: RectF, startTimeMs: Long, endTimeMs: Long)
    fun getCurrentWallpaper(): Uri?
    suspend fun clearWallpaper()
}
