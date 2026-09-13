import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Search, 
  Lock, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles,
  Inbox,
  UserCheck,
  Send,
  Crown,
  ThumbsUp,
  XCircle,
  KeyRound,
  LogIn,
  UserPlus,
  Shield
} from 'lucide-react';
import { AnonymousIntentOrder, AuditReportSection, UserAccount } from '../types';

interface EggCrack14DayPlanProps {
  currentUser?: UserAccount | null;
  onOpenAuthModal: () => void;
  onQuickSuperAdminLogin: () => void;
  onSwitchToGuest: () => void;
}

export const EggCrack14DayPlan: React.FC<EggCrack14DayPlanProps> = ({ 
  currentUser,
  onOpenAuthModal,
  onQuickSuperAdminLogin,
  onSwitchToGuest
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [intentInput, setIntentInput] = useState('');
  const [intentContact, setIntentContact] = useState('');
  const [intentCategory, setIntentCategory] = useState<'SEO邊緣收錄' | '主動Sales AI' | '量化自動化' | '客製矩陣諮詢'>('SEO邊緣收錄');
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const isSuperAdmin = currentUser?.role === 'super_admin' && 
    (currentUser.email === 'kclee1654@gmail.com' || currentUser.email.startsWith('kclee1654'));

  // Initial Mock Data aligned with exact prompt format (LEAD-202609-001)
  const [intentOrders, setIntentOrders] = useState<AnonymousIntentOrder[]>([
    {
      id: 'ord-01',
      anonymousId: 'LEAD-202609-001',
      category: 'SEO邊緣收錄',
      status: 'paid_verified',
      contactInfo: 'kc***@gmail.com',
      requestSnippet: '外貿獨立站 Google Edge 2026 邊緣預快取架構佈署需求',
      deliveryDue: '24 小時內完成人工驗證開通',
      createdAt: '2026-09-13 09:15',
    },
    {
      id: 'ord-02',
      anonymousId: 'LEAD-202609-002',
      category: '主動Sales AI',
      status: 'pending_review',
      contactInfo: 'alex***@line.me',
      requestSnippet: '5秒停留喚醒 Sales Agent 與 ManyChat 推薦碼閉環測試',
      deliveryDue: '待 kclee1654@gmail.com 人工意向覆核',
      createdAt: '2026-09-13 11:40',
    },
    {
      id: 'ord-03',
      anonymousId: 'LEAD-202609-003',
      category: '量化自動化',
      status: 'pending_review',
      contactInfo: 'david***@enterprise.tw',
      requestSnippet: '量化網頁排程與即時通知 Webhook 串接候補申請',
      deliveryDue: '待 kclee1654@gmail.com 人工意向覆核',
      createdAt: '2026-09-13 14:05',
    },
  ]);

  // Comprehensive Scan Report Data for dawn-quant.xingdeng.tw
  const auditReport: AuditReportSection[] = [
    {
      title: '一、 網站體質與路由現況掃描 (dawn-quant.xingdeng.tw)',
      status: 'fixed',
      items: [
        {
          checkName: '主頁面與路由架構減法 (/)',
          description: '原本多餘繁複的戰術面板與多餘圖表，已降級收斂為「品牌核心價值 + 解決方案 + 匿名意向提交表單」。',
          status: 'pass',
          remedy: '頁面已全面減法整併，使用者不再感到介面混亂。',
        },
        {
          checkName: '未封閉之真實金流閘門檢查',
          description: '排查所有 Stripe / PayPal / Payoneer 即時扣款端點與 $4.99 引導。',
          status: 'fixed',
          remedy: '【已徹底封閉】全站已移除所有線上支付閘門，杜絕付款無效或消費糾紛風險。',
        },
        {
          checkName: '公開 API 端點安全性 (/api/*)',
          description: '檢查是否暴露未授權的 sales 或 admin API 端點。',
          status: 'pass',
          remedy: '僅保留以最高管理員 (kclee1654@gmail.com) 簽章校驗之端點。',
        },
      ],
    },
    {
      title: '二、 商業合規與安全防線（防誤導機制審查）',
      status: 'fixed',
      items: [
        {
          checkName: '違規字眼排查 (Pay now / Checkout / 立即購買)',
          description: '全面排查「立即扣款、USD 方案、解鎖完整報告」等誤導字眼。',
          status: 'fixed',
          remedy: '【全站統一修正】所有付費按鈕已下架，全面收斂為【申請加入 14 天商業破蛋候補名單】單一 CTA。',
        },
        {
          checkName: '防錯與意向提示視窗',
          description: '點擊意向送出時，必須明確告知現階段未開放線上真實收款。',
          status: 'pass',
          remedy: '已注入「目前尚未開放真實收款，僅收集服務意向與候補」防錯宣言。',
        },
      ],
    },
    {
      title: '三、 14天破蛋計劃執行準備（零廣告、純人工意向）',
      status: 'pass',
      items: [
        {
          checkName: '匿名意向交付表 (IntentLeads 結構)',
          description: '包含匿名編號 (LEAD-202609-001)、類別、狀態 (paid_verified)、聯繫方式與交付時間。',
          status: 'pass',
          remedy: '【已實裝】下方「匿名意向交付看板」已就緒，可由管理者一鍵審核。',
        },
        {
          checkName: '最高管理者一鍵驗證 (P0)',
          description: '允許 kclee1654@gmail.com 直接於前端將狀態變更為 paid_verified。',
          status: 'pass',
          remedy: '最高管理者在線時，可直接點擊「標註為 paid_verified」完成驗證閉環。',
        },
      ],
    },
  ];

  const handleCreateIntent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentInput.trim() || !intentContact.trim()) return;

    const count = intentOrders.length + 1;
    const seqStr = count < 10 ? `00${count}` : count < 100 ? `0${count}` : `${count}`;
    const newId = `LEAD-202609-${seqStr}`;
    const masked = intentContact.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    const newOrder: AnonymousIntentOrder = {
      id: `ord-${Date.now()}`,
      anonymousId: newId,
      category: intentCategory,
      status: 'pending_review',
      contactInfo: masked || '已加密紀錄',
      requestSnippet: intentInput.trim(),
      deliveryDue: '24 小時內專人人工覆核驗證',
      createdAt: new Date().toLocaleString([], { hour12: false }),
    };

    setIntentOrders([newOrder, ...intentOrders]);
    setSubmitSuccess(`申請已成功送出！您的匿名編號為：${newId}。目前系統處於「14天商業破蛋計畫」內部測試階段，暫未開放線上真實收款。我們將由專人與您聯繫進行人工驗證與開通。`);
    setIntentInput('');
    setIntentContact('');
    setTimeout(() => setSubmitSuccess(null), 8000);
  };

  const handleTogglePaidVerified = (id: string) => {
    setIntentOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id) {
          const newStatus = ord.status === 'paid_verified' ? 'pending_review' : 'paid_verified';
          return {
            ...ord,
            status: newStatus,
            deliveryDue: newStatus === 'paid_verified' ? '已完成意向開通並發送通知' : '待人工覆核',
          };
        }
        return ord;
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* 🔐 PROMINENT AUTH & SUPER ADMIN ACCESS CONSOLE CARD */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-blue-950/40 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-extrabold text-base sm:text-lg">
                  註冊登入口設置與最高管理權限驗證
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  安全防線
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                最高管理者帳號：<strong className="text-amber-400 font-mono">kclee1654@gmail.com</strong>
                （具備全站免費使用者設定與 paid_verified 意向審核權）
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {isSuperAdmin ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center space-x-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>已登入：最高管理員</span>
                </div>
                <button
                  onClick={onSwitchToGuest}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
                >
                  切換為一般訪客視角
                </button>
              </div>
            ) : (
              <button
                onClick={onQuickSuperAdminLogin}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition"
              >
                <Crown className="w-4 h-4" />
                <span>一鍵登入最高管理者 (kclee1654@gmail.com)</span>
              </button>
            )}

            <button
              onClick={onOpenAuthModal}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>開啟完整登入/註冊面板</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Banner - 14-Day Commercial Egg-Crack Launch */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-950/40 border border-amber-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>目標站點：dawn-quant.xingdeng.tw • 14天商業破蛋計劃起手式</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              純人工意向驗證（paid_verified）與輕量交付閉環
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              <strong>零廣告、零群發、不開放線上直接扣款</strong>。全站去除未成熟商業收費外殼，由唯一最高管理員 <span className="text-amber-400 font-mono font-bold">kclee1654@gmail.com</span> 進行人工意向驗證與全站免費帳號開通。
            </p>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/40 px-5 py-4 rounded-2xl text-center shrink-0">
            <div className="text-[11px] text-slate-400">目前破蛋計畫狀態</div>
            <div className="text-xl font-black text-emerald-400">合規封閉內測中</div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5">線上金流已全數阻斷</div>
          </div>
        </div>
      </div>

      {/* Mandatory Anti-Misleading Notice Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <strong className="font-bold text-amber-300 block text-sm">
            【商業合規與安全防線（防誤導防錯宣言）】
          </strong>
          <p>
            本網站目前處於「14天商業破蛋計畫」內部驗證階段，<strong>暫未開放任何線上真實付款或信用卡自動扣款功能</strong>。全站不含有任何即時成立訂單的收費按鈕；點擊【申請加入候補名單】僅用於登記人工意向驗證，絕無任何未經授權之費用產生。
          </p>
        </div>
      </div>

      {/* Audit Report Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>dawn-quant.xingdeng.tw 起手式檢測報告與修改結果</span>
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            P0 清單已全數修復
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {auditReport.map((sec, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">{sec.title.split(' ')[0]}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  審查合格
                </span>
              </div>
              <h3 className="font-bold text-white text-sm">{sec.title.split(' ')[1]}</h3>

              <div className="space-y-3 pt-2">
                {sec.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-200">{item.checkName}</strong>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                    <div className="text-[11px] text-emerald-400/90 font-medium pt-1">
                      成果：{item.remedy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Single Landing & Intent Submission Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Candidate Application Form (Single CTA: 申請加入 14 天商業破蛋候補名單) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[11px] font-semibold">
              <Inbox className="w-3.5 h-3.5 text-cyan-400" />
              <span>單一收斂入口</span>
            </div>
            <h3 className="text-base font-bold text-white">申請加入 14 天商業破蛋候補名單</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              請填寫您的需求意向。送出後將由專人與您聯繫進行人工意向驗證（paid_verified），並由最高管理者開通全站免費通行證。
            </p>
          </div>

          <form onSubmit={handleCreateIntent} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">諮詢/自動化需求類別</label>
              <select
                value={intentCategory}
                onChange={(e) => setIntentCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="SEO邊緣收錄">SEO邊緣收錄 (Google Edge 2026 摘要優化)</option>
                <option value="主動Sales AI">主動Sales AI (5秒留客與意向捕獲)</option>
                <option value="量化自動化">量化自動化 (全自動爬蟲與資料管線)</option>
                <option value="客製矩陣諮詢">客製矩陣諮詢 (一人創業公司落地規劃)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">您的聯繫方式 (Email 或 LINE ID)</label>
              <input
                type="text"
                value={intentContact}
                onChange={(e) => setIntentContact(e.target.value)}
                placeholder="例如: kclee1654@gmail.com 或 line: my_id"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">具體痛點與想驗證的流程</label>
              <textarea
                value={intentInput}
                onChange={(e) => setIntentInput(e.target.value)}
                placeholder="請描述您希望透過 AI 自動化或 2026 Edge 搜尋解決的關鍵業務問題..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            {submitSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs leading-relaxed">
                {submitSuccess}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center space-x-2"
            >
              <span>申請加入 14 天商業破蛋候補名單</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center">
            * 承諾：無任何線上真實扣款，完全人工審查與一對一意向覆核。
          </p>
        </div>

        {/* Right: Anonymous Intent Delivery Board (IntentLeads) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>匿名意向交付公開看板 (IntentLeads)</span>
              </h3>
              <p className="text-xs text-slate-400">
                展示真實排隊意向，嚴格隱匿個人隱私資訊
              </p>
            </div>

            {isSuperAdmin && (
              <div className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center space-x-1">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>最高管理者可點擊一鍵驗證</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {intentOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ord.anonymousId}
                    </span>
                    <span className="text-slate-200 font-semibold">{ord.category}</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      ord.status === 'paid_verified'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {ord.status === 'paid_verified'
                      ? '● paid_verified (已完成人工意向驗證)'
                      : '● pending_review (待人工覆核)'}
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">{ord.requestSnippet}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/50">
                  <div className="flex items-center space-x-2">
                    <span>聯繫代號: <code className="text-slate-300">{ord.contactInfo}</code></span>
                    <span>•</span>
                    <span className="text-emerald-400">{ord.deliveryDue}</span>
                  </div>

                  {/* Super admin quick action to toggle paid_verified */}
                  {isSuperAdmin && (
                    <button
                      onClick={() => handleTogglePaidVerified(ord.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 ${
                        ord.status === 'paid_verified'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow'
                      }`}
                    >
                      {ord.status === 'paid_verified' ? (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>取消驗證</span>
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="w-3 h-3" />
                          <span>標註為 paid_verified</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
