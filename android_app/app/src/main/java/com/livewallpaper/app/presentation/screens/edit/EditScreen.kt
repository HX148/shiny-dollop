package com.livewallpaper.app.presentation.screens.edit

import android.net.Uri
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import com.livewallpaper.app.data.repository.WallpaperRepositoryImpl
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class EditUiState(
    val isPlaying: Boolean = true,
    val currentPosition: Long = 0,
    val duration: Long = 0,
    val startTimeMs: Long = 0,
    val endTimeMs: Long = 0,
    val isSettingWallpaper: Boolean = false,
    val success: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class EditViewModel @Inject constructor(
    private val wallpaperRepository: WallpaperRepositoryImpl
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(EditUiState())
    val uiState: StateFlow<EditUiState> = _uiState
    
    fun setDuration(duration: Long) {
        _uiState.value = _uiState.value.copy(
            duration = duration,
            endTimeMs = duration
        )
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
    
    fun setWallpaper(videoUri: Uri) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isSettingWallpaper = true)
            try {
                wallpaperRepository.setWallpaper(
                    videoUri = videoUri,
                    cropRect = android.graphics.RectF(0f, 0f, 1f, 1f),
                    startTimeMs = _uiState.value.startTimeMs,
                    endTimeMs = _uiState.value.endTimeMs
                )
                _uiState.value = _uiState.value.copy(
                    isSettingWallpaper = false,
                    success = true
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isSettingWallpaper = false,
                    error = e.message
                )
            }
        }
    }
}

@OptIn(UnstableApi::class)
@Composable
fun EditScreen(
    videoUri: Uri,
    onNavigateBack: () -> Unit,
    onWallpaperSet: () -> Unit,
    viewModel: EditViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val uiState by viewModel.uiState.collectAsState()
    var showControls by remember { mutableStateOf(true) }
    
    val exoPlayer = remember {
        ExoPlayer.Builder(context).build().apply {
            setMediaItem(MediaItem.fromUri(videoUri))
            prepare()
            playWhenReady = true
        }
    }
    
    LaunchedEffect(uiState.isPlaying) {
        exoPlayer.playWhenReady = uiState.isPlaying
    }
    
    LaunchedEffect(exoPlayer) {
        exoPlayer.addListener(object : Player.Listener {
            override fun onPlaybackStateChanged(state: Int) {
                if (state == Player.STATE_READY) {
                    viewModel.setDuration(exoPlayer.duration)
                }
            }
        })
    }
    
    LaunchedEffect(uiState.success) {
        if (uiState.success) {
            Toast.makeText(context, "壁纸设置成功！", Toast.LENGTH_LONG).show()
            onWallpaperSet()
        }
    }
    
    LaunchedEffect(uiState.error) {
        uiState.error?.let {
            Toast.makeText(context, "错误: $it", Toast.LENGTH_LONG).show()
        }
    }
    
    DisposableEffect(Unit) {
        onDispose {
            exoPlayer.release()
        }
    }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
    ) {
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    player = exoPlayer
                    useController = false
                }
            },
            modifier = Modifier.fillMaxSize()
        )
        
        AnimatedVisibility(
            visible = showControls,
            enter = fadeIn(),
            exit = fadeOut()
        ) {
            Box(modifier = Modifier.fillMaxSize()) {
                // Top bar
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .statusBarsPadding()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = onNavigateBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                    
                    Spacer(modifier = Modifier.weight(1f))
                    
                    Text(
                        text = "编辑壁纸",
                        style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                        color = Color.White
                    )
                    
                    Spacer(modifier = Modifier.weight(1f))
                    
                    Spacer(modifier = Modifier.size(48.dp))
                }
                
                // Bottom controls
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .align(Alignment.BottomCenter)
                        .background(
                            brush = Brush.verticalGradient(
                                colors = listOf(
                                    Color.Transparent,
                                    Color.Black.copy(alpha = 0.9f)
                                )
                            )
                        )
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "选择播放范围",
                        style = MaterialTheme.typography.titleMedium,
                        color = Color.White
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // Start time slider
                    Text(
                        text = "起始: ${formatDuration(uiState.startTimeMs)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.White
                    )
                    Slider(
                        value = if (uiState.duration > 0) {
                            uiState.startTimeMs.toFloat() / uiState.duration
                        } else 0f,
                        onValueChange = { value ->
                            viewModel.onSetStartTime((value * uiState.duration).toLong())
                        },
                        colors = SliderDefaults.colors(
                            thumbColor = MaterialTheme.colorScheme.primary,
                            activeTrackColor = MaterialTheme.colorScheme.primary
                        )
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    // End time slider
                    Text(
                        text = "结束: ${formatDuration(uiState.endTimeMs)}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.White
                    )
                    Slider(
                        value = if (uiState.duration > 0) {
                            uiState.endTimeMs.toFloat() / uiState.duration
                        } else 1f,
                        onValueChange = { value ->
                            viewModel.onSetEndTime((value * uiState.duration).toLong())
                        },
                        colors = SliderDefaults.colors(
                            thumbColor = MaterialTheme.colorScheme.secondary,
                            activeTrackColor = MaterialTheme.colorScheme.secondary
                        )
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        IconButton(
                            onClick = { viewModel.onTogglePlayPause() },
                            modifier = Modifier
                                .size(48.dp)
                                .background(
                                    MaterialTheme.colorScheme.primary,
                                    RoundedCornerShape(24.dp)
                                )
                        ) {
                            Icon(
                                imageVector = if (uiState.isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                                contentDescription = "Play/Pause",
                                tint = Color.White
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Button(
                        onClick = { viewModel.setWallpaper(videoUri) },
                        enabled = !uiState.isSettingWallpaper,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.primary
                        ),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        if (uiState.isSettingWallpaper) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(24.dp),
                                color = Color.White
                            )
                        } else {
                            Icon(
                                imageVector = Icons.Default.Check,
                                contentDescription = null
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "设为壁纸",
                                style = MaterialTheme.typography.titleMedium
                            )
                        }
                    }
                }
            }
        }
    }
}

private fun formatDuration(durationMs: Long): String {
    if (durationMs <= 0) return "0:00"
    val seconds = durationMs / 1000
    val minutes = seconds / 60
    val hours = minutes / 60
    return if (hours > 0) {
        String.format("%d:%02d:%02d", hours, minutes % 60, seconds % 60)
    } else {
        String.format("%d:%02d", minutes, seconds % 60)
    }
}
