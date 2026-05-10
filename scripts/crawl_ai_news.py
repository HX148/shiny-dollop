#!/usr/bin/env python3
"""
AI 新闻爬虫
抓取国外和国内 AI 新闻源爬虫
"""

import requests
from bs4 import BeautifulSoup
import json
import sys
from datetime import datetime, timedelta
from dateutil import parser
import uuid
import time
import random

# 配置
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0"
]

# 关键词分类映射
KEYWORD_CATEGORIES = {
    "GPT": "大语言模型", "LLM": "大语言模型", "language model": "大语言模型",
    "computer vision": "计算机视觉", "image recognition": "计算机视觉",
    "robot": "机器人", "autonomous": "AI 自动驾驶", "self-driving": "AI 自动驾驶",
    "generative": "生成式 AI", "diffusion": "生成式 AI",
    "healthcare": "AI 医疗", "medical": "AI 医疗",
    "finance": "AI 金融", "trading": "AI 金融",
    "education": "AI 教育",
    "startup": "初创企业"
}

def get_random_headers():
    """获取随机 User-Agent"""
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
    }

def classify_news(title, content):
    """根据内容分类新闻"""
    text = (title + " " + content).lower()
    for keyword, category in KEYWORD_CATEGORIES.items():
        if keyword.lower() in text:
            return category
    return "AI 研究"

def generate_summary(content, max_length=150):
    """生成摘要"""
    summary = content.strip()
    if len(summary) > max_length:
        summary = summary[:max_length] + "..."
    return summary

def fetch_techcrunch_ai(max_news=10):
    """抓取 TechCrunch AI 新闻"""
    news_list = []
    try:
        url = "https://techcrunch.com/category/artificial-intelligence/"
        response = requests.get(url, headers=get_random_headers(), timeout=20)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.select(".post-block")
        
        for article in articles[:max_news]:
            try:
                title_elem = article.select_one(".post-block__title a")
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                link = title_elem.get("href", "")
                
                excerpt_elem = article.select_one(".post-block__content")
                excerpt = excerpt_elem.get_text(strip=True) if excerpt_elem else ""
                
                time_elem = article.select_one("time")
                published_at = datetime.now().isoformat()
                if time_elem and time_elem.get("datetime"):
                    try:
                        published_at = parser.parse(time_elem.get("datetime")).isoformat()
                    except:
                        pass
                
                category = classify_news(title, excerpt)
                
                news = {
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "summary": generate_summary(excerpt),
                    "content": excerpt,
                    "source": "TechCrunch",
                    "sourceUrl": link if link.startswith("http") else f"https://techcrunch.com{link}",
                    "category": category,
                    "publishedAt": published_at,
                    "imageUrl": None
                }
                
                news_list.append(news)
                
            except Exception as e:
                print(f"TechCrunch 文章解析失败: {str(e)}")
                continue
        
        print(f"TechCrunch 抓取成功: {len(news_list)} 条")
        
    except Exception as e:
        print(f"TechCrunch 抓取失败: {str(e)}", file=sys.stderr)
    
    time.sleep(random.uniform(1, 2))
    return news_list

def fetch_venturebeat_ai(max_news=10):
    """抓取 VentureBeat AI 新闻"""
    news_list = []
    try:
        url = "https://venturebeat.com/category/ai/"
        response = requests.get(url, headers=get_random_headers(), timeout=20)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.select(".ArticleListing")
        
        for article in articles[:max_news]:
            try:
                title_elem = article.select_one(".ArticleListing__title a")
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                link = title_elem.get("href", "")
                
                excerpt_elem = article.select_one(".ArticleListing__excerpt")
                excerpt = excerpt_elem.get_text(strip=True) if excerpt_elem else ""
                
                category = classify_news(title, excerpt)
                
                news = {
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "summary": generate_summary(excerpt),
                    "content": excerpt,
                    "source": "VentureBeat",
                    "sourceUrl": link,
                    "category": category,
                    "publishedAt": datetime.now().isoformat(),
                    "imageUrl": None
                }
                
                news_list.append(news)
                
            except Exception as e:
                print(f"VentureBeat 文章解析失败: {str(e)}")
                continue
        
        print(f"VentureBeat 抓取成功: {len(news_list)} 条")
        
    except Exception as e:
        print(f"VentureBeat 抓取失败: {str(e)}", file=sys.stderr)
    
    time.sleep(random.uniform(1, 2))
    return news_list

def fetch_jiqizhixin(max_news=10):
    """抓取机器之心新闻"""
    news_list = []
    try:
        url = "https://www.jiqizhixin.com/"
        response = requests.get(url, headers=get_random_headers(), timeout=20)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.select(".article-item")
        
        for article in articles[:max_news]:
            try:
                title_elem = article.select_one("a.title")
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                link = title_elem.get("href", "")
                
                excerpt_elem = article.select_one(".description")
                excerpt = excerpt_elem.get_text(strip=True) if excerpt_elem else ""
                
                category = classify_news(title, excerpt)
                
                news = {
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "summary": generate_summary(excerpt),
                    "content": excerpt,
                    "source": "机器之心",
                    "sourceUrl": link if link.startswith("http") else f"https://www.jiqizhixin.com{link}",
                    "category": category,
                    "publishedAt": datetime.now().isoformat(),
                    "imageUrl": None
                }
                
                news_list.append(news)
                
            except Exception as e:
                print(f"机器之心文章解析失败: {str(e)}")
                continue
        
        print(f"机器之心抓取成功: {len(news_list)} 条")
        
    except Exception as e:
        print(f"机器之心抓取失败: {str(e)}", file=sys.stderr)
    
    time.sleep(random.uniform(1, 2))
    return news_list

def main():
    """主函数"""
    print("=" * 50)
    print("开始抓取 AI 新闻...")
    print("=" * 50)
    
    all_news = []
    
    # 抓取 TechCrunch
    print("\n[1/3] 抓取 TechCrunch...")
    techcrunch_news = fetch_techcrunch_ai(max_news=15)
    all_news.extend(techcrunch_news)
    
    # 抓取 VentureBeat
    print("\n[2/3] 抓取 VentureBeat...")
    venturebeat_news = fetch_venturebeat_ai(max_news=10)
    all_news.extend(venturebeat_news)
    
    # 抓取机器之心
    print("\n[3/3] 抓取机器之心...")
    jiqizhixin_news = fetch_jiqizhixin(max_news=10)
    all_news.extend(jiqizhixin_news)
    
    # 输出结果
    output = {
        "success": True,
        "count": len(all_news),
        "news": all_news,
        "timestamp": datetime.now().isoformat()
    }
    
    print(f"\n总计抓取 {len(all_news)} 条新闻")
    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
