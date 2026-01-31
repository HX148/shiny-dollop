import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import os
from dateutil import parser

# 配置项
TIME_DELTA = 24  # 抓取过去24小时资讯
MAX_NEWS_PER_SOURCE = 5  # 每个来源最多取5条，避免内容过长
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.baidu.com/",
    "Accept-Language": "zh-CN,zh;q=0.9"
}

# -------------------------- 多源全品类抓取函数 --------------------------
def get_sina_news():
    """抓取新浪新闻热点资讯"""
    try:
        resp = requests.get("https://news.sina.com.cn", headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        news_items = soup.select(".news-item")
        time_threshold = datetime.now() - timedelta(hours=TIME_DELTA)
        valid_news = []
        
        for item in news_items[:MAX_NEWS_PER_SOURCE]:
            title_elem = item.select_one("h2 a")
            time_elem = item.select_one(".time")
            if not (title_elem and time_elem):
                continue
            title = title_elem.get_text(strip=True)
            link = title_elem.get("href")
            try:
                news_time = parser.parse(time_elem.get_text(strip=True))
                if news_time >= time_threshold:
                    valid_news.append(f"🔹 {title}\n{link}")
            except:
                continue
        return valid_news
    except Exception as e:
        return [f"⚠️ 新浪新闻抓取失败：{str(e)}"]

def get_163_news():
    """抓取网易新闻热点资讯"""
    try:
        resp = requests.get("https://news.163.com", headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        news_items = soup.select(".news_title a")
        valid_news = []
        
        for title_elem in news_items[:MAX_NEWS_PER_SOURCE]:
            title = title_elem.get_text(strip=True)
            link = title_elem.get("href")
            if not link.startswith("http"):
                link = f"https://news.163.com{link}"
            valid_news.append(f"🔹 {title}\n{link}")
        return valid_news
    except Exception as e:
        return [f"⚠️ 网易新闻抓取失败：{str(e)}"]

def get_tencent_news():
    """抓取腾讯新闻热点资讯"""
    try:
        resp = requests.get("https://news.qq.com", headers=HEADERS, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        news_items = soup.select(".linkto")
        valid_news = []
        
        for title_elem in news_items[:MAX_NEWS_PER_SOURCE]:
            title = title_elem.get_text(strip=True)
            link = title_elem.get("href")
            if not link.startswith("http"):
                link = f"https://news.qq.com{link}"
            valid_news.append(f"🔹 {title}\n{link}")
        return valid_news
    except Exception as e:
        return [f"⚠️ 腾讯新闻抓取失败：{str(e)}"]

# -------------------------- 自动总结功能 --------------------------
def summarize_news(all_news):
    """将抓取到的资讯整理成清晰的总结"""
    summary = []
    # 总览
    total_count = sum([len(news_list) for news_list in all_news if isinstance(news_list, list)])
    summary.append(f"📰 今日热点时文总结 | {datetime.now().strftime('%Y-%m-%d')}")
    summary.append(f"共抓取到 {total_count} 条有效资讯，涵盖时政、财经、社会等领域，核心要点如下：\n")
    
    # 按来源分组总结
    sources = ["新浪新闻", "网易新闻", "腾讯新闻"]
    for i, source in enumerate(sources):
        news_list = all_news[i]
        if news_list and not news_list[0].startswith("⚠️"):
            summary.append(f"【{source}】")
            summary.extend(news_list)
            summary.append("")  # 空行分隔
    
    # 处理抓取失败的情况
    for news_list in all_news:
        if news_list and news_list[0].startswith("⚠️"):
            summary.append(f"\n{news_list[0]}")
    
    if total_count == 0:
        summary = ["⚠️ 过去24小时暂无有效资讯，或所有来源均抓取失败"]
    
    return "\n".join(summary)

# -------------------------- 主逻辑 --------------------------
def get_all_news():
    """合并所有来源的全品类资讯"""
    return [
        get_sina_news(),
        get_163_news(),
        get_tencent_news()
    ]

def push_to_wechat(summary):
    """通过Server酱Turbo版推送到微信"""
    sendkey = os.getenv("SERVERCHAN_SENDKEY")
    if not sendkey:
        raise Exception("未配置SERVERCHAN_SENDKEY环境变量")
    
    title = f"每日热点时文总结 | {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    api_url = f"https://sctapi.ftqq.com/{sendkey}.send"
    
    try:
        resp = requests.post(
            api_url,
            data={"title": title, "desp": summary},
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
    print("开始全网抓取全品类时文资讯...")
    all_news = get_all_news()
    print("生成资讯总结...")
    summary = summarize_news(all_news)
    print("推送总结到微信...")
    push_to_wechat(summary)
    print("任务执行完成！")
