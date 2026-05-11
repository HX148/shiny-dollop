package com.livewallpaper.app.presentation.screens.home

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.livewallpaper.app.domain.model.VideoItem
import com.livewallpaper.app.domain.repository.VideoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch
import javax.inject.Inject

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

sealed class HomeNavigationEvent {
    data class NavigateToPreview(val videoUri: Uri) : HomeNavigationEvent()
}

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val videoRepository: VideoRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    private val _navigationEvent = MutableStateFlow<HomeNavigationEvent?>(null)
    val navigationEvent: StateFlow<HomeNavigationEvent?> = _navigationEvent.asStateFlow()

    fun onPermissionGranted() {
        _uiState.value = _uiState.value.copy(hasPermission = true)
        loadVideos()
    }

    fun onPermissionDenied() {
        _uiState.value = _uiState.value.copy(
            hasPermission = false,
            isLoading = false
        )
    }

    private fun loadVideos() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            
            videoRepository.getVideos()
                .catch { e ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = e.message
                    )
                }
                .collect { videos ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        videos = videos,
                        error = null
                    )
                }
        }
    }

    fun onVideoClick(video: VideoItem) {
        _navigationEvent.value = HomeNavigationEvent.NavigateToPreview(video.uri)
    }

    fun onNavigationHandled() {
        _navigationEvent.value = null
    }

    fun refresh() {
        if (_uiState.value.hasPermission) {
            loadVideos()
        }
    }
}
