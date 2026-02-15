
import React, { useState } from 'react';
import { Icons, MOCK_TRACKS } from '../constants';
import { Track } from '../types';

interface SearchViewProps {
  onTrackSelect: (track: Track) => void;
}

const CATEGORIES = [
  { name: 'Podcasts', color: 'bg-orange-600' },
  { name: 'Made For You', color: 'bg-indigo-600' },
  { name: 'Charts', color: 'bg-purple-600' },
  { name: 'New Releases', color: 'bg-pink-600' },
  { name: 'Discover', color: 'bg-blue-600' },
  { name: 'Live Events', color: 'bg-emerald-600' },
  { name: 'Pop', color: 'bg-yellow-600' },
  { name: 'Hip-Hop', color: 'bg-red-600' },
  { name: 'Lofi', color: 'bg-cyan-600' },
  { name: 'Gaming', color: 'bg-rose-600' },
];

const SearchView: React.FC<SearchViewProps> = ({ onTrackSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTracks = MOCK_TRACKS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4">
      <div className="relative mb-8 max-w-md">
        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="What do you want to listen to?" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-800 hover:bg-zinc-700 transition border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-white outline-none"
        />
      </div>

      {searchTerm ? (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Search results</h2>
            <div className="grid gap-2">
                {filteredTracks.map(track => (
                    <div 
                        key={track.id} 
                        onClick={() => onTrackSelect(track)}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-zinc-800 transition cursor-pointer group"
                    >
                        <img src={track.coverUrl} className="w-12 h-12 rounded" alt={track.title} />
                        <div className="flex-1">
                            <p className="font-semibold">{track.title}</p>
                            <p className="text-sm text-zinc-400">{track.artist}</p>
                        </div>
                        <span className="text-zinc-400 text-sm">{track.duration}</span>
                    </div>
                ))}
            </div>
        </div>
      ) : (
        <>
            <h2 className="text-2xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {CATEGORIES.map(cat => (
                <div 
                    key={cat.name} 
                    className={`${cat.color} aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition shadow-lg group`}
                >
                    <h3 className="text-2xl font-bold break-words">{cat.name}</h3>
                    <img 
                        src={`https://picsum.photos/seed/${cat.name}/100/100`} 
                        className="absolute bottom-0 right-0 w-24 h-24 rotate-[25deg] translate-x-4 translate-y-2 shadow-2xl group-hover:scale-110 transition"
                        alt=""
                    />
                </div>
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default SearchView;
