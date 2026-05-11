package com.livewallpaper.app.presentation.ui.preview

import android.net.Uri
import com.livewallpaper.app.domain.model.VideoItem

data class PreviewUiState(
    val video: VideoItem? = null,
    val isPlaying: Boolean = true,
    val currentPosition: Long = 0,
    val isMuted: Boolean = true,
    val isLoading: Boolean = true
)

sealed class PreviewEvent {
    data object TogglePlayPause : PreviewEvent()
    data object ToggleMute : PreviewEvent()
    data class SeekTo(val position: Long) : PreviewEvent()
    data object NavigateToEdit : PreviewEvent()
}
