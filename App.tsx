
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Track, ViewType, Playlist } from './types';
import { MOCK_TRACKS, MOCK_PLAYLISTS, Icons } from './constants';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import AIDiscoveryView from './components/AIDiscoveryView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePlayToggle = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleProgressChange = (val: number) => {
    if (audioRef.current) {
      const time = (val / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(val);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewType.HOME:
        return <HomeView onTrackSelect={handleTrackSelect} />;
      case ViewType.SEARCH:
        return <SearchView onTrackSelect={handleTrackSelect} />;
      case ViewType.AI_DISCOVERY:
        return <AIDiscoveryView onTrackSelect={handleTrackSelect} />;
      default:
        return <HomeView onTrackSelect={handleTrackSelect} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeView={currentView} setView={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black rounded-tl-lg mt-2 mr-2 mb-2">
        <header className="h-16 flex items-center px-6 justify-between bg-transparent z-10 sticky top-0">
          <div className="flex gap-4">
            <button className="bg-black/40 p-1.5 rounded-full hover:bg-black/60 transition">
              <Icons.SkipBack className="w-5 h-5 -rotate-180" />
            </button>
            <button className="bg-black/40 p-1.5 rounded-full hover:bg-black/60 transition">
              <Icons.SkipForward className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm hover:scale-105 transition">Explore Premium</button>
            <button className="bg-black/60 p-2 rounded-full hover:scale-105 transition">
                <img src="https://picsum.photos/id/64/32/32" className="w-7 h-7 rounded-full" alt="Profile" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
          {renderView()}
        </div>
      </main>

      {/* Player */}
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        progress={progress}
        onProgressChange={handleProgressChange}
        volume={volume}
        onVolumeChange={setVolume}
      />

      {/* Hidden Audio Element */}
      {currentTrack && (
        <audio 
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default App;
