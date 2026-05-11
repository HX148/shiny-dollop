package com.livewallpaper.app.presentation

import android.net.Uri
import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.livewallpaper.app.presentation.screens.edit.EditScreen
import com.livewallpaper.app.presentation.screens.home.HomeScreen
import com.livewallpaper.app.presentation.screens.preview.PreviewScreen

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Preview : Screen("preview/{videoUri}") {
        fun createRoute(videoUri: String) = "preview/${java.net.URLEncoder.encode(videoUri, "UTF-8")}"
    }
    object Edit : Screen("edit/{videoUri}") {
        fun createRoute(videoUri: String) = "edit/${java.net.URLEncoder.encode(videoUri, "UTF-8")}"
    }
}

@Composable
fun MainNavigation(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route,
        enterTransition = {
            slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Start,
                animationSpec = tween(300)
            ) + fadeIn(animationSpec = tween(300))
        },
        exitTransition = {
            slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Start,
                animationSpec = tween(300)
            ) + fadeOut(animationSpec = tween(300))
        },
        popEnterTransition = {
            slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.End,
                animationSpec = tween(300)
            ) + fadeIn(animationSpec = tween(300))
        },
        popExitTransition = {
            slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.End,
                animationSpec = tween(300)
            ) + fadeOut(animationSpec = tween(300))
        }
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigateToPreview = { uri ->
                    navController.navigate(Screen.Preview.createRoute(uri.toString()))
                }
            )
        }
        
        composable(
            route = Screen.Preview.route,
            arguments = listOf(
                navArgument("videoUri") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val videoUri = java.net.URLDecoder.decode(
                backStackEntry.arguments?.getString("videoUri") ?: "",
                "UTF-8"
            )
            PreviewScreen(
                videoUri = Uri.parse(videoUri),
                onNavigateBack = { navController.popBackStack() },
                onNavigateToEdit = { uri ->
                    navController.navigate(Screen.Edit.createRoute(uri.toString()))
                }
            )
        }
        
        composable(
            route = Screen.Edit.route,
            arguments = listOf(
                navArgument("videoUri") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val videoUri = java.net.URLDecoder.decode(
                backStackEntry.arguments?.getString("videoUri") ?: "",
                "UTF-8"
            )
            EditScreen(
                videoUri = Uri.parse(videoUri),
                onNavigateBack = { navController.popBackStack() },
                onWallpaperSet = {
                    navController.popBackStack(Screen.Home.route, inclusive = false)
                }
            )
        }
    }
}
