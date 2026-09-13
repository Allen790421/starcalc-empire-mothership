import React, { useState } from 'react';
import { 
  Flame, 
  Share2, 
  Copy, 
  Check, 
  Gift, 
  ArrowRight, 
  MessageCircle, 
  Search, 
  Bot, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';
import { UserAccount } from '../types';

interface ViralGrowthSuiteProps {
  currentUser: UserAccount | null;
  onOpenPricing: () => void;
}

export const ViralGrowthSuite: React.FC<ViralGrowthSuiteProps> = ({
  currentUser,
  onOpenPricing
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSocialSnippet, setCopiedSocialSnippet] = useState(false);
  const [socialKeyword, setSocialKeyword] = useState('破冰149');

  const refCode = currentUser?.referralCode || 'VIP-8899';
  const referralShareUrl = `https://dawn-quant.xingdeng.tw/?ref=${refCode}&plan=pilot`;

  // Posty AI inspired copy templates that drive social comments into ManyChat DMs
  const postySocialTemplate = `🔥【2026一人創業 x 網頁自動化實戰】
我剛用這套系統把每日 3 小時人工抓取、對帳和 Google Edge 秒級收錄完全跑順！
現在官方展開「14天商業破蛋計畫」，首月破冰價只要 NT$149 ($4.99 USD)，而且 30% 直接作為推廣現金分潤！

👇 在下方留言【${socialKeyword}】，AI 會自動私訊你「免排隊審核通道」與自動化白皮書！
🔗 專屬通道：${referralShareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySocialSnippet = () => {
    navigator.clipboard.writeText(postySocialTemplate);
    setCopiedSocialSnippet(true);
    setTimeout(() => setCopiedSocialSnippet(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Banner: 獲客加速主題 */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-yellow-500/20 border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>OMO 全自動自增客源與裂變加速模組</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              赢取 AI 信任與 30% 裂變滾雪球獲利閉環
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              整合 <strong>ManyChat 自動私訊、Surfer/Frase SERP 語意權威、Coze 降級客服與 30% 推廣裂變池</strong>，不用燒大錢買廣告，透過社交擴散與自然搜尋全面吸引精準客源。
            </p>
          </div>

          <div className="bg-white px-5 py-4 rounded-2xl border border-amber-200 shadow-sm text-center shrink-0">
            <div className="text-[11px] text-slate-400 font-medium">每推薦 1 筆破冰方案</div>
            <div className="text-2xl font-black text-amber-600">現賺 NT$ 44.7</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">30% 獲客行銷池秒撥</div>
          </div>
        </div>
      </div>

      {/* Grid: 4 大自增客源利器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 利器 1：ManyChat / Chatfuel 社群留言自動發私訊閉環 (DM Trigger) */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">ManyChat 社群「留言自動私訊」</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold border border-cyan-200">
                100% 自動轉單
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              在 IG 短影音、FB 貼文設定關鍵字自動觸發。只要用戶在貼文底下留言指定字串，ManyChat 立即自動私訊專屬推薦網址，導流至 NT$149 衝動方案。
            </p>

            {/* Posty AI 社群貼文產生器 */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-700">
                <span>Posty AI 爆款貼文範本 (含 DM 鉤子)：</span>
                <span className="text-[11px] text-amber-700 font-mono">觸發字：{socialKeyword}</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-600 font-mono text-[11px] whitespace-pre-wrap max-h-32 overflow-y-auto">
                {postySocialTemplate}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopySocialSnippet}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm mt-3"
          >
            {copiedSocialSnippet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSocialSnippet ? '已複製貼文範本！直接發佈社群' : '一鍵複製社群吸客文案'}</span>
          </button>
        </div>

        {/* 利器 2：30% 裂變分潤鏈結 (Referral Cash Pool) */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Gift className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">30% 獲客裂變推廣連結</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                自動結算返佣
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              把您的專屬推薦鏈結分享給朋友或合作社群。朋友以 NT$149 體驗時，系統自動將 30%（NT$44.7）撥入您的分潤錢包；若升級商業版 NT$1,490，單筆直接獲利 NT$447！
            </p>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">您的專屬帶 Code 推薦網址：</label>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-800 text-xs truncate">
                <span className="truncate flex-1">{referralShareUrl}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-sm mt-3"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? '已複製專屬推廣鏈結！' : '複製專屬裂變鏈結分享'}</span>
          </button>
        </div>

        {/* 利器 3：Surfer SEO / Frase 提煉之「AI 搜尋信任背書 (GEO 霸屏)」 */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">贏得 AI 信任 (Perplexity / ChatGPT GEO)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            透過 Surfer SEO & Frase 分析前十名高意向搜索詞，直接轉化為 Schema.org FAQPage 標籤。當用戶在 Perplexity、Google AI Overviews 查詢「2026 網頁自動化」時，AI 會直接引述本站作為權威來源。
          </p>

          <div className="space-y-1.5 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
              <span className="font-medium text-emerald-950">Q: 如何不用寫程式實現網頁自動過單？</span>
              <span className="text-[10px] font-bold text-emerald-700">98% 引用率</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
              <span className="font-medium text-emerald-950">Q: 2026 Google Edge Search 一人公司如何運作？</span>
              <span className="text-[10px] font-bold text-emerald-700">秒級索引</span>
            </div>
          </div>
        </div>

        {/* 利器 4：Coze / Botpress 視覺化多渠道輔助 (LINE / TG 自動引流) */}
        <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Coze / Botpress 多渠道引流機器人</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              部署在 LINE 官方帳號與 Telegram 群組，作為前台的降級對談節點。訪客問及「代理分潤」或「自動化方案」時，機器人自動拋出 NT$149 破冰通道並引導登記。
            </p>

            <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Make.com 自動水管自動化串接：</span>
              </div>
              <p>用戶一旦於 LINE/TG 留下意向，自動發送 Webhook 寫入後台審核清單，0 秒延遲！</p>
            </div>
          </div>

          <button
            onClick={onOpenPricing}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1.5 transition mt-2"
          >
            <span>查看完整 NT$149 破冰方案與回報</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
