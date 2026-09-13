// Supported 7 international languages with real-time UI/Currency pegging
export type SupportedLocale = 'zh_TW' | 'zh_CN' | 'en' | 'ja' | 'ko' | 'vi' | 'th';

export type CurrencyAnchor = 'TWD' | 'USD';

export interface CurrencyRates {
  USD: number;
  TWD: number;
  JPY: number;
  KRW: number;
  VND: number;
  THB: number;
}

// 角色與審核狀態嚴格枚舉
export type UserRole = 'ADMIN' | 'USER';

export interface UserAccount {
  id: string;
  email: string;
  role: UserRole;
  isApproved: boolean; // 是否經管理者手動核可
  isFullSiteFree: boolean; // 是否享全站免費 VIP 特權
  createdAt: string;
  notes?: string;
  referralCode?: string;
  deviceFingerprintHash?: string; // 防一帳號多人使用 (Device/Session Lock)
  lastActiveSessionId?: string;
  ipAddress?: string;
}

export interface AnonymousIntentOrder {
  id: string;
  anonymousId: string;
  category: string;
  status: 'pending_review' | 'paid_verified';
  contactInfo: string;
  requestSnippet: string;
  deliveryDue: string;
  createdAt: string;
  referralEarnedTWD?: number;
}

export interface PricingPlan {
  id: string;
  titleKey: string;
  badgeKey?: string;
  priceUSD: number;
  priceTWD: number;
  periodKey: string;
  descKey: string;
  featuresKeys: string[];
  allocation: {
    profit55Percent: number;     // 55% 主營淨利
    compute15Percent: number;    // 15% 算力儲備池 (Gemini / Vertex AI)
    acquisition30Percent: number;// 30% 獲客行銷與裂變池
  };
}

export interface TransferVerificationRecord {
  id: string;
  orderNumber: string;
  planTitle: string;
  amountTWD: number;
  amountUSD: number;
  transferLast5: string;
  payerContact?: string;
  submittedAt: string;
  status: 'PENDING_VERIFICATION' | 'PAID_VERIFIED' | 'REJECTED';
  notes?: string;
}

// 支援自動化推播的 6 大主流渠道 (LINE, FB, IG, X, TRAE/Threads, TikTok)
export type SocialPlatformId = 'line' | 'facebook' | 'instagram' | 'x_twitter' | 'trae_threads' | 'tiktok';

// 多模態內容生成型態 (純文字, 純圖, 圖文並茂)
export type ContentModalType = 'text_only' | 'image_only' | 'text_and_image';

export interface SocialPushPost {
  id: string;
  targetAudience: '娛樂城代理' | '外貿跨境行銷' | '網賺加盟業務' | '綜合高轉化流量';
  platforms: SocialPlatformId[];
  modalType: ContentModalType;
  generatedHeadline: string;
  generatedText: string;
  generatedImageUrl?: string;
  seoKeywords: string[];
  status: 'draft' | 'scheduled' | 'published';
  scheduledTime: string;
  publishedCount: number;
}

// 企劃書上線營運必修補之關鍵 4 大盲點 (盲區修復狀態)
export interface BlindspotFixItem {
  id: string;
  num: number;
  title: string;
  riskDescription: string;
  remedyAction: string;
  techStack: string;
  status: 'fully_patched' | 'monitoring' | 'simulated';
  liveMetrics: string;
}

// 四大戰役擴散法策略物件型別 (Battle Campaign Strategy)
export type BattleCampaignId = 'normandy' | 'midway' | 'iwo_jima' | 'pearl_harbor';

export interface BattleCampaignItem {
  id: BattleCampaignId;
  name: string;
  chineseTitle: string;
  tacticCategory: string;
  description: string;
  defaultTargets: string[];
  executionSpeed: string;
  status: 'ready' | 'running' | 'completed';
  executionCount: number;
}

// 全網站壓測與自動化檢測回報
export interface StressTestReport {
  timestamp: string;
  virtualUsers: number;
  totalRequests: number;
  qps: number;
  averageLatencyMs: number;
  p99LatencyMs: number;
  errorRate: number;
  circuitBreakerStatus: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  rateLimitingBlocked: number;
  authGuardInterceptions: number;
}

export type LightBgTheme = 
  | 'ivory_gold'
  | 'pearl_silver'
  | 'champagne_sand'
  | 'sky_crystal'
  | 'mint_frost'
  | 'sakura_blush';

export type GeometryCycleInterval = 30 | 60;
