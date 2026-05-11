package com.livewallpaper.app.presentation

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import com.livewallpaper.app.presentation.theme.LiveWallpaperTheme
import kotlinx.coroutines.delay

@UnstableApi
class VideoPreviewActivity : ComponentActivity() {
    
    private var exoPlayer: ExoPlayer? = null
    private var videoUri: Uri? = null
    private var startTimeMs: Long = 0
    private var endTimeMs: Long = 0
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        
        videoUri = intent.getParcelableExtra(EXTRA_VIDEO_URI)
        startTimeMs = intent.getLongExtra(EXTRA_START_TIME, 0)
        endTimeMs = intent.getLongExtra(EXTRA_END_TIME, 0)
        
        setContent {
            LiveWallpaperTheme {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.Black),
                    contentAlignment = Alignment.Center
                ) {
                    VideoPlayerContent(
                        videoUri = videoUri,
                        startTimeMs = startTimeMs,
                        endTimeMs = endTimeMs
                    )
                }
            }
        }
    }
    
    @UnstableApi
    @Composable
    private fun VideoPlayerContent(
        videoUri: Uri?,
        startTimeMs: Long,
        endTimeMs: Long
    ) {
        val context = LocalContext.current
        var isPlaying by remember { mutableStateOf(true) }
        
        val player = remember {
            ExoPlayer.Builder(context).build().apply {
                videoUri?.let { uri ->
                    setMediaItem(MediaItem.fromUri(uri))
                    prepare()
                    seekTo(startTimeMs)
                    playWhenReady = true
                    repeatMode = Player.REPEAT_MODE_ONE
                }
            }
        }
        
        LaunchedEffect(player) {
            while (true) {
                delay(500)
                if (player.currentPosition >= endTimeMs && endTimeMs > 0) {
                    player.seekTo(startTimeMs)
                }
            }
        }
        
        DisposableEffect(Unit) {
            onDispose {
                player.release()
            }
        }
        
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    this.player = player
                    useController = false
                }
            },
            modifier = Modifier.fillMaxSize()
        )
    }
    
    override fun onDestroy() {
        super.onDestroy()
        exoPlayer?.release()
    }
    
    companion object {
        const val EXTRA_VIDEO_URI = "extra_video_uri"
        const val EXTRA_START_TIME = "extra_start_time"
        const val EXTRA_END_TIME = "extra_end_time"
    }
}
