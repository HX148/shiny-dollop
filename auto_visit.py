import requests

# 👇 替换成你的 GitHub Pages 网站地址
TARGET_URL = "https://HX148.github.io/shiny-dollop"

def main():
    try:
        # 发送 GET 请求访问网站
        response = requests.get(https://sgvny9ot.jsjform.com/graphql/f/j8Uiri, timeout=10)
        if response.status_code == 200:
            print(f"✅ 成功访问网站，状态码：{response.status_code}")
        else:
            print(f"⚠️  访问失败，状态码：{response.status_code}")
    except Exception as e:
        print(f"❌ 访问出错：{str(e)}")

if __name__ == "__main__":
    main()
