import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import os
from dateutil import parser

# 配置项
BASE_URL = "https://36kr.com/tech"
TIME_DELTA = 24
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://36kr.com/",
    "Accept-Language": "zh-CN,zh;q=0.9"
}

def get_tech_news():
    try:
        resp = requests.get(BASE_URL, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        news_items = soup.select(".article-item-card")
        if not news_items:
            return ["未抓取到任何科技资讯，可能页面结构更新"]
        
        time_threshold = datetime.now() - timedelta(hours=TIME_DELTA)
        valid_news = []
        
        for item in news_items:
            title_elem = item.select_one(".article-item-title a")
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            link = title_elem.get("href")
            if not link.startswith("http"):
                link = f"https://36kr.com{link}"
            
            time_elem = item.select_one(".article-item-time")
            if not time_elem:
                continue
            time_str = time_elem.get_text(strip=True)
            try:
                news_time = parser.parse(time_str)
            except:
                continue
            
            if news_time >= time_threshold:
                valid_news.append(f"**{title}**\n{link}\n")
        
        if not valid_news:
            return ["过去24小时暂无新的科技资讯"]
        return valid_news
    
    except Exception as e:
        return [f"资讯抓取失败：{str(e)}"]

def push_to_wechat(news_list):
    sendkey = os.getenv("SERVERCHAN_SENDKEY")
    if not sendkey:
        raise Exception("未配置SERVERCHAN_SENDKEY环境变量")
    
    title = f"每日科技资讯 | {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    desp = "\n".join(news_list)
    api_url = f"https://sctapi.ftqq.com/{sendkey}.send"
    
    try:
        resp = requests.post(
            api_url,
            data={"title": title, "desp": desp},
            timeout=10
        )
        resp.raise_for_status()
        result = resp.json()
        if result.get("code") == 0:
            print("微信推送成功！")
        else:
            raise Exception(f"推送失败：{result.get('msg')}")
    except Exception as e:
        raise Exception(f"Server酱API调用失败：{str(e)}")

if __name__ == "__main__":
    print("开始抓取科技资讯...")
    news = get_tech_news()
    print(f"抓取到{len(news)}条有效资讯，开始推送微信...")
    push_to_wechat(news)
    print("任务执行完成！")
