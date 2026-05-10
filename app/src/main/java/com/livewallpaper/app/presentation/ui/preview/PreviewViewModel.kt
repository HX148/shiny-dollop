package com.livewallpaper.app.presentation.ui.preview

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.livewallpaper.app.domain.repository.VideoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class PreviewViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val videoRepository: VideoRepository
) : ViewModel() {

    private val videoId: Long = savedStateHandle["videoId"] ?: -1L

    private val _uiState = MutableStateFlow(PreviewUiState())
    val uiState: StateFlow<PreviewUiState> = _uiState.asStateFlow()

    private val _navigationEvent = MutableSharedFlow<PreviewNavigationEvent>()
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

    fun onToggleMute() {
        _uiState.value = _uiState.value.copy(
            isMuted = !_uiState.value.isMuted
        )
    }

    fun onSeekTo(position: Long) {
        _uiState.value = _uiState.value.copy(currentPosition = position)
    }

    fun onNavigateToEdit() {
        viewModelScope.launch {
            _uiState.value.video?.let { video ->
                _navigationEvent.emit(PreviewNavigationEvent.NavigateToEdit(video.id))
            }
        }
    }
}

sealed class PreviewNavigationEvent {
    data class NavigateToEdit(val videoId: Long) : PreviewNavigationEvent()
}
