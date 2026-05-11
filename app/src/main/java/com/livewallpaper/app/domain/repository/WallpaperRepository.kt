package com.livewallpaper.app.domain.repository

import android.graphics.RectF
import android.net.Uri
import kotlinx.coroutines.flow.Flow

interface WallpaperRepository {
    suspend fun setWallpaper(videoUri: Uri, cropRect: RectF, startTimeMs: Long, endTimeMs: Long)
    fun getCurrentWallpaper(): Flow<Uri?>
    suspend fun clearWallpaper()
}
