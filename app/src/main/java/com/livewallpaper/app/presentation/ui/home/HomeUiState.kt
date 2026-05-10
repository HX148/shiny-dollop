package com.livewallpaper.app.presentation.ui.home

import com.livewallpaper.app.domain.model.VideoItem

data class HomeUiState(
    val isLoading: Boolean = true,
    val videos: List<VideoItem> = emptyList(),
    val error: String? = null,
    val hasPermission: Boolean = false
)

sealed class HomeEvent {
    data object RequestPermission : HomeEvent()
    data class SelectVideo(val video: VideoItem) : HomeEvent()
}
