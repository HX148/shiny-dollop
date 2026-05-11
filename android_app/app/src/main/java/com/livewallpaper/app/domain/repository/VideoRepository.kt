package com.livewallpaper.app.domain.repository

import android.net.Uri
import com.livewallpaper.app.domain.model.VideoItem
import kotlinx.coroutines.flow.Flow

interface VideoRepository {
    fun getVideos(): Flow<List<VideoItem>>
    suspend fun getVideoByUri(uri: Uri): VideoItem?
}
