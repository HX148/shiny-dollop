/**
 * Python 脚本桥接工具
 * 用于从 Node.js 调用 Python 爬虫脚本
 */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PythonScriptResult {
  success: boolean;
  data?: any;
  error?: string;
}

export class PythonBridge {
  /**
   * 执行 Python 脚本
   */
  public static async executeScript(
    scriptName: string,
    args: string[] = []
  ): Promise<PythonScriptResult> {
    return new Promise((resolve) => {
      const scriptPath = path.join(__dirname, "../../scripts", scriptName);
      
      console.log(`[PythonBridge] 执行脚本: ${scriptName}`);
      
      const pythonProcess = spawn("python3", [scriptPath, ...args]);
      
      let stdout = "";
      let stderr = "";
      
      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      
      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          try {
            // 尝试解析 JSON 输出
            const jsonMatch = stdout.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const data = JSON.parse(jsonMatch[0]);
              resolve({
                success: true,
                data
              });
            } else {
              resolve({
                success: false,
                error: "无法解析脚本输出"
              });
            }
          } catch (error) {
            resolve({
              success: false,
              error: `JSON 解析失败: ${error instanceof Error ? error.message : String(error)}`
            });
          }
        } else {
          resolve({
            success: false,
            error: stderr || `脚本执行失败，退出码: ${code}`
          });
        }
      });
      
      pythonProcess.on("error", (error) => {
        resolve({
          success: false,
          error: `启动失败: ${error.message}`
        });
      });
      
      // 超时处理
      setTimeout(() => {
        pythonProcess.kill("SIGTERM");
        resolve({
          success: false,
          error: "脚本执行超时"
        });
      }, 120000); // 2 分钟超时
    });
  }

  /**
   * 执行 arXiv 论文爬虫
   */
  public static async fetchArxivPapers(): Promise<PythonScriptResult> {
    return this.executeScript("crawl_arxiv_papers.py");
  }

  /**
   * 执行 AI 新闻爬虫
   */
  public static async fetchAiNews(): Promise<PythonScriptResult> {
    return this.executeScript("crawl_ai_news.py");
  }
}

export default PythonBridge;
