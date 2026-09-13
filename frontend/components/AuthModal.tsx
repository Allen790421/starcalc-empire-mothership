import React, { useState } from 'react';
import { Shield, Lock, Mail, X, CheckCircle2, Crown, Sparkles, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setFeedback('請輸入電子郵件');
      return;
    }

    // Check if Super Admin
    const isSuperAdmin =
      cleanEmail === 'kclee1654@gmail.com' ||
      cleanEmail === 'kclee1654@gmail' ||
      cleanEmail === 'kclee1654';

    const normalizedEmail = isSuperAdmin ? 'kclee1654@gmail.com' : cleanEmail;

    const loggedUser: UserAccount = {
      id: isSuperAdmin ? 'usr-root-kclee1654' : `usr-${Date.now()}`,
      email: normalizedEmail,
      role: isSuperAdmin ? 'super_admin' : 'standard',
      isFullSiteFree: isSuperAdmin,
      createdAt: new Date().toISOString(),
      notes: isSuperAdmin ? '全站唯一最高管理員 (ROLE_SUPER_ADMIN)' : '內測受邀/意向候補用戶',
    };

    onLogin(loggedUser);
    setFeedback(null);
    onClose();
  };

  const handleQuickSuperAdminLogin = () => {
    const superAdmin: UserAccount = {
      id: 'usr-root-kclee1654',
      email: 'kclee1654@gmail.com',
      role: 'super_admin',
      isFullSiteFree: true,
      createdAt: new Date().toISOString(),
      notes: '全站唯一最高管理員 (ROLE_SUPER_ADMIN)',
    };
    onLogin(superAdmin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">目前登入身分</h3>
                <p className="text-xs text-amber-300 font-mono">{currentUser.email}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-2xl space-y-2 text-xs border border-slate-700/60">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">系統權限角色：</span>
                <span className="font-bold">
                  {currentUser.role === 'super_admin' ? (
                    <span className="text-amber-400">⚡ 最高管理者 (ROLE_SUPER_ADMIN)</span>
                  ) : currentUser.isFullSiteFree ? (
                    <span className="text-emerald-400">👑 全站免費使用 (Free VIP)</span>
                  ) : (
                    <span className="text-cyan-400">標準意向候補</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">全網站免費狀態：</span>
                <span className={currentUser.isFullSiteFree ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {currentUser.isFullSiteFree ? '已開通 (永久免費存取)' : '待最高管理者手動授權'}
                </span>
              </div>
              {currentUser.role === 'super_admin' && (
                <div className="text-[11px] text-amber-300/80 pt-1 border-t border-slate-700/40">
                  可進入頂部「後台免費帳號管理」隨時新增或指定其他使用者為全站免費。
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-medium text-xs transition border border-slate-700"
              >
                登出目前帳號
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-bold text-xs transition"
              >
                回到系統
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">最高管理者與受邀入口</h3>
                <p className="text-xs text-slate-400">
                  dawn-quant.xingdeng.tw (已關閉公開自由註冊)
                </p>
              </div>
            </div>

            {/* Quick Super Admin shortcut pill */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-amber-300">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <span>最高管理者：<strong className="font-mono text-white">kclee1654@gmail.com</strong></span>
              </div>
              <button
                type="button"
                onClick={handleQuickSuperAdminLogin}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition shrink-0"
              >
                一鍵登入
              </button>
            </div>

            {/* P0 security note: Public registration closed */}
            <div className="flex items-start space-x-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>14天破蛋計畫安全規範：</strong>
                為防止權限混亂，全站已關閉自由註冊。受邀用戶需由最高管理者在後台主動開通「全網站免費帳號」。
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">電子郵件 (Email)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kclee1654@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">密碼</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {feedback && (
                <div className="text-rose-400 text-xs">{feedback}</div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition mt-2"
              >
                登入系統
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
