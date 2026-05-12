using UnityEngine;
using UnityEngine.Video;

/// <summary>
/// 视频播放器控制器
/// 负责视频的加载、播放、暂停、控制等功能
/// </summary>
public class VideoPlayerController : MonoBehaviour
{
    [Header("视频源")]
    [Tooltip("视频播放组件")]
    public VideoPlayer videoPlayer;

    [Tooltip("渲染纹理")]
    public RenderTexture renderTexture;

    [Tooltip("视频材质")]
    public Material videoMaterial;

    [Header("播放控制")]
    [Tooltip("是否自动播放")]
    public bool autoPlay = true;

    [Tooltip("是否循环播放")]
    public bool loop = true;

    [Tooltip("播放速度")]
    [Range(0.5f, 2.0f)]
    public float playbackSpeed = 1.0f;

    [Header("回调事件")]
    public UnityEngine.Events.UnityEvent onVideoStarted;
    public UnityEngine.Events.UnityEvent onVideoEnded;
    public UnityEngine.Events.UnityEvent onVideoError;

    private bool _isPlaying = false;
    private string _currentVideoPath = "";

    /// <summary>
    /// 当前是否正在播放
    /// </summary>
    public bool IsPlaying
    {
        get { return _isPlaying; }
    }

    /// <summary>
    /// 当前视频路径
    /// </summary>
    public string CurrentVideoPath
    {
        get { return _currentVideoPath; }
    }

    void Awake()
    {
        InitializeVideoPlayer();
    }

    void Start()
    {
        if (autoPlay && !string.IsNullOrEmpty(_currentVideoPath))
        {
            Play();
        }
    }

    void Update()
    {
        // 同步播放状态
        if (videoPlayer != null)
        {
            _isPlaying = videoPlayer.isPlaying;
        }
    }

    /// <summary>
    /// 初始化视频播放器
    /// </summary>
    private void InitializeVideoPlayer()
    {
        if (videoPlayer == null)
        {
            videoPlayer = gameObject.AddComponent<VideoPlayer>();
        }

        // 配置视频播放器
        videoPlayer.playOnAwake = false;
        videoPlayer.waitForFirstFrame = true;
        videoPlayer.loopPointReached += OnVideoEnded;
        videoPlayer.errorReceived += OnVideoErrorOccurred;

        // 设置渲染目标
        if (renderTexture != null)
        {
            videoPlayer.targetTexture = renderTexture;
        }

        // 应用播放速度
        videoPlayer.playbackSpeed = playbackSpeed;
    }

    /// <summary>
    /// 加载视频
    /// </summary>
    /// <param name="videoPath">视频路径（可以是URL或本地路径）</param>
    public void LoadVideo(string videoPath)
    {
        if (string.IsNullOrEmpty(videoPath))
        {
            Debug.LogError("视频路径不能为空");
            return;
        }

        _currentVideoPath = videoPath;

        // 根据路径类型设置视频源
        if (videoPath.StartsWith("http://") || videoPath.StartsWith("https://"))
        {
            // 网络视频
            videoPlayer.source = VideoSource.Url;
            videoPlayer.url = videoPath;
        }
        else
        {
            // 本地视频
            videoPlayer.source = VideoSource.VideoClip;
            StartCoroutine(LoadLocalVideo(videoPath));
        }

        Debug.Log($"视频已加载: {videoPath}");
    }

    /// <summary>
    /// 加载本地视频
    /// </summary>
    private System.Collections.IEnumerator LoadLocalVideo(string path)
    {
        // 从StreamingAssets加载
        string fullPath = path;
        if (!path.Contains("://"))
        {
            fullPath = System.IO.Path.Combine(Application.streamingAssetsPath, path);
        }

        using (UnityEngine.Networking.UnityWebRequest request = UnityEngine.Networking.UnityWebRequest.Get(fullPath))
        {
            yield return request.SendWebRequest();

            if (request.result == UnityEngine.Networking.UploadHandlerRaw._result)
            {
                Debug.LogError($"加载视频失败: {request.error}");
                onVideoError?.Invoke();
            }
        }

        // 尝试直接加载VideoClip
        try
        {
            UnityEngine.Video.VideoClip videoClip = Resources.Load<UnityEngine.Video.VideoClip>(System.IO.Path.GetFileNameWithoutExtension(path));
            if (videoClip != null)
            {
                videoPlayer.source = VideoSource.VideoClip;
                videoPlayer.clip = videoClip;
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"加载VideoClip失败: {e.Message}");
        }
    }

    /// <summary>
    /// 播放视频
    /// </summary>
    public void Play()
    {
        if (videoPlayer != null && !string.IsNullOrEmpty(_currentVideoPath))
        {
            videoPlayer.Play();
            _isPlaying = true;
            onVideoStarted?.Invoke();
            Debug.Log("视频开始播放");
        }
        else
        {
            Debug.LogWarning("无法播放：视频未加载");
        }
    }

    /// <summary>
    /// 暂停视频
    /// </summary>
    public void Pause()
    {
        if (videoPlayer != null)
        {
            videoPlayer.Pause();
            _isPlaying = false;
            Debug.Log("视频已暂停");
        }
    }

    /// <summary>
    /// 停止视频
    /// </summary>
    public void Stop()
    {
        if (videoPlayer != null)
        {
            videoPlayer.Stop();
            _isPlaying = false;
            Debug.Log("视频已停止");
        }
    }

    /// <summary>
    /// 切换播放/暂停
    /// </summary>
    public void TogglePlayPause()
    {
        if (_isPlaying)
        {
            Pause();
        }
        else
        {
            Play();
        }
    }

    /// <summary>
    /// 设置播放速度
    /// </summary>
    public void SetPlaybackSpeed(float speed)
    {
        playbackSpeed = Mathf.Clamp(speed, 0.5f, 2.0f);
        if (videoPlayer != null)
        {
            videoPlayer.playbackSpeed = playbackSpeed;
        }
        Debug.Log($"播放速度设置为: {playbackSpeed}x");
    }

    /// <summary>
    /// 设置循环播放
    /// </summary>
    public void SetLoop(bool loopEnabled)
    {
        loop = loopEnabled;
        if (videoPlayer != null)
        {
            videoPlayer.isLooping = loopEnabled;
        }
        Debug.Log($"循环播放: {loopEnabled}");
    }

    /// <summary>
    /// 设置静音
    /// </summary>
    public void SetMuted(bool muted)
    {
        if (videoPlayer != null)
        {
            videoPlayer.SetDirectAudioMute(0, muted);
        }
        Debug.Log($"静音: {muted}");
    }

    /// <summary>
    /// 跳转到指定时间
    /// </summary>
    /// <param name="time">目标时间（秒）</param>
    public void SeekTo(float time)
    {
        if (videoPlayer != null)
        {
            videoPlayer.time = time;
            Debug.Log($"跳转到: {time}秒");
        }
    }

    /// <summary>
    /// 获取当前播放时间
    /// </summary>
    public double GetCurrentTime()
    {
        return videoPlayer != null ? videoPlayer.time : 0;
    }

    /// <summary>
    /// 获取视频总时长
    /// </summary>
    public double GetDuration()
    {
        return videoPlayer != null ? videoPlayer.length : 0;
    }

    /// <summary>
    /// 视频结束回调
    /// </summary>
    private void OnVideoEnded(VideoPlayer vp)
    {
        Debug.Log("视频播放结束");
        onVideoEnded?.Invoke();
    }

    /// <summary>
    /// 视频错误回调
    /// </summary>
    private void OnVideoErrorOccurred(VideoPlayer vp, string message)
    {
        Debug.LogError($"视频播放错误: {message}");
        onVideoError?.Invoke();
    }

    void OnDestroy()
    {
        if (videoPlayer != null)
        {
            videoPlayer.loopPointReached -= OnVideoEnded;
            videoPlayer.errorReceived -= OnVideoErrorOccurred;
        }
    }
}
