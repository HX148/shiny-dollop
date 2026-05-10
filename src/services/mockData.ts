import { News, NewsListResponse } from '../types';

// 本地 mock 数据
export const mockNews: News[] = [
  {
    id: '1',
    title: 'OpenAI 发布 GPT-5，具备革命性推理能力',
    summary: 'OpenAI 最新一代大语言模型在逻辑推理和问题解决方面取得了前所未有的突破。',
    content: '在今天的开创性公告中，OpenAI 发布了 GPT-5，其旗舰大语言模型的下一代产品。基于前几代产品的成功，GPT-5 在逻辑推理、数学问题解决和复杂决策方面引入了革命性的能力。\n\n早期测试表明，GPT-5 能够以惊人的准确性解决数学、计算机科学和工程领域中以前难以处理的问题。该模型表现出对上下文的更好理解，能够在极长的对话中保持一致的推理。\n\n研究人员指出，这代表着朝着更强大、更可靠的 AI 系统迈出的重要一步，这些系统可以帮助人类解决人类最具挑战性的问题。',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    category: '大语言模型',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: '新型计算机视觉模型在医学影像中达到人类水平',
    summary: '研究人员开发了一种新型 AI 系统，可以从医学扫描中检测早期疾病，准确性可与专业放射科医生媲美。',
    content: '来自顶尖大学的研究团队开发了一种计算机视觉模型，在分析医学图像方面达到了人类水平的性能。该 AI 系统能够从 MRI 和 CT 扫描中检测癌症、阿尔茨海默病和心血管疾病的早期迹象。\n\n在双盲研究中，该模型与董事会认证的放射科医生的诊断准确性相当或更高。这一突破可能显著提高全球早期诊断率和患者预后。\n\n研究人员强调，这项技术旨在协助医疗专业人员，而不是取代他们，提供有价值的第二意见并帮助减少诊断错误。',
    source: 'Nature',
    sourceUrl: 'https://nature.com',
    category: '计算机视觉',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: '波士顿动力展示 Atlas 机器人，具备类人灵活性',
    summary: '波士顿动力最新的人形机器人在真实场景中展示了前所未有的平衡能力和灵活性。',
    content: '波士顿动力展示了其 Atlas 人形机器人的最新版本，展示了在灵活性、平衡能力和适应性方面的显著改进。该机器人现在能够导航复杂地形、操作精密物体并优雅地从跌倒中恢复。\n\n在演示视频中，Atlas 展示了执行开门、爬楼梯等任务，甚至能够以流畅的类人动作跳舞。该公司相信，这项技术可以在灾害响应、建筑和医疗保健方面得到应用。\n\n虽然当前模型是研究原型，但波士顿动力暗示，商业版本可能在未来五年内面市。',
    source: 'IEEE Spectrum',
    sourceUrl: 'https://spectrum.ieee.org',
    category: '机器人',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: '生成式 AI 创作的原创音乐登上排行榜榜首',
    summary: '一首由 AI 创作的歌曲在多个流媒体平台上登上榜首，标志着创意 AI 的里程碑。',
    content: '在人工智能领域取得的前所未有的成就中，一首完全由 AI 创作和制作的歌曲在主要音乐流媒体平台上登上了榜首。这首名为 "Neural Dreams" 的曲目以独特创新的方式融合了电子、古典和世界音乐元素。\n\n该 AI 系统分析了数百万首跨流派的歌曲，以理解音乐模式，然后生成了与人类听众产生共鸣的原创作品。音乐评论家称赞该作品的情感深度和创新的声音设计。\n\n这一里程碑引发了关于创意、作者身份以及未来人机在艺术领域协作的有趣问题。',
    source: 'Billboard',
    sourceUrl: 'https://billboard.com',
    category: '生成式 AI',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: '量子机器学习突破有望实现指数级加速',
    summary: '科学家展示了一种量子计算的机器学习方法，可以比传统计算机快数百万倍地解决问题。',
    content: '领先量子计算实验室的研究人员展示了一种新型的量子机器学习方法，有望在某些类型的问题上实现指数级加速。该团队成功地在真实世界数据集上训练了量子神经网络，效率惊人。\n\n虽然量子计算机仍处于起步阶段，但这项研究表明，它们可能彻底改变药物发现、材料科学和传统计算机无法处理的优化问题等领域。\n\n该团队估计，随着量子硬件的持续改进，机器学习的实际量子优势可能在未来十年内实现。',
    source: 'Science',
    sourceUrl: 'https://science.sciencemag.org',
    category: 'AI 研究',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    title: 'AI 初创企业为自主制造筹集 5 亿美元 C 轮融资',
    summary: '一家专注于工业自动化的 AI 初创企业获得巨额融资，以扩大其智能工厂解决方案。',
    content: '工业 AI 初创企业 AutoFactory 宣布完成 5 亿美元 C 轮融资，公司估值超过 30 亿美元。这笔投资将用于扩大其自主制造平台，该平台使用 AI 优化生产线并减少浪费。\n\n该公司的技术已被汽车、电子和消费品行业的主要制造商采用，在效率和质量控制方面取得了显著改善。\n\n投资者认为，AI 驱动的自动化代表着下一场工业革命，有可能彻底改变全球制造业。',
    source: 'Bloomberg',
    sourceUrl: 'https://bloomberg.com',
    category: '初创企业',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    title: 'Meta 发布 Llama 3，采用开源许可证',
    summary: 'Meta 最新版的 LLM 采用宽松许可证发布，促进了广泛的创新和研究。',
    content: 'Meta 已正式发布 Llama 3，其开源大语言模型的最新版本，采用允许商业使用的宽松许可证。与前一代相比，新模型在编码、推理和多语言能力方面展示了显著改进。\n\n世界各地的研究人员和开发人员已开始试验 Llama 3，为医疗保健、教育和创意行业构建专用应用。这种开放方式反映了 Meta 对民主化 AI 技术的承诺。\n\n行业分析师认为，通过使最先进的语言模型对更多开发人员和组织可访问，Llama 3 可能会加速 AI 创新。',
    source: 'Meta AI Blog',
    sourceUrl: 'https://ai.meta.com',
    category: '大语言模型',
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    title: 'AI 驱动的药物发现识别出有前景的癌症治疗方法',
    summary: '机器学习加速发现一种新型治疗化合物，显示出强大的抗癌特性。',
    content: '使用先进的机器学习技术，研究人员发现了一种治疗某些类型癌症的有前景的新型化合物。该 AI 系统筛选了数百万种潜在分子，并以惊人的准确性预测了它们的有效性。\n\n传统的药物发现可能需要 10-15 年并花费数十亿美元。这种 AI 辅助方法仅用 18 个月就以一小部分成本识别出候选化合物，展示了 AI 在制药研究中的变革潜力。\n\n该化合物目前正在进入临床前试验，研究人员对其最终帮助患者的前景持乐观态度。',
    source: 'Cell',
    sourceUrl: 'https://cell.com',
    category: 'AI 医疗',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    title: 'Stable Diffusion 4 引入 4K 视频生成',
    summary: 'Stability AI 最新的生成模型可以从文本提示创建高质量的视频内容。',
    content: 'Stability AI 宣布 Stable Diffusion 4，其生成式 AI 模型的最新版本，引入了突破性的视频生成功能。新模型可以从简单的文本描述创建 4K 视频剪辑，具有令人印象深刻的连贯性和真实感。\n\n内容创作者已在为电影、广告和教育内容试验该技术。虽然当前版本在视频长度和复杂度方面存在限制，但它代表了 AI 生成内容方面的重大飞跃。\n\nStability AI 表示，该技术旨在增强人类创造力，提供工具帮助艺术家和创作者更高效地实现他们的愿景。',
    source: 'Stability AI Blog',
    sourceUrl: 'https://stability.ai',
    category: '生成式 AI',
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    title: '特斯拉展示城市环境中的完全自动驾驶',
    summary: '特斯拉展示了其最新的 FSD 能力，无需人工干预即可在复杂城市交通中导航。',
    content: '特斯拉发布了其完全自动驾驶系统在无任何人工干预的情况下在复杂城市环境中导航的视频。该车辆在繁忙的城市交通中成功处理了行人、自行车、施工区域和无保护左转。\n\n虽然监管障碍仍然存在，但这次演示代表了向完全自动驾驶汽车迈进的重要里程碑。特斯拉声称，在大多数情况下，该系统现在比普通人类司机更安全。\n\n该公司继续从其车队中收集数据，通过机器学习和空中更新不断改进 AI。',
    source: 'Tesla Blog',
    sourceUrl: 'https://tesla.com',
    category: 'AI 自动驾驶',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '11',
    title: 'Google DeepMind 的 AlphaFold 解决另一项重大挑战',
    summary: '基于其蛋白质折叠的成功，AlphaFold 现在可以准确预测蛋白质复合物和相互作用。',
    content: 'Google DeepMind 宣布了 AlphaFold 的另一项突破，其革命性的蛋白质结构预测 AI 系统。最新版本现在可以准确预测蛋白质复合物的结构，并理解蛋白质如何相互作用。\n\n这一进展对理解生物过程和开发疾病新治疗方法具有深远意义。科学家们已在使用该技术研究阿尔茨海默病、帕金森病和 COVID-19 等疾病。\n\nDeepMind 继续向科学界免费提供其工具，加速全球研究。',
    source: 'DeepMind Blog',
    sourceUrl: 'https://deepmind.com',
    category: 'AI 研究',
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '12',
    title: 'AI 农业初创企业实现农作物产量创纪录',
    summary: '一家创新的农业 AI 初创企业帮助农民大幅提高产量，同时减少水和肥料的使用。',
    content: '农业科技初创企业 GreenMind 宣布其 AI 驱动的农业平台取得了令人印象深刻的成果，帮助农民实现创纪录的作物产量，同时将用水量减少 40%，肥料使用量减少 30%。\n\n该公司的 AI 系统分析卫星图像、天气数据和土壤传感器，为农民提供种植、灌溉和收割的精确建议。早期采用者报告在生产力和可持续性方面均取得了显著改善。\n\n随着全球人口持续增长，AI 驱动的精准农业可能在确保粮食安全同时最小化环境影响方面发挥关键作用。',
    source: 'Forbes',
    sourceUrl: 'https://forbes.com',
    category: '初创企业',
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function getMockNews(page = 1, limit = 10, category?: string): NewsListResponse {
  let filteredNews = [...mockNews];
  
  if (category && category !== '全部') {
    filteredNews = filteredNews.filter(news => news.category === category);
  }
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedNews = filteredNews.slice(start, end);
  
  return {
    data: paginatedNews,
    total: filteredNews.length,
    page,
    limit
  };
}

export function getMockNewsById(id: string): News | undefined {
  return mockNews.find(news => news.id === id);
}

export function searchMockNews(query: string, page = 1, limit = 10): NewsListResponse {
  const lowerQuery = query.toLowerCase();
  const filteredNews = mockNews.filter(news => 
    news.title.toLowerCase().includes(lowerQuery) ||
    news.summary.toLowerCase().includes(lowerQuery) ||
    news.content.toLowerCase().includes(lowerQuery)
  );
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedNews = filteredNews.slice(start, end);
  
  return {
    data: paginatedNews,
    total: filteredNews.length,
    page,
    limit
  };
}
