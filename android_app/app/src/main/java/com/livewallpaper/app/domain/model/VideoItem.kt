package com.livewallpaper.app.domain.model

import android.net.Uri

data class VideoItem(
    val id: Long,
    val uri: Uri,
    val name: String,
    val duration: Long,
    val size: Long,
    val dateAdded: Long
) {
    val durationFormatted: String
        get() {
            val seconds = duration / 1000
            val minutes = seconds / 60
            val hours = minutes / 60
            return if (hours > 0) {
                String.format("%d:%02d:%02d", hours, minutes % 60, seconds % 60)
            } else {
                String.format("%d:%02d", minutes, seconds % 60)
            }
        }
}
