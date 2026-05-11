package com.livewallpaper.app.presentation.ui.edit

import android.net.Uri
import com.livewallpaper.app.domain.model.VideoItem

data class EditUiState(
    val video: VideoItem? = null,
    val isPlaying: Boolean = true,
    val currentPosition: Long = 0,
    val startTimeMs: Long = 0,
    val endTimeMs: Long = 0,
    val isLoading: Boolean = true,
    val isSettingWallpaper: Boolean = false,
    val error: String? = null
)

sealed class EditEvent {
    data object TogglePlayPause : EditEvent()
    data class SetStartTime(val timeMs: Long) : EditEvent()
    data class SetEndTime(val timeMs: Long) : EditEvent()
    data object ApplyWallpaper : EditEvent()
}
