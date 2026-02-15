
import React from 'react';
import { Icons } from '../constants';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayToggle: () => void;
  progress: number;
  onProgressChange: (val: number) => void;
  volume: number;
  onVolumeChange: (val: number) => void;
}

const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  onPlayToggle, 
  progress, 
  onProgressChange, 
  volume, 
  onVolumeChange 
}) => {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-900 h-24 px-4 flex items-center justify-between z-50">
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-14 h-14 rounded shadow-md" />
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate hover:underline cursor-pointer">{currentTrack.title}</p>
          <p className="text-xs text-zinc-400 truncate hover:underline cursor-pointer">{currentTrack.artist}</p>
        </div>
        <button className="text-zinc-400 hover:text-white ml-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center max-w-lg w-full gap-2">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
          </button>
          <button className="text-zinc-400 hover:text-white transition">
            <Icons.SkipBack className="w-6 h-6" />
          </button>
          <button 
            onClick={onPlayToggle}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition"
          >
            {isPlaying ? <Icons.Pause className="w-6 h-6" /> : <Icons.Play className="w-6 h-6" />}
          </button>
          <button className="text-zinc-400 hover:text-white transition">
            <Icons.SkipForward className="w-6 h-6" />
          </button>
          <button className="text-zinc-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>
        
        <div className="flex items-center w-full gap-3">
          <span className="text-xs text-zinc-400">1:23</span>
          <div className="flex-1 h-1 bg-zinc-700 rounded-full relative group cursor-pointer overflow-hidden">
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress}
                onChange={(e) => onProgressChange(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
             />
             <div 
                className="h-full bg-white group-hover:bg-green-500 rounded-full transition-colors" 
                style={{ width: `${progress}%` }}
             />
          </div>
          <span className="text-xs text-zinc-400">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div className="flex items-center gap-4 w-1/3 justify-end">
        <Icons.Volume className="w-5 h-5 text-zinc-400" />
        <div className="w-24 h-1 bg-zinc-700 rounded-full relative group overflow-hidden">
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
             />
            <div 
                className="h-full bg-white group-hover:bg-green-500 transition-colors" 
                style={{ width: `${volume * 100}%` }}
            />
        </div>
        <button className="text-zinc-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Player;
