import React, { useState, useEffect } from 'react';
import { LightBgTheme, GeometryCycleInterval } from '../types';

interface GeometricBackgroundProps {
  currentTheme: LightBgTheme;
  intervalSec: GeometryCycleInterval;
}

export const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ 
  currentTheme, 
  intervalSec 
}) => {
  // 自動每 30 秒或 1 分鐘循環切換的不規則幾何立體姿態 (0, 1, 2)
  const [shapePhase, setShapePhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setShapePhase((prev) => (prev + 1) % 3);
    }, intervalSec * 1000);
    return () => clearInterval(timer);
  }, [intervalSec]);

  // 調控變換之亮色系色彩系統（包含高光 facetHighlight、受光、內凹陰影 facetShadow 與基底色）
  const getThemePalette = (theme: LightBgTheme) => {
    switch (theme) {
      case 'ivory_gold':
        return {
          bgGrad: 'from-[#FAF8F5] via-[#FFFDF9] to-[#F5EFE6]',
          baseColor: '#FAF7F2',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(195, 160, 120, 0.45)',
          concaveDark: 'rgba(160, 125, 85, 0.35)',
          ambientTint: 'rgba(245, 158, 11, 0.08)',
        };
      case 'pearl_silver':
        return {
          bgGrad: 'from-[#F8FAFC] via-[#FFFFFF] to-[#EDF2F7]',
          baseColor: '#F8FAFC',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(148, 163, 184, 0.42)',
          concaveDark: 'rgba(100, 116, 139, 0.35)',
          ambientTint: 'rgba(99, 102, 241, 0.06)',
        };
      case 'champagne_sand':
        return {
          bgGrad: 'from-[#FCF9F0] via-[#FFFFFA] to-[#F7EED8]',
          baseColor: '#FAF5E8',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(210, 165, 80, 0.45)',
          concaveDark: 'rgba(170, 125, 45, 0.38)',
          ambientTint: 'rgba(234, 179, 8, 0.10)',
        };
      case 'sky_crystal':
        return {
          bgGrad: 'from-[#F0F7FF] via-[#FFFFFF] to-[#E2F0FD]',
          baseColor: '#F0F7FF',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(125, 175, 220, 0.45)',
          concaveDark: 'rgba(70, 130, 185, 0.35)',
          ambientTint: 'rgba(14, 165, 233, 0.08)',
        };
      case 'mint_frost':
        return {
          bgGrad: 'from-[#F0FDF4] via-[#FFFFFF] to-[#DCFCE7]',
          baseColor: '#F2FAF5',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(110, 195, 150, 0.42)',
          concaveDark: 'rgba(55, 145, 105, 0.32)',
          ambientTint: 'rgba(16, 185, 129, 0.08)',
        };
      case 'sakura_blush':
        return {
          bgGrad: 'from-[#FFF5F5] via-[#FFFFFF] to-[#FEE2E2]',
          baseColor: '#FFF6F6',
          highlight: '#FFFFFF',
          shadowColor: 'rgba(225, 150, 150, 0.40)',
          concaveDark: 'rgba(190, 105, 105, 0.32)',
          ambientTint: 'rgba(244, 63, 94, 0.08)',
        };
    }
  };

  const palette = getThemePalette(currentTheme);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br ${palette.bgGrad} transition-colors duration-1000`}
      style={{ backgroundColor: palette.baseColor }}
    >
      {/* 柔和環形環境受光光暈 */}
      <div 
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl transition-all duration-1000"
        style={{ background: palette.ambientTint }}
      />
      <div 
        className="absolute top-1/2 -right-24 w-[480px] h-[480px] rounded-full blur-3xl transition-all duration-1000"
        style={{ background: palette.ambientTint }}
      />

      {/* 固定顯現之不規則幾何立體凸凹 SVG 圖層 */}
      <svg 
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 立體凸面專用雙色漸變 (受光白 -> 基底 -> 邊緣陽刻深陰影) */}
          <linearGradient id="convexGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.highlight} stopOpacity="1" />
            <stop offset="50%" stopColor={palette.baseColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={palette.shadowColor} stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="convexGradB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.highlight} stopOpacity="0.95" />
            <stop offset="60%" stopColor={palette.baseColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor={palette.shadowColor} stopOpacity="0.7" />
          </linearGradient>

          {/* 立體內凹專用漸變 (深凹刻槽 -> 基底槽底 -> 邊緣反光) */}
          <linearGradient id="concaveGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.concaveDark} stopOpacity="0.85" />
            <stop offset="40%" stopColor={palette.shadowColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={palette.highlight} stopOpacity="1" />
          </linearGradient>

          <linearGradient id="concaveGradB" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor={palette.concaveDark} stopOpacity="0.9" />
            <stop offset="60%" stopColor={palette.baseColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={palette.highlight} stopOpacity="0.9" />
          </linearGradient>

          {/* 3D 浮雕凸起立體濾鏡 (突出感) */}
          <filter id="fixedConvexRelief" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="-6" dy="-6" stdDeviation="7" floodColor={palette.highlight} floodOpacity="0.95" />
            <feDropShadow dx="10" dy="12" stdDeviation="12" floodColor={palette.shadowColor} floodOpacity="0.55" />
          </filter>

          {/* 3D 內凹雕刻深槽濾鏡 (下陷深凹感) */}
          <filter id="fixedConcaveCavity" x="-20%" y="-20%" width="150%" height="150%">
            <feOffset dx="7" dy="8" />
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
            <feFlood floodColor={palette.concaveDark} floodOpacity="0.55" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* 固定幾何組 1：左上方【不規則立體凸起水晶多面體 (Convex Polyhedron)】 */}
        {/* 依 shapePhase 每 30s/60s 進行微角度與切面反光之平滑變動 */}
        {/* ========================================================================= */}
        <g 
          filter="url(#fixedConvexRelief)" 
          className="transition-all duration-1000 ease-in-out"
          transform={
            shapePhase === 0 
              ? 'translate(0, 0) scale(1)' 
              : shapePhase === 1 
              ? 'translate(15, 8) scale(1.02)' 
              : 'translate(-10, 12) scale(0.98)'
          }
        >
          {/* 外圍不規則多邊形基座 */}
          <polygon 
            points="70,60 260,30 340,170 230,270 90,230 40,140" 
            fill="url(#convexGradA)" 
            stroke={palette.highlight}
            strokeWidth="1.5"
          />
          {/* 中央頂點向上凸起的各個斜切三角面 (形成尖銳立體凸面) */}
          <polygon points="70,60 260,30 180,150" fill={palette.highlight} opacity="0.9" />
          <polygon points="260,30 340,170 180,150" fill="url(#convexGradB)" opacity="0.85" />
          <polygon points="340,170 230,270 180,150" fill={palette.shadowColor} opacity="0.75" />
          <polygon points="230,270 90,230 180,150" fill="url(#convexGradA)" opacity="0.9" />
          <polygon points="90,230 40,140 180,150" fill={palette.shadowColor} opacity="0.65" />
          <polygon points="40,140 70,60 180,150" fill={palette.highlight} opacity="0.8" />
        </g>

        {/* ========================================================================= */}
        {/* 固定幾何組 2：右上方【不規則雕琢內陷凹槽 (Concave Sculpted Cavity)】 */}
        {/* 邊緣刻痕深凹、底部反受光 */}
        {/* ========================================================================= */}
        <g 
          filter="url(#fixedConcaveCavity)" 
          className="transition-all duration-1000 ease-in-out"
          transform={
            shapePhase === 0 
              ? 'translate(0, 0)' 
              : shapePhase === 1 
              ? 'translate(-12, 10)' 
              : 'translate(10, -8)'
          }
        >
          {/* 凹槽外邊緣 */}
          <polygon 
            points="950,40 1180,20 1320,130 1240,280 1060,260 920,160" 
            fill="url(#concaveGradA)" 
            stroke={palette.shadowColor}
            strokeWidth="2"
          />
          {/* 凹槽內側斜壁 (向內收縮雕刻) */}
          <polygon points="950,40 1180,20 1140,80 1000,90" fill="url(#concaveGradB)" opacity="0.9" />
          <polygon points="1180,20 1320,130 1240,150 1140,80" fill={palette.concaveDark} opacity="0.6" />
          <polygon points="1320,130 1240,280 1190,220 1240,150" fill={palette.highlight} opacity="0.9" />
          <polygon points="1240,280 1060,260 1070,210 1190,220" fill={palette.highlight} opacity="0.95" />
          <polygon points="1060,260 920,160 970,160 1070,210" fill="url(#concaveGradA)" opacity="0.85" />
          <polygon points="920,160 950,40 1000,90 970,160" fill={palette.concaveDark} opacity="0.7" />
          {/* 凹槽最深處底部 */}
          <polygon points="1000,90 1140,80 1240,150 1190,220 1070,210 970,160" fill={palette.baseColor} opacity="0.9" />
        </g>

        {/* ========================================================================= */}
        {/* 固定幾何組 3：畫面右側中段【懸浮傾斜立體凸起刀鋒面 (Convex Wedge)】 */}
        {/* ========================================================================= */}
        <g 
          filter="url(#fixedConvexRelief)" 
          className="transition-all duration-1000 ease-in-out"
          transform={
            shapePhase === 0 
              ? 'translate(0, 0)' 
              : shapePhase === 1 
              ? 'translate(-8, -12)' 
              : 'translate(8, 12)'
          }
        >
          <polygon 
            points="1280,480 1460,410 1420,620 1210,670" 
            fill="url(#convexGradB)" 
            stroke={palette.highlight}
            strokeWidth="1.5"
          />
          {/* 中脊凸稜線 */}
          <polygon points="1280,480 1460,410 1350,540" fill={palette.highlight} opacity="0.85" />
          <polygon points="1460,410 1420,620 1350,540" fill="url(#convexGradA)" opacity="0.75" />
          <polygon points="1420,620 1210,670 1350,540" fill={palette.shadowColor} opacity="0.6" />
          <polygon points="1210,670 1280,480 1350,540" fill={palette.highlight} opacity="0.7" />
        </g>

        {/* ========================================================================= */}
        {/* 固定幾何組 4：畫面左側中下段【內凹雕刻六角井 (Concave Hex Well)】 */}
        {/* ========================================================================= */}
        <g 
          filter="url(#fixedConcaveCavity)" 
          className="transition-all duration-1000 ease-in-out"
          transform={
            shapePhase === 0 
              ? 'translate(0, 0)' 
              : shapePhase === 1 
              ? 'translate(10, -6)' 
              : 'translate(-8, 6)'
          }
        >
          <polygon 
            points="60,620 190,560 290,650 250,780 120,820 20,730" 
            fill="url(#concaveGradB)" 
            stroke={palette.shadowColor}
            strokeWidth="1.5"
          />
          {/* 內壁凹深切面 */}
          <polygon points="90,645 175,600 245,670 215,750 130,775 65,715" fill={palette.baseColor} opacity="0.9" />
        </g>

        {/* ========================================================================= */}
        {/* 固定幾何組 5：頁面底部【大跨度多面立體折疊地平棱線 (Bottom Relief)】 */}
        {/* ========================================================================= */}
        <g 
          filter="url(#fixedConvexRelief)" 
          className="transition-all duration-1000 ease-in-out"
        >
          <path 
            d="M -30,980 L 240,890 L 520,950 L 860,850 L 1180,930 L 1480,870 L 1750,960 L 1750,1180 L -30,1180 Z" 
            fill="url(#convexGradA)" 
            stroke={palette.highlight}
            strokeWidth="1"
            opacity="0.8"
          />
          {/* 立體山稜三角形折板 */}
          <polygon points="240,890 520,950 380,1020" fill={palette.shadowColor} opacity="0.45" />
          <polygon points="520,950 860,850 690,990" fill={palette.highlight} opacity="0.75" />
          <polygon points="860,850 1180,930 1020,1010" fill={palette.shadowColor} opacity="0.5" />
          <polygon points="1180,930 1480,870 1330,1000" fill={palette.highlight} opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};
