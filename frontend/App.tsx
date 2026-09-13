import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GeometricBackground } from './components/GeometricBackground';
import { ThemeReliefControlModal } from './components/ThemeReliefControlModal';
import { MainPortal } from './components/MainPortal';
import { SocialPushMatrix } from './components/SocialPushMatrix';
import { FourBlindspotsAudit } from './components/FourBlindspotsAudit';
import { PricingPage } from './components/PricingPage';
import { ViralGrowthSuite } from './components/ViralGrowthSuite';
import { AdminPanel } from './components/AdminPanel';
import { AdminUsersManager } from './components/AdminUsersManager';
import { RoiCalculator } from './components/RoiCalculator';
import { ConsultantChat } from './components/ConsultantChat';
import { SecurityShieldBar } from './components/SecurityShieldBar';
import { AuthModal } from './components/AuthModal';
import { 
  UserAccount, 
  AnonymousIntentOrder, 
  TransferVerificationRecord, 
  LightBgTheme, 
  GeometryCycleInterval, 
  SupportedLocale, 
  CurrencyAnchor 
} from './types';
import { DEFAULT_VIP_FREE_LIST, isRootAdminEmail } from './config/whitelist';
import { verifyFeatureAccess } from './services/authGuard';

export const App: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'home' | 'blindspots' | 'social_matrix' | 'pricing' | 'viral_suite' | 'calculator' | 'consultant' | 'admin' | 'admin_users'
  >('home');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [guardAlert, setGuardAlert] = useState<string | null>(null);

  // 7 國語言切換 (預設繁體中文)
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('zh_TW');

  // 幣別錨定機制：國內錨定台幣 (TWD)，國際錨定美金 (USD)
  const [currency, setCurrency] = useState<CurrencyAnchor>('TWD');

  // 背景主題調控
  const [currentTheme, setCurrentTheme] = useState<LightBgTheme>('ivory_gold');
  const [intervalSec, setIntervalSec] = useState<GeometryCycleInterval>(30);

  // 最高管理員帳號：kclee1654 (預設登入)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    id: 'usr-root-kclee1654',
    email: 'kclee1654@gmail.com',
    role: 'ADMIN',
    isApproved: true,
    isFullSiteFree: true,
    createdAt: '2026-09-13',
    referralCode: 'ROOT-KING',
    deviceFingerprintHash: 'sha256-canvas-fp-091388-locked',
    notes: '全站唯一最高管理員 (kclee1654)',
  });

  // 免費授權白名單陣列
  const [whitelistEmails, setWhitelistEmails] = useState<string[]>([
    'kclee1654@gmail.com',
    ...DEFAULT_VIP_FREE_LIST,
  ]);

  // 會員清冊 (含 role 與 isApproved 狀態)
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([
    {
      id: 'usr-root-kclee1654',
      email: 'kclee1654@gmail.com',
      role: 'ADMIN',
      isApproved: true,
      isFullSiteFree: true,
      createdAt: '2026-09-13',
      referralCode: 'ROOT-KING',
      notes: '最高管理者 (kclee1654)',
    },
    {
      id: 'usr-002',
      email: 'partner.free@enterprise.tw',
      role: 'USER',
      isApproved: true,
      isFullSiteFree: true,
      createdAt: '2026-09-13',
      referralCode: 'VIP-7788',
      notes: '管理者手動核可免費 VIP',
    },
    {
      id: 'usr-003',
      email: 'guest.pending@example.tw',
      role: 'USER',
      isApproved: false,
      isFullSiteFree: false,
      createdAt: '2026-09-13',
      referralCode: 'GUEST-001',
      notes: '未核可訪客帳號',
    },
  ]);

  // Anonymous Intent Leads
  const [intentOrders, setIntentOrders] = useState<AnonymousIntentOrder[]>([
    {
      id: 'ord-01',
      anonymousId: 'LEAD-202609-001',
      category: '娛樂城代理多渠道推播',
      status: 'paid_verified',
      contactInfo: 'kc***@gmail.com',
      requestSnippet: '娛樂城 LINE 官方帳號與 TikTok 6 大社群排程需求',
      deliveryDue: '24 小時內完成人工驗證開通',
      createdAt: '2026-09-13 09:15',
      referralEarnedTWD: 44.7,
    },
    {
      id: 'ord-02',
      anonymousId: 'LEAD-202609-002',
      category: '外貿跨境多語系 SEO',
      status: 'pending_review',
      contactInfo: 'alex***@line.me',
      requestSnippet: '越泰日韓多語系自動貼文與推薦碼閉環測試',
      deliveryDue: '待專人人工覆核',
      createdAt: '2026-09-13 11:40',
      referralEarnedTWD: 44.7,
    },
  ]);

  // Offline Wire Verification Queue
  const [transferRecords, setTransferRecords] = useState<TransferVerificationRecord[]>([
    {
      id: 'tx-8801',
      orderNumber: 'PAY-2026-0901',
      planTitle: '首次衝動破冰方案 (NT$149 / $4.99 USD)',
      amountTWD: 149,
      amountUSD: 4.99,
      transferLast5: '15398',
      payerContact: 'demo.tester@gmail.com',
      submittedAt: '2026-09-13 14:20',
      status: 'PAID_VERIFIED',
      notes: '樂天網銀 826 電匯已核對',
    },
  ]);

  // 白名單操作
  const handleAddWhitelist = (email: string, notes?: string) => {
    const clean = email.trim().toLowerCase();
    if (!whitelistEmails.includes(clean)) {
      setWhitelistEmails((prev) => [...prev, clean]);
    }

    // 若清冊無該使用者，自動建立並直接審核通過
    setUserAccounts((prev) => {
      const exists = prev.find((u) => u.email.toLowerCase() === clean);
      if (exists) {
        return prev.map((u) =>
          u.email.toLowerCase() === clean
            ? { ...u, isApproved: true, isFullSiteFree: true, notes: notes || u.notes }
            : u
        );
      }
      return [
        ...prev,
        {
          id: `usr-${Date.now()}`,
          email: clean,
          role: isRootAdminEmail(clean) ? 'ADMIN' : 'USER',
          isApproved: true,
          isFullSiteFree: true,
          createdAt: new Date().toISOString().split('T')[0],
          notes: notes || '由管理者手動加入白名單',
        },
      ];
    });
  };

  const handleRemoveWhitelist = (email: string) => {
    const clean = email.trim().toLowerCase();
    if (isRootAdminEmail(clean)) return; // 最高管理者不可移除
    setWhitelistEmails((prev) => prev.filter((item) => item !== clean));
    setUserAccounts((prev) =>
      prev.map((u) =>
        u.email.toLowerCase() === clean ? { ...u, isFullSiteFree: false } : u
      )
    );
  };

  const handleToggleApproval = (userId: string) => {
    setUserAccounts((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isApproved: !u.isApproved } : u))
    );
  };

  const handleToggleFreeTier = (userId: string) => {
    setUserAccounts((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFullSiteFree: !u.isFullSiteFree } : u
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUserAccounts((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleToggleOrderStatus = (orderId: string) => {
    setIntentOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: o.status === 'paid_verified' ? 'pending_review' : 'paid_verified',
            }
          : o
      )
    );
  };

  const handleSubmitIntent = (category: string, contact: string, detail: string) => {
    const count = intentOrders.length + 1;
    const seqStr = count < 10 ? `00${count}` : count < 100 ? `0${count}` : `${count}`;
    const masked = contact.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    const newOrder: AnonymousIntentOrder = {
      id: `ord-${Date.now()}`,
      anonymousId: `LEAD-202609-${seqStr}`,
      category,
      status: 'pending_review',
      contactInfo: masked || '加密存檔',
      requestSnippet: detail,
      deliveryDue: '24 小時內專人覆核',
      createdAt: new Date().toLocaleString([], { hour12: false }),
      referralEarnedTWD: 44.7,
    };

    setIntentOrders([newOrder, ...intentOrders]);
  };

  const handleSubmitVerification = (
    planTitle: string,
    amountTWD: number,
    amountUSD: number,
    last5: string,
    contact?: string
  ) => {
    const newRecord: TransferVerificationRecord = {
      id: `tx-${Date.now()}`,
      orderNumber: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      planTitle,
      amountTWD,
      amountUSD,
      transferLast5: last5,
      payerContact: contact || '未具名',
      submittedAt: new Date().toLocaleString([], { hour12: false }),
      status: 'PENDING_VERIFICATION',
    };
    setTransferRecords((prev) => [newRecord, ...prev]);
  };

  const handleApproveTransferRecord = (recordId: string) => {
    setTransferRecords((prev) =>
      prev.map((r) => {
        if (r.id === recordId) {
          return { ...r, status: 'PAID_VERIFIED' };
        }
        return r;
      })
    );
  };

  // 導覽攔截防護中介檢查 (Navigation Guard)
  const handleNavigate = (tab: typeof activeTab) => {
    setGuardAlert(null);
    if (tab === 'social_matrix') {
      const access = verifyFeatureAccess(currentUser, 'social_matrix', whitelistEmails);
      if (!access.allowed) {
        setGuardAlert(access.reason || '此功能需要最高管理者（kclee1654）授權或 VIP 免費白名單資格。');
        return;
      }
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans transition-colors duration-1000 text-slate-900">
      {/* 3D 不規則立體凸凹幾何背景 */}
      <GeometricBackground currentTheme={currentTheme} intervalSec={intervalSec} />

      {/* 頂部導覽列 */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        currentTheme={currentTheme}
        currentLocale={currentLocale}
        onChangeLocale={(loc) => setCurrentLocale(loc)}
        currency={currency}
        onChangeCurrency={(curr) => setCurrency(curr)}
      />

      {/* 權限攔截提示條 (Guard Interception Banner) */}
      {guardAlert && (
        <div className="max-w-6xl mx-auto px-4 mt-4 relative z-30">
          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-2">
              <span className="text-base">🔐</span>
              <span>{guardAlert}</span>
            </div>
            <button
              onClick={() => setGuardAlert(null)}
              className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px]"
            >
              了解
            </button>
          </div>
        </div>
      )}

      {/* Main Dynamic Viewport */}
      <main className="flex-1 overflow-x-hidden relative z-10 pb-8">
        {activeTab === 'home' && (
          <MainPortal
            intentOrders={intentOrders}
            onSubmitIntent={handleSubmitIntent}
            onOpenConsultant={() => handleNavigate('consultant')}
            onOpenCalculator={() => handleNavigate('calculator')}
            onOpenPricing={() => handleNavigate('pricing')}
            onOpenGrowthSuite={() => handleNavigate('viral_suite')}
            onOpenBlindspots={() => handleNavigate('blindspots')}
          />
        )}
        {activeTab === 'blindspots' && <FourBlindspotsAudit />}
        {activeTab === 'social_matrix' && (
          <SocialPushMatrix currentLocale={currentLocale} currency={currency} />
        )}
        {activeTab === 'pricing' && (
          <PricingPage
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSubmitVerification={handleSubmitVerification}
            currentLocale={currentLocale}
            currency={currency}
            onChangeCurrency={(curr) => setCurrency(curr)}
          />
        )}
        {activeTab === 'viral_suite' && (
          <ViralGrowthSuite currentUser={currentUser} onOpenPricing={() => handleNavigate('pricing')} />
        )}
        {activeTab === 'calculator' && <RoiCalculator />}
        {activeTab === 'consultant' && <ConsultantChat />}
        {activeTab === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            userAccounts={userAccounts}
            intentOrders={intentOrders}
            transferRecords={transferRecords}
            onToggleFreeStatus={handleToggleFreeTier}
            onAddUser={handleAddWhitelist}
            onDeleteUser={handleDeleteUser}
            onToggleOrderStatus={handleToggleOrderStatus}
            onApproveTransferRecord={handleApproveTransferRecord}
          />
        )}
        {activeTab === 'admin_users' && (
          <AdminUsersManager
            currentUser={currentUser}
            userAccounts={userAccounts}
            whitelistEmails={whitelistEmails}
            onAddWhitelist={handleAddWhitelist}
            onRemoveWhitelist={handleRemoveWhitelist}
            onToggleApproval={handleToggleApproval}
            onToggleFreeTier={handleToggleFreeTier}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {/* 全域安全防線條：防一帳號多人使用 + 7國語言免責聲明 */}
        <SecurityShieldBar currentLocale={currentLocale} />
      </main>

      {/* Light Theme & Geometric Interval Adjustment Modal */}
      <ThemeReliefControlModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onChangeTheme={(theme) => setCurrentTheme(theme)}
        intervalSec={intervalSec}
        onChangeInterval={(sec) => setIntervalSec(sec)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          setGuardAlert(null);
        }}
        onLogout={() => {
          setCurrentUser(null);
          setGuardAlert(null);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-4 text-center text-xs text-slate-500 relative z-10 backdrop-blur-sm">
        dawn-quant.xingdeng.tw • 乙元極流 Prime Flow • 最高管理者：kclee1654 • 4大盲點與免費白名單授權系統運作中
      </footer>
    </div>
  );
};

export default App;
