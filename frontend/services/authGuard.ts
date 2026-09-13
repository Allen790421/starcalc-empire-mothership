import { UserAccount } from '../types';
import { isRootAdminEmail, isVipWhitelisted } from '../config/whitelist';

export interface GuardVerificationResult {
  allowed: boolean;
  reason?: string;
  role: 'ADMIN' | 'USER';
  isVip: boolean;
}

/**
 * 權限守衛校驗：
 * 檢查使用者是否為最高管理者 (ADMIN) 或具備已審核開通 (isApproved && isFullSiteFree)
 */
export function verifyFeatureAccess(
  user: UserAccount | null,
  featureKey: string,
  customWhitelist: string[] = []
): GuardVerificationResult {
  // 1. 若無使用者
  if (!user) {
    return {
      allowed: false,
      reason: '未登入訪客：此功能需要最高管理者（kclee1654）授權或 VIP 免費白名單資格。',
      role: 'USER',
      isVip: false,
    };
  }

  // 2. 最高管理者一律放行
  if (user.role === 'ADMIN' || isRootAdminEmail(user.email)) {
    return {
      allowed: true,
      role: 'ADMIN',
      isVip: true,
    };
  }

  // 3. 白名單檢查
  const isWhite = isVipWhitelisted(user.email, customWhitelist);
  if (isWhite || (user.isApproved && user.isFullSiteFree)) {
    return {
      allowed: true,
      role: 'USER',
      isVip: true,
    };
  }

  // 4. 一般已註冊但未經手動核可的使用者
  return {
    allowed: false,
    reason: `帳號 [${user.email}] 尚未由管理者開通：此功能需要最高管理者授權或 VIP 免費資格。請聯繫 kclee1654@gmail.com 開通。`,
    role: 'USER',
    isVip: false,
  };
}
