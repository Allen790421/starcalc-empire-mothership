// src/config/whitelist.ts - 系統最高管理者與免費授權白名單配置

// 最高權限管理者預設清單 (支援 kclee1654 相關別名)
export const DEFAULT_ADMIN_EMAILS: string[] = [
  'kclee1654',
  'kclee1654@gmail',
  'kclee1654@gmail.com',
  'root@dawn-quant.xingdeng.tw',
];

// 免費授權白名單預設名單 (VIP Free List)
export const DEFAULT_VIP_FREE_LIST: string[] = [
  'partner.free@enterprise.tw',
  'demo.vip@dawn-quant.tw',
  'affiliate.top@gaming-agent.com',
];

// 判斷是否為最高管理者 (支援不分大小寫與環境變數注入)
export function isRootAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  
  // 檢查預設或環境變數設定
  const envAdmin = typeof process !== 'undefined' && process.env?.SUPER_ADMIN_EMAIL
    ? process.env.SUPER_ADMIN_EMAIL.toLowerCase()
    : 'kclee1654@gmail.com';

  return (
    clean === envAdmin ||
    clean === 'kclee1654' ||
    clean === 'kclee1654@gmail' ||
    clean === 'kclee1654@gmail.com' ||
    DEFAULT_ADMIN_EMAILS.some((adm) => clean === adm.toLowerCase())
  );
}

// 判斷是否在 VIP 免費名單內
export function isVipWhitelisted(email?: string | null, customWhitelist: string[] = []): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  if (isRootAdminEmail(clean)) return true;

  const combinedList = [...DEFAULT_VIP_FREE_LIST, ...customWhitelist].map((item) =>
    item.trim().toLowerCase()
  );
  return combinedList.includes(clean);
}
