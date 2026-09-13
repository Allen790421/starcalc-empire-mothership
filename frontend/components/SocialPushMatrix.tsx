import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Share2, 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Check, 
  Copy, 
  ExternalLink,
  Bot,
  RefreshCw,
  Flame,
  Terminal,
  Zap,
  Globe
} from 'lucide-react';
import { SocialPlatformId, ContentModalType, SocialPushPost, SupportedLocale, CurrencyAnchor } from '../types';
import { TRANSLATIONS } from '../services/localeService';

interface SocialPushMatrixProps {
  currentLocale: SupportedLocale;
  currency: CurrencyAnchor;
}

const SOCIAL_CHANNELS: { id: SocialPlatformId; name: string; color: string; icon: string }[] = [
  { id: 'line', name: 'LINE 官方帳號 / 群組', color: 'bg-emerald-500 text-white', icon: '🟢' },
  { id: 'facebook', name: 'Facebook 粉絲頁 / 社團', color: 'bg-blue-600 text-white', icon: '🔵' },
  { id: 'instagram', name: 'Instagram 貼文 / 限動', color: 'bg-pink-600 text-white', icon: '🟣' },
  { id: 'x_twitter', name: 'X (Twitter) 趨勢推播', color: 'bg-black text-white', icon: '⚫' },
  { id: 'trae_threads', name: 'TRAE / Threads 串流', color: 'bg-stone-800 text-white', icon: '⚪' },
  { id: 'tiktok', name: 'TikTok 短影音文案', color: 'bg-cyan-600 text-white', icon: '🔴' },
];

export const SocialPushMatrix: React.FC<SocialPushMatrixProps> = ({ currentLocale }) => {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.zh_TW;

  const [targetAudience, setTargetAudience] = useState<'娛樂城代理' | '外貿跨境行銷' | '網賺加盟業務' | '綜合高轉化流量'>('娛樂城代理');
  const [modalType, setModalType] = useState<ContentModalType>('text_and_image');
  const [selectedChannels, setSelectedChannels] = useState<SocialPlatformId[]>(['line', 'facebook', 'instagram', 'x_twitter', 'trae_threads', 'tiktok']);
  const [customKeyword, setCustomKeyword] = useState('2026首月149代理分潤矩陣');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<SocialPushPost>({
    id: 'post-init-01',
    targetAudience: '娛樂城代理',
    platforms: ['line', 'facebook', 'instagram', 'x_twitter', 'trae_threads', 'tiktok'],
    modalType: 'text_and_image',
    generatedHeadline: '🎰【娛樂城代理裂變必看】2026 AI 自動化獲客矩陣 — 告別手動過單，首月 NT$149 啟動 30% 代理分潤！',
    generatedText: `🔥 手動加賴發私訊發到被鎖號？用 AI 機器人＋Google Edge 邊緣快取，全自動把精準意向引導至私域！
✅ 5 秒行為喚醒與多語系即時接待
✅ ManyChat 留言自動私訊加密 Referral Link
✅ 55/15/30 資金公式秒撥：每單直接抽 30% 現金分潤
👉 立即預約 14 天商業破蛋方案，名額有限！`,
    generatedImageUrl: 'https://picsum.photos/seed/primeflow2026/800/450',
    seoKeywords: ['娛樂城代理分潤', 'AI自動推播', 'LINE自動群發', 'GoogleEdgeSEO', 'ManyChat私訊導流'],
    status: 'scheduled',
    scheduledTime: '每日 10:00, 14:00, 20:00 循環推播',
    publishedCount: 1248,
  });

  const toggleChannel = (id: SocialPlatformId) => {
    if (selectedChannels.includes(id)) {
      if (selectedChannels.length === 1) return; // Keep at least one
      setSelectedChannels(selectedChannels.filter(c => c !== id));
    } else {
      setSelectedChannels([...selectedChannels, id]);
    }
  };

  const handleTriggerGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let headline = '';
      let text = '';
      let keywords: string[] = [];

      if (targetAudience === '娛樂城代理') {
        headline = `💎【娛樂城代理必備神器】自動串接 LINE / IG / TikTok — 告別封號，實現 30% 自動裂變返水！`;
        text = `每日自動生成純文字與視覺素材，秒發 6 大主流平台！
1. 訪客停留 5 秒自動跳出代理算式
2. 留言自動觸發私訊，帶專屬加盟 code
3. 支援台幣 NT$149 首次衝動破冰或 $4.99 USD 國際匯率同步！
歡迎私訊【${customKeyword}】索取完整自動化矩陣設定檔！`;
        keywords = ['娛樂城代理', '博弈自動行銷', 'LINE群控', '自動貼文', 'SEO快速收錄'];
      } else if (targetAudience === '外貿跨境行銷') {
        headline = `🌍【跨境出海流量霸屏】Google Edge 2026 邊緣預快取＋多語系 SEO 內容自動推播`;
        text = `支援中/英/日/韓/越/泰 7 國語言秒級發布至 X、Instagram 與 Facebook！
讓 AI 搜尋引擎 (ChatGPT, Perplexity) 優先引用您的品牌 FAQ，獲客成本直降 80%！`;
        keywords = ['跨境電商', '多語系SEO', 'GoogleAIOverviews', '海外業務拓客', '自動貼文軟體'];
      } else {
        headline = `⚡【一人創業翻倍工具】免請工程師！全自動社群排程與 55/15/30 現金分流系統`;
        text = `從文字、製圖到自動發文一站搞定。內建「防一帳號多人使用」裝置指紋鎖與雲端沙盒防駭，安全穩定無後顧之憂！`;
        keywords = ['一人創業', '網賺加盟', '自動化腳本', 'AI客代系統', '零員工營運'];
      }

      setGeneratedPost({
        id: `post-${Date.now()}`,
        targetAudience,
        platforms: selectedChannels,
        modalType,
        generatedHeadline: headline,
        generatedText: text,
        generatedImageUrl: modalType !== 'text_only' ? `https://picsum.photos/seed/${Date.now()}/800/450` : undefined,
        seoKeywords: keywords,
        status: 'published',
        scheduledTime: '已成功排程並自動分發至選定節點',
        publishedCount: Math.floor(800 + Math.random() * 2000),
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-cyan-500/15 border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 text-amber-300 font-extrabold text-xs shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>全自動多模態行銷推播與 SEO 矩陣 (LINE/FB/IG/X/TRAE/TikTok)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              受眾精準鎖定：娛樂城代理與高獲利行銷人員
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              一鍵自動生成<strong>「純文字、純圖片、圖文並茂」</strong>高吸睛推播內容，全自動派送至 6 大主流社交網絡，並同步注入 Schema GEO 權威標籤，實現流量與搜尋雙重霸屏！
            </p>
          </div>

          <div className="bg-white/95 px-5 py-4 rounded-2xl border border-amber-200 shadow-sm text-center shrink-0">
            <div className="text-[11px] text-slate-400 font-medium">多渠道覆蓋發佈</div>
            <div className="text-2xl font-black text-slate-900">6 大社群同時派發</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">LINE • FB • IG • X • TRAE • TikTok</div>
          </div>
        </div>
      </div>

      {/* Control Panel: 3 Columns Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Target Audience & Modality Selector */}
        <div className="lg:col-span-5 bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>1. 鎖定受眾與多模態形式</span>
            </h2>
            <p className="text-xs text-slate-500">針對業務屬性調配專屬高轉化心理學文案</p>
          </div>

          {/* Target Audience Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">目標受眾客群：</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['娛樂城代理', '外貿跨境行銷', '網賺加盟業務', '綜合高轉化流量'] as const).map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setTargetAudience(aud)}
                  className={`p-2.5 rounded-xl border text-left font-bold transition ${
                    targetAudience === aud
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Content Type: Text, Image, Text+Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">內容呈現形態：</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setModalType('text_only')}
                className={`p-2.5 rounded-xl border font-bold text-center transition flex flex-col items-center gap-1 ${
                  modalType === 'text_only'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>純文字文案</span>
              </button>

              <button
                type="button"
                onClick={() => setModalType('image_only')}
                className={`p-2.5 rounded-xl border font-bold text-center transition flex flex-col items-center gap-1 ${
                  modalType === 'image_only'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>純圖片素材</span>
              </button>

              <button
                type="button"
                onClick={() => setModalType('text_and_image')}
                className={`p-2.5 rounded-xl border font-bold text-center transition flex flex-col items-center gap-1 ${
                  modalType === 'text_and_image'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>圖文並茂 (推薦)</span>
              </button>
            </div>
          </div>

          {/* Custom Trigger Hook Keyword */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">社群私訊觸發詞 (ManyChat DM Hook)：</label>
            <input
              type="text"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              placeholder="例：2026首月149代理分潤矩陣"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Platform Channels Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">自動發佈推播渠道 (點擊選取)：</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SOCIAL_CHANNELS.map((ch) => {
                const isChecked = selectedChannels.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChannel(ch.id)}
                    className={`flex items-center space-x-2 p-2 rounded-xl border text-left transition ${
                      isChecked
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{ch.icon}</span>
                    <span className="font-bold text-[11px] truncate">{ch.name.split(' ')[0]}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleTriggerGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-black text-sm shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI 多模態內容生成中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>立即生成並派發至 6 大社群</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Live Dispatcher Preview Window */}
        <div className="lg:col-span-7 bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  多模態推播預覽與 SEO 關鍵字矩陣
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                已同步 6 大渠道排程
              </span>
            </div>

            {/* Generated Headline & Body Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center space-x-1.5 text-xs text-amber-700 font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>受眾鎖定：{generatedPost.targetAudience}</span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                {generatedPost.generatedHeadline}
              </h4>

              {/* Image Preview if applicable */}
              {generatedPost.generatedImageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                  <img 
                    src={generatedPost.generatedImageUrl} 
                    alt="AI Generated Banner" 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">
                    AI Visual Prompt: 2026 Gaming Affiliates High-Conversion Vector
                  </div>
                </div>
              )}

              {/* Text Body */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                {generatedPost.generatedText}
              </div>

              {/* Auto SEO Keywords */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">
                  自動生成之高權重 LSI 關鍵字（注入 Schema.org 與邊緣索引）：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {generatedPost.seoKeywords.map((kw, idx) => (
                    <span key={idx} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-900 border border-amber-200">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pipeline Dispatch Status */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
              {selectedChannels.map((c) => (
                <div key={c} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 text-[11px] font-bold truncate">
                    {SOCIAL_CHANNELS.find(sc => sc.id === c)?.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dispatched Stats */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{generatedPost.scheduledTime}</span>
            </span>
            <span className="font-semibold text-slate-700">
              累計已自動觸達：<strong className="text-emerald-700 font-mono">{generatedPost.publishedCount.toLocaleString()}</strong> 人次
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
