using UnityEngine;

/// <summary>
/// 动态壁纸设置管理器
/// 负责保存和加载壁纸配置，处理壁纸切换
/// </summary>
public class WallpaperSettings : MonoBehaviour
{
    [System.Serializable]
    public class WallpaperConfig
    {
        public string videoPath;
        public float playbackSpeed = 1.0f;
        public bool loop = true;
        public bool isMuted = false;
        public float startTime = 0f;
        public float endTime = 0f;
        public Vector2Int resolution = new Vector2Int(1920, 1080);
        public float brightness = 1.0f;
        public float saturation = 1.0f;
    }

    [Header("配置")]
    [Tooltip("当前壁纸配置")]
    public WallpaperConfig currentConfig = new WallpaperConfig();

    [Header("预设壁纸")]
    [Tooltip("保存的壁纸预设列表")]
    public WallpaperConfig[] savedWallpapers = new WallpaperConfig[0];

    private const string SAVE_KEY = "WallpaperConfigs";
    private const int MAX_SAVED_WALLPAPERS = 20;

    /// <summary>
    /// 保存当前壁纸配置
    /// </summary>
    public void SaveCurrentWallpaper()
    {
        string json = JsonUtility.ToJson(currentConfig);
        PlayerPrefs.SetString("CurrentWallpaper", json);
        PlayerPrefs.Save();
        Debug.Log("当前壁纸配置已保存");
    }

    /// <summary>
    /// 加载壁纸配置
    /// </summary>
    public void LoadWallpaper()
    {
        if (PlayerPrefs.HasKey("CurrentWallpaper"))
        {
            string json = PlayerPrefs.GetString("CurrentWallpaper");
            currentConfig = JsonUtility.FromJson<WallpaperConfig>(json);
            Debug.Log("壁纸配置已加载");
        }
    }

    /// <summary>
    /// 导出壁纸配置为JSON
    /// </summary>
    public string ExportConfigToJson()
    {
        return JsonUtility.ToJson(currentConfig, true);
    }

    /// <summary>
    /// 从JSON导入配置
    /// </summary>
    public void ImportConfigFromJson(string json)
    {
        try
        {
            currentConfig = JsonUtility.FromJson<WallpaperConfig>(json);
            Debug.Log("配置导入成功");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"配置导入失败: {e.Message}");
        }
    }

    /// <summary>
    /// 添加到预设
    /// </summary>
    public void AddToPresets()
    {
        if (savedWallpapers.Length >= MAX_SAVED_WALLPAPERS)
        {
            Debug.LogWarning($"已达到最大保存数量: {MAX_SAVED_WALLPAPERS}");
            return;
        }

        // 复制当前配置到新预设
        WallpaperConfig newPreset = new WallpaperConfig
        {
            videoPath = currentConfig.videoPath,
            playbackSpeed = currentConfig.playbackSpeed,
            loop = currentConfig.loop,
            isMuted = currentConfig.isMuted,
            startTime = currentConfig.startTime,
            endTime = currentConfig.endTime,
            resolution = currentConfig.resolution,
            brightness = currentConfig.brightness,
            saturation = currentConfig.saturation
        };

        // 扩展数组并添加新预设
        WallpaperConfig[] newList = new WallpaperConfig[savedWallpapers.Length + 1];
        savedWallpapers.CopyTo(newList, 0);
        newList[savedWallpapers.Length] = newPreset;
        savedWallpapers = newList;

        // 保存到PlayerPrefs
        SavePresets();
        Debug.Log($"壁纸已添加到预设，共 {savedWallpapers.Length} 个预设");
    }

    /// <summary>
    /// 从预设加载
    /// </summary>
    public void LoadFromPreset(int index)
    {
        if (index < 0 || index >= savedWallpapers.Length)
        {
            Debug.LogError($"预设索引无效: {index}");
            return;
        }

        currentConfig = savedWallpapers[index];
        Debug.Log($"已加载预设 {index}: {currentConfig.videoPath}");
    }

    /// <summary>
    /// 删除预设
    /// </summary>
    public void DeletePreset(int index)
    {
        if (index < 0 || index >= savedWallpapers.Length)
        {
            Debug.LogError($"预设索引无效: {index}");
            return;
        }

        WallpaperConfig[] newList = new WallpaperConfig[savedWallpapers.Length - 1];
        for (int i = 0, j = 0; i < savedWallpapers.Length; i++)
        {
            if (i != index)
            {
                newList[j++] = savedWallpapers[i];
            }
        }
        savedWallpapers = newList;
        SavePresets();
        Debug.Log($"已删除预设，当前剩余 {savedWallpapers.Length} 个预设");
    }

    /// <summary>
    /// 保存所有预设
    /// </summary>
    private void SavePresets()
    {
        string json = JsonUtility.ToJson(new Wrapper(savedWallpapers));
        PlayerPrefs.SetString(SAVE_KEY, json);
        PlayerPrefs.Save();
    }

    /// <summary>
    /// 加载所有预设
    /// </summary>
    public void LoadPresets()
    {
        if (PlayerPrefs.HasKey(SAVE_KEY))
        {
            string json = PlayerPrefs.GetString(SAVE_KEY);
            try
            {
                Wrapper wrapper = JsonUtility.FromJson<Wrapper>(json);
                savedWallpapers = wrapper.items;
                Debug.Log($"已加载 {savedWallpapers.Length} 个预设");
            }
            catch (System.Exception e)
            {
                Debug.LogError($"加载预设失败: {e.Message}");
            }
        }
    }

    /// <summary>
    /// 重置为默认设置
    /// </summary>
    public void ResetToDefault()
    {
        currentConfig = new WallpaperConfig();
        Debug.Log("配置已重置为默认值");
    }

    /// <summary>
    /// 清除所有保存的数据
    /// </summary>
    public void ClearAllData()
    {
        PlayerPrefs.DeleteKey("CurrentWallpaper");
        PlayerPrefs.DeleteKey(SAVE_KEY);
        savedWallpapers = new WallpaperConfig[0];
        ResetToDefault();
        Debug.Log("所有数据已清除");
    }

    void Start()
    {
        LoadPresets();
        LoadWallpaper();
    }

    /// <summary>
    /// JSON包装类（用于序列化数组）
    /// </summary>
    [System.Serializable]
    private class Wrapper
    {
        public WallpaperConfig[] items;

        public Wrapper(WallpaperConfig[] items)
        {
            this.items = items;
        }
    }
}
