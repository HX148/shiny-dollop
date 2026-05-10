#!/usr/bin/env python3
"""
arXiv 论文爬虫
抓取最新的 AI 相关论文并转换为项目数据格式
"""

import requests
import feedparser
import json
import sys
from datetime import datetime, timedelta
from dateutil import parser
import uuid

# arXiv 分类映射到项目分类
CATEGORY_MAP = {
    "cs.AI": "AI 研究",
    "cs.LG": "AI 研究",
    "cs.CV": "计算机视觉",
    "cs.CL": "大语言模型",
    "cs.NE": "AI 研究",
    "cs.RO": "机器人",
    "stat.ML": "AI 研究"
}

# 基础配置
BASE_URL = "http://export.arxiv.org/api/query"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def map_arxiv_category(arxiv_categories):
    """将 arXiv 分类映射到项目分类"""
    for cat in arxiv_categories:
        if cat in CATEGORY_MAP:
            return CATEGORY_MAP[cat]
    return "AI 研究"

def generate_summary(title, abstract, max_length=200):
    """生成简短摘要"""
    summary = abstract.strip()
    if len(summary) > max_length:
        summary = summary[:max_length] + "..."
    return summary

def fetch_arxiv_papers(max_results=20, days_ago=7):
    """从 arXiv API 抓取最新论文"""
    # 计算时间范围
    cutoff_date = datetime.now() - timedelta(days=days_ago)
    
    # 构建查询
    categories = ["cs.AI", "cs.LG", "cs.CV", "cs.CL", "cs.RO", "stat.ML"]
    search_query = " OR ".join([f"cat:{cat}" for cat in categories])
    
    params = {
        "search_query": search_query,
        "start": 0,
        "max_results": max_results,
        "sortBy": "submittedDate",
        "sortOrder": "descending"
    }
    
    try:
        print(f"正在请求 arXiv API...")
        response = requests.get(BASE_URL, params=params, headers=HEADERS, timeout=30)
        response.raise_for_status()
        
        # 解析 Atom feed
        feed = feedparser.parse(response.content)
        
        papers = []
        for entry in feed.entries:
            try:
                # 解析发表时间
                published_date = parser.parse(entry.published)
                
                # 只获取指定时间范围内的论文
                if published_date < cutoff_date:
                    continue
                
                # 获取分类
                arxiv_cats = [tag.get("term", "") for tag in entry.get("tags", [])]
                category = map_arxiv_category(arxiv_cats)
                
                # 生成摘要
                abstract = entry.get("summary", "").replace("\n", " ")
                summary = generate_summary(entry.title, abstract)
                
                # 获取 PDF 链接
                pdf_link = None
                for link in entry.get("links", []):
                    if link.get("title", "") == "pdf":
                        pdf_link = link.get("href")
                        break
                
                paper = {
                    "id": str(uuid.uuid4()),
                    "title": entry.title.strip(),
                    "summary": summary,
                    "content": abstract,
                    "source": "arXiv",
                    "sourceUrl": pdf_link or entry.link,
                    "category": category,
                    "publishedAt": published_date.isoformat(),
                    "imageUrl": None
                }
                
                papers.append(paper)
                
            except Exception as e:
                print(f"解析论文失败: {str(e)}")
                continue
        
        print(f"成功抓取 {len(papers)} 篇 arXiv 论文")
        return papers
        
    except Exception as e:
        print(f"arXiv API 请求失败: {str(e)}", file=sys.stderr)
        return []

def fetch_research_blog_papers():
    """从研究博客抓取论文相关新闻"""
    blog_papers = []
    
    # OpenAI Research Blog
    try:
        blog_papers.extend(fetch_openai_research())
    except Exception as e:
        print(f"OpenAI 博客抓取失败: {str(e)}")
    
    # DeepMind Blog
    try:
        blog_papers.extend(fetch_deepmind_research())
    except Exception as e:
        print(f"DeepMind 博客抓取失败: {str(e)}")
    
    return blog_papers

def fetch_openai_research(max_results=5):
    """从 OpenAI Research Blog 抓取"""
    papers = []
    try:
        # 这里可以实现 OpenAI 博客的抓取
        # 为简单起见，先返回空列表
        pass
    except Exception:
        pass
    return papers

def fetch_deepmind_research(max_results=5):
    """从 DeepMind Blog 抓取"""
    papers = []
    try:
        # 这里可以实现 DeepMind 博客的抓取
        pass
    except Exception:
        pass
    return papers

def main():
    """主函数"""
    print("=" * 50)
    print("开始抓取 arXiv 论文...")
    print("=" * 50)
    
    # 抓取 arXiv 论文
    arxiv_papers = fetch_arxiv_papers(max_results=30, days_ago=14)
    
    # 抓取研究博客论文
    blog_papers = fetch_research_blog_papers()
    
    # 合并结果
    all_papers = arxiv_papers + blog_papers
    
    # 输出 JSON
    output = {
        "success": True,
        "count": len(all_papers),
        "papers": all_papers,
        "timestamp": datetime.now().isoformat()
    }
    
    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
