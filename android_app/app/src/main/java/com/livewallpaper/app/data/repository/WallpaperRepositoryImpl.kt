package com.livewallpaper.app.data.repository

import android.app.WallpaperManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.RectF
import android.net.Uri
import com.livewallpaper.app.domain.repository.WallpaperRepository
import com.livewallpaper.app.service.VideoWallpaperService
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WallpaperRepositoryImpl @Inject constructor(
    @ApplicationContext private val context: Context
) : WallpaperRepository {

    private val wallpaperDir = File(context.filesDir, "wallpapers").apply { mkdirs() }
    private var currentWallpaperUri: Uri? = null

    override suspend fun setWallpaper(
        videoUri: Uri,
        cropRect: RectF,
        startTimeMs: Long,
        endTimeMs: Long
    ) = withContext(Dispatchers.IO) {
        // Copy video to app's private storage
        val wallpaperFile = File(wallpaperDir, "wallpaper.mp4")
        
        context.contentResolver.openInputStream(videoUri)?.use { input ->
            FileOutputStream(wallpaperFile).use { output ->
                input.copyTo(output)
            }
        }

        currentWallpaperUri = Uri.fromFile(wallpaperFile)

        // Save configuration
        val configFile = File(wallpaperDir, "config.txt")
        configFile.writeText("$startTimeMs\n$endTimeMs")

        // Open wallpaper picker with our service
        try {
            val intent = Intent(WallpaperManager.ACTION_CHANGE_LIVE_WALLPAPER).apply {
                putExtra(
                    WallpaperManager.EXTRA_LIVE_WALLPAPER_COMPONENT,
                    ComponentName(context, VideoWallpaperService::class.java)
                )
            }
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        } catch (e: Exception) {
            // Fallback: try to open wallpaper settings
            val intent = Intent(WallpaperManager.ACTION_LIVE_WALLPAPER_CHOOSER)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        }
    }

    override fun getCurrentWallpaper(): Uri? = currentWallpaperUri

    override suspend fun clearWallpaper() {
        wallpaperDir.listFiles()?.forEach { it.delete() }
        currentWallpaperUri = null
    }

    fun getWallpaperConfig(): Pair<Long, Long> {
        val configFile = File(wallpaperDir, "config.txt")
        return if (configFile.exists()) {
            val lines = configFile.readLines()
            val start = lines.getOrNull(0)?.toLongOrNull() ?: 0L
            val end = lines.getOrNull(1)?.toLongOrNull() ?: 0L
            Pair(start, end)
        } else {
            Pair(0L, 0L)
        }
    }
}
