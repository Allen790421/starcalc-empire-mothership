import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Calculator, ArrowRight, DollarSign, Clock, ShieldAlert, Sparkles } from 'lucide-react';
import { RoiSimulationParams } from '../types';

export const RoiCalculator: React.FC = () => {
  const [params, setParams] = useState<RoiSimulationParams>({
    employeesCount: 3,
    monthlyHoursPerPerson: 40,
    hourlyWageTWD: 350,
    errorCostPerMonthTWD: 25000,
    targetAutomationRate: 85,
    estimatedSystemSetupTWD: 180000,
    monthlyMaintenanceTWD: 12000,
  });

  // Calculate annual savings and payback period
  const calculations = useMemo(() => {
    // Current manual cost (per month)
    const currentManualLaborCostMonthly =
      params.employeesCount * params.monthlyHoursPerPerson * params.hourlyWageTWD;
    const currentTotalCostMonthly =
      currentManualLaborCostMonthly + params.errorCostPerMonthTWD;
    const currentTotalAnnualCost = currentTotalCostMonthly * 12;

    // Post-automation costs
    const automationRatio = params.targetAutomationRate / 100;
    const savedLaborCostMonthly = currentManualLaborCostMonthly * automationRatio;
    const savedErrorCostMonthly = params.errorCostPerMonthTWD * 0.9; // 90% error reduction
    const grossSavingsMonthly = savedLaborCostMonthly + savedErrorCostMonthly;

    const netSavingsMonthly = grossSavingsMonthly - params.monthlyMaintenanceTWD;
    const netAnnualSavings = netSavingsMonthly * 12;

    // Payback period (months)
    const paybackPeriodMonths =
      netSavingsMonthly > 0
        ? (params.estimatedSystemSetupTWD / netSavingsMonthly).toFixed(1)
        : '無法回本';

    // 3-Year Total Financial Projection
    const chartData = [
      {
        year: '第 1 年',
        維持人工總成本: Math.round(currentTotalAnnualCost),
        導入自動化後總成本: Math.round(
          params.estimatedSystemSetupTWD +
            params.monthlyMaintenanceTWD * 12 +
            (currentTotalCostMonthly - grossSavingsMonthly) * 12
        ),
      },
      {
        year: '第 2 年',
        維持人工總成本: Math.round(currentTotalAnnualCost * 1.05), // assume 5% salary inflation
        導入自動化後總成本: Math.round(
          params.monthlyMaintenanceTWD * 12 +
            (currentTotalCostMonthly - grossSavingsMonthly) * 12
        ),
      },
      {
        year: '第 3 年',
        維持人工總成本: Math.round(currentTotalAnnualCost * 1.1),
        導入自動化後總成本: Math.round(
          params.monthlyMaintenanceTWD * 12 +
            (currentTotalCostMonthly - grossSavingsMonthly) * 12
        ),
      },
    ];

    return {
      currentTotalAnnualCost,
      netAnnualSavings,
      grossSavingsMonthly,
      paybackPeriodMonths,
      annualHoursSaved: Math.round(
        params.employeesCount *
          params.monthlyHoursPerPerson *
          12 *
          (params.targetAutomationRate / 100)
      ),
      chartData,
    };
  }, [params]);

  const formatCurrency = (val: number) => {
    return `NT$ ${val.toLocaleString('zh-TW')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold mb-1">
          <Calculator className="w-4 h-4" />
          <span>企業財務效益試算模組</span>
        </div>
        <h1 className="text-2xl font-bold text-white">網頁自動化與 AI 系統 ROI 投資報酬率評估</h1>
        <p className="text-slate-400 text-sm mt-1">
          量化手動處理網頁作業、複製貼上與重複比對之隱形成本，客觀評估導入自動化後之財務淨效益與回本週期。
        </p>
      </div>

      {/* Main Grid: Parameters on Left, Output & Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Parameters Panel */}
        <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center justify-between">
            <span>現有業務參數設定</span>
            <span className="text-xs text-slate-400 font-normal">即時計算</span>
          </h2>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                參與手動操作網頁人數: <span className="text-cyan-400 font-bold">{params.employeesCount} 位</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={params.employeesCount}
                onChange={(e) => setParams({ ...params, employeesCount: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-700 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                每人每月耗費於此流程時數: <span className="text-cyan-400 font-bold">{params.monthlyHoursPerPerson} 小時</span>
              </label>
              <input
                type="range"
                min="5"
                max="160"
                step="5"
                value={params.monthlyHoursPerPerson}
                onChange={(e) => setParams({ ...params, monthlyHoursPerPerson: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-700 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                每小時綜合人事成本 (TWD): <span className="text-cyan-400 font-bold">NT$ {params.hourlyWageTWD}</span>
              </label>
              <input
                type="number"
                value={params.hourlyWageTWD}
                onChange={(e) => setParams({ ...params, hourlyWageTWD: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                人工漏單/比對失誤月均損失 (TWD): <span className="text-rose-400 font-bold">NT$ {params.errorCostPerMonthTWD}</span>
              </label>
              <input
                type="number"
                value={params.errorCostPerMonthTWD}
                onChange={(e) => setParams({ ...params, errorCostPerMonthTWD: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-700">
              <label className="block text-slate-300 mb-1 font-medium">
                預期自動化涵蓋率 (%): <span className="text-emerald-400 font-bold">{params.targetAutomationRate} %</span>
              </label>
              <input
                type="range"
                min="30"
                max="98"
                value={params.targetAutomationRate}
                onChange={(e) => setParams({ ...params, targetAutomationRate: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-700 h-1.5 rounded cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-0.5">註：建議保留 5~15% 作為極端例外之人工審核 (Human-in-the-loop)。</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">預估建置開發費</label>
                <input
                  type="number"
                  value={params.estimatedSystemSetupTWD}
                  onChange={(e) => setParams({ ...params, estimatedSystemSetupTWD: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">預估月維運雲端費</label>
                <input
                  type="number"
                  value={params.monthlyMaintenanceTWD}
                  onChange={(e) => setParams({ ...params, monthlyMaintenanceTWD: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial KPI Summary Cards & Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>預估每年淨節省</span>
              </div>
              <div className="text-xl font-bold text-emerald-400">
                {formatCurrency(calculations.netAnnualSavings)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">已扣除雲端伺服器與維運成本</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>預估回本週期</span>
              </div>
              <div className="text-xl font-bold text-cyan-400">
                {calculations.paybackPeriodMonths} 個月
              </div>
              <p className="text-[11px] text-slate-500 mt-1">系統開發投資損益平衡點</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>年釋放寶貴工時</span>
              </div>
              <div className="text-xl font-bold text-indigo-300">
                {calculations.annualHoursSaved.toLocaleString()} 小時
              </div>
              <p className="text-[11px] text-slate-500 mt-1">團隊可轉向高價值商務拓展</p>
            </div>
          </div>

          {/* 3-Year Chart */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">三年累積營運支出對比 (TWD)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calculations.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(val) => `$${(val / 10000).toFixed(0)}萬`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`NT$ ${value.toLocaleString()}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="維持人工總成本" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="導入自動化後總成本" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Strategic Consultant Insight */}
          <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-slate-800/80 border border-cyan-500/30 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>首席顧問財務決策建議</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              根據試算，本專案投資回本期為 <strong className="text-white">{calculations.paybackPeriodMonths} 個月</strong>。在一般企業 IT 投資標準（回本期小於 12 個月即屬高優先級專案）中具備極高推動價值。建議優先以最小可行性產品（MVP）鎖定最費時之 80% 核心網頁步驟，降低初期開發試錯成本。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
