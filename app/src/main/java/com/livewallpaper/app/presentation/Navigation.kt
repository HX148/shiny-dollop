package com.livewallpaper.app.presentation

sealed class Screen(val route: String) {
    data object Home : Screen("home")
    data object Preview : Screen("preview/{videoId}") {
        fun createRoute(videoId: Long) = "preview/$videoId"
    }
    data object Edit : Screen("edit/{videoId}") {
        fun createRoute(videoId: Long) = "edit/$videoId"
    }
}
