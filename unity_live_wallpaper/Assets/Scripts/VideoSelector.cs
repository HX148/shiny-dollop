using UnityEngine;

/// <summary>
/// 视频选择管理器
/// 负责浏览本地视频、显示视频列表、管理视频选择
/// </summary>
public class VideoSelector : MonoBehaviour
{
    [Header("设置")]
    [Tooltip("支持的视频文件扩展名")]
    public string[] supportedExtensions = new string[] { ".mp4", ".avi", ".mov", ".mkv", ".webm" };

    [Tooltip("搜索子文件夹")]
    public bool searchSubfolders = true;

    [Tooltip("最大显示数量")]
    public int maxDisplayCount = 50;

    [Header("视频信息")]
    [Tooltip("当前已发现的视频列表")]
    public VideoInfo[] discoveredVideos;

    [System.Serializable]
    public class VideoInfo
    {
        public string name;
        public string path;
        public long fileSize;
        public float duration;
        public string thumbnailPath;

        public string FileSizeFormatted
        {
            get
            {
                if (fileSize < 1024)
                    return $"{fileSize} B";
                else if (fileSize < 1024 * 1024)
                    return $"{fileSize / 1024.0f:F1} KB";
                else if (fileSize < 1024 * 1024 * 1024)
                    return $"{fileSize / (1024.0f * 1024.0f):F1} MB";
                else
                    return $"{fileSize / (1024.0f * 1024.0f * 1024.0f):F2} GB";
            }
        }

        public string DurationFormatted
        {
            get
            {
                int minutes = (int)(duration / 60);
                int seconds = (int)(duration % 60);
                return $"{minutes}:{seconds:D2}";
            }
        }
    }

    /// <summary>
    /// 扫描本地视频
    /// </summary>
    public void ScanLocalVideos()
    {
#if UNITY_ANDROID || UNITY_IOS
        ScanMobileVideos();
#elif UNITY_STANDALONE || UNITY_EDITOR
        ScanDesktopVideos();
#endif
    }

    /// <summary>
    /// 扫描桌面端视频
    /// </summary>
    private void ScanDesktopVideos()
    {
        StartCoroutine(ScanVideosCoroutine());
    }

    /// <summary>
    /// 扫描移动端视频
    /// </summary>
    private void ScanMobileVideos()
    {
        // 在移动平台上，通常通过原生代码选择视频
        Debug.Log("移动端视频扫描需要使用原生文件选择器");
    }

    /// <summary>
    /// 协程：扫描视频
    /// </summary>
    private System.Collections.IEnumerator ScanVideosCoroutine()
    {
        System.Collections.Generic.List<VideoInfo> videos = new System.Collections.Generic.List<VideoInfo>();

        // Unity 默认不提供直接访问文件系统
        // 这里演示如何组织视频信息，实际需要配合原生插件或文件选择器
        string[] searchPaths = new string[]
        {
            Application.streamingAssetsPath,
            Application.persistentDataPath + "/Videos"
        };

        foreach (string searchPath in searchPaths)
        {
            if (System.IO.Directory.Exists(searchPath))
            {
                System.IO.SearchOption option = searchSubfolders ? 
                    System.IO.SearchOption.AllDirectories : 
                    System.IO.SearchOption.TopDirectoryOnly;

                foreach (string extension in supportedExtensions)
                {
                    string[] files = System.IO.Directory.GetFiles(searchPath, "*" + extension, option);
                    
                    foreach (string file in files)
                    {
                        if (videos.Count >= maxDisplayCount)
                            break;

                        System.IO.FileInfo fileInfo = new System.IO.FileInfo(file);
                        VideoInfo info = new VideoInfo
                        {
                            name = fileInfo.Name,
                            path = fileInfo.FullName,
                            fileSize = fileInfo.Length
                        };
                        videos.Add(info);

                        // 每帧处理一个文件，避免卡顿
                        yield return null;
                    }

                    if (videos.Count >= maxDisplayCount)
                        break;
                }
            }
        }

        discoveredVideos = videos.ToArray();
        Debug.Log($"发现 {discoveredVideos.Length} 个视频文件");
    }

    /// <summary>
    /// 按名称搜索视频
    /// </summary>
    public VideoInfo[] SearchVideos(string keyword)
    {
        if (string.IsNullOrEmpty(keyword))
            return discoveredVideos;

        System.Collections.Generic.List<VideoInfo> results = new System.Collections.Generic.List<VideoInfo>();
        keyword = keyword.ToLower();

        foreach (VideoInfo video in discoveredVideos)
        {
            if (video.name.ToLower().Contains(keyword))
            {
                results.Add(video);
            }
        }

        return results.ToArray();
    }

    /// <summary>
    /// 按文件大小排序
    /// </summary>
    public VideoInfo[] SortBySize(bool descending = true)
    {
        if (discoveredVideos == null || discoveredVideos.Length == 0)
            return new VideoInfo[0];

        VideoInfo[] sorted = new VideoInfo[discoveredVideos.Length];
        discoveredVideos.CopyTo(sorted, 0);

        if (descending)
        {
            System.Array.Sort(sorted, (a, b) => b.fileSize.CompareTo(a.fileSize));
        }
        else
        {
            System.Array.Sort(sorted, (a, b) => a.fileSize.CompareTo(b.fileSize));
        }

        return sorted;
    }

    /// <summary>
    /// 按时长排序
    /// </summary>
    public VideoInfo[] SortByDuration(bool descending = true)
    {
        if (discoveredVideos == null || discoveredVideos.Length == 0)
            return new VideoInfo[0];

        VideoInfo[] sorted = new VideoInfo[discoveredVideos.Length];
        discoveredVideos.CopyTo(sorted, 0);

        if (descending)
        {
            System.Array.Sort(sorted, (a, b) => b.duration.CompareTo(a.duration));
        }
        else
        {
            System.Array.Sort(sorted, (a, b) => a.duration.CompareTo(b.duration));
        }

        return sorted;
    }

    /// <summary>
    /// 获取最近使用的视频
    /// </summary>
    public VideoInfo GetRecentVideo()
    {
        if (PlayerPrefs.HasKey("RecentVideoPath"))
        {
            string recentPath = PlayerPrefs.GetString("RecentVideoPath");
            foreach (VideoInfo video in discoveredVideos)
            {
                if (video.path == recentPath)
                {
                    return video;
                }
            }
        }
        return null;
    }

    /// <summary>
    /// 保存最近使用的视频
    /// </summary>
    public void SaveRecentVideo(string videoPath)
    {
        PlayerPrefs.SetString("RecentVideoPath", videoPath);
        PlayerPrefs.Save();
    }

    /// <summary>
    /// 清除视频缓存
    /// </summary>
    public void ClearCache()
    {
        discoveredVideos = new VideoInfo[0];
        Debug.Log("视频缓存已清除");
    }
}
