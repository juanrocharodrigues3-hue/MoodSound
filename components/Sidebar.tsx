
import React from 'react';
import { Icons, MOCK_PLAYLISTS } from '../constants';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setView }) => {
  return (
    <aside className="w-64 bg-black flex flex-col p-2 gap-2 h-full shrink-0">
      <div className="bg-zinc-900 rounded-lg p-4 space-y-4">
        <button 
          onClick={() => setView(ViewType.HOME)}
          className={`flex items-center gap-4 w-full transition font-semibold ${activeView === ViewType.HOME ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
        >
          <Icons.Home className="w-6 h-6" />
          <span>Home</span>
        </button>
        <button 
          onClick={() => setView(ViewType.SEARCH)}
          className={`flex items-center gap-4 w-full transition font-semibold ${activeView === ViewType.SEARCH ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
        >
          <Icons.Search className="w-6 h-6" />
          <span>Search</span>
        </button>
      </div>

      <div className="bg-zinc-900 rounded-lg p-4 flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between text-zinc-400">
          <button 
            onClick={() => setView(ViewType.LIBRARY)}
            className={`flex items-center gap-4 transition font-semibold ${activeView === ViewType.LIBRARY ? 'text-white' : 'hover:text-white'}`}
          >
            <Icons.Library className="w-6 h-6" />
            <span>Your Library</span>
          </button>
          <Icons.Plus className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>

        <button 
          onClick={() => setView(ViewType.AI_DISCOVERY)}
          className="flex items-center gap-4 bg-zinc-800 p-3 rounded-md hover:bg-zinc-700 transition group border border-zinc-700/50"
        >
          <div className="bg-indigo-600 p-2 rounded text-white group-hover:bg-indigo-500 transition">
            <Icons.Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Powered</p>
            <p className="text-sm font-semibold">Discovery+</p>
          </div>
        </button>

        <div className="flex-1 overflow-y-auto space-y-2 mt-2 pr-1 custom-scrollbar">
          {MOCK_PLAYLISTS.map((playlist) => (
            <div 
              key={playlist.id} 
              className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition cursor-pointer group"
            >
              <img src={playlist.coverUrl} className="w-12 h-12 rounded object-cover shadow-lg" alt={playlist.name} />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{playlist.name}</p>
                <p className="text-xs text-zinc-400">Playlist • {playlist.tracks.length} tracks</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
