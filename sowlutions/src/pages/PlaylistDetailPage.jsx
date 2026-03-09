import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  CameraIcon as CameraIconHi,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MinusCircleIcon,
  PencilSquareIcon,
  ShareIcon as ShareIconHi,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon as PlayIconSolid } from "@heroicons/react/24/solid";
import thematicClient from "../services/api/thematicClient";
import { formatDate } from "../utils/utils";

// Remove song from playlists
const RemoveModal = ({ playlistName, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
    <div className="relative w-full max-w-xl rounded-3xl bg-white px-10 py-10 shadow-xl">
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-6 top-6 text-gray-500 transition hover:text-gray-800"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      <h2 className="text-3xl font-extrabold text-gray-900 justify-center">
        Remove
      </h2>
      <p className="mt-4 text-base text-gray-500">
        Are you sure you want to remove this song from your{" "}
        <span className="font-bold text-gray-600">{playlistName}</span>{" "}
        playlist?
      </p>
      <div className="mt-8 flex items-center gap-4 justify-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-base font-semibold text-purple-600 transition hover:text-purple-800"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-purple-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-purple-600"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// Edit Playlist
const EditPlaylistModal = ({ playlist, onClose, onSaved }) => {
  const [playlistName, setPlaylistName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);
  const [isSaving, setIsSaving] = useState(false);

  const MAXCHARS = 125;

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= MAXCHARS) {
      setDescription(e.target.value);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data } = await thematicClient.put(`/projects/${playlist.id}/`, {
        id: String(playlist.id),
        name: playlistName,
        description,
      });
      onSaved(data);
      onClose();
    } catch {
      alert("Failed to save playlist. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-3xl bg-white px-10 py-10 shadow-xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Edit Playlist
        </h2>

        {/* Playlist Name */}
        <div className="mt-8">
          <label className="text-base font-bold text-gray-900">
            Playlist Name
          </label>
          <textarea
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            maxLength={MAXCHARS}
            rows={1}
            className="mt-2 w-full resize-y rounded-3xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-400"
          />
        </div>

        {/* Description */}
        <div className="mt-8">
          <label className="text-base font-bold text-gray-900">
            Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={MAXCHARS}
            rows={3}
            className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-400"
          />
        </div>

        {/* Delete the playlist */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="text-sm font-semibold text-purple-500 hover:text-purple-700"
          >
            Delete Playlist
          </button>
        </div>

        {/* Action */}
        <div className="mt-10 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-gray-300 py-3.5 text-base font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 rounded-full bg-purple-500 py-3.5 text-base font-semibold text-white transition hover:bg-purple-600 disabled:opacity-60"
          >
            Save{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

const SongRow = ({
  song,
  playlistName,
  projectId,
  onRemoved,
  dragHandleProps,
  isDragging,
}) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const addedDate = formatDate(song.project_song?.created_at);
  const isExpired = !!song.expired_at;
  const isPremium = song.access_tier === "premium";

  const handleRemove = async () => {
    console.log("Removing song with ID:", song.id);
    try {
      await thematicClient.delete(`/projects/${projectId}/songs`, {
        data: { song_ids: [String(song.id)] },
      });
      setShowRemoveModal(false);
      onRemoved(song.id);
      alert(`"${song.name}" has been removed from "${playlistName}".`);
    } catch (error) {
      console.log("Failed to remove song:", error);
      alert("Failed to remove song. Please try again.");
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-4 border-b border-gray-100 px-4 py-3 transition ${
          isDragging ? "bg-purple-50 opacity-75" : "hover:bg-gray-50"
        }`}
      >
        {/* Play button */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500"
        >
          <PlayIconSolid className="h-4 w-4 text-white" />
        </button>

        {/* Album art */}
        <img
          src={song.album_art_thumbnail_url}
          alt={song.album_name}
          className="h-14 w-14 shrink-0 rounded-lg object-cover"
          loading="lazy"
        />

        {/* Title + Artist */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-gray-900">
            {song.name}
          </p>
          <p className="truncate text-sm text-gray-500">{song.artist_name}</p>
        </div>

        {/* Duration */}
        <span className="hidden shrink-0 text-sm text-gray-500 sm:block">
          {song.duration}
        </span>

        {/* Action icons */}
        <div className="hidden shrink-0 items-center gap-3 text-gray-400 md:flex">
          <button type="button" className="transition hover:text-gray-700">
            <Bars3BottomLeftIcon className="h-5 w-5" />
          </button>
          <button type="button" className="transition hover:text-gray-700">
            <ShareIconHi className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="transition hover:text-purple-600"
            onClick={() => setShowRemoveModal(true)}
          >
            <MinusCircleIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Badge / Download */}
        <div className="hidden shrink-0 md:block">
          {isExpired ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-1.5 text-xs font-bold text-gray-600">
              <Bars3BottomLeftIcon className="h-5 w-5" /> EXPIRED
            </span>
          ) : isPremium ? (
            <span className="rounded-full bg-purple-500 px-6 py-2 text-sm font-semibold text-white">
              Premium
            </span>
          ) : song.downloadable ? (
            <button
              type="button"
              className="text-gray-400 transition hover:text-gray-700"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        {/* Date */}
        <span className="hidden shrink-0 text-sm text-gray-500 lg:block">
          {addedDate}
        </span>

        {/* Drag handle */}
        <div
          {...dragHandleProps}
          className="shrink-0 cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        >
          <Bars3Icon className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {showRemoveModal && (
        <RemoveModal
          songName={song.name}
          playlistName={playlistName}
          onCancel={() => setShowRemoveModal(false)}
          onConfirm={handleRemove}
        />
      )}
    </>
  );
};

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();
  const PAGE_SIZE = 15;

  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const dragNode = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, songsRes] = await Promise.all([
          thematicClient.get(`/projects/${id}/`),
          thematicClient.get(`/projects/${id}/songs`, {
            params: { limit: PAGE_SIZE, offset: 0 },
          }),
        ]);
        setPlaylist(projectRes.data);
        const items = songsRes.data.items || [];
        setSongs(items);
        setHasMore(items.length < songsRes.data.total);
      } catch {
        setError("Failed to load playlist.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const loadMoreSongs = async () => {
    setIsLoadingMore(true);
    try {
      const res = await thematicClient.get(`/projects/${id}/songs`, {
        params: { limit: PAGE_SIZE, offset: songs.length },
      });
      const newItems = res.data.items || [];
      setSongs((prev) => [...prev, ...newItems]);
      setHasMore(songs.length + newItems.length < res.data.total);
    } catch {
      alert("Failed to load more songs.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSongRemoved = useCallback((songId) => {
    setSongs((prev) => prev.filter((s) => s.id !== songId));
    setPlaylist((prev) =>
      prev
        ? { ...prev, project_songs_count: prev.project_songs_count - 1 }
        : prev,
    );
  }, []);

  const handleDragStart = (e, index) => {
    dragNode.current = e.target;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setOverIndex(index), 0);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (index !== overIndex) {
      setOverIndex(index);
      setSongs((prev) => {
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
    setOverIndex(null);
    dragNode.current = null;
  };

  const filteredSongs = searchFilter
    ? songs.filter(
        (s) =>
          s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          s.artist_name.toLowerCase().includes(searchFilter.toLowerCase()),
      )
    : songs;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
        <p className="text-sm text-gray-500">Loading playlist...</p>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8f8]">
        <p className="text-sm text-red-500">{error || "Playlist not found"}</p>
        <Link
          to="/"
          className="mt-4 text-sm font-semibold text-purple-600 hover:underline"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#f8f8f8]">
        {/* Back link */}
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Return to My Playlists
          </Link>
        </div>

        {/* Hero banner */}
        <div className="mx-auto mt-4 max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-2xl bg-lime-300 p-8 md:p-12">
            {/* Decorative shape */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]">
              <div className="h-full w-full rounded-full bg-lime-200/60" />
            </div>
            <div className="pointer-events-none absolute right-10 top-10 h-[200px] w-[200px]">
              <div className="h-full w-full rotate-45 rounded-3xl bg-blue-500/30" />
            </div>
            {/* Top-right action buttons */}
            <div className="absolute right-6 top-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-500 text-purple-600 transition hover:bg-purple-100"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-500 text-purple-600 transition hover:bg-purple-100"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-start gap-8">
              <div className="hidden h-48 w-48 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-gray-400/50 bg-white/20 md:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                  <CameraIconHi className="h-5 w-5" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                  Playlist
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
                  {playlist.name}
                </h1>
                <p className="mt-4 text-base font-bold text-gray-800">
                  by {playlist.user?.profile_name}
                  <span className="mx-2 font-bold text-purple-500">●</span>
                  {playlist.project_songs_count} songs
                  <span className="mx-2 font-bold text-purple-500">●</span>
                  {playlist.public ? "Public" : "Private"}
                </p>
                <p className="mt-2 text-xs text-gray-500 md:text-lg">
                  {playlist.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-end px-6">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"
          >
            Sort by
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Songs  */}
        <div className="mx-auto mt-4 max-w-7xl px-6 pb-16">
          <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-48 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Songs */}
            {filteredSongs.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                {searchFilter
                  ? "No songs match your search."
                  : "This playlist has no songs."}
              </p>
            ) : (
              filteredSongs.map((song, index) => (
                <div
                  key={`${song.id}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={handleDragEnd}
                >
                  <SongRow
                    song={song}
                    playlistName={playlist.name}
                    projectId={id}
                    onRemoved={handleSongRemoved}
                    isDragging={dragIndex === index}
                    dragHandleProps={{}}
                  />
                </div>
              ))
            )}

            {hasMore && !searchFilter && (
              <div className="flex justify-center py-6">
                <button
                  type="button"
                  onClick={loadMoreSongs}
                  disabled={isLoadingMore}
                  className="rounded-full bg-purple-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-600 disabled:opacity-60"
                >
                  {isLoadingMore ? "Loading..." : "Load More Songs"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showEditModal && (
        <EditPlaylistModal
          playlist={playlist}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) =>
            setPlaylist((prev) => ({ ...prev, ...updated }))
          }
          onDeleted={() => navigate("/")}
        />
      )}
    </>
  );
};

export default PlaylistDetailPage;
