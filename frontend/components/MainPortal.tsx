import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  Layers, 
  FileCheck,
  Check,
  HelpCircle,
  Flame,
  Gift,
  CreditCard
} from 'lucide-react';
import { AnonymousIntentOrder } from '../types';

interface MainPortalProps {
  intentOrders: AnonymousIntentOrder[];
  onSubmitIntent: (category: string, contact: string, detail: string) => void;
  onOpenConsultant: () => void;
  onOpenCalculator: () => void;
  onOpenPricing: () => void;
  onOpenGrowthSuite: () => void;
}

export const MainPortal: React.FC<MainPortalProps> = ({
  intentOrders,
  onSubmitIntent,
  onOpenConsultant,
  onOpenCalculator,
  onOpenPricing,
  onOpenGrowthSuite,
}) => {
  const [category, setCategory] = useState('網頁自動化與資料匯入');
  const [contact, setContact] = useState('');
  const [detail, setDetail] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Live simulation in hero
  const [previewMsg, setPreviewMsg] = useState('');
  const [previewChat, setPreviewChat] = useState([
    { role: 'ai', text: '您好！我是乙元極流智能顧問。想瞭解如何用 AI 自動化矩陣每天為您帶進 100+ 高品質意向名單嗎？' }
  ]);

  const handlePreviewSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewMsg.trim()) return;
    const msg = previewMsg;
    setPreviewChat(prev => [...prev, { role: 'user', text: msg }]);
    setPreviewMsg('');
    setTimeout(() => {
      setPreviewChat(prev => [
        ...prev, 
        { 
          role: 'ai', 
          text: `收到！針對「${msg}」，系統已建立 Groq LPU 毫秒級流程並支援 2026 Google Edge 秒級收錄。推薦立即體驗 NT$149 破冰方案，同時可享有 30% 推廣裂變分潤！` 
        }
      ]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || !detail.trim()) return;
    onSubmitIntent(category, contact, detail);
    setSubmittedMessage('您的申請已順利送出！我們將在 24 小時內與您聯繫並進行意向覆核。');
    setContact('');
    setDetail('');
    setTimeout(() => setSubmittedMessage(null), 8000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* 1. Hero Section: Clean & Reassuring Value Proposition */}
      <div className="bg-white/85 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                <Flame className="w-3.5 h-3.5" />
                <span>首次衝動價 NT$ 149 / 首月 ($4.99 USD)</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Gift className="w-3 h-3 text-emerald-600" />
                <span>30% 裂變分潤獎勵</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              把繁雜日常網頁作業，<br />
              交給全天候運行的 AI 流程。
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              專為一人公司與成長型團隊打造：從多來源公開資料擷取、邊緣秒級搜尋曝光，到 ManyChat 自動私訊導流，以 55/15/30 資金公式實現自轉獲利閉環。
            </p>

            {/* Clear Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPricing}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>體驗 NT$149 破冰方案</span>
              </button>

              <button
                onClick={onOpenGrowthSuite}
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-1.5"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>獲客裂變加速庫</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs sm:text-sm transition"
              >
                省工時試算
              </button>
            </div>

            {/* Compliance Safety Notice */}
            <div className="pt-3 text-[11px] text-slate-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>本站支援安全線下電匯對帳（樂天網銀/台銀/Payoneer），最高管理者人工覆核開通。</span>
            </div>
          </div>

          {/* Mini Interactive Preview Window on the Right */}
          <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200 rounded-2xl p-4 shadow-inner flex flex-col h-[320px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs">
              <div className="flex items-center space-x-2 text-slate-700 font-bold">
                <Bot className="w-4 h-4 text-amber-600" />
                <span>智能助理互動實況 (Groq LPU 驅動)</span>
              </div>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                &lt; 500ms
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-xs pr-1">
              {previewChat.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl leading-relaxed ${
                    item.role === 'user' 
                      ? 'bg-slate-900 text-white ml-6' 
                      : 'bg-white text-slate-800 border border-slate-200/70 mr-4'
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handlePreviewSend} className="mt-2 pt-2 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={previewMsg}
                onChange={(e) => setPreviewMsg(e.target.value)}
                placeholder="輸入：我想了解代理分潤算式..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
              <button 
                type="submit" 
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                諮詢
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Core Three Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold mb-3 border border-cyan-100">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">網頁操作全自動化</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            告別每日人工手動登入、複製貼上與重複資料匯入，透過穩定排程自動完成 85% 以上繁複工時。
          </p>
        </div>

        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 border border-amber-100">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">2026 邊緣搜尋與 GEO 加速</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            佈署於全球邊緣快取節點（35ms 響應），結合結構化內容標準，讓搜尋引擎與 AI 優先引述您的解答。
          </p>
        </div>

        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">30% 裂變獲利自轉飛輪</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            透過 ManyChat 社群私訊自動送出帶碼連結，自動劃撥 30% 分潤給推廣者，滾動式吸引大量客源。
          </p>
        </div>
      </div>

      {/* 3. The Dedicated Application Form & Transparent Verification Board */}
      <div id="intent-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Clean Application Form */}
        <div className="lg:col-span-6 bg-white/90 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="space-y-1 mb-5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              限量內測名額
            </span>
            <h2 className="text-xl font-bold text-slate-900">預約 14 天商業破蛋需求內測</h2>
            <p className="text-xs text-slate-500">
              填寫您的業務流程痛點，我們將由專人進行人工意向驗證並安排諮詢。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">需求類別</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                <option>網頁自動化與資料匯入</option>
                <option>2026 邊緣搜尋與 GEO 排名優化</option>
                <option>ManyChat 社群私訊導流與裂變分潤</option>
                <option>首次衝動價 NT$149 破冰方案諮詢</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">聯繫方式 (Email 或 LINE ID)</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="例如: contact@company.tw 或 line: your_id"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">希望解決的業務細節</label>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="例如：希望能透過 ManyChat 自動發送 NT$149 優惠代碼，並自動匯整匯款資料..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                required
              />
            </div>

            {submittedMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                {submittedMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>送出內測登記（免任何線上扣款）</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right: Transparent Progress Board */}
        <div className="lg:col-span-6 bg-white/90 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">排隊與意向覆核進度</h3>
              <p className="text-xs text-slate-500">透明公開進度，嚴格遮蔽真實聯繫隱私</p>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              共 {intentOrders.length} 筆交付排程
            </span>
          </div>

          <div className="space-y-3">
            {intentOrders.map((order) => (
              <div 
                key={order.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      {order.anonymousId}
                    </span>
                    <span className="font-bold text-slate-800">{order.category}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    order.status === 'paid_verified'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {order.status === 'paid_verified' ? '已完成意向開通' : '等待專人覆核'}
                  </span>
                </div>

                <p className="text-slate-600 text-xs line-clamp-2">{order.requestSnippet}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>用戶代號：{order.contactInfo}</span>
                  <span>{order.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
