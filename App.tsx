
import React, { useState, useEffect } from 'react';
import VintageButton from './components/VintageButton';
import { audioService } from './services/audioService';

type ChecklistState = {
  CAMERA: boolean;
  SCREEN: boolean;
  AUDIO: boolean;
  MIDI: boolean;
};

const App: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistState>({
    CAMERA: false,
    SCREEN: false,
    AUDIO: false,
    MIDI: false,
  });

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const allReady = checkedCount === 4;

  useEffect(() => {
    if (allReady) {
      audioService.playReady();
    }
  }, [allReady]);

  const toggleItem = (key: keyof ChecklistState) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center p-4 sm:p-8 bg-[#050505]">
      {/* Industrial Rack Unit */}
      <div className="relative w-full max-w-2xl">
        
        {/* Rack Ears (Mounting Rails) */}
        <div className="hidden sm:flex absolute -left-12 top-0 bottom-0 w-12 bg-[#1a1a1a] border-r-4 border-black flex-col justify-around items-center py-6 sm:py-10 shadow-2xl">
          <div className="w-5 h-5 rounded-full bg-[#000] shadow-inner border border-white/5" />
          <div className="w-5 h-5 rounded-full bg-[#000] shadow-inner border border-white/5" />
        </div>
        <div className="hidden sm:flex absolute -right-12 top-0 bottom-0 w-12 bg-[#1a1a1a] border-l-4 border-black flex-col justify-around items-center py-6 sm:py-10 shadow-2xl">
          <div className="w-5 h-5 rounded-full bg-[#000] shadow-inner border border-white/5" />
          <div className="w-5 h-5 rounded-full bg-[#000] shadow-inner border border-white/5" />
        </div>

        {/* Main Chassis Panel */}
        <div className="relative bg-[#222222] p-4 sm:p-12 rounded-sm shadow-[0_60px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] border-b-8 border-black overflow-hidden">
          
          {/* Surface texture (Pitted metal) */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />

          {/* Header & VU Meter Section */}
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-16 border-b border-black/40 pb-4 sm:pb-10 gap-6 sm:gap-0">
            <div className="space-y-2">
              <h1 className="text-lg sm:text-4xl font-black text-zinc-300 italic tracking-tighter drop-shadow-lg">
                STUDIO<span className="text-orange-600">CHECK</span> <span className="text-xs not-italic font-mono text-zinc-600 ml-2">v4.0</span>
              </h1>
              <p className="text-[9px] text-zinc-500 font-mono tracking-[0.4em] uppercase">Hardware Verification Console</p>
            </div>

            {/* Analog VU Meter */}
            <div className="relative sm:w-36 sm:h-20 w-full h-16 max-w-[120px] mx-auto sm:mx-0 bg-[#e8e4d8] rounded-md border-4 border-zinc-900 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Scale */}
              <div className="absolute inset-0 p-2 opacity-60">
                <div className="flex justify-between items-end h-full px-2 border-b border-black/20">
                  <span className="text-[8px] font-bold text-black/60">0</span>
                  <span className="text-[8px] font-bold text-black/60">25</span>
                  <span className="text-[8px] font-bold text-black/60">50</span>
                  <span className="text-[8px] font-bold text-black/60">75</span>
                  <span className="text-[8px] font-bold text-red-600">100</span>
                </div>
              </div>
              {/* Meter Label */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-black text-black/40 uppercase">Ready %</div>
              
              {/* Needle */}
              <div 
                className="absolute bottom-[-10px] left-1/2 w-0.5 h-16 sm:h-20 bg-red-600 origin-bottom transition-transform duration-1000 ease-out z-20"
                style={{ transform: `translateX(-50%) rotate(${(checkedCount / 4) * 120 - 60}deg)` }}
              />
              {/* Needle Cap */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-6 h-6 bg-zinc-900 rounded-full z-30 shadow-md" />
              
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none z-40" />
            </div>
          </div>

          {/* Control Cluster */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8">
            <VintageButton label="CAMERA" isActive={checklist.CAMERA} onToggle={() => toggleItem('CAMERA')} />
            <VintageButton label="SCREEN" isActive={checklist.SCREEN} onToggle={() => toggleItem('SCREEN')} />
            <VintageButton label="AUDIO" isActive={checklist.AUDIO} onToggle={() => toggleItem('AUDIO')} />
            <VintageButton label="MIDI" isActive={checklist.MIDI} onToggle={() => toggleItem('MIDI')} />
          </div>

          {/* Action Trigger - Large Protected Switch Look */}
          <div className="relative">
            <div className={`
              h-12 sm:h-28 rounded-lg flex items-center justify-center px-2 sm:px-4 transition-all duration-700
              border-4 border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]
              ${allReady 
                ? 'bg-red-800/80' 
                : 'bg-[#151515] opacity-50'}
            `}>
              <div className="flex flex-col items-center">
                <span className={`
                  text-xl sm:text-4xl font-black tracking-[0.12em] sm:tracking-[0.4em] italic transition-all duration-700 text-center
                  ${allReady ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'text-zinc-800'}
                `}>
                  ACTION
                </span> 
                {allReady && (
                  <span className="text-[10px] font-bold text-red-400 tracking-[1em] mt-2 animate-pulse uppercase">Authorized</span>
                )}
              </div>

              {/* Security Vents */}
              <div className="absolute left-6 space-y-1 hidden sm:block">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-1 bg-black rounded-full shadow-inner" />
                ))}
              </div>
              <div className="absolute right-6 space-y-1 hidden sm:block">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-1 bg-black rounded-full shadow-inner" />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-end border-t border-white/5 pt-4 gap-4 sm:gap-0">
            <div className="flex space-x-4 opacity-40 grayscale">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 leading-none">PEAK</span>
                <div className="w-8 h-2 bg-red-900 rounded-sm mt-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 leading-none">SIGNAL</span>
                <div className={`w-8 h-2 rounded-sm mt-1 transition-colors duration-500 ${checkedCount > 0 ? 'bg-green-600' : 'bg-green-950'}`} />
              </div>
            </div>
            <div className="text-right opacity-30">
              <p className="text-[10px] font-black text-white italic tracking-tighter">TEAC-REVOX CORP.</p>
              <p className="text-[7px] font-mono text-zinc-500 uppercase">Swiss Engineered Logic</p>
            </div>
          </div>
        </div>

        {/* Shadow under the unit */}
        <div className="absolute -bottom-10 left-10 right-10 h-10 bg-black/50 blur-2xl -z-10" />
      </div>
    </div>
  );
};

export default App;
