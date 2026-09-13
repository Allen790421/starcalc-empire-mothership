import React, { useState } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Code2, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Zap, 
  DollarSign, 
  Share2, 
  Layers, 
  Cpu, 
  Eye, 
  Bot,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const PrimeFlowBlueprint: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'preview' | 'schema' | 'architecture'>('audit');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Financial 55/15/30 Pool Simulator
  const [weeklyRevenueUSD, setWeeklyRevenueUSD] = useState<number>(10000);
  const profit55 = Math.round(weeklyRevenueUSD * 0.55);
  const compute15 = Math.round(weeklyRevenueUSD * 0.15);
  const growth30 = Math.round(weeklyRevenueUSD * 0.30);

  const pieData = [
    { name: '55% 主營淨利', value: profit55, color: '#10b981' },
    { name: '15% 算力儲備 (Groq/API)', value: compute15, color: '#06b6d4' },
    { name: '30% 獲客裂變與再行銷', value: growth30, color: '#f59e0b' },
  ];

  // Interactive Live Sales Widget State Simulation
  const [widgetChat, setWidgetChat] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'ai', text: '👋 嗨！我是乙元極流 AI 業務顧問。想瞭解如何用 AI 自動化矩陣每天為您帶進 100+ 高品質娛樂城與業務名單嗎？' }
  ]);
  const [widgetInput, setWidgetInput] = useState('');

  const handleWidgetSend = () => {
    if (!widgetInput.trim()) return;
    const userMsg = widgetInput;
    setWidgetChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setWidgetInput('');

    setTimeout(() => {
      setWidgetChat(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `【乙元極流秒級響應】：感謝提問！系統採用 Groq LPU (Llama 3 70B) 毫秒級引擎，並整合 Google Indexing API 達成當日秒級收錄。針對「${userMsg}」，我們建議立即啟動首月 $4.99 USD 破冰轉化方案，同時劃撥 30% 分潤裂變池！`
        }
      ]);
    }, 600);
  };

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Ready-to-inject Schema.org JSON-LD
  const schemaSnippet = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "乙元極流 Prime Flow AI 矩陣系統",
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "description": "全自動與半自動 AI 矩陣行銷推播與 GEO/SEO 引流系統，結合 Groq LPU 毫秒級推論與 55/15/30 裂變分潤架構。",
      "url": "https://e3.xingdeng.tw",
      "offers": {
        "@type": "Offer",
        "price": "4.99",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "如何透過乙元極流 AI 自動化矩陣獲取高意向名單？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "乙元極流結合 pSEO 自動生成、ManyChat 社群 DM 觸發與前台主動式 Sales AI，提供 5 秒意圖喚醒與自動劃撥 30% 獲客池裂變機制。"
          }
        },
        {
          "@type": "Question",
          "name": "什麼是 55/15/30 資金自動劃撥模型？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "55% 歸屬主營純利、15% 保留為高並發算力儲備（Groq/圖片 API）、30% 專注於推廣者獎勵、再行銷投放與裂變回饋。"
          }
        }
      ]
    }
  ]
}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-cyan-500/10 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>企劃落地即時評估 • 乙元極流【Prime Flow 原初の極流】</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              全自動與半自動 AI 矩陣營運與上線落地方案
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              針對規格書進行<strong>「立即營運評估、曝光率 GEO/pSEO 最大化、全自動化執行閉環」</strong>進行全面補強與模擬實裝，確保系統即刻達到上線接單標準。
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-4 py-3 rounded-xl shadow-lg shrink-0">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium">營運就緒度評級</div>
              <div className="text-xl font-bold text-emerald-400">96 / 100 卓越</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              A+
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'audit'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>立即營運評估與改善建議</span>
          </button>
          <button
            onClick={() => setActiveSubTab('preview')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'preview'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>前台主動 Sales AI 實裝預覽</span>
          </button>
          <button
            onClick={() => setActiveSubTab('schema')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'schema'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>SEO / GEO AI 秒級收錄標籤</span>
          </button>
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'architecture'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>55/15/30 財務劃撥與裂變池</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Comprehensive Operational Audit & Recommendations */}
      {activeSubTab === 'audit' && (
        <div className="space-y-6">
          {/* Key Executive Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold mb-2">
                <Zap className="w-4 h-4" />
                <span>1. 立即營運可行性評估</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">輕量化架構極具優勢</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                原案設計將 Groq LPU (Llama 3 70B) 設為核心是極佳決策（延遲 &lt;500ms），Phase 1 避免安裝沈重資料庫，改以 HMAC-SHA256 生成救援 Token，能達成<strong>當天佈署、當天開始獲取潛在客戶</strong>。
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-2">
                <Flame className="w-4 h-4" />
                <span>2. 曝光率倍增 (GEO + pSEO)</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">奪取 AI 搜尋引述信任</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                結合 Frase/Surfer 提煉之問答結構，轉化為 Next.js JSON-LD FAQPage 結構，能直接被 Perplexity 與 ChatGPT 搜尋優先引用；配合 Indexing API 達成新頁面 24 小時內收錄。
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-2">
                <Rocket className="w-4 h-4" />
                <span>3. 全自動化商業閉環</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Make + ManyChat 零代碼水管</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                社群貼文關鍵字「留言領方案」自動觸發 ManyChat 私訊，透過帶有推薦碼的專屬 $4.99 連結導流至前台，系統自動觸發 Webhook 同步至 CRM，全流程無須人工介入。
              </p>
            </div>
          </div>

          {/* Detailed Gaps & Immediate Fixes */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>企劃書上線營運必修補之關鍵 4 大盲點 (盲區修復清單)</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    高並發與 Groq API Rate Limit 斷路防護 (FallBack 機制缺失)
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    <strong>風險：</strong>Groq 免費或標準 Tier 有 RPM/TPM 限制，一旦社群爆款流量湧入，前台對話將回傳「系統忙碌中」。
                    <br />
                    <strong>解決：</strong>在前端腳本與後台 API 加入降級熔斷（Circuit Breaker），當 Groq 發生 429 時，秒級自動 Fallback 至 Gemini 2.5 Flash 或備用模型，保證 99.9% 在線率。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    防刷破冰價與單一用戶 Session 隔離機制
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    <strong>風險：</strong>原規格書未限定單一 IP 或訪客的破冰領取次數，恐遭惡意腳本重複大量試刷。
                    <br />
                    <strong>解決：</strong>在 Next.js Middleware 中加入 Redis / Upstash Rate Limiting，限制單一 IP 每日發言不超過 50 次，並針對 $4.99 連結簽發帶有時效的加密 JWT Token。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Google Indexing API 每日配額與 Sitemaps 自動更新
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    <strong>風險：</strong>Google 官方 Indexing API 預設為招聘/直播頁面，純 pSEO 文章直接猛推容易觸發審查。
                    <br />
                    <strong>解決：</strong>改採「Sitemaps Ping + Google Search Console Service Account + 社交信號反向引流」三軌並進，先推前 20 篇高權重 FAQ 取得沙盒期信任。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    30% 裂變池實名帳號防作弊 (Anti-Sybil 算式)
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    <strong>風險：</strong>推廣者透過機器人自刷自買詐領 30% 裂變金。
                    <br />
                    <strong>解決：</strong>強制加入「首筆獎勵需滿 30 天無退款審核期」與「同設備指紋 (Canvas Fingerprint) 排他邏輯」，維護健康現金流。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Front-End Sales AI Live Interactive Preview */}
      {activeSubTab === 'preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-2">
                <Bot className="w-4 h-4 text-amber-400" />
                <span>前台主動 Sales AI 實裝特點</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>5 秒行為觸發：</strong>訪客停留 5 秒自動展開，跳出多語系問候。</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>快選 CTA 磁鐵：</strong>內建「代理分潤算式」與「$4.99 破冰方案」。</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>後端 Webhook 同步：</strong>自動發送 Lead 至 Make/ManyChat。</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400">
              <span className="text-amber-400 font-semibold block mb-1">測試建議：</span>
              您可以在右側試著輸入「如何分成？」或「真的可以秒級收錄嗎？」，體驗前台高壓轉化話術。
            </div>
          </div>

          {/* Interactive Simulation Window */}
          <div className="lg:col-span-7 bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Widget Header */}
            <div className="bg-slate-950 p-4 border-b border-amber-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-amber-300 text-sm">Prime Flow 主動業務 AI (實況展示)</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                在線回覆 &lt; 500ms
              </span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/60 text-xs sm:text-sm">
              {widgetChat.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Chips */}
            <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex gap-2 overflow-x-auto text-xs">
              <button
                onClick={() => {
                  setWidgetInput('如何進行代理分潤？');
                }}
                className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded whitespace-nowrap hover:bg-amber-500/20 transition"
              >
                💰 代理分潤算式
              </button>
              <button
                onClick={() => {
                  setWidgetInput('我想了解 $4.99 破冰體驗方案');
                }}
                className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded whitespace-nowrap hover:bg-emerald-500/20 transition"
              >
                ⚡ 立即領取 $4.99 方案
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950 flex gap-2">
              <input
                type="text"
                value={widgetInput}
                onChange={(e) => setWidgetInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleWidgetSend()}
                placeholder="輸入您的業務需求（例：我想每天獲得 100 筆精準名單）..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleWidgetSend}
                className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-400 transition"
              >
                發送
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Complete Schema.org GEO JSON-LD Generator */}
      {activeSubTab === 'schema' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">符合 Google SGE 與 AI 搜尋 (GEO) 之結構化標籤</h3>
              <p className="text-xs text-slate-400">已包含 SoftwareApplication 與權威 FAQPage，直接複製嵌入 Next.js layout.tsx。</p>
            </div>
            <button
              onClick={() => copyCode(schemaSnippet, 'schema')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'schema' ? '已複製代碼' : '複製 JSON-LD'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto text-xs text-cyan-300 font-mono">
            <pre>{schemaSnippet}</pre>
          </div>
        </div>
      )}

      {/* Tab 4: 55/15/30 Financial & Growth Allocation Simulator */}
      {activeSubTab === 'architecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>55 / 15 / 30 資金全自動劃撥試算</span>
              </h3>
              <p className="text-xs text-slate-400">
                每週後台戰術 AI（`backendStrategicAI.ts`）自動產出週報，並針對 Stripe / Payoneer 款項進行自動劃撥。
              </p>

              <div className="pt-2">
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  模擬週營收 (USD): <strong className="text-amber-400 text-sm">${weeklyRevenueUSD.toLocaleString()} USD</strong>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={weeklyRevenueUSD}
                  onChange={(e) => setWeeklyRevenueUSD(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-700 h-1.5 rounded cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl">
                  <div className="text-slate-400 text-[10px]">55% 主營淨利</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">${profit55.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl">
                  <div className="text-slate-400 text-[10px]">15% 算力儲備</div>
                  <div className="text-cyan-400 font-bold text-sm mt-0.5">${compute15.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl">
                  <div className="text-slate-400 text-[10px]">30% 獲客裂變池</div>
                  <div className="text-amber-400 font-bold text-sm mt-0.5">${growth30.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center">
            <h4 className="text-xs font-semibold text-slate-400 mb-2">每週資金劃撥視覺化分配</h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={45}
                    paddingAngle={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: number) => [`$${val.toLocaleString()} USD`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>55% 純利</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>15% 算力池</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>30% 獲客池</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
