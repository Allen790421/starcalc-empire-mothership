import React from 'react';
import { 
  Palette, 
  Sun, 
  X, 
  Check, 
  Clock, 
  Sparkles,
  Box
} from 'lucide-react';
import { LightBgTheme, GeometryCycleInterval } from '../types';

interface ThemeReliefControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: LightBgTheme;
  onChangeTheme: (theme: LightBgTheme) => void;
  intervalSec: GeometryCycleInterval;
  onChangeInterval: (sec: GeometryCycleInterval) => void;
}

export const ThemeReliefControlModal: React.FC<ThemeReliefControlModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onChangeTheme,
  intervalSec,
  onChangeInterval,
}) => {
  if (!isOpen) return null;

  // 6 款精心調配的亮色系背景色
  const themePresets: { id: LightBgTheme; name: string; desc: string; preview: string; border: string }[] = [
    {
      id: 'ivory_gold',
      name: '晨曦暖象牙白 (預設)',
      desc: '極具人體工學護眼的溫潤奶象牙白，帶柔和金光',
      preview: 'from-[#FAF8F5] via-[#FFFDF9] to-[#F5EFE6]',
      border: 'border-amber-300',
    },
    {
      id: 'pearl_silver',
      name: '晶透珍珠銀白',
      desc: '純淨素雅冷白反射，適合商務專業感',
      preview: 'from-[#F8FAFC] via-[#FFFFFF] to-[#EDF2F7]',
      border: 'border-slate-300',
    },
    {
      id: 'champagne_sand',
      name: '香檳極流金',
      desc: '尊榮輕奢金屬暖金色調，突顯立體層次',
      preview: 'from-[#FCF9F0] via-[#FFFFFA] to-[#F7EED8]',
      border: 'border-yellow-400',
    },
    {
      id: 'sky_crystal',
      name: '蔚藍稜鏡藍',
      desc: '清爽冷調淡藍，凸顯 2026 Edge 邊緣幾何切面',
      preview: 'from-[#F0F7FF] via-[#FFFFFF] to-[#E2F0FD]',
      border: 'border-sky-300',
    },
    {
      id: 'mint_frost',
      name: '碧凝翡翠玉',
      desc: '微翠嫩綠底色，清新怡人且深淺分明',
      preview: 'from-[#F0FDF4] via-[#FFFFFF] to-[#DCFCE7]',
      border: 'border-emerald-300',
    },
    {
      id: 'sakura_blush',
      name: '柔粉白櫻',
      desc: '溫柔微紅透白，光影親和柔美',
      preview: 'from-[#FFF5F5] via-[#FFFFFF] to-[#FEE2E2]',
      border: 'border-rose-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-800 border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">調控背景色與幾何立體姿態</h3>
              <p className="text-[11px] text-slate-500">固定顯現立體凸面與雕刻內凹圖形，可隨時變換背景色</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 pt-4">
          {/* Section 1: Choose Light Background Color */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2.5">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>選擇亮色系背景色調：</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {themePresets.map((t) => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onChangeTheme(t.id)}
                    className={`text-left p-3 rounded-2xl border transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-400/40 bg-amber-50/60 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">{t.name}</span>
                        <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${t.preview} border ${t.border} shadow-sm`} />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-snug line-clamp-1">{t.desc}</p>
                    </div>

                    {isSelected && (
                      <div className="mt-1.5 flex items-center space-x-1 text-[10px] font-bold text-amber-600">
                        <Check className="w-3 h-3" />
                        <span>套用中</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Fixed Geometric Shapes 30s / 1m Cycle Interval */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <Box className="w-4 h-4 text-cyan-600" />
                <span>不規則凸凹圖形變換週期：</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-700">
                每 {intervalSec === 30 ? '30 秒' : '1 分鐘'} 姿態變更
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onChangeInterval(30)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  intervalSec === 30
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>每 30 秒自動變換</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeInterval(60)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  intervalSec === 60
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>每 1 分鐘自動變換</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              * 不規則幾何之立體凸起與內凹雕刻已固定顯現於頁面上，背景色將依選取即時平滑過渡。
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
