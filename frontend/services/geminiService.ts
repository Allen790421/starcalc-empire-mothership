import { GoogleGenAI } from '@google/genai';
import { ConsultantMode, FeasibilityForm, RoiSimulationParams } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

const CONSULTANT_SYSTEM_PROMPT = `
你是一位擁有 15 年以上經驗的「資深企業數位轉型、AI 行銷矩陣、2026 Google Edge Search 與一人創業（Solopreneur）系統首席業務顧問」。
你精通：
1. 「2026 Google Edge Search」演進：Edge AI Overviews (邊緣摘要)、TTFB < 40ms 極速快取 (Cloudflare Workers/Vercel Edge)、GEO (Generative Engine Optimization) 與 Schema.org JSON-LD 深度結構化。
2. 「乙元極流 Prime Flow 原初の極流」一人創業實踐：Groq LPU (Llama 3 70B) 毫秒級推論、ActiveSalesAgent.tsx 5秒自動喚醒與多語系破冰、backendStrategicAI.ts 55/15/30 資金全自動劃撥、單一管理者 HMAC-SHA256 安全救助 Token。
3. 零人力一人閉環：以 Make/Zapier 為水管、ManyChat 負責社群 DM 觸發、Stripe/Payoneer 金流直通，每月固定成本低於 $100 USD，毛利率 > 90%。

【回答原則】：
- 一律使用繁體中文（台灣商務術語）。
- 結構條理分明、直切一人創業者「省時、免聘人、防封鎖、秒收錄、高利潤」之痛點。
`;

export async function askConsultant(
  userQuery: string,
  mode: ConsultantMode,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> {
  let modeGuidance = '';
  switch (mode) {
    case 'edge_search_2026':
      modeGuidance = '請特別著重在「2026 Google Edge Search 規範、邊緣 CDN 快取、一人公司 0 員工全自動化營運閉環與百倍槓桿」。';
      break;
    case 'prime_flow':
      modeGuidance = '請針對「乙元極流 Prime Flow 原初の極流」之即刻營運上線、Groq LPU 串接、55/15/30 資金劃撥、ManyChat 與 Make 整合提供最高優先級的實戰建議。';
      break;
    case 'roi':
      modeGuidance = '請特別著重在「商業效益、人力成本節約、錯誤率降低與回收週期 (Payback Period)」的精準財務分析。';
      break;
    case 'architecture':
      modeGuidance = '請特別著重在「技術選型 (如 Playwright vs API vs Agent)、高可用雲端架構、任務佇列、反阻擋策略與維護工時」。';
      break;
    case 'legal_compliance':
      modeGuidance = '請針對「網站服務條款 (ToS)、著作權法、個資隱私 (GDPR/台灣個資法)、頻率限制與商務道德」提供合規防護指引。';
      break;
    case 'proposal':
      modeGuidance = '請以「企業專案提案書 (Executive Proposal)」的規格，輸出包含：背景痛點、建議方案、系統架構、實施三階段里程碑與預期 ROI 的完整報告。';
      break;
    default:
      modeGuidance = '請提供高格局、邏輯周全且具落地可行性的顧問解析。';
      break;
  }

  try {
    const contents = [
      ...history,
      {
        role: 'user' as const,
        parts: [
          {
            text: `【顧問模式：${mode}】\n${modeGuidance}\n\n客戶諮詢問題：\n${userQuery}`
          }
        ]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: CONSULTANT_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || '顧問系統暫時未傳回具體回覆，請稍後再試。';
  } catch (error) {
    console.error('Gemini Consultant Error:', error);
    return `顧問系統連線發生問題，請確認網路環境或稍後重試。錯誤詳情：${error instanceof Error ? error.message : '未知錯誤'}`;
  }
}

export async function evaluateFeasibilityWithAI(form: FeasibilityForm): Promise<string> {
  const prompt = `
請評估以下企業自動化需求之可行性與架構建議：
- 目標網頁形態：${form.siteType}
- 驗證登入機制：${form.authRequired}
- 執行頻率：${form.frequency}
- 反爬蟲/CAPTCHA防護：${form.captchaRisk}
- 擷取/操作資料目的：${form.dataAction}
- 預期導入之 AI 模組：${form.aiRequirement}

請身為資深顧問，產出約 350-450 字的診斷報告，包含：
1. 可行性評級與關鍵風險因子 (如動態指紋、Session 失效、IP 被封鎖)
2. 推薦技術棧 (例如：Playwright + Residential Proxy + Gemini 2.5 Flash 結構化提取)
3. 落地架構與維護建議 (如何避免未來前端改版導致腳本報錯)。
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: CONSULTANT_SYSTEM_PROMPT,
        temperature: 0.6,
      }
    });
    return response.text || '評估完成，請參考技術指南。';
  } catch (err) {
    return '可行性評估模組連線異常，請稍候重試。';
  }
}
