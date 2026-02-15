
import React from 'react';
import { MOCK_TRACKS, MOCK_PLAYLISTS, Icons } from '../constants';
import { Track } from '../types';

interface HomeViewProps {
  onTrackSelect: (track: Track) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onTrackSelect }) => {
  const greeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6">{greeting()}</h1>
      
      {/* Quick Picks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {MOCK_PLAYLISTS.slice(0, 6).map((playlist) => (
          <div 
            key={playlist.id} 
            className="flex items-center gap-4 bg-zinc-800/40 hover:bg-zinc-800/80 transition rounded-md overflow-hidden cursor-pointer group pr-4"
          >
            <img src={playlist.coverUrl} alt={playlist.name} className="w-20 h-20 shadow-xl" />
            <span className="font-bold text-sm truncate">{playlist.name}</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0">
               <button className="bg-green-500 text-black p-3 rounded-full shadow-2xl hover:scale-105 transition active:scale-95">
                  <Icons.Play className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <Section title="Made For You" items={MOCK_TRACKS} onTrackSelect={onTrackSelect} />
      <Section title="Recently Played" items={MOCK_TRACKS.slice().reverse()} onTrackSelect={onTrackSelect} />
      <Section title="Recommended Stations" items={MOCK_TRACKS.slice(2)} onTrackSelect={onTrackSelect} />
    </div>
  );
};

const Section: React.FC<{ title: string; items: Track[]; onTrackSelect: (t: Track) => void }> = ({ title, items, onTrackSelect }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold hover:underline cursor-pointer">{title}</h2>
        <button className="text-zinc-400 text-sm font-bold hover:underline">Show all</button>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
      {items.map((track) => (
        <div 
          key={track.id} 
          onClick={() => onTrackSelect(track)}
          className="bg-zinc-900/40 p-4 rounded-lg hover:bg-zinc-800 transition group cursor-pointer w-48 shrink-0 border border-transparent hover:border-zinc-700/30 shadow-lg"
        >
          <div className="relative mb-4">
            <img src={track.coverUrl} className="w-full aspect-square rounded-md shadow-2xl mb-4" alt={track.title} />
            <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button className="bg-green-500 text-black p-3 rounded-full shadow-lg hover:scale-105 transition active:scale-95">
                <Icons.Play className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="font-bold truncate mb-1">{track.title}</p>
          <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HomeView;
