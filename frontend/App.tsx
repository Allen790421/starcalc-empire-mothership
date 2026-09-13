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

export const App: React.FC = () => {
  // Navigation: Home / FourBlindspots / SocialMatrix / Pricing / ViralSuite / Calculator / Consultant / Admin (BattleHQ)
  const [activeTab, setActiveTab] = useState<'home' | 'blindspots' | 'social_matrix' | 'pricing' | 'viral_suite' | 'calculator' | 'consultant' | 'admin'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // 7 國語言切換 (預設繁體中文，支援中/繁/簡/英/日/韓/越/泰)
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('zh_TW');

  // 幣別錨定機制：國內錨定台幣 (TWD)，國際錨定美金 (USD)
  const [currency, setCurrency] = useState<CurrencyAnchor>('TWD');

  // 可調控變換的亮色系背景色（預設：晨曦暖象牙白）
  const [currentTheme, setCurrentTheme] = useState<LightBgTheme>('ivory_gold');
  
  // 固定立體幾何凸凹圖形變換週期（30 秒 或 1 分鐘）
  const [intervalSec, setIntervalSec] = useState<GeometryCycleInterval>(30);

  // Default User (Super Admin kclee1654@gmail.com with Device Fingerprint Lock)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    id: 'usr-root-kclee1654',
    email: 'kclee1654@gmail.com',
    role: 'super_admin',
    isFullSiteFree: true,
    createdAt: '2026-09-13',
    referralCode: 'ROOT-KING',
    deviceFingerprintHash: 'sha256-canvas-fp-091388-locked',
    notes: '全站唯一最高管理員 (ROLE_SUPER_ADMIN)',
  });

  // Whitelisted Users
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([
    {
      id: 'usr-root-kclee1654',
      email: 'kclee1654@gmail.com',
      role: 'super_admin',
      isFullSiteFree: true,
      createdAt: '2026-09-13',
      referralCode: 'ROOT-KING',
      deviceFingerprintHash: 'fp-root-active',
      notes: '全站唯一最高管理員',
    },
    {
      id: 'usr-002',
      email: 'partner.free@enterprise.tw',
      role: 'free_vip',
      isFullSiteFree: true,
      createdAt: '2026-09-13',
      referralCode: 'VIP-7788',
      deviceFingerprintHash: 'fp-partner-single',
      notes: '管理者手動開通免費會員',
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
    {
      id: 'tx-8802',
      orderNumber: 'PAY-2026-0902',
      planTitle: '標準商業版 Pro (NT$1,490 / $49.00 USD)',
      amountTWD: 1490,
      amountUSD: 49.00,
      transferLast5: '43064',
      payerContact: 'client.vip@line.me',
      submittedAt: '2026-09-13 15:05',
      status: 'PENDING_VERIFICATION',
      notes: '臺灣銀行松山分行 004 對帳中',
    },
  ]);

  const handleToggleFreeStatus = (userId: string) => {
    setUserAccounts(prev => prev.map(u => u.id === userId ? { ...u, isFullSiteFree: !u.isFullSiteFree } : u));
  };

  const handleAddUser = (email: string, isFree: boolean) => {
    const isRoot = email === 'kclee1654@gmail.com';
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email,
      role: isRoot ? 'super_admin' : isFree ? 'free_vip' : 'standard',
      isFullSiteFree: isFree || isRoot,
      createdAt: new Date().toISOString().split('T')[0],
      referralCode: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      deviceFingerprintHash: `fp-${Date.now()}-locked`,
      notes: isFree ? '手動設定全站免費' : '標準意向帳號',
    };
    setUserAccounts(prev => [newUser, ...prev]);
  };

  const handleDeleteUser = (userId: string) => {
    setUserAccounts(prev => prev.filter(u => u.id !== userId));
  };

  const handleToggleOrderStatus = (orderId: string) => {
    setIntentOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: o.status === 'paid_verified' ? 'pending_review' : 'paid_verified'
    } : o));
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

  const handleSubmitVerification = (planTitle: string, amountTWD: number, amountUSD: number, last5: string, contact?: string) => {
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
    setTransferRecords(prev => [newRecord, ...prev]);
  };

  const handleApproveTransferRecord = (recordId: string) => {
    setTransferRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        return { ...r, status: 'PAID_VERIFIED' };
      }
      return r;
    }));
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans transition-colors duration-1000 text-slate-900">
      {/* 固定顯現之 3D 不規則立體凸凹幾何圖形 */}
      <GeometricBackground 
        currentTheme={currentTheme} 
        intervalSec={intervalSec} 
      />

      {/* 頂部導覽列 */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        currentTheme={currentTheme}
        currentLocale={currentLocale}
        onChangeLocale={(loc) => setCurrentLocale(loc)}
        currency={currency}
        onChangeCurrency={(curr) => setCurrency(curr)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 overflow-x-hidden relative z-10 pb-8">
        {activeTab === 'home' && (
          <MainPortal
            intentOrders={intentOrders}
            onSubmitIntent={handleSubmitIntent}
            onOpenConsultant={() => setActiveTab('consultant')}
            onOpenCalculator={() => setActiveTab('calculator')}
            onOpenPricing={() => setActiveTab('pricing')}
            onOpenGrowthSuite={() => setActiveTab('viral_suite')}
            onOpenBlindspots={() => setActiveTab('blindspots')}
          />
        )}
        {activeTab === 'blindspots' && (
          <FourBlindspotsAudit />
        )}
        {activeTab === 'social_matrix' && (
          <SocialPushMatrix 
            currentLocale={currentLocale}
            currency={currency}
          />
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
          <ViralGrowthSuite 
            currentUser={currentUser}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}
        {activeTab === 'calculator' && <RoiCalculator />}
        {activeTab === 'consultant' && <ConsultantChat />}
        {activeTab === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            userAccounts={userAccounts}
            intentOrders={intentOrders}
            transferRecords={transferRecords}
            onToggleFreeStatus={handleToggleFreeStatus}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onToggleOrderStatus={handleToggleOrderStatus}
            onApproveTransferRecord={handleApproveTransferRecord}
          />
        )}

        {/* 全域安全防線條：防一帳號多人使用 + 防毒防詐自動更新 + 法律合規免責聲明 */}
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
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 py-4 text-center text-xs text-slate-500 relative z-10 backdrop-blur-sm">
        dawn-quant.xingdeng.tw • 乙元極流 Prime Flow • 國際錨定美金 (USD) / 國內錨定台幣 (TWD) • 4 大盲點已全面修補並實裝
      </footer>
    </div>
  );
};

export default App;
