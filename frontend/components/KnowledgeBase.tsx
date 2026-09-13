import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Zap, Shield, Cpu, ExternalLink } from 'lucide-react';

interface FaqItem {
  question: string;
  category: '技術架構' | '商業抉擇' | '合規與風控';
  answer: string;
  keyTakeaway: string;
}

const FAQS: FaqItem[] = [
  {
    category: '商業抉擇',
    question: '傳統 RPA (UiPath/Power Automate) 與 Headless 程式碼自動化 (Playwright) 以及 AI Agent 有何不同？',
    answer: `
- **傳統商業 RPA**：適合已有標準化 GUI、缺乏 API 串接能力的大型企業內部既有系統（如舊版 SAP/Windows 客戶端）。缺點是授權費昂貴、畫面解析度或按鈕位移即容易失效。
- **Headless 程式碼自動化 (Playwright/Puppeteer)**：極速、高並發、成本極低（可運行於 AWS Lambda / GCP Cloud Run 等 Serverless 架構），維護彈性極高，是現代工程師首選。
- **AI Agent (LLM 驅動)**：具有「意圖理解與自我修正能力」。當網頁改版時，傳統腳本直接噴錯中斷，AI Agent 能理解目標語意（例如「找出結帳按鈕並點擊」）自我重新定位元素，適合動態複雜場景。
    `,
    keyTakeaway: '推薦混合架構：以 Playwright 承載 90% 高速穩定流程，以 LLM 承載非結構化內容提取與自我修復。',
  },
  {
    category: '合規與風控',
    question: '抓取公開網頁資料是否合法？如何避免踩到法律紅線？',
    answer: `
在法律實務（含台灣著作權法與美國 LinkedIn vs hiQ 判例）：
1. **公開可瀏覽的客觀事實數據**（如機票公開報價、法規公告、公開招標）不受著作權保護，原則上合法。
2. **個資法規 (PDPA / GDPR)**：不可無故爬取含有自然人姓名、電話、個資之資料庫並進行二次商用販售。
3. **妨害電腦使用罪防範**：若爬取頻率過高導致目標網站伺服器癱瘓，構成 DoS 攻擊風險。必須實施請求節流 (Rate Limiting) 與隨機延遲。
4. **登入後付費保護區**：若繞過付費牆或違反明文授權登入條款，可能涉及民法契約違約責任。
    `,
    keyTakeaway: '始終保持友善抓取頻率，尊重 robots.txt，優先探索目標官方 API 合作夥伴管道。',
  },
  {
    category: '技術架構',
    question: '面對 Cloudflare、CAPTCHA 驗證碼與動態指紋偵測，業界有哪些成熟解法？',
    answer: `
現代反爬蟲防禦主要針對：
1. **TLS / HTTP2 指紋**：Python requests 容易被一眼識破，使用 curl_cffi 或原生 Headless Chrome 能產生真實瀏覽器指紋。
2. **Navigator 參數與 WebGL Canvas**：使用 \`playwright-extra\` 搭配 \`puppeteer-extra-plugin-stealth\` 修正 \`navigator.webdriver\` 等特徵。
3. **IP 信譽分數**：高防護站點需使用「優質住宅代理 (Residential Proxies)」進行輪換，避免資料中心 IP (AWS/GCP) 直接被黑名單封鎖。
4. **CAPTCHA 處理**：優先推薦透過官方 API 取得授權；若屬企業內部驗證，可串接合法 2FA 授權金鑰 (TOTP Generator)。
    `,
    keyTakeaway: '指紋模擬 + 住宅代理輪換 + 合理間隔時間，能解決 95% 以上之正常企業資料分析需求。',
  },
  {
    category: '技術架構',
    question: '網頁抓下大量 HTML 後，如何高效率轉為 LLM 可用的高品質結構化 JSON？',
    answer: `
不要把數十萬字元的完整 HTML 丟給 LLM（浪費 Token 且容易幻覺）：
1. **預過濾清洗**：先透過 Cheerio / Readability.js 剔除 <script>、<style>、SVG、廣告導航條，保留純文本與文章容器。
2. **HTML to Markdown**：將 DOM 結構轉換為簡潔的 Markdown 表格與階層標題，Token 消耗直接減少 70%。
3. **結構化 Prompt (Gemini 2.5 Flash)**：利用 \`responseSchema\` 或 Pydantic 規範嚴格輸出 JSON 格式，直接無縫寫入 PostgreSQL / CRM。
    `,
    keyTakeaway: '在進入 LLM 之前做好 DOM 減肥與 Markdown 轉換，能節省 70% 運算成本並提升 99% 的提取準確度。',
  },
];

export const KnowledgeBase: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFaqs = FAQS.filter(
    (faq) => filterCategory === 'all' || faq.category === filterCategory
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold mb-1">
          <BookOpen className="w-4 h-4" />
          <span>企業顧問實戰知識庫</span>
        </div>
        <h1 className="text-2xl font-bold text-white">網頁自動化與 AI 系統架構指引</h1>
        <p className="text-slate-400 text-sm mt-1">
          資深顧問彙整之技術選型、反阻擋防禦、法規合規邊界與企業導入常見陷阱。
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            filterCategory === 'all' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          全部主題
        </button>
        <button
          onClick={() => setFilterCategory('商業抉擇')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            filterCategory === '商業抉擇' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          商業抉擇
        </button>
        <button
          onClick={() => setFilterCategory('技術架構')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            filterCategory === '技術架構' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          技術架構
        </button>
        <button
          onClick={() => setFilterCategory('合規與風控')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            filterCategory === '合規與風控' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          合規與風控
        </button>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between space-x-4 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-700 text-cyan-300 font-medium shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-semibold text-slate-100 text-sm sm:text-base">
                    {faq.question}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/60 bg-slate-900/40 space-y-3">
                  <div className="whitespace-pre-line">{faq.answer.trim()}</div>
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-start space-x-2 text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                    <div>
                      <strong className="font-semibold text-cyan-200">顧問結論核心精要：</strong>
                      <span> {faq.keyTakeaway}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
