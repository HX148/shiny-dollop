import { News } from '../types';

export const mockNews: News[] = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities',
    summary: 'The latest iteration of OpenAI\'s large language model introduces unprecedented advances in logical reasoning and problem-solving.',
    content: 'In a groundbreaking announcement today, OpenAI unveiled GPT-5, the next generation of its flagship large language model. Building upon the success of its predecessors, GPT-5 introduces revolutionary capabilities in logical reasoning, mathematical problem-solving, and complex decision-making.\n\nEarly tests demonstrate that GPT-5 can solve previously intractable problems in mathematics, computer science, and engineering with remarkable accuracy. The model exhibits an improved understanding of context and can maintain consistent reasoning over extremely long conversations.\n\nResearchers note that this represents a significant step toward more capable and reliable AI systems that can assist humans in tackling some of humanity\'s most challenging problems.',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    category: 'LLM',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'New Computer Vision Model Achieves Human-Level Performance in Medical Imaging',
    summary: 'Researchers develop a novel AI system that can detect early-stage diseases from medical scans with accuracy comparable to expert radiologists.',
    content: 'A team of researchers from leading universities has developed a computer vision model that achieves human-level performance in analyzing medical images. The AI system can detect early signs of diseases such as cancer, Alzheimer\'s, and cardiovascular conditions from MRI and CT scans.\n\nIn double-blind studies, the model matched or exceeded the diagnostic accuracy of board-certified radiologists. This breakthrough could significantly improve early diagnosis rates and patient outcomes worldwide.\n\nThe researchers emphasize that this technology is designed to assist medical professionals, not replace them, providing a valuable second opinion and helping reduce diagnostic errors.',
    source: 'Nature',
    sourceUrl: 'https://nature.com',
    category: 'Computer Vision',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Boston Dynamics Unveils Atlas Robot with Human-Like Agility',
    summary: 'The latest humanoid robot from Boston Dynamics demonstrates unprecedented balance and dexterity in real-world scenarios.',
    content: 'Boston Dynamics has revealed the newest version of its Atlas humanoid robot, showcasing remarkable improvements in agility, balance, and adaptability. The robot can now navigate complex terrain, manipulate delicate objects, and recover from falls with grace.\n\nIn demonstration videos, Atlas is shown performing tasks such as opening doors, climbing stairs, and even dancing with fluid, human-like movements. The company believes this technology could have applications in disaster response, construction, and healthcare.\n\nWhile the current model is a research prototype, Boston Dynamics suggests that commercially available versions could be available within the next five years.',
    source: 'IEEE Spectrum',
    sourceUrl: 'https://spectrum.ieee.org',
    category: 'Robotics',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Generative AI Creates Original Music That Topped the Charts',
    summary: 'An AI-composed song has reached number one on multiple streaming platforms, marking a milestone in creative AI.',
    content: 'In an unprecedented achievement for artificial intelligence, a song entirely composed and produced by AI has reached the top spot on major music streaming platforms. The track, titled "Neural Dreams," blends elements of electronic, classical, and world music in a uniquely innovative way.\n\nThe AI system analyzed millions of songs across genres to understand musical patterns, then generated original compositions that resonate with human listeners. Music critics have praised the piece for its emotional depth and innovative sound design.\n\nThis milestone raises interesting questions about creativity, authorship, and the future of human-AI collaboration in the arts.',
    source: 'Billboard',
    sourceUrl: 'https://billboard.com',
    category: 'Generative AI',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Breakthrough in Quantum Machine Learning Promises Exponential Speedup',
    summary: 'Scientists demonstrate a quantum computing approach to machine learning that could solve problems millions of times faster.',
    content: 'Researchers at a leading quantum computing lab have demonstrated a novel approach to quantum machine learning that promises exponential speedups for certain types of problems. The team successfully trained a quantum neural network on a real-world dataset with remarkable efficiency.\n\nWhile quantum computers are still in their infancy, this research suggests that they could revolutionize fields like drug discovery, materials science, and optimization problems that are intractable for classical computers.\n\nThe team estimates that practical quantum advantage for machine learning could be achieved within the next decade as quantum hardware continues to improve.',
    source: 'Science',
    sourceUrl: 'https://science.sciencemag.org',
    category: 'AI Research',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'AI Startup Raises $500M Series C for Autonomous Manufacturing',
    summary: 'A promising AI startup focused on industrial automation secures massive funding to scale their intelligent factory solutions.',
    content: 'Industrial AI startup AutoFactory has announced a $500 million Series C funding round, valuing the company at over $3 billion. The investment will be used to scale their autonomous manufacturing platform, which uses AI to optimize production lines and reduce waste.\n\nThe company\'s technology has already been adopted by major manufacturers in automotive, electronics, and consumer goods industries, demonstrating significant improvements in efficiency and quality control.\n\nInvestors believe that AI-driven automation represents the next industrial revolution, with the potential to transform manufacturing worldwide.',
    source: 'Bloomberg',
    sourceUrl: 'https://bloomberg.com',
    category: 'Startups',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Meta Unveils Llama 3 with Open Source License',
    summary: 'The latest version of Meta\'s LLM is released with a permissive license, enabling widespread innovation and research.',
    content: 'Meta has officially released Llama 3, the latest version of its open-source large language model, with a permissive license that allows commercial use. The new model demonstrates significant improvements in coding, reasoning, and multilingual capabilities compared to its predecessor.\n\nResearchers and developers worldwide have already begun experimenting with Llama 3, building specialized applications for healthcare, education, and creative industries. This open approach reflects Meta\'s commitment to democratizing AI technology.\n\nIndustry analysts suggest that Llama 3 could accelerate AI innovation by making state-of-the-art language models accessible to more developers and organizations.',
    source: 'Meta AI Blog',
    sourceUrl: 'https://ai.meta.com',
    category: 'LLM',
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'AI-Powered Drug Discovery Identifies Promising Cancer Treatment',
    summary: 'Machine learning accelerates the discovery of a new therapeutic compound that shows potent anti-cancer properties.',
    content: 'Using advanced machine learning techniques, researchers have identified a promising new compound for treating certain types of cancer. The AI system screened millions of potential molecules and predicted their effectiveness with remarkable accuracy.\n\nTraditional drug discovery can take 10-15 years and cost billions of dollars. This AI-assisted approach identified a candidate compound in just 18 months at a fraction of the cost, demonstrating the transformative potential of AI in pharmaceutical research.\n\nThe compound is now entering pre-clinical trials, with researchers optimistic about its prospects for eventually helping patients.',
    source: 'Cell',
    sourceUrl: 'https://cell.com',
    category: 'AI Research',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f450a7b?w=400&h=300&fit=crop'
  },
  {
    id: '9',
    title: 'Stable Diffusion 4 Introduces Video Generation at 4K Resolution',
    summary: 'The latest generative model from Stability AI can create high-quality video content from text prompts.',
    content: 'Stability AI has announced Stable Diffusion 4, the latest version of its generative AI model that introduces groundbreaking video generation capabilities. The new model can create 4K video clips from simple text descriptions, with impressive coherence and realism.\n\nContent creators are already experimenting with the technology for film, advertising, and educational content. While the current generation has limitations in video length and complexity, it represents a major leap forward in AI-generated content.\n\nStability AI states that the technology is designed to empower human creativity, providing tools that help artists and creators realize their visions more efficiently.',
    source: 'Stability AI Blog',
    sourceUrl: 'https://stability.ai',
    category: 'Generative AI',
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
  },
  {
    id: '10',
    title: 'Tesla Shows Fully Autonomous Driving in Urban Environments',
    summary: 'Tesla demonstrates its latest FSD capabilities, navigating complex city traffic without human intervention.',
    content: 'Tesla has released footage of its fully autonomous driving system navigating complex urban environments without any human intervention. The vehicle successfully handles pedestrians, cyclists, construction zones, and unprotected left turns in busy city traffic.\n\nWhile regulatory hurdles remain, this demonstration represents a significant milestone toward fully autonomous vehicles. Tesla claims that the system is now safer than the average human driver in most scenarios.\n\nThe company continues to collect data from its fleet of vehicles, continuously improving the AI through machine learning and over-the-air updates.',
    source: 'Tesla Blog',
    sourceUrl: 'https://tesla.com',
    category: 'Robotics',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop'
  },
  {
    id: '11',
    title: 'Google DeepMind\'s AlphaFold Solves Another Grand Challenge',
    summary: 'Building on its protein folding success, AlphaFold now accurately predicts protein complexes and interactions.',
    content: 'Google DeepMind has announced another breakthrough with AlphaFold, its revolutionary AI system for protein structure prediction. The latest version can now accurately predict the structure of protein complexes and understand how proteins interact with each other.\n\nThis advancement has profound implications for understanding biological processes and developing new treatments for diseases. Scientists are already using the technology to study diseases like Alzheimer\'s, Parkinson\'s, and COVID-19.\n\nDeepMind continues to make its tools freely available to the scientific community, accelerating research worldwide.',
    source: 'DeepMind Blog',
    sourceUrl: 'https://deepmind.com',
    category: 'AI Research',
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop'
  },
  {
    id: '12',
    title: 'AI-Powered Agriculture Startup Yields Record Crop Production',
    summary: 'An innovative agricultural AI startup helps farmers dramatically increase yields while reducing water and fertilizer use.',
    content: 'AgriTech startup GreenMind has announced impressive results from its AI-powered agricultural platform, helping farmers achieve record crop yields while reducing water consumption by 40% and fertilizer use by 30%.\n\nThe company\'s AI system analyzes satellite imagery, weather data, and soil sensors to provide farmers with precise recommendations for planting, irrigation, and harvesting. Early adopters have reported significant improvements in both productivity and sustainability.\n\nWith the global population continuing to grow, AI-powered precision agriculture could play a crucial role in ensuring food security while minimizing environmental impact.',
    source: 'Forbes',
    sourceUrl: 'https://forbes.com',
    category: 'Startups',
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
  }
];
