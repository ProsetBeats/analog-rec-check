
import React from 'react';
import { audioService } from '../services/audioService';

interface VintageButtonProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const VintageButton: React.FC<VintageButtonProps> = ({ label, isActive, onToggle }) => {
  const handleClick = () => {
    audioService.playClick(isActive ? 'off' : 'on');
    onToggle();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Recessed Well */}
      <div className="relative p-2 bg-[#0a0a0a] rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
        <button 
          onClick={handleClick}
          className={`
            relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg transition-all duration-100 ease-out outline-none
            flex flex-col items-center justify-center select-none active:scale-95
            ${isActive 
              ? 'bg-[#cc5500] translate-y-1 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),_0_0_20px_rgba(234,88,12,0.4)] border-b-0' 
              : 'bg-gradient-to-br from-[#3a3a3a] to-[#222] shadow-[0_8px_0_#111,_0_12px_20px_rgba(0,0,0,0.7)] active:translate-y-1 active:shadow-[0_2px_0_#000] border-t border-white/10'}
          `}
        >
          {/* Plastic Grain Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/absurd-dad.png')]" />
          
          {/* Backlit Text */}
          <span className={`
            text-[9px] sm:text-[11px] font-black tracking-widest transition-all duration-300 uppercase z-10
            ${isActive 
              ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]' 
              : 'text-zinc-600 drop-shadow-[0_-1px_0_rgba(0,0,0,0.8)]'}
          `}>
            {label}
          </span>

          {/* Indicator Light Strip */}
          <div className={`
            mt-2 sm:mt-3 w-10 h-1 rounded-full transition-all duration-500
            ${isActive 
              ? 'bg-red-500 shadow-[0_0_12px_#ef4444,_0_0_2px_#fff]' 
              : 'bg-black/60 shadow-inner'}
          `} />

          {/* Sub-surface scattering light effect */}
          {isActive && (
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
          )}
        </button>
      </div>
      
      {/* Technical Sub-label */}
      <span className="mt-2 sm:mt-3 text-[7px] text-zinc-500 font-mono tracking-[0.3em] uppercase opacity-50">
        Status chk // {label.slice(0, 3)}
      </span>
    </div>
  );
};

export default VintageButton;
