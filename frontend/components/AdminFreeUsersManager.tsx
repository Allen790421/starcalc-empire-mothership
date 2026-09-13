import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  CheckCircle2, 
  Lock, 
  Crown, 
  Sparkles, 
  UserCheck, 
  Search,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { UserAccount } from '../types';

interface AdminFreeUsersManagerProps {
  currentUser: UserAccount | null;
  userAccounts: UserAccount[];
  onToggleFreeStatus: (userId: string) => void;
  onAddUser: (email: string, isFree: boolean, expiresAt?: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const AdminFreeUsersManager: React.FC<AdminFreeUsersManagerProps> = ({
  currentUser,
  userAccounts,
  onToggleFreeStatus,
  onAddUser,
  onDeleteUser,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [isFreeByDefault, setIsFreeByDefault] = useState(true);
  const [expiresDate, setExpiresDate] = useState('2026-12-31');
  const [userNote, setUserNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const isSuperAdmin = currentUser?.role === 'super_admin' && 
    (currentUser.email === 'kclee1654@gmail.com' || currentUser.email.startsWith('kclee1654'));

  if (!isSuperAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">最高管理權限限制 (ROLE_SUPER_ADMIN)</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          此控制台僅開放給全站唯一最高管理員帳號 <code className="text-amber-400 font-mono bg-slate-800 px-2 py-0.5 rounded">kclee1654@gmail.com</code>。請使用該帳號登入以手動新增與管理「全網站免費使用者帳號 (Free VIP)」。
        </p>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    onAddUser(newEmail.trim().toLowerCase(), isFreeByDefault, expiresDate);
    setNewEmail('');
    setUserNote('');
  };

  const filteredUsers = userAccounts.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 mb-2">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>全站唯一最高管理者控制台 • kclee1654@gmail.com</span>
          </div>
          <h1 className="text-2xl font-bold text-white">全網站免費使用者帳號 (Free VIP) 設定後台</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            依據「14天商業破蛋計畫」規範，全站已封閉公開收費通道。您可在此<strong>直接手動指派與開通特定用戶為全站免費使用者</strong>，解鎖 AI 邊緣搜尋與自動化全模組，用於夥伴內測或意向交付。
          </p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 px-5 py-4 rounded-2xl text-center shrink-0">
          <div className="text-[11px] text-slate-400">已授權免費特權用戶</div>
          <div className="text-2xl font-black text-emerald-400">
            {userAccounts.filter((u) => u.isFullSiteFree).length} 位
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">全站無限制存取</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Add New Free User Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>手動開通「全站免費使用者帳號」</span>
          </h2>

          <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">欲授權使用者 Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="例如: partner.vip@dawn-quant.tw"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>免費授權有效期限</span>
              </label>
              <input
                type="date"
                value={expiresDate}
                onChange={(e) => setExpiresDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <input
                type="checkbox"
                id="isFree"
                checked={isFreeByDefault}
                onChange={(e) => setIsFreeByDefault(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="isFree" className="text-slate-200 cursor-pointer font-medium">
                直接授予「全站全功能免費通行證 (Free VIP)」
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition"
            >
              確認開通並加入免費名單
            </button>
          </form>

          <div className="p-3.5 bg-slate-800/40 rounded-2xl border border-slate-700/50 text-[11px] text-slate-400 space-y-1 leading-relaxed">
            <span className="text-amber-400 font-semibold block">最高管理者控制提示：</span>
            <p>• 開通後的帳號登入系統，將自動跳過所有候補審查與費用提示，享有無限制存取權限。</p>
            <p>• 管理者可隨時於右側清冊中，一鍵開啟或撤回該帳號之免費特權。</p>
          </div>
        </div>

        {/* Right: Existing Users Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>會員權限與免費名冊 ({userAccounts.length})</span>
            </h2>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜尋帳號..."
                className="bg-slate-950 border border-slate-700 rounded-lg py-1 pl-8 pr-2 text-xs text-white focus:outline-none focus:border-amber-500 w-44"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="p-2.5">帳號 Email</th>
                  <th className="p-2.5">角色層級</th>
                  <th className="p-2.5">免費狀態</th>
                  <th className="p-2.5 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map((user) => {
                  const isRoot = user.email === 'kclee1654@gmail.com' || user.email.startsWith('kclee1654');
                  return (
                    <tr key={user.id} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-mono text-slate-200">
                        <div className="flex items-center space-x-1.5">
                          {user.isFullSiteFree && (
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="p-2.5">
                        {isRoot ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            最高管理者
                          </span>
                        ) : user.isFullSiteFree ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            全站免費 VIP
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            意向候補
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <button
                          onClick={() => !isRoot && onToggleFreeStatus(user.id)}
                          disabled={isRoot}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            user.isFullSiteFree
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {user.isFullSiteFree ? '已啟用免費' : '未開通 (點擊設為免費)'}
                        </button>
                      </td>
                      <td className="p-2.5 text-right">
                        {!isRoot && (
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="移除此帳號"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
