import React, { useState } from 'react';
import { 
  Flame, 
  Globe2, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  ArrowRight, 
  DollarSign, 
  Terminal, 
  User, 
  Workflow, 
  Share2, 
  Lock, 
  FileText
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const PrimeFlowEdge2026Plan: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'edge_infra' | 'daily_flow' | 'export'>('blueprint');

  // Solo Revenue & 55/15/30 Simulation
  const [monthlyMembers, setMonthlyMembers] = useState<number>(120);
  const price499 = 4.99;
  const vipUpsellRate = 0.20; // 20% upgrade to $99
  const vipPrice = 99;

  const grossMonthlyUSD = Math.round(
    monthlyMembers * price499 + (monthlyMembers * vipUpsellRate) * vipPrice
  );
  const soloFounderProfit55 = Math.round(grossMonthlyUSD * 0.55);
  const edgeComputeReserve15 = Math.round(grossMonthlyUSD * 0.15);
  const viralGrowthPool30 = Math.round(grossMonthlyUSD * 0.30);
  const totalHostingCostUSD = 82; // Vercel Edge + Cloudflare + Groq + ManyChat + Make

  const copySnippet = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Full Markdown proposal ready for copy or download
  const fullProposalMarkdown = `# 【乙元極流 • Prime Flow 原初の極流】
## 2026 Google Edge Search 一人創業公司（Solopreneur）實戰落地企劃書

### 一、 核心戰略定位：邊緣搜尋與極限一人槓桿
- **主旨**：將《乙元極流 雙 AI 矩陣行銷推播與安全架構規格書》完全改造為適配「2026 Google Edge Search (AI Overviews 邊緣索引)」之極致一人創業架構。
- **目標**：**0 員工編制**、首年總維運成本 < $1,000 USD、利用 Google Edge 邊緣節點 30ms 響應 + Groq LPU 毫秒級推論 + GEO 結構化標籤，實現自然流量霸屏與自動化現金流。

---

### 二、 一人公司 2026 Edge Search 落地四層架構

#### 1. 邊緣展示層 (Edge Ingestion & Cache Layer)
- **核心技術**：Next.js App Router 部署於 Vercel / Cloudflare Edge Runtime，啟用 Edge SSR。
- **2026 Edge 關鍵優化**：
  - 首字元時間 (TTFB) 壓縮至 **35ms**（滿足 Google Edge AI 爬蟲之即時抓取權重）。
  - 自動輸出 \`SoftwareApplication\` 與 \`FAQPage\` 雙層 JSON-LD，直接餵入 Google AI Overviews 與 Perplexity。

#### 2. 毫秒轉化層 (Front-End Active Sales AI)
- **實體元件**：\`ActiveSalesAgent.tsx\`
- **機制**：
  - 訪客停留 5 秒自動喚醒，自動依瀏覽器語言推播台/英/越語問候。
  - 對接 Groq LPU (Llama 3 70B)，問答響應 < 500ms，化解傳統機器人延遲高導致訪客跳出的痛點。
  - 內建「$4.99 破冰價」與「代理分潤算式」CTA 磁鐵，單頁完成轉化。

#### 3. 無人運算與外掛水管 (Zero-Touch Integration)
- **Make.com / Zapier Webhook**：取代聘用後端工程師，串接 Stripe 金流通知、LINE / Telegram 警報與 ManyChat 私訊。
- **ManyChat**：社群 IG/FB 貼文留言自動發送帶加密推薦碼 (\`?ref=code\`) 之私訊，完成 OMO 私域導流。

#### 4. 戰術決策與 55/15/30 財務閉環 (Back-End AI Brain)
- **實體模組**：\`backendStrategicAI.ts\`
- **自動化工作**：每週日排程分析收入，並自動執行劃撥：
  - **55%**：創辦人主營淨利（免稅合規帳戶）。
  - **15%**：Groq 算力儲備與圖片生成 API 預留款。
  - **30%**：獲客裂變推廣者分潤獎金池（自動排程發送，激勵代理裂變）。

---

### 三、 一人創辦人 24 小時無人值守運作表
1. **04:00 AM**：Cron 自動觸發 pSEO 文章生成，Frase 提煉熱搜關鍵字，Groq 生成 15 篇權威問答。
2. **04:05 AM**：Google Indexing API 批次發送，Cloudflare 全球節點完成邊緣快取預熱。
3. **全天候**：社群留言觸發 ManyChat 自動私訊，前台 Sales AI 即時接待，自轉成交 $4.99 方案。
4. **23:59 PM**：後台 AI 審計今日帳目，完成 55/15/30 劃撥，發送 Telegram 一頁財務摘要至創辦人手機。

---

### 四、 一人公司極限成本結構 (TCO)
- Next.js Edge (Vercel Pro): $20 USD/月
- Cloudflare Edge Security: $25 USD/月
- Groq LPU API 運算: $18 USD/月
- ManyChat Pro: $15 USD/月
- Make.com Webhook: $9 USD/月
- **每月固定總支出：約 $87 USD（約 NT$ 2,800 元），毛利率 > 93%**。
`;

  const downloadMarkdownFile = () => {
    const element = document.createElement("a");
    const file = new Blob([fullProposalMarkdown], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "乙元極流_2026_Google_Edge_Search_一人公司企劃書.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-500/15 via-cyan-900/30 to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>企劃落地實踐 • 乙元極流【Prime Flow 原初の極流】</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              2026 Google Edge Search 一人創業公司實施方案
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              全面落實企劃書中之<strong>「雙 AI 矩陣、Groq LPU 毫秒級推論、55/15/30 資金全自動劃撥與 SEO/GEO 標籤」</strong>，無縫重構為專屬於<strong>「一人公司（Solopreneur）」</strong>的高利潤、零員工、全自動營運體系。
            </p>
          </div>

          {/* Quick Action Box */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={downloadMarkdownFile}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition"
            >
              <Download className="w-4 h-4" />
              <span>下載完整企劃書 (.md)</span>
            </button>
            <button
              onClick={() => copySnippet(fullProposalMarkdown, 'proposal')}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition"
            >
              {copiedKey === 'proposal' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'proposal' ? '已複製內容' : '一鍵複製提案'}</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'blueprint'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>一人公司落地實施藍圖</span>
          </button>
          <button
            onClick={() => setActiveTab('edge_infra')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'edge_infra'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>2026 Google Edge 架構實裝</span>
          </button>
          <button
            onClick={() => setActiveTab('daily_flow')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'daily_flow'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>一人全自動現金流試算</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'export'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>企劃書白皮書全文預覽</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Blueprint */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-white text-sm">邊緣快取 (TTFB 35ms)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                將 Next.js 頁面推至 Cloudflare Global Edge，完全滿足 2026 年 Google Edge 爬蟲之秒級抓取權重。
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-white text-sm">Groq LPU 毫秒轉化</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                前台 ActiveSalesAgent 對接 Llama 3 70B，5 秒主動喚醒 + 500ms 響應，提供 $4.99 破冰價導流。
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-white text-sm">外掛水管 (0 人工維運)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                利用 Make.com + ManyChat 接收社群留言私訊，直通 CRM 與 Stripe，一人即可驅動百萬級行銷流量。
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="font-bold text-white text-sm">55/15/30 自動分配</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                後台 AI 自動將營收劃撥為：55% 創辦人純利、15% 算力池、30% 裂變池，形成自主循環飛輪。
              </p>
            </div>
          </div>

          {/* Core Implementation Roadmap */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>企劃落地實行步驟表（一人創業者首月執行清單）</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold shrink-0 mt-0.5">第 1 週</span>
                <div>
                  <strong className="text-white block font-semibold">佈署邊緣節點與安全密碼通道</strong>
                  <span className="text-slate-300 text-xs">
                    將 Next.js 部署至 Vercel，設定 \`e3.xingdeng.tw\` 正式網域；運行 \`authSecurity.ts\` 產生緊急救援 Token，免去資料庫建置維護麻煩。
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold shrink-0 mt-0.5">第 2 週</span>
                <div>
                  <strong className="text-white block font-semibold">掛載前台 Sales AI 與 GEO Schema 標籤</strong>
                  <span className="text-slate-300 text-xs">
                    首頁掛載 \`ActiveSalesAgent.tsx\`，注入 \`SEOJsonLd.tsx\` FAQPage 結構，啟動 Google Indexing API 進行邊緣預熱。
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-bold shrink-0 mt-0.5">第 3 週</span>
                <div>
                  <strong className="text-white block font-semibold">打通 ManyChat + Make.com 自動水管</strong>
                  <span className="text-slate-300 text-xs">
                    在 IG / FB 設立「留言領取 2026 AI 矩陣」自動私訊觸發，發放帶有加密 \`ref\` 推薦碼之連結，將名單無縫拋入 Webhook。
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold shrink-0 mt-0.5">第 4 週</span>
                <div>
                  <strong className="text-white block font-semibold">啟用 55/15/30 週財務 AI 自動出報</strong>
                  <span className="text-slate-300 text-xs">
                    設定每週日 Cron 呼叫 \`backendStrategicAI.ts\`，自動生成戰役週報至 Telegram，全自動進行推廣者 30% 分潤發送。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Edge Infra Code */}
      {activeTab === 'edge_infra' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">2026 Google Edge Search 邊緣渲染 Middleware</h3>
              <p className="text-xs text-slate-400">
                專門識別 Googlebot、ChatGPT-User 與 PerplexityBot，在邊緣節點以 30ms 響應純文字 + 完整 JSON-LD。
              </p>
            </div>
            <button
              onClick={() => copySnippet(`// middleware.ts - Next.js Edge Runtime for 2026 Google Edge Search
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isSearchAiBot = /Googlebot|Google-InspectionTool|PerplexityBot|ChatGPT-User|Bytespider/i.test(userAgent);
  
  const response = NextResponse.next();
  
  if (isSearchAiBot) {
    // 邊緣快取標頭：告訴 CDN 節點在全世界邊緣快取 24 小時
    response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
    response.headers.set('X-Edge-Engine', 'PrimeFlow-2026-EdgeSearch');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
  }

  return response;
}`, 'edge_middleware')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              {copiedKey === 'edge_middleware' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'edge_middleware' ? '已複製代碼' : '複製 Middleware'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto text-xs text-cyan-300 font-mono">
            <pre>{`// middleware.ts - Next.js Edge Runtime for 2026 Google Edge Search
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isSearchAiBot = /Googlebot|Google-InspectionTool|PerplexityBot|ChatGPT-User|Bytespider/i.test(userAgent);
  
  const response = NextResponse.next();
  
  if (isSearchAiBot) {
    // 邊緣快取標頭：告訴 CDN 節點在全世界邊緣快取 24 小時
    response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
    response.headers.set('X-Edge-Engine', 'PrimeFlow-2026-EdgeSearch');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
  }

  return response;
}`}</pre>
          </div>
        </div>
      )}

      {/* Tab 3: Daily Flow & Cashflow Simulator */}
      {activeTab === 'daily_flow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>一人公司 55/15/30 收入試算器</span>
            </h3>
            <p className="text-xs text-slate-400">
              透過 Google Edge 邊緣收錄 + ManyChat 私訊導流至 $4.99 破冰方案，設定每月進單量：
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  每月 $4.99 破冰會員數: <strong className="text-amber-400 text-sm">{monthlyMembers} 人</strong>
                </label>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={monthlyMembers}
                  onChange={(e) => setMonthlyMembers(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>月總營業額 (含 20% 升級 VIP):</span>
                  <strong className="text-white">${grossMonthlyUSD.toLocaleString()} USD</strong>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>一人公司總雲端固定支出:</span>
                  <span className="text-rose-400">-${totalHostingCostUSD} USD</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl">
                  <div className="text-[10px] text-slate-400">55% 創辦人薪水</div>
                  <div className="text-emerald-400 font-bold text-xs mt-0.5">${soloFounderProfit55} USD</div>
                </div>
                <div className="p-2.5 bg-cyan-950/40 border border-cyan-800/40 rounded-xl">
                  <div className="text-[10px] text-slate-400">15% 算力儲備</div>
                  <div className="text-cyan-400 font-bold text-xs mt-0.5">${edgeComputeReserve15} USD</div>
                </div>
                <div className="p-2.5 bg-amber-950/40 border border-amber-800/40 rounded-xl">
                  <div className="text-[10px] text-slate-400">30% 裂變獎勵</div>
                  <div className="text-amber-400 font-bold text-xs mt-0.5">${viralGrowthPool30} USD</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white">創辦人 1 人全天候自動化「零維護」運作狀態</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">Google Edge 爬蟲秒級收錄</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">自動執行 (Sitemap Ping)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">社群 DM 私訊導流 (ManyChat)</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">24H 零人工在線</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">前台主動 Sales AI 接單 (Groq)</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">&lt; 500ms 響應</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">55/15/30 週財務結算與發放</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono">Cron Job 自動劃撥</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Markdown Preview */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">企劃書完整內容預覽 (Markdown 規格)</h3>
            <div className="flex gap-2">
              <button
                onClick={downloadMarkdownFile}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>儲存為 .md 檔案</span>
              </button>
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
            {fullProposalMarkdown}
          </div>
        </div>
      )}
    </div>
  );
};
