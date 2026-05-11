package com.livewallpaper.app.service

import android.service.wallpaper.WallpaperService
import android.view.SurfaceHolder
import android.media.MediaPlayer
import java.io.File

class VideoWallpaperService : WallpaperService() {
    
    override fun onCreateEngine(): Engine {
        return VideoWallpaperEngine()
    }
    
    inner class VideoWallpaperEngine : Engine() {
        
        private var mediaPlayer: MediaPlayer? = null
        private var isVisible = false
        
        private val wallpaperFile: File?
            get() {
                val dir = filesDir.resolve("wallpapers")
                val file = dir.resolve("wallpaper.mp4")
                return if (file.exists()) file else null
            }
        
        override fun onSurfaceCreated(holder: SurfaceHolder) {
            super.onSurfaceCreated(holder)
            
            val file = wallpaperFile ?: return
            
            try {
                mediaPlayer = MediaPlayer().apply {
                    setDataSource(file.absolutePath)
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
        }
        
        override fun onDestroy() {
            super.onDestroy()
            mediaPlayer?.release()
            mediaPlayer = null
        }
    }
}
