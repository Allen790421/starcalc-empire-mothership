import React from 'react';
import { 
  Sparkles, 
  User, 
  Crown, 
  Palette, 
  Calculator, 
  MessageSquare, 
  ClipboardList, 
  CreditCard,
  Gift,
  Zap,
  Globe,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { UserAccount, LightBgTheme, SupportedLocale, CurrencyAnchor } from '../types';
import { LOCALE_LABELS, TRANSLATIONS } from '../services/localeService';
import { isRootAdminEmail } from '../config/whitelist';

interface NavbarProps {
  activeTab: 'home' | 'blindspots' | 'social_matrix' | 'pricing' | 'viral_suite' | 'calculator' | 'consultant' | 'admin' | 'admin_users';
  setActiveTab: (tab: 'home' | 'blindspots' | 'social_matrix' | 'pricing' | 'viral_suite' | 'calculator' | 'consultant' | 'admin' | 'admin_users') => void;
  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
  onOpenThemeModal: () => void;
  currentTheme: LightBgTheme;
  currentLocale: SupportedLocale;
  onChangeLocale: (locale: SupportedLocale) => void;
  currency: CurrencyAnchor;
  onChangeCurrency: (curr: CurrencyAnchor) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuthModal,
  onOpenThemeModal,
  currentLocale,
  onChangeLocale,
  currency,
  onChangeCurrency,
}) => {
  const isSuperAdmin = currentUser?.role === 'ADMIN' && isRootAdminEmail(currentUser.email);
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.zh_TW;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Clean Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none shrink-0" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">乙元極流</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Prime Flow
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">{t.brand_sub}</p>
            </div>
          </div>

          {/* Clean User-Facing Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/70 overflow-x-auto mx-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-amber-500" />
              <span>{t.nav_home}</span>
            </button>

            {/* 4 大盲點審查與修復 (對應截圖) */}
            <button
              onClick={() => setActiveTab('blindspots')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'blindspots'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-amber-800 hover:text-amber-950 bg-amber-50'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4大盲點修復</span>
            </button>

            {/* 6 大社群自動推播矩陣 (受到 AuthGuard 保護) */}
            <button
              onClick={() => setActiveTab('social_matrix')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'social_matrix'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>{t.nav_matrix}</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === 'pricing'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>{t.nav_pricing}</span>
            </button>

            <button
              onClick={() => setActiveTab('viral_suite')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === 'viral_suite'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="w-4 h-4 text-rose-500" />
              <span>{t.nav_viral}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4 text-cyan-600" />
              <span>{t.nav_calc}</span>
            </button>

            <button
              onClick={() => setActiveTab('consultant')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === 'consultant'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span>{t.nav_consult}</span>
            </button>

            {/* 僅最高管理者 kclee1654 可見之專屬功能 */}
            {isSuperAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('admin_users')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                    activeTab === 'admin_users'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-amber-800 hover:bg-amber-100/70'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-500" />
                  <span>授權白名單</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                    activeTab === 'admin'
                      ? 'bg-slate-900 text-amber-300 shadow-sm'
                      : 'text-amber-700 hover:bg-amber-100/60'
                  }`}
                >
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{t.nav_battlehq}</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* 7-Language Select Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={currentLocale}
                onChange={(e) => onChangeLocale(e.target.value as SupportedLocale)}
                aria-label="語言切換 (Language)"
                className="bg-slate-100/90 text-slate-800 text-xs font-bold py-1.5 px-2 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                {(Object.keys(LOCALE_LABELS) as SupportedLocale[]).map((loc) => (
                  <option key={loc} value={loc}>
                    {LOCALE_LABELS[loc].flag} {LOCALE_LABELS[loc].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Anchor Switcher Button */}
            <button
              onClick={() => onChangeCurrency(currency === 'TWD' ? 'USD' : 'TWD')}
              className="px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-extrabold text-slate-800 transition"
              title="切換錨定幣別：國內台幣 (TWD) 或 國際美金 (USD)"
            >
              {currency === 'TWD' ? '🇹🇼 TWD' : '💵 USD'}
            </button>

            {/* Theme Background Control */}
            <button
              onClick={onOpenThemeModal}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 transition border border-slate-200"
              title="調控亮色系背景色與立體幾何"
            >
              <Palette className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {/* Auth Entrance */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                isSuperAdmin
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : currentUser
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isSuperAdmin ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden lg:inline">kclee1654</span>
                </>
              ) : currentUser ? (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden lg:inline">帳號</span>
                </>
              ) : (
                <span>登入</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
