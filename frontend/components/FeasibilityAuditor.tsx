import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Layers, Award } from 'lucide-react';
import { FeasibilityForm } from '../types';
import { evaluateFeasibilityWithAI } from '../services/geminiService';

export const FeasibilityAuditor: React.FC = () => {
  const [form, setForm] = useState<FeasibilityForm>({
    siteType: 'SPA 單頁應用 (動態 React/Vue 渲染)',
    authRequired: '需雙因素認證 (2FA/OTP)',
    frequency: '每小時排程自動執行',
    captchaRisk: '有 Cloudflare Turnstile 或 Google reCAPTCHA v3',
    dataAction: '提取表格與圖文資料，匯入內部資料庫/ERP',
    aiRequirement: 'LLM 結構化清洗、語意摘要與智慧去重',
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    try {
      const result = await evaluateFeasibilityWithAI(form);
      setReport(result);
    } catch (err) {
      setReport('診斷模組發生問題，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>技術可行性與風險診斷模組</span>
        </div>
        <h1 className="text-2xl font-bold text-white">網頁自動化與 AI 架構評估精靈</h1>
        <p className="text-slate-400 text-sm mt-1">
          透過 6 大核心維度快速評估目標網站防護、動態架構、驗證與資料串接難度，由資深顧問模型產出專屬落地防護建議。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Selection */}
        <form onSubmit={handleAudit} className="md:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>流程技術特徵設定</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">1. 目標網頁形態與前端技術</label>
              <select
                value={form.siteType}
                onChange={(e) => setForm({ ...form, siteType: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>傳統 SSR 靜態 HTML (容易擷取)</option>
                <option>SPA 單頁應用 (動態 React/Vue 渲染)</option>
                <option>封閉式內網系統 (需 VPN/白名單)</option>
                <option>Canvas / Flash / 虛擬化畫面操作</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">2. 身分驗證機制</label>
              <select
                value={form.authRequired}
                onChange={(e) => setForm({ ...form, authRequired: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>完全公開頁面 (免登入)</option>
                <option>帳號密碼登入 (Cookie/Session 維持)</option>
                <option>需雙因素認證 (2FA/OTP/簡訊碼)</option>
                <option>企業 SSO / SAML / OAuth 2.0</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">3. 預計排程與頻率</label>
              <select
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>即時觸發 (由 Webhook 或用戶點擊時執行)</option>
                <option>每小時排程自動執行</option>
                <option>每日夜間批次大批量執行</option>
                <option>每週/每月定期彙總報表</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">4. 反爬蟲與機器人防護層次</label>
              <select
                value={form.captchaRisk}
                onChange={(e) => setForm({ ...form, captchaRisk: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>無特殊阻擋 (普通防火牆)</option>
                <option>基本 Rate Limit (頻率限制)</option>
                <option>有 Cloudflare Turnstile 或 Google reCAPTCHA v3</option>
                <option>高階 Akamai / Datadome 動態行為指紋防禦</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">5. 業務操作行為與目標</label>
              <select
                value={form.dataAction}
                onChange={(e) => setForm({ ...form, dataAction: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>單純資料擷取 (唯讀 Scrape)</option>
                <option>提取表格與圖文資料，匯入內部資料庫/ERP</option>
                <option>自動化表單填寫、提交與點擊流程 (寫入操作)</option>
                <option>跨多網站整合比對與即時觸發通知</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">6. 欲整合之 AI 模組</label>
              <select
                value={form.aiRequirement}
                onChange={(e) => setForm({ ...form, aiRequirement: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option>不需要 AI (單純規則與正則表達式)</option>
                <option>LLM 結構化清洗、語意摘要與智慧去重</option>
                <option>多模態視覺比對 (網頁截圖截取與 OCR 解析)</option>
                <option>自主 AI Agent 探索與動態意圖規劃</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>顧問引擎正在診斷架構風險...</span>
              </>
            ) : (
              <>
                <span>產生架構可行性診斷報告</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Diagnosis Output Panel */}
        <div className="md:col-span-6 flex flex-col justify-between bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>AI 顧問診斷結果</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                即時架構分析
              </span>
            </div>

            {report ? (
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                {report}
              </div>
            ) : (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
                  <ShieldCheck className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-sm font-medium text-slate-300">尚未執行診斷</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  請確認左側 6 項技術指標，點擊「產生架構可行性診斷報告」，顧問系統將即刻分析潛在破綻、選型推薦與抗阻擋防護方案。
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>基於 Google Gemini 2.5 Flash 顧問推論</span>
            <span>合規提醒：請遵守目標網站服務條款</span>
          </div>
        </div>
      </div>
    </div>
  );
};
