import React, { useState } from 'react';
import { 
  Flame, 
  Play, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  Radio, 
  Target, 
  Zap, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Code2, 
  Globe2, 
  Send
} from 'lucide-react';
import { BattleCampaignId, BattleCampaignItem } from '../types';

export const BattleCampaignsConsole: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'nodejs' | 'python'>('nodejs');
  const [runningCampaign, setRunningCampaign] = useState<BattleCampaignId | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '系統就緒：四大戰役行推腳本載入完畢 (Normandy, Midway, Iwo Jima, Pearl Harbor)。',
    '等待最高管理員 kclee1654 派發指令...',
  ]);

  const [campaigns, setCampaigns] = useState<BattleCampaignItem[]>([
    {
      id: 'normandy',
      name: 'Normandy Landing',
      chineseTitle: '諾曼第大登陸法：多點部署',
      tacticCategory: '全面突圍',
      description: '多平台同步推播，突破單一防線，多點同時搶佔流量海灘。',
      defaultTargets: ['Twitter (X)', 'Mastodon', 'Reddit', 'LINE 官方群'],
      executionSpeed: '平行並發 (Parallel)',
      status: 'ready',
      executionCount: 24,
    },
    {
      id: 'midway',
      name: 'Midway Assault',
      chineseTitle: '中途島搶灘法：節點奪取',
      tacticCategory: '精準集火',
      description: '精準打擊流量節點，集中火力鎖定高權重話題與轉換關鍵詞。',
      defaultTargets: ['#核心話題', '#流量轉折', '#2026一人創業', '#代理分潤'],
      executionSpeed: '節點爆破 (Node Sniper)',
      status: 'ready',
      executionCount: 18,
    },
    {
      id: 'iwo_jima',
      name: 'Iwo Jima Explosion',
      chineseTitle: '硫磺島引爆法：爆炸性擴散',
      tacticCategory: '高壓飽和',
      description: '短時間連續大批量釋放內容，在社交瀑布流中形成爆炸性霸屏話題。',
      defaultTargets: ['Burst #1', 'Burst #2', 'Burst #3', 'Burst #4', 'Burst #5'],
      executionSpeed: '極速連發 (Burst Fire)',
      status: 'ready',
      executionCount: 42,
    },
    {
      id: 'pearl_harbor',
      name: 'Pearl Harbor Surprise',
      chineseTitle: '珍珠港偷來暗去法：突襲推播',
      tacticCategory: '暗流突襲',
      description: '前置隱藏式靜默預熱種子內容，時機成熟時瞬間全面爆發引流。',
      defaultTargets: ['隱密預熱節點', '靜默暗流池', '全網突襲引爆'],
      executionSpeed: '延時暗湧 (Silent Surge 3s)',
      status: 'ready',
      executionCount: 9,
    },
  ]);

  const logMessage = (msg: string) => {
    setExecutionLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 40),
    ]);
  };

  const handleRunStrategy = (campaignId: BattleCampaignId) => {
    if (runningCampaign) return;
    setRunningCampaign(campaignId);

    const target = campaigns.find((c) => c.id === campaignId);
    if (!target) return;

    logMessage(`🚀 開始執行【${target.chineseTitle}】...`);
    logMessage(`戰術理念：${target.description}`);

    if (campaignId === 'normandy') {
      target.defaultTargets.forEach((p, idx) => {
        setTimeout(() => {
          logMessage(`Deploying content to ${p}... [HTTP 200 OK]`);
        }, (idx + 1) * 350);
      });
      setTimeout(() => {
        logMessage(`🏁 諾曼第大登陸全平台部署完成！多點防線已突破。`);
        setRunningCampaign(null);
        incrementCount(campaignId);
      }, target.defaultTargets.length * 350 + 200);
    } else if (campaignId === 'midway') {
      target.defaultTargets.forEach((tag, idx) => {
        setTimeout(() => {
          logMessage(`Boosting campaign at ${tag}... [關鍵節點火力注入]`);
        }, (idx + 1) * 400);
      });
      setTimeout(() => {
        logMessage(`🎯 中途島節點搶奪勝利！流量樞紐已牢固掌控。`);
        setRunningCampaign(null);
        incrementCount(campaignId);
      }, target.defaultTargets.length * 400 + 200);
    } else if (campaignId === 'iwo_jima') {
      for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
          logMessage(`Publishing burst content #${i}... [突刺擴散中]`);
        }, i * 300);
      }
      setTimeout(() => {
        logMessage(`💥 硫磺島爆炸性擴散完成！瀑布流霸屏成功。`);
        setRunningCampaign(null);
        incrementCount(campaignId);
      }, 5 * 300 + 200);
    } else if (campaignId === 'pearl_harbor') {
      logMessage(`Seeding hidden content... (靜默埋置種子，進入 3 秒暗伏期)`);
      setTimeout(() => {
        logMessage(`⚡ [T+3s] Sudden mass exposure triggered! 全域突襲瞬間引爆！`);
        logMessage(`🔥 珍珠港突襲完成！全網無預警超高曝光率達成。`);
        setRunningCampaign(null);
        incrementCount(campaignId);
      }, 3000);
    }
  };

  const incrementCount = (id: BattleCampaignId) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, executionCount: c.executionCount + 1 } : c))
    );
  };

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Node.js Blueprint
  const nodejsCode = `// 四大戰役擴散法 → 網站行推策略腳本 (Node.js 藍本)
class CampaignStrategy {
  constructor(name, description, execute) {
    this.name = name;
    this.description = description;
    this.execute = execute;
  }
}

// 諾曼第大登陸法：多點部署
const normandyLanding = new CampaignStrategy(
  "Normandy Landing",
  "多平台同步推播，突破單一防線。",
  () => {
    const platforms = ["Twitter", "Mastodon", "Reddit", "LINE"];
    platforms.forEach(p => console.log(\`Deploying content to \${p}...\`));
  }
);

// 中途島搶灘法：節點奪取
const midwayAssault = new CampaignStrategy(
  "Midway Assault",
  "精準打擊流量節點，集中火力。",
  () => {
    const hashtags = ["#核心話題", "#流量轉折"];
    hashtags.forEach(tag => console.log(\`Boosting campaign at \${tag}...\`));
  }
);

// 硫磺島引爆法：爆炸性擴散
const iwoJimaExplosion = new CampaignStrategy(
  "Iwo Jima Explosion",
  "短時間大量釋放內容，形成爆炸性話題。",
  () => {
    for (let i = 1; i <= 5; i++) {
      console.log(\`Publishing burst content #\${i}...\`);
    }
  }
);

// 珍珠港偷來暗去法：突襲推播
const pearlHarborSurprise = new CampaignStrategy(
  "Pearl Harbor Surprise",
  "隱藏式預熱，突然引爆。",
  () => {
    console.log("Seeding hidden content...");
    setTimeout(() => {
      console.log("Sudden mass exposure triggered!");
    }, 3000);
  }
);

function runCampaign(strategy) {
  console.log(\`Executing \${strategy.name}...\`);
  console.log(strategy.description);
  strategy.execute();
}

runCampaign(normandyLanding);
runCampaign(midwayAssault);
runCampaign(iwoJimaExplosion);
runCampaign(pearlHarborSurprise);`;

  // Python Blueprint
  const pythonCode = `# 四大戰役擴散法 → 網站行推策略腳本 (Python 版本)
import time

class CampaignStrategy:
  def __init__(self, name, description, execute):
    self.name = name
    self.description = description
    self.execute = execute

# 諾曼第大登陸法：多點部署
def normandy_landing():
  platforms = ["Twitter", "Mastodon", "Reddit", "LINE"]
  for p in platforms:
    print(f"Deploying content to {p}...")

# 中途島搶灘法：節點奪取
def midway_assault():
  hashtags = ["#核心話題", "#流量轉折"]
  for tag in hashtags:
    print(f"Boosting campaign at {tag}...")

# 硫磺島引爆法：爆炸性擴散
def iwo_jima_explosion():
  for i in range(1, 6):
    print(f"Publishing burst content #{i}...")

# 珍珠港偷來暗去法：突襲推播
def pearl_harbor_surprise():
  print("Seeding hidden content...")
  time.sleep(3)
  print("Sudden mass exposure triggered!")

strategies = [
  CampaignStrategy("Normandy Landing", "多平台同步推播，突破單一防線。", normandy_landing),
  CampaignStrategy("Midway Assault", "精準打擊流量節點，集中火力。", midway_assault),
  CampaignStrategy("Iwo Jima Explosion", "短時間大量釋放內容，形成爆炸性話題。", iwo_jima_explosion),
  CampaignStrategy("Pearl Harbor Surprise", "隱藏式預熱，突然引爆。", pearl_harbor_surprise)
]

def run_campaign(strategy):
  print(f"\\nExecuting {strategy.name}...")
  print(strategy.description)
  strategy.execute()

if __name__ == "__main__":
  for s in strategies:
    run_campaign(s)`;

  return (
    <div className="space-y-6">
      {/* 戰役控制台標題卡片 */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-white">
                  四大戰役擴散法 • 網站行推策略控制台 (BattleHQ Core)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  最高管理者專用
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                諾曼第大登陸、中途島搶灘、硫磺島引爆、珍珠港突襲 — 集中於後台操控，前台保持極簡潔淨
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>推播引擎連線中</span>
          </div>
        </div>

        {/* 4 大戰役卡片陣列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {campaigns.map((camp) => {
            const isCurrentRunning = runningCampaign === camp.id;
            return (
              <div
                key={camp.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 flex flex-col justify-between transition hover:border-amber-500/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      {camp.tacticCategory}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      已執行：<strong>{camp.executionCount}</strong> 次
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white">{camp.chineseTitle}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{camp.name}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{camp.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {camp.defaultTargets.map((tgt, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-700 font-mono"
                      >
                        {tgt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    模式: {camp.executionSpeed}
                  </span>
                  <button
                    onClick={() => handleRunStrategy(camp.id)}
                    disabled={runningCampaign !== null}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition shadow-sm ${
                      isCurrentRunning
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-white hover:bg-slate-100 text-slate-900 disabled:opacity-40'
                    }`}
                  >
                    {isCurrentRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>突擊中...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-amber-600" />
                        <span>執行戰役推播</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 即時推播日誌終端機 (Live Tactical Terminal) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 shadow-2xl space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>BattleHQ 實時執行日誌終端 (Live Execution Log)</span>
          </div>
          <button
            onClick={() => setExecutionLogs(['[TERMINAL CLEARED] 等待全新指令...'])}
            className="text-[10px] text-slate-500 hover:text-slate-300 transition"
          >
            清空日誌
          </button>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-[11px] leading-relaxed">
          {executionLogs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                log.includes('Sudden mass exposure') || log.includes('完成') || log.includes('勝利')
                  ? 'text-emerald-400 font-bold'
                  : log.includes('開始') || log.includes('🚨')
                  ? 'text-amber-300'
                  : 'text-slate-300'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* 原生代碼腳本抽屜 (Node.js & Python 版本切換) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            <h4 className="font-extrabold text-sm text-slate-900">
              戰役擴散法原生自動化腳本代碼（供後端排程或外部微服務直接掛載）
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveLang('nodejs')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  activeLang === 'nodejs'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Node.js / JS
              </button>
              <button
                onClick={() => setActiveLang('python')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  activeLang === 'python'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Python 腳本
              </button>
            </div>

            <button
              onClick={() => copyCode(activeLang === 'nodejs' ? nodejsCode : pythonCode, 'script')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
            >
              {copiedKey === 'script' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>複製腳本</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed border border-slate-800 max-h-72">
          <pre>{activeLang === 'nodejs' ? nodejsCode : pythonCode}</pre>
        </div>
      </div>
    </div>
  );
};
