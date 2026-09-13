import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Lock, 
  ExternalLink, 
  Clock, 
  Layers, 
  Percent,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import { PricingPlan, TransferVerificationRecord, UserAccount, SupportedLocale, CurrencyAnchor } from '../types';
import { TRANSLATIONS, formatPriceByCurrency } from '../services/localeService';

interface PricingPageProps {
  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
  onSubmitVerification: (planTitle: string, amountTWD: number, amountUSD: number, last5: string, contact?: string) => void;
  currentLocale: SupportedLocale;
  currency: CurrencyAnchor;
  onChangeCurrency: (curr: CurrencyAnchor) => void;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'impulse_pilot',
    titleKey: '首次衝動破冰方案 (Impulse Pilot)',
    badgeKey: '首次衝動價',
    priceUSD: 4.99,   // 國際錨定美金
    priceTWD: 149,    // 國內錨定台幣
    periodKey: '/ 首月體驗 ($4.99 USD)',
    descKey: '專為 14 天商業破蛋打造，以最低門檻驗證全自動推播與邊緣搜尋效益。',
    featuresKeys: [
      'Google Edge 2026 邊緣預快取架構配置指導',
      '前台主動 Sales AI 5秒留客對談測試節點',
      'LINE / FB / IG / X / TikTok 多模態自動推播排程',
      '55/15/30 資金全自動劃撥腳本與財務週報',
      '一對一人工意向覆核與系統開通權限',
    ],
    allocation: {
      profit55Percent: 55,
      compute15Percent: 15,
      acquisition30Percent: 30,
    },
  },
  {
    id: 'pro_edition',
    titleKey: '標準商業版 Pro',
    priceUSD: 49.00,  // 國際錨定美金
    priceTWD: 1490,   // 國內錨定台幣
    periodKey: '/ 月 ($49.00 USD)',
    descKey: '適合娛樂城代理與小型業務團隊，每月全自動執行多管道推播與流量矩陣。',
    featuresKeys: [
      '包含破冰版全部特權',
      '每月 5,000 次 6 大社群自動發佈與多模態圖文生成',
      'ManyChat / Make 自動化 Webhook 連接管道',
      '全網站免費特權帳號手動指派 (最多 3 組)',
      '內建防一帳號多人使用 (Session Lock) 保護',
      '專屬 Telegram 營運異常即時通報',
    ],
    allocation: {
      profit55Percent: 55,
      compute15Percent: 15,
      acquisition30Percent: 30,
    },
  },
  {
    id: 'enterprise_matrix',
    titleKey: '企業尊榮矩陣版 (Enterprise Matrix)',
    badgeKey: '旗艦推薦',
    priceUSD: 159.00, // 國際錨定美金
    priceTWD: 4900,   // 國內錨定台幣
    periodKey: '/ 月 ($159.00 USD)',
    descKey: '高並發多品牌矩陣體系，整合 Vertex AI Agent Builder 與私有客製化反阻擋架構。',
    featuresKeys: [
      '包含標準版全部特權',
      '無限次邊緣節點快取加速與秒級索引',
      '《朔時金鑰 BattleHQ》主控 Agent 深度串接',
      '全網站免費帳號無限額度手動設定',
      '自訂 OpenAPI Webhook 直連內部 ERP/CRM',
      '7x24 緊急停損防護機制與優先工單',
    ],
    allocation: {
      profit55Percent: 55,
      compute15Percent: 15,
      acquisition30Percent: 30,
    },
  },
];

export const PricingPage: React.FC<PricingPageProps> = ({
  currentUser,
  onOpenAuthModal,
  onSubmitVerification,
  currentLocale,
  currency,
  onChangeCurrency,
}) => {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.zh_TW;
  const [selectedPlanId, setSelectedPlanId] = useState<string>('impulse_pilot');
  const [transferLast5, setTransferLast5] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferLast5.trim()) {
      alert('請輸入匯款帳號後五碼或交易憑證單號');
      return;
    }
    const finalContact = contactInfo.trim() || currentUser?.email || '訪客回報';
    onSubmitVerification(
      selectedPlan.titleKey,
      selectedPlan.priceTWD,
      selectedPlan.priceUSD,
      transferLast5.trim(),
      finalContact
    );
    setSubmitted(true);
    setTransferLast5('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>乙元極流 • 14 天商業破蛋定價策略</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          多幣別即時匯率同步 • 安全線下受保護通道
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>國際業務錨定美金 (USD)，國內業務錨定台幣 (TWD)</strong>。支援樂天商業銀行、臺灣銀行外匯 SWIFT 與 Payoneer 國際快速通道。
        </p>

        {/* Currency Anchor Switcher */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>定價錨定基準：</span>
          </span>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onChangeCurrency('TWD')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currency === 'TWD' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              國內錨定台幣 (TWD)
            </button>
            <button
              onClick={() => onChangeCurrency('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currency === 'USD' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              國際錨定美金 (USD)
            </button>
          </div>
        </div>
      </div>

      {/* 1. 方案選擇卡片 (三欄對比) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          const isImpulse = plan.id === 'impulse_pilot';
          const displayedPrice = formatPriceByCurrency(plan.priceUSD, plan.priceTWD, currency, currentLocale);

          // 55 / 15 / 30 exact amounts in TWD
          const profit55 = currency === 'TWD' 
            ? (plan.priceTWD * 0.55).toFixed(2) 
            : `$${(plan.priceUSD * 0.55).toFixed(2)}`;
          const compute15 = currency === 'TWD' 
            ? (plan.priceTWD * 0.15).toFixed(2) 
            : `$${(plan.priceUSD * 0.15).toFixed(2)}`;
          const acquisition30 = currency === 'TWD' 
            ? (plan.priceTWD * 0.30).toFixed(2) 
            : `$${(plan.priceUSD * 0.30).toFixed(2)}`;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                isSelected
                  ? 'bg-white/95 border-amber-500 shadow-xl ring-2 ring-amber-400/40 -translate-y-1'
                  : 'bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badgeKey && (
                <span className={`absolute -top-3 right-6 text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-sm ${
                  isImpulse
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950'
                    : 'bg-slate-900 text-white'
                }`}>
                  {plan.badgeKey}
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900">{plan.titleKey}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[34px] leading-relaxed">
                  {plan.descKey}
                </p>

                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-slate-100">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {displayedPrice}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {plan.periodKey}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                  {plan.featuresKeys.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* 55/15/30 劃撥即時預覽 */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 mb-4 text-[10px] space-y-1">
                  <div className="font-bold text-slate-700 flex items-center justify-between">
                    <span>55 / 15 / 30 資金精確劃撥：</span>
                    <span className="text-slate-400 font-normal">自動分流</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-center font-mono">
                    <div className="bg-white p-1 rounded border border-slate-200">
                      <div className="text-slate-400 text-[9px]">55% 主營淨利</div>
                      <div className="font-bold text-emerald-700">{profit55}</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200">
                      <div className="text-slate-400 text-[9px]">15% 算力儲備</div>
                      <div className="font-bold text-cyan-700">{compute15}</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-slate-200">
                      <div className="text-slate-400 text-[9px]">30% 獲客裂變</div>
                      <div className="font-bold text-amber-700">{acquisition30}</div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setSubmitted(false);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md hover:bg-slate-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{isSelected ? '✓ 當前選擇此方案' : '選擇此方案'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. 受保護匯款指引區塊 */}
      <div className="bg-white/95 border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                安全線下電匯與支付對帳專區
              </h2>
              <p className="text-xs text-slate-500">
                當前鎖定方案：<strong className="text-amber-700">{selectedPlan.titleKey}</strong>（NT$ {selectedPlan.priceTWD} / ${selectedPlan.priceUSD} USD）
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>防爬蟲受保護受款帳戶</span>
          </div>
        </div>

        {/* 具體銀行與電匯帳號資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* 國內電匯 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">國內台幣電匯 ①</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">樂天網銀</span>
            </div>
            <p className="text-slate-600">銀行：<strong>樂天國際商業銀行（代碼 826）</strong></p>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900">
              <span className="font-bold text-sm">81201001535981</span>
              <button
                onClick={() => handleCopy('81201001535981', 'rakuten')}
                className="text-amber-600 hover:text-amber-700 p-1 rounded hover:bg-slate-100 transition"
                title="複製帳號"
              >
                {copiedAccount === 'rakuten' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400">支援台灣各大 ATM、網銀即時轉帳</p>
          </div>

          {/* 國內/國際電匯 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">國內 / 國際電匯 ②</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">臺灣銀行</span>
            </div>
            <p className="text-slate-600">銀行：<strong>臺灣銀行松山分行（代碼 004）</strong></p>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900">
              <span className="font-bold text-sm">004-064004306448</span>
              <button
                onClick={() => handleCopy('004-064004306448', 'bot')}
                className="text-amber-600 hover:text-amber-700 p-1 rounded hover:bg-slate-100 transition"
                title="複製帳號"
              >
                {copiedAccount === 'bot' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400">外匯 SWIFT 碼：<code>BKTWTWTP</code></p>
          </div>

          {/* Payoneer 快速付款 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">全球跨境支付 ③</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">Payoneer</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                支援國際信用卡、歐美 ACH 電匯或 Payoneer 錢包扣款。
              </p>
            </div>
            
            <a
              href="https://link.payoneer.com/Token?t=4D0FBCB1CAEE48E48FEACE39662D6BB7&src=mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
            >
              <span>開啟 Payoneer 專屬支付通道</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>

        {/* 匯款憑證回報表單 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
            <Send className="w-4 h-4 text-amber-600" />
            <span>完成轉帳後，請回報帳號後五碼（啟動人工覆核驗證）</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            送出憑證後，系統將建立 <code>PENDING_VERIFICATION</code> 訂單，最高管理者（<code className="text-slate-700">kclee1654@gmail.com</code>）核對流水後將於 1 小時內開通免費授權。
          </p>

          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-5">
                <label className="block text-slate-700 font-semibold mb-1">匯款帳號後五碼 / Payoneer 憑證單號</label>
                <input
                  type="text"
                  placeholder="例如: 15398 或 Payoneer 交易流水號"
                  value={transferLast5}
                  onChange={(e) => setTransferLast5(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-700 font-semibold mb-1">您的聯繫方式 (接收開通通知)</label>
                <input
                  type="text"
                  placeholder={currentUser ? currentUser.email : "Email 或 LINE ID"}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-3 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                >
                  <span>送出憑證回報</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-bold">✓ 憑證已成功回報！訂單狀態：PENDING_VERIFICATION</strong>
                <p>
                  已為您鎖定【{selectedPlan.titleKey}】。最高管理者 (kclee1654@gmail.com) 核對入帳紀錄後，將自動發放全網站免費使用者通行證。
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-emerald-700 font-bold underline mt-1 text-[11px]"
                >
                  回報另一筆轉帳
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
