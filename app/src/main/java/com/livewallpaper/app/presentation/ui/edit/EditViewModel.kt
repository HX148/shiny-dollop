package com.livewallpaper.app.presentation.ui.edit

import android.content.Context
import android.content.Intent
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.livewallpaper.app.data.repository.WallpaperRepositoryImpl
import com.livewallpaper.app.domain.repository.VideoRepository
import com.livewallpaper.app.domain.repository.WallpaperRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class EditViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val videoRepository: VideoRepository,
    private val wallpaperRepository: WallpaperRepository,
    private val wallpaperRepositoryImpl: WallpaperRepositoryImpl
) : ViewModel() {

    private val videoId: Long = savedStateHandle["videoId"] ?: -1L

    private val _uiState = MutableStateFlow(EditUiState())
    val uiState: StateFlow<EditUiState> = _uiState.asStateFlow()

    private val _navigationEvent = MutableSharedFlow<EditNavigationEvent>()
    val navigationEvent = _navigationEvent.asSharedFlow()

    init {
        loadVideo()
    }

    private fun loadVideo() {
        viewModelScope.launch {
            videoRepository.getVideos().collect { videos ->
                val video = videos.find { it.id == videoId }
                _uiState.value = _uiState.value.copy(
                    video = video,
                    endTimeMs = video?.duration ?: 0,
                    isLoading = false
                )
            }
        }
    }

    fun onTogglePlayPause() {
        _uiState.value = _uiState.value.copy(
            isPlaying = !_uiState.value.isPlaying
        )
    }

    fun onSetStartTime(timeMs: Long) {
        _uiState.value = _uiState.value.copy(startTimeMs = timeMs)
    }

    fun onSetEndTime(timeMs: Long) {
        _uiState.value = _uiState.value.copy(endTimeMs = timeMs)
    }

    fun onApplyWallpaper() {
        viewModelScope.launch {
            val video = _uiState.value.video ?: return@launch
            
            _uiState.value = _uiState.value.copy(isSettingWallpaper = true)
            
            try {
                wallpaperRepository.setWallpaper(
                    videoUri = video.uri,
                    cropRect = android.graphics.RectF(0f, 0f, 1f, 1f),
                    startTimeMs = _uiState.value.startTimeMs,
                    endTimeMs = _uiState.value.endTimeMs
                )
                _navigationEvent.emit(EditNavigationEvent.WallpaperSetSuccess)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isSettingWallpaper = false,
                    error = e.message
                )
            }
        }
    }

    fun launchWallpaperService(context: Context) {
        val intent = wallpaperRepositoryImpl.getWallpaperIntent()
        context.startActivity(intent)
    }
}

sealed class EditNavigationEvent {
    data object WallpaperSetSuccess : EditNavigationEvent()
}
