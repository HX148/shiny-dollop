package com.livewallpaper.app.presentation.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun RangeSlider(
    minValue: Long,
    maxValue: Long,
    currentStart: Long,
    currentEnd: Long,
    onRangeChanged: (start: Long, end: Long) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = formatDuration(currentStart),
            style = MaterialTheme.typography.bodySmall,
            color = Color.White
        )

        Box(
            modifier = Modifier
                .weight(1f)
                .height(48.dp),
            contentAlignment = Alignment.Center
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(Color.White.copy(alpha = 0.3f))
            )
            
            Slider(
                value = currentStart.toFloat(),
                onValueChange = { 
                    val newStart = it.toLong().coerceIn(minValue, currentEnd - 1000)
                    onRangeChanged(newStart, currentEnd)
                },
                valueRange = minValue.toFloat()..maxValue.toFloat(),
                onValueChangeFinished = {},
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.primary,
                    activeTrackColor = MaterialTheme.colorScheme.primary,
                    inactiveTrackColor = Color.Transparent
                )
            )

            Slider(
                value = currentEnd.toFloat(),
                onValueChange = { 
                    val newEnd = it.toLong().coerceIn(currentStart + 1000, maxValue)
                    onRangeChanged(currentStart, newEnd)
                },
                valueRange = minValue.toFloat()..maxValue.toFloat(),
                onValueChangeFinished = {},
                colors = SliderDefaults.colors(
                    thumbColor = MaterialTheme.colorScheme.secondary,
                    activeTrackColor = MaterialTheme.colorScheme.secondary,
                    inactiveTrackColor = Color.Transparent
                )
            )
        }

        Text(
            text = formatDuration(currentEnd),
            style = MaterialTheme.typography.bodySmall,
            color = Color.White
        )
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
