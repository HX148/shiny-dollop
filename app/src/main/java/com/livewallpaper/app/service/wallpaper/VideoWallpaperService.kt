package com.livewallpaper.app.service.wallpaper

import android.service.wallpaper.WallpaperService
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class VideoWallpaperService : WallpaperService() {

    override fun onCreateEngine(): Engine {
        return VideoWallpaperEngine()
    }
}
