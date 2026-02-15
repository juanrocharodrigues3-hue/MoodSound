
import React, { useState } from 'react';
import { Icons, MOCK_TRACKS } from '../constants';
import { Track } from '../types';
import { generateAIPlaylist } from '../services/geminiService';

interface AIDiscoveryViewProps {
  onTrackSelect: (track: Track) => void;
}

const AIDiscoveryView: React.FC<AIDiscoveryViewProps> = ({ onTrackSelect }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Partial<Track>[]>([]);

  const handleDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    const songs = await generateAIPlaylist(prompt);
    setResults(songs);
    setIsLoading(false);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="bg-indigo-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Icons.Sparkles className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          AI Discovery+
        </h1>
        <p className="text-zinc-400 text-lg">Tell Gemini how you feel, and it will curate a personalized vibe just for you.</p>
      </div>

      <form onSubmit={handleDiscovery} className="relative mb-12">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Late night rain in Tokyo', 'Intense morning gym session', 'Cozy cabin by the fire'"
          className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-indigo-500 rounded-2xl py-6 px-8 text-xl outline-none shadow-2xl transition-all"
        />
        <button 
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-xl flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
               <span>Generate</span>
               <Icons.Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-indigo-400">Gemini's Selection</span>
          </h2>
          <div className="grid gap-3">
            {results.map((song, i) => (
              <div 
                key={i} 
                onClick={() => {
                   // Mock track data since Gemini returns fictional songs
                   const mockMatch = MOCK_TRACKS[i % MOCK_TRACKS.length];
                   onTrackSelect({
                     ...mockMatch,
                     title: song.title || 'Untitled',
                     artist: song.artist || 'Unknown Artist',
                     album: song.album || 'AI Collection'
                   });
                }}
                className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-xl hover:bg-zinc-800/60 border border-zinc-800 hover:border-indigo-500/30 transition cursor-pointer group"
              >
                <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center font-bold text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{song.title}</p>
                  <p className="text-zinc-400">{song.artist} • {song.album}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-white text-black p-2 rounded-full transition translate-x-2 group-hover:translate-x-0">
                  <Icons.Play className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
             <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition font-semibold text-sm">
                <Icons.Plus className="w-4 h-4" />
                Save to Library
             </button>
          </div>
        </div>
      )}

      {/* Suggested Prompts */}
      {!results.length && !isLoading && (
        <div className="flex flex-wrap justify-center gap-3">
          {['Cyberpunk Vibes', 'Lofi Chill Study', '80s Synth Pop', 'Deep Forest Meditation'].map(p => (
            <button 
              key={p}
              onClick={() => setPrompt(p)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm font-medium transition"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIDiscoveryView;
