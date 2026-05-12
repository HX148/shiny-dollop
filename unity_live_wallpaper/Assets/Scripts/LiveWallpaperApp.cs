using UnityEngine;

/// <summary>
/// 动态壁纸应用入口类
/// 负责初始化视频播放器、管理场景切换和壁纸设置
/// </summary>
public class LiveWallpaperApp : MonoBehaviour
{
    [Header("视频设置")]
    [Tooltip("视频播放速度")]
    [Range(0.5f, 2.0f)]
    public float playbackSpeed = 1.0f;

    [Tooltip("是否循环播放")]
    public bool loopPlayback = true;

    [Tooltip("是否静音")]
    public bool isMuted = false;

    [Header("组件引用")]
    public VideoPlayerController videoController;
    public WallpaperSettings wallpaperSettings;

    private static LiveWallpaperApp _instance;
    public static LiveWallpaperApp Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<LiveWallpaperApp>();
            }
            return _instance;
        }
    }

    void Awake()
    {
        // 单例模式，确保全局只有一个实例
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        _instance = this;
        DontDestroyOnLoad(gameObject);
    }

    void Start()
    {
        // 初始化应用设置
        InitializeApp();
    }

    /// <summary>
    /// 初始化应用
    /// </summary>
    private void InitializeApp()
    {
        Debug.Log("动态壁纸应用启动...");

        // 加载保存的设置
        LoadSettings();

        // 初始化视频控制器
        if (videoController != null)
        {
            videoController.SetPlaybackSpeed(playbackSpeed);
            videoController.SetLoop(loopPlayback);
            videoController.SetMuted(isMuted);
        }

        Debug.Log("动态壁纸应用初始化完成");
    }

    /// <summary>
    /// 设置壁纸视频
    /// </summary>
    /// <param name="videoPath">视频文件路径</param>
    public void SetWallpaperVideo(string videoPath)
    {
        if (videoController != null)
        {
            videoController.LoadVideo(videoPath);
            videoController.Play();
        }

        // 保存设置
        PlayerPrefs.SetString("WallpaperVideoPath", videoPath);
        PlayerPrefs.Save();
    }

    /// <summary>
    /// 设置播放速度
    /// </summary>
    public void SetPlaybackSpeed(float speed)
    {
        playbackSpeed = Mathf.Clamp(speed, 0.5f, 2.0f);
        if (videoController != null)
        {
            videoController.SetPlaybackSpeed(playbackSpeed);
        }
        PlayerPrefs.SetFloat("PlaybackSpeed", playbackSpeed);
    }

    /// <summary>
    /// 设置循环播放
    /// </summary>
    public void SetLoop(bool loop)
    {
        loopPlayback = loop;
        if (videoController != null)
        {
            videoController.SetLoop(loopPlayback);
        }
        PlayerPrefs.SetInt("LoopPlayback", loop ? 1 : 0);
    }

    /// <summary>
    /// 设置静音
    /// </summary>
    public void SetMuted(bool muted)
    {
        isMuted = muted;
        if (videoController != null)
        {
            videoController.SetMuted(isMuted);
        }
        PlayerPrefs.SetInt("IsMuted", muted ? 1 : 0);
    }

    /// <summary>
    /// 加载保存的设置
    /// </summary>
    private void LoadSettings()
    {
        if (PlayerPrefs.HasKey("PlaybackSpeed"))
        {
            playbackSpeed = PlayerPrefs.GetFloat("PlaybackSpeed");
        }

        if (PlayerPrefs.HasKey("LoopPlayback"))
        {
            loopPlayback = PlayerPrefs.GetInt("LoopPlayback") == 1;
        }

        if (PlayerPrefs.HasKey("IsMuted"))
        {
            isMuted = PlayerPrefs.GetInt("IsMuted") == 1;
        }
    }

    /// <summary>
    /// 退出应用
    /// </summary>
    public void QuitApp()
    {
        Debug.Log("退出动态壁纸应用");
        Application.Quit();

#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#endif
    }

    void OnDestroy()
    {
        if (_instance == this)
        {
            _instance = null;
        }
    }
}
