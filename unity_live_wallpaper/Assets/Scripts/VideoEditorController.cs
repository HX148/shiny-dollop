using UnityEngine;

/// <summary>
/// 视频编辑控制器
/// 负责视频的预览、裁剪区域选择、时间范围设置
/// </summary>
public class VideoEditorController : MonoBehaviour
{
    [Header("组件引用")]
    public VideoPlayerController videoController;

    [Header("编辑参数")]
    [Range(0f, 1f)]
    public float startPosition = 0f;
    
    [Range(0f, 1f)]
    public float endPosition = 1f;

    [Tooltip("裁剪区域：X")]
    [Range(0f, 1f)]
    public float cropX = 0f;

    [Tooltip("裁剪区域：Y")]
    [Range(0f, 1f)]
    public float cropY = 0f;

    [Tooltip("裁剪区域：宽度")]
    [Range(0.1f, 1f)]
    public float cropWidth = 1f;

    [Tooltip("裁剪区域：高度")]
    [Range(0.1f, 1f)]
    public float cropHeight = 1f;

    [Header("预览设置")]
    public Material cropMaterial;
    private Material _instanceCropMaterial;

    void Start()
    {
        if (cropMaterial != null)
        {
            _instanceCropMaterial = new Material(cropMaterial);
        }
    }

    /// <summary>
    /// 设置播放时间范围
    /// </summary>
    public void SetTimeRange(float start, float end)
    {
        startPosition = Mathf.Clamp01(start);
        endPosition = Mathf.Clamp01(end);

        if (startPosition >= endPosition)
        {
            endPosition = Mathf.Clamp01(startPosition + 0.01f);
        }

        Debug.Log($"时间范围设置: {startPosition * 100:F1}% - {endPosition * 100:F1}%");
    }

    /// <summary>
    /// 设置裁剪区域
    /// </summary>
    public void SetCropRegion(float x, float y, float width, float height)
    {
        cropX = Mathf.Clamp01(x);
        cropY = Mathf.Clamp01(y);
        cropWidth = Mathf.Clamp(0.1f, 1f, width);
        cropHeight = Mathf.Clamp(0.1f, 1f, height);

        UpdateCropMaterial();

        Debug.Log($"裁剪区域: X={cropX:F2}, Y={cropY:F2}, W={cropWidth:F2}, H={cropHeight:F2}");
    }

    /// <summary>
    /// 重置为全屏
    /// </summary>
    public void ResetToFullscreen()
    {
        cropX = 0f;
        cropY = 0f;
        cropWidth = 1f;
        cropHeight = 1f;
        UpdateCropMaterial();
    }

    /// <summary>
    /// 应用设置到视频
    /// </summary>
    public void ApplyToVideo()
    {
        if (videoController != null)
        {
            double duration = videoController.GetDuration();
            double startTime = startPosition * duration;
            double endTime = endPosition * duration;

            videoController.SeekTo((float)startTime);
            videoController.SetLoop(true);

            Debug.Log($"应用设置: 开始时间={startTime:F2}s, 结束时间={endTime:F2}s");
        }
    }

    /// <summary>
    /// 获取当前设置的JSON
    /// </summary>
    public string GetSettingsJson()
    {
        EditorSettings settings = new EditorSettings
        {
            startPosition = startPosition,
            endPosition = endPosition,
            cropX = cropX,
            cropY = cropY,
            cropWidth = cropWidth,
            cropHeight = cropHeight
        };
        return JsonUtility.ToJson(settings);
    }

    /// <summary>
    /// 从JSON加载设置
    /// </summary>
    public void LoadFromJson(string json)
    {
        try
        {
            EditorSettings settings = JsonUtility.FromJson<EditorSettings>(json);
            startPosition = settings.startPosition;
            endPosition = settings.endPosition;
            cropX = settings.cropX;
            cropY = settings.cropY;
            cropWidth = settings.cropWidth;
            cropHeight = settings.cropHeight;
            UpdateCropMaterial();
            Debug.Log("编辑设置已加载");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"加载编辑设置失败: {e.Message}");
        }
    }

    /// <summary>
    /// 更新裁剪材质
    /// </summary>
    private void UpdateCropMaterial()
    {
        if (_instanceCropMaterial != null)
        {
            _instanceCropMaterial.SetFloat("_CropX", cropX);
            _instanceCropMaterial.SetFloat("_CropY", cropY);
            _instanceCropMaterial.SetFloat("_CropWidth", cropWidth);
            _instanceCropMaterial.SetFloat("_CropHeight", cropHeight);
        }
    }

    /// <summary>
    /// 获取材质（用于Renderer）
    /// </summary>
    public Material GetCropMaterial()
    {
        return _instanceCropMaterial;
    }

    [System.Serializable]
    private class EditorSettings
    {
        public float startPosition;
        public float endPosition;
        public float cropX;
        public float cropY;
        public float cropWidth;
        public float cropHeight;
    }

    void OnDestroy()
    {
        if (_instanceCropMaterial != null)
        {
            Destroy(_instanceCropMaterial);
        }
    }
}
