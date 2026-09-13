import React, { useState } from 'react';
import { 
  Crown, 
  UserPlus, 
  UserCheck, 
  Trash2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  FileCheck,
  CreditCard,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  AlertOctagon
} from 'lucide-react';
import { UserAccount, AnonymousIntentOrder, TransferVerificationRecord } from '../types';

interface AdminPanelProps {
  currentUser: UserAccount | null;
  userAccounts: UserAccount[];
  intentOrders: AnonymousIntentOrder[];
  transferRecords: TransferVerificationRecord[];
  onToggleFreeStatus: (userId: string) => void;
  onAddUser: (email: string, isFree: boolean) => void;
  onDeleteUser: (userId: string) => void;
  onToggleOrderStatus: (orderId: string) => void;
  onApproveTransferRecord: (recordId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  userAccounts,
  intentOrders,
  transferRecords,
  onToggleFreeStatus,
  onAddUser,
  onDeleteUser,
  onToggleOrderStatus,
  onApproveTransferRecord,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const isSuperAdmin = currentUser?.role === 'super_admin' && 
    (currentUser.email === 'kclee1654@gmail.com' || currentUser.email.startsWith('kclee1654'));

  if (!isSuperAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-3 shadow-lg">
        <Shield className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">最高管理權限限制</h2>
        <p className="text-xs text-slate-500">
          此頁面僅提供給唯一最高管理者帳號 <code className="font-mono text-amber-700 bg-amber-50 px-1 py-0.5 rounded">kclee1654@gmail.com</code>。請確認您的登入身分。
        </p>
      </div>
    );
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    onAddUser(newEmail.trim().toLowerCase(), isFree);
    setNewEmail('');
  };

  const agentPromptText = `你是《朔時金鑰 BattleHQ 戰情室》的主控 AI Agent。
你的權限受控於最高管理員 kclee1654@gmail.com。
你的任務是監控網站流量、財務數據，並自動計算 55% 公司主營淨利、15% Gemini/GCP 算力儲備與 30% 獲客行銷池劃撥。
當接收到『緊急停損』指令時，觸發安全防護機制，暫停 API 存取權限並發送 Notification 給 Root。`;

  const handleCopyAgentPrompt = () => {
    navigator.clipboard.writeText(agentPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const filteredUsers = userAccounts.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));

  // Calculate gross allocation of pending + verified transfers
  const totalVerifiedRevenueTWD = transferRecords
    .filter(r => r.status === 'PAID_VERIFIED')
    .reduce((acc, curr) => acc + curr.amountTWD, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Admin Header & BattleHQ Metric Ticker */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>朔時金鑰 BattleHQ 戰情室 • Root 控制台</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">後台對帳、免費會員與 Agent 設定</h1>
          <p className="text-xs text-slate-500">最高管理員：{currentUser.email}</p>
        </div>

        {/* 55/15/30 Financial Summary Mini Banner */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-center text-xs">
          <div className="bg-white p-2 rounded-xl border border-slate-200/80">
            <div className="text-[10px] text-slate-400">55% 主營淨利</div>
            <div className="font-bold text-emerald-700 text-sm">
              NT${Math.round(totalVerifiedRevenueTWD * 0.55).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200/80">
            <div className="text-[10px] text-slate-400">15% 算力儲備</div>
            <div className="font-bold text-cyan-700 text-sm">
              NT${Math.round(totalVerifiedRevenueTWD * 0.15).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200/80">
            <div className="text-[10px] text-slate-400">30% 獲客行銷池</div>
            <div className="font-bold text-amber-700 text-sm">
              NT${Math.round(totalVerifiedRevenueTWD * 0.30).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 線下匯款對帳清冊 (Pending Verification -> PAID_VERIFIED) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              線下電匯憑證覆核佇列 (Pending Verification)
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            待審核筆數：<strong>{transferRecords.filter(r => r.status === 'PENDING_VERIFICATION').length}</strong> 筆
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3">單號</th>
                <th className="p-3">所選方案</th>
                <th className="p-3">金額 (TWD)</th>
                <th className="p-3">匯款帳號後五碼 / 憑證</th>
                <th className="p-3">聯繫方式</th>
                <th className="p-3">回報時間</th>
                <th className="p-3">狀態</th>
                <th className="p-3 text-right">管理審核</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transferRecords.map((rec) => {
                const isPending = rec.status === 'PENDING_VERIFICATION';
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono font-bold text-slate-900">{rec.orderNumber}</td>
                    <td className="p-3 font-semibold text-slate-800">{rec.planTitle}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">NT$ {rec.amountTWD.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-800 font-bold bg-amber-50/80 rounded">
                      {rec.transferLast5}
                    </td>
                    <td className="p-3 text-slate-600">{rec.payerContact || '未提供'}</td>
                    <td className="p-3 text-slate-400">{rec.submittedAt}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        isPending
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {isPending ? (
                        <button
                          onClick={() => onApproveTransferRecord(rec.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition"
                        >
                          核對通過 (PAID_VERIFIED)
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">✓ 已開通權限</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Google Cloud Agent Platform (Vertex AI Agent Builder) 設定指引 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              Google Cloud Agent Platform (Vertex AI) 戰情室配置指引
            </h2>
          </div>
          <button
            onClick={handleCopyAgentPrompt}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-bold text-xs transition"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? '已複製 Agent 指令' : '複製系統指令'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Step 1: System Instruction */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block">
              1. 系統指令 (System Instruction / Agent Prompt)：
            </span>
            <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded-xl text-[11px] whitespace-pre-wrap leading-relaxed">
              {agentPromptText}
            </div>
            <p className="text-[11px] text-slate-500">
              請在 Google Cloud Agent Builder 控制台的「指令」欄位中貼上以上內容。
            </p>
          </div>

          {/* Step 2: Tools & OpenAPI Webhook */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <span className="font-bold text-slate-800 block">
              2. 工具串接 (Tools & OpenAPI Webhook)：
            </span>
            <p className="text-slate-600 leading-relaxed">
              在 Agent Platform 點擊 <strong>Tools (工具) ➔ Add Tool</strong>，設定 OpenAPI Webhook 指向：
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono text-slate-900 font-bold">
              POST /api/finance/verify-intent
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              當訪客對話中提到「我已轉帳，後五碼 12345」時，AI Agent 會自動調用此工具將資訊寫入佇列並向 Root 發出通知。
            </p>
          </div>
        </div>
      </div>

      {/* 4. 全網站免費使用者名冊 (Free VIP) 管理 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Add Free User */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <UserPlus className="w-4 h-4 text-amber-600" />
            <span>手動開通全網站免費帳號</span>
          </h2>

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">使用者 Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="partner@enterprise.tw"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="checkbox"
                id="freeUserCheckbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <label htmlFor="freeUserCheckbox" className="text-slate-800 font-medium cursor-pointer">
                直接授予全站終身免費通行證 (Free VIP)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm"
            >
              確認開通免付費權限
            </button>
          </form>
        </div>

        {/* Right: Existing Users Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-cyan-600" />
              <span>會員名冊管理 ({userAccounts.length})</span>
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋帳號..."
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none w-36"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-2">帳號</th>
                  <th className="p-2">權限狀態</th>
                  <th className="p-2 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isRoot = u.email === 'kclee1654@gmail.com' || u.email.startsWith('kclee1654');
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-slate-800">{u.email}</td>
                      <td className="p-2">
                        {isRoot ? (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                            最高管理者
                          </span>
                        ) : u.isFullSiteFree ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            全站免費中
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                            一般用戶
                          </span>
                        )}
                      </td>
                      <td className="p-2 text-right space-x-1">
                        {!isRoot && (
                          <>
                            <button
                              onClick={() => onToggleFreeStatus(u.id)}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                            >
                              {u.isFullSiteFree ? '取消免費' : '設為免費'}
                            </button>
                            <button
                              onClick={() => onDeleteUser(u.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600"
                              title="移除帳號"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </>
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
