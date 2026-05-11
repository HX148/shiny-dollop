package com.livewallpaper.app.data.repository

import android.app.WallpaperManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.RectF
import android.net.Uri
import com.livewallpaper.app.domain.repository.WallpaperRepository
import com.livewallpaper.app.service.wallpaper.VideoWallpaperService
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WallpaperRepositoryImpl @Inject constructor(
    @ApplicationContext private val context: Context
) : WallpaperRepository {

    private val wallpaperManager = WallpaperManager.getInstance(context)
    private val _currentWallpaper = MutableStateFlow<Uri?>(null)
    private val wallpaperDir = File(context.filesDir, "wallpapers").apply { mkdirs() }

    override suspend fun setWallpaper(
        videoUri: Uri,
        cropRect: RectF,
        startTimeMs: Long,
        endTimeMs: Long
    ) = withContext(Dispatchers.IO) {
        val inputStream = context.contentResolver.openInputStream(videoUri)
        val wallpaperFile = File(wallpaperDir, "current_wallpaper.mp4")
        
        inputStream?.use { input ->
            FileOutputStream(wallpaperFile).use { output ->
                input.copyTo(output)
            }
        }

        _currentWallpaper.value = Uri.fromFile(wallpaperFile)
    }

    fun getWallpaperIntent(): Intent {
        return Intent(WallpaperManager.ACTION_CHANGE_LIVE_WALLPAPER).apply {
            putExtra(
                WallpaperManager.EXTRA_LIVE_WALLPAPER_COMPONENT,
                ComponentName(context, VideoWallpaperService::class.java)
            )
        }
    }

    override fun getCurrentWallpaper(): Flow<Uri?> = _currentWallpaper.asStateFlow()

    override suspend fun clearWallpaper() {
        wallpaperDir.listFiles()?.forEach { it.delete() }
        _currentWallpaper.value = null
    }
}
