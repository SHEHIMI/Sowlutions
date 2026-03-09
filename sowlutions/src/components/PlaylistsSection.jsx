import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import thematicClient, { getUserId } from '../services/api/thematicClient';

const TABS = ['Thematic Collections', 'My Playlists', 'For You'];

const PlaylistCard = ({ playlist, isDragging, dragProps }) => {
  const artUrls = (playlist.songs || [])
    .map((s) => s.album_art_thumbnail_url)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div
      {...dragProps}
      className={`transition ${isDragging ? 'opacity-50 scale-95' : ''}`}
    >
      <Link to={`/playlists/${playlist.id}`} className="flex flex-col transition hover:opacity-90">
      <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl">
        {artUrls.map((url, i) => (
          <div key={i} className="aspect-square bg-gray-200">
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        {Array.from({ length: Math.max(0, 4 - artUrls.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-gray-200" />
        ))}
      </div>
      {/* Info */}
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">{playlist.name}</h3>
          <p className="text-sm text-gray-500">{playlist.project_songs_count} songs</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              playlist.public ? 'bg-purple-500' : 'bg-pink-500'
            }`}
          />
          <span
            className={`text-sm font-medium ${
              playlist.public ? 'text-purple-600' : 'text-pink-500'
            }`}
          >
            {playlist.public ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
    </Link>
    </div>
  );
};

const PlaylistsSection = () => {
  const [activeTab, setActiveTab] = useState('My Playlists');
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [dragIndex, setDragIndex] = useState(null);
  const dragNode = useRef(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await thematicClient.get(`/users/${getUserId()}/playlists/`);
        setPlaylists(data.items || []);
      } catch {
        setError('Failed to load playlists.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleDragStart = (e, index) => {
    dragNode.current = e.target;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (index !== dragIndex) {
      setPlaylists((prev) => {
        const updated = [...prev];
        const dragged = updated.splice(dragIndex, 1)[0];
        updated.splice(index, 0, dragged);
        setDragIndex(index);
        return updated;
      });
    }
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    dragNode.current = null;
  };

  return (
    <section className="bg-[#f8f8f8] pb-16">
      <div className="px-6 pt-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Your Music, Your Rhythm
        </h1>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Discover Playlists for Every Mood
        </h2>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border-2 border-purple-500 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-purple-50"
        >
          <span className="text-lg leading-none">+</span> Add new playlist
        </button>

        <div className="flex items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-lime-300 text-gray-900'
                  : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"
        >
          Sort by Date
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Playlists */}
      <div className="mx-auto mt-8 max-w-7xl px-6">
        {isLoading && (
          <p className="py-12 text-center text-sm text-gray-500">Loading playlists...</p>
        )}
        {error && (
          <p className="py-12 text-center text-sm text-red-500">{error}</p>
        )}
        {!isLoading && !error && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {playlists.map((playlist, index) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  isDragging={dragIndex === index}
                  dragProps={{
                    draggable: true,
                    onDragStart: (e) => handleDragStart(e, index),
                    onDragEnter: (e) => handleDragEnter(e, index),
                    onDragOver: (e) => e.preventDefault(),
                    onDragEnd: handleDragEnd,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaylistsSection;
