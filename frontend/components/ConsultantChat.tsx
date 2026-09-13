import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Scale, 
  Cpu, 
  FileText, 
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, ConsultantMode } from '../types';
import { askConsultant } from '../services/geminiService';

const SAMPLE_PROMPTS = [
  {
    title: '競品電商自動比價監控',
    desc: '如何打造自動爬取多家電商價格並以 AI 分析降價策略的流程？',
    mode: 'architecture' as ConsultantMode,
  },
  {
    title: 'Cloudflare 與驗證碼應對',
    desc: '企業進行合法公開資料蒐集時，遇到 Cloudflare 阻擋或驗證碼該如何兼顧合規與穩定？',
    mode: 'legal_compliance' as ConsultantMode,
  },
  {
    title: 'RPA 與 AI Agent 之抉擇',
    desc: '傳統 RPA (如 UiPath) 與以 LLM 驅動的自主 AI Agent，企業何時該選哪一種？',
    mode: 'roi' as ConsultantMode,
  },
  {
    title: '非結構化網頁資料轉 ERP/CRM',
    desc: '如何將每日數百頁政府標案與廠商公開規章，自動擷取成 JSON 自動灌入 CRM？',
    mode: 'proposal' as ConsultantMode,
  },
];

export const ConsultantChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'consultant',
      text: `您好！我是您的 **網頁自動化與 AI 系統資深業務顧問**。\n\n不論您目前正在評估 **競品情報自動化、內部表單/ERP 自動過單、RPA 降本增效**，或是希望將 **網頁爬蟲與大語言模型 (LLM/Agent) 深度整合**，我都隨時為您提供具商業可行性、架構選型、成本估算與資安合規的深度解答。\n\n您可以從下方推薦的經典商業題目開始，或直接描述您目前遇到的業務痛點！`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<ConsultantMode>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (overridePrompt?: string, overrideMode?: ConsultantMode) => {
    const textToSend = overridePrompt || input;
    const modeToUse = overrideMode || activeMode;

    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overridePrompt) setInput('');
    setLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== 'init-1')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }],
        }));

      const replyText = await askConsultant(textToSend, modeToUse, history);

      const consultantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'consultant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, consultantMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'consultant',
        text: '很抱歉，顧問模組在處理此項諮詢時發生異常，請重試或簡化問題內容。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'consultant',
        text: '對話已重設。請隨時提出您關於網頁自動化技術選型、AI Agent 部署、成本回本期或企業合規的問題！',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-6xl mx-auto px-4 py-4">
      {/* Top Controls & Persona Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">諮詢維度：</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveMode('general')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activeMode === 'general' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              綜合策略
            </button>
            <button
              onClick={() => setActiveMode('architecture')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activeMode === 'architecture' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>架構與技術棧</span>
            </button>
            <button
              onClick={() => setActiveMode('roi')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activeMode === 'roi' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>商業效益與 ROI</span>
            </button>
            <button
              onClick={() => setActiveMode('legal_compliance')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activeMode === 'legal_compliance' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>合規與風控</span>
            </button>
            <button
              onClick={() => setActiveMode('proposal')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activeMode === 'proposal' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>專案提案格式</span>
            </button>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-rose-400 transition px-2 py-1 rounded hover:bg-slate-800/80"
          title="重設對話紀錄"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>清除對話</span>
        </button>
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg) => {
          const isConsultant = msg.sender === 'consultant';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isConsultant ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow ${
                  isConsultant
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-700 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {isConsultant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-3xl rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed ${
                  isConsultant
                    ? 'bg-slate-800/90 border border-slate-700/80 text-slate-100 shadow-md'
                    : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md'
                }`}
              >
                {/* Text Body */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer bar with timestamp & copy button */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50 text-xs text-slate-400">
                  <span className="opacity-80">{msg.timestamp}</span>
                  {isConsultant && (
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className="opacity-0 group-hover:opacity-100 transition flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">已複製內容</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>複製方案</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 text-sm text-slate-300 flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs text-slate-400 font-medium">資深顧問正在分析業務架構與商業價值...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Fast Prompts (Show when chat is young) */}
      {messages.length <= 3 && (
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_PROMPTS.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleSend(sample.desc, sample.mode)}
              disabled={loading}
              className="text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 transition group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>{sample.title}</span>
                <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{sample.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="mt-2 pt-2 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="請輸入您的業務場景（如：每日手動下載 50 家分行發票與匯入 ERP，如何用自動化解決？）..."
            className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-3.5 pr-24 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition shadow-inner"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow transition"
          >
            <span>諮詢</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <p className="text-[11px] text-slate-500 text-center mt-1.5 flex items-center justify-center space-x-1">
          <HelpCircle className="w-3 h-3" />
          <span>顧問建議涵蓋技術選型、專利法規與商業評估；請依各企業 IT 資安規章實施。</span>
        </p>
      </div>
    </div>
  );
};
