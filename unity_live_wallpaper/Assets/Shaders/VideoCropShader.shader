Shader "Custom/VideoCropShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _CropX ("Crop X", Range(0, 1)) = 0
        _CropY ("Crop Y", Range(0, 1)) = 0
        _CropWidth ("Crop Width", Range(0.01, 1)) = 1
        _CropHeight ("Crop Height", Range(0.01, 1)) = 1
        _Brightness ("Brightness", Range(0, 2)) = 1
        _Saturation ("Saturation", Range(0, 2)) = 1
        _Contrast ("Contrast", Range(0, 2)) = 1
    }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };
            
            sampler2D _MainTex;
            float _CropX;
            float _CropY;
            float _CropWidth;
            float _CropHeight;
            float _Brightness;
            float _Saturation;
            float _Contrast;
            
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                // 计算裁剪后的UV
                float2 uv = i.uv;
                uv.x = uv.x * _CropWidth + _CropX;
                uv.y = uv.y * _CropHeight + _CropY;
                
                // 检查是否在裁剪范围内
                if (uv.x < 0 || uv.x > 1 || uv.y < 0 || uv.y > 1)
                {
                    return fixed4(0, 0, 0, 1);
                }
                
                // 采样纹理
                fixed4 col = tex2D(_MainTex, uv);
                
                // 调整亮度
                col.rgb *= _Brightness;
                
                // 调整饱和度
                float gray = dot(col.rgb, float3(0.299, 0.587, 0.114));
                col.rgb = lerp(float3(gray, gray, gray), col.rgb, _Saturation);
                
                // 调整对比度
                col.rgb = ((col.rgb - 0.5f) * _Contrast) + 0.5f;
                
                return col;
            }
            ENDCG
        }
    }
}
