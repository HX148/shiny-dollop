package com.livewallpaper.app.data.di

import com.livewallpaper.app.data.repository.VideoRepositoryImpl
import com.livewallpaper.app.data.repository.WallpaperRepositoryImpl
import com.livewallpaper.app.domain.repository.VideoRepository
import com.livewallpaper.app.domain.repository.WallpaperRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindVideoRepository(impl: VideoRepositoryImpl): VideoRepository

    @Binds
    @Singleton
    abstract fun bindWallpaperRepository(impl: WallpaperRepositoryImpl): WallpaperRepository
}
