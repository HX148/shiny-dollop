package com.livewallpaper.app.service.wallpaper

import android.content.Context
import android.media.MediaPlayer
import android.service.wallpaper.WallpaperService
import android.view.SurfaceHolder
import dagger.hilt.android.qualifiers.ApplicationContext
import java.io.File
import javax.inject.Inject

class VideoWallpaperEngine @Inject constructor(
    @ApplicationContext private val context: Context
) : WallpaperService.Engine() {

    private var mediaPlayer: MediaPlayer? = null
    private var surfaceHolder: SurfaceHolder? = null
    private var isVisible = false

    private val videoFile: File?
        get() {
            val wallpaperDir = File(context.filesDir, "wallpapers")
            val video = File(wallpaperDir, "current_wallpaper.mp4")
            return if (video.exists()) video else null
        }

    override fun onSurfaceCreated(holder: SurfaceHolder) {
        super.onSurfaceCreated(holder)
        surfaceHolder = holder
        
        val video = videoFile ?: return
        
        try {
            mediaPlayer = MediaPlayer().apply {
                setDataSource(video.absolutePath)
                setSurface(holder.surface)
                isLooping = true
                setOnPreparedListener {
                    if (isVisible) {
                        start()
                    }
                }
                setOnErrorListener { _, _, _ ->
                    false
                }
                prepareAsync()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun onSurfaceChanged(
        holder: SurfaceHolder,
        format: Int,
        width: Int,
        height: Int
    ) {
        super.onSurfaceChanged(holder, format, width, height)
    }

    override fun onVisibilityChanged(visible: Boolean) {
        isVisible = visible
        
        if (visible) {
            mediaPlayer?.start()
        } else {
            mediaPlayer?.pause()
        }
    }

    override fun onSurfaceDestroyed(holder: SurfaceHolder) {
        super.onSurfaceDestroyed(holder)
        isVisible = false
        
        mediaPlayer?.release()
        mediaPlayer = null
        surfaceHolder = null
    }

    override fun onDestroy() {
        super.onDestroy()
        
        mediaPlayer?.release()
        mediaPlayer = null
    }
}
