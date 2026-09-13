import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  AlertTriangle, 
  Cpu, 
  Key, 
  Fingerprint, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SupportedLocale } from '../types';
import { TRANSLATIONS } from '../services/localeService';

interface SecurityShieldBarProps {
  currentLocale: SupportedLocale;
}

export const SecurityShieldBar: React.FC<SecurityShieldBarProps> = ({ currentLocale }) => {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.zh_TW;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* 1. Security & Device Lock Strip */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base">
                  {t.security_shield_title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  Kernel Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                硬體 Canvas / WebAudio 設備指紋鎖定機制 • 杜絕帳號外流與濫用
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>自動安全庫防禦：每 6 小時雲端同步</span>
          </div>
        </div>

        {/* 3 Pillars of Security */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>防一帳號多人使用 (Session Lock)</span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              自動比對客戶端裝置哈希。若偵測到跨 IP 或多瀏覽器同時併發，系統自動踢除非法 Session，確保單一帳號純淨運作。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>防詐、防毒、防木馬沙盒</span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              API 端點具備嚴格的 Content-Security-Policy 與 payload 深度過濾，自動阻斷跨站腳本 (XSS) 與惡意網釣偽裝。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>定期系統熱補丁自動更新</span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              定時自 Vertex AI 及 Google Cloud 安全防護庫抓取最新反爬蟲與防滲透特徵，零停機熱修補。
            </p>
          </div>
        </div>
      </div>

      {/* 2. Official Compliance & Legal Disclaimer (免責聲明) */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-sm">
          <FileText className="w-4 h-4 text-amber-700" />
          <span>{t.disclaimer_title}</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
          {t.disclaimer_body}
        </p>
        <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-slate-500 border-t border-amber-200/60">
          <span>• 嚴格防範洗錢防制規範 (AML)</span>
          <span>• 遵守各社群平台自動化 API 頻率限制 (Rate Limit)</span>
          <span>• 恪遵個人資料保護法 (PDPA / GDPR)</span>
        </div>
      </div>
    </div>
  );
};
