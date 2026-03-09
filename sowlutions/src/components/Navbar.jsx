import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  PlayIcon,
  StarIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UpgradePlanModal from "./UpgradePlanModal";

const mobileNavItems = [
  { to: "/home", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/songs", label: "Songs" },
  { to: "/playlists", label: "Playlists" },
  { to: "/licenses", label: "✅ Licenses" },
  { to: "/trackfluencer", label: "🔥 Trackfluencer" },
  { to: "/points", label: "✨ 100 Points" },
  { to: "/help", label: "Help Center" },
];

const desktopNavLinks = [
  { to: "/discover", label: "For You", active: true },
  { to: "/songs", label: "Songs" },
  { to: "/playlists", label: "Playlists" },
];

const profileTopItems = [
  {
    to: "/licenses",
    label: "Licenses & Downloads",
    icon: <ArrowDownTrayIcon className="h-5 w-5" />,
  },
  {
    to: "/playlists",
    label: "My Playlists",
    icon: <MusicalNoteIcon className="h-5 w-5" />,
  },
  {
    to: "/trackfluencer",
    label: "Trackfluencer",
    icon: <PlayIcon className="h-5 w-5" />,
  },
  {
    to: "/points",
    label: "Points",
    icon: <StarIcon className="h-5 w-5" />,
  },
  {
    to: "/profile",
    label: "View Profile",
    icon: <ArrowTopRightOnSquareIcon className="h-5 w-5" />,
  },
];

const profileBottomItems = [
  {
    to: "/switch-account",
    label: "Switch Account",
    icon: <UserPlusIcon className="h-5 w-5" />,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Cog6ToothIcon className="h-5 w-5" />,
  },
  {
    to: "/logout",
    label: "Sign out",
    icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleCloseMenu = () => setIsOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    const updated = [
      trimmed,
      ...recentSearches.filter((s) => s !== trimmed),
    ].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setSearchQuery("");
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const removeRecentSearch = (term) => {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-[#1a1a2e]">
        <nav className="mx-auto flex w-full items-center px-5 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            onClick={handleCloseMenu}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <PlayIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-wider text-white">
              THEMATIC
            </span>
          </Link>

          {/* Mobile: hamburger (center-ish) */}
          <div className="flex flex-1 justify-center md:hidden">
            <button
              type="button"
              className="flex items-center justify-center p-2"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
            >
              <Bars3Icon className="h-7 w-7 text-white" />
            </button>
          </div>

          {/* Desktop: Upgrade Plan + Search */}
          <div
            className="ml-6 hidden items-center gap-4 md:flex"
            ref={searchRef}
          >
            {!isSearchFocused && (
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="rounded-full bg-gradient-to-r from-purple-600 to-purple-400 px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Upgrade Plan
              </button>
            )}
            <div className="relative">
              <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center rounded-full border border-white/20 bg-transparent px-4 py-2 transition-all duration-300 ${
                  isSearchFocused ? "w-80 lg:w-96" : "w-52 lg:w-56"
                }`}
              >
                <input
                  type="text"
                  placeholder={!isSearchFocused ? "Search" : "Start Typing..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/50 outline-none"
                />
                <div className="ml-3 border-l border-white/30 pl-3 text-white">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
              </form>
              {isSearchFocused && recentSearches.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#141420] p-5 shadow-2xl">
                  <h3 className="mb-3 text-sm font-bold text-white">
                    Recent Search
                  </h3>
                  <div className="flex flex-col gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="flex items-center justify-between gap-3 text-sm text-white/70"
                      >
                        <button
                          type="button"
                          className="flex items-center gap-3 text-left transition hover:text-white"
                          onClick={() => {
                            setSearchQuery(term);
                          }}
                        >
                          <MagnifyingGlassIcon className="h-4 w-4 shrink-0" />
                          <span>{term}</span>
                        </button>
                        <button
                          type="button"
                          className="shrink-0 text-white/40 transition hover:text-white"
                          onClick={() => removeRecentSearch(term)}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: nav links */}
          <div className="ml-auto hidden items-center gap-6 md:flex">
            {desktopNavLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition ${
                  item.active
                    ? "text-yellow-300"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/points"
              className="flex items-center gap-1.5 text-sm font-semibold text-white"
            >
              <span>🤑</span> 100 Points
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-5 md:ml-6">
            <button
              type="button"
              className="relative p-1"
            >
              <BellIcon className="h-6 w-6 text-white" />
              <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1a1a2e] bg-pink-500" />
            </button>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-yellow-400"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#141420] shadow-2xl">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3 px-5 py-5">
                    <span className="text-base font-semibold text-white">
                      Mo Shehimi
                    </span>
                  </div>
                  <div className="mx-5 border-t border-white/10" />
                  <div className="py-2">
                    {profileTopItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-white/80 transition hover:text-lime-400"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mx-5 border-t border-white/10" />

                  {/* Bottom Links */}
                  <div className="py-2">
                    {profileBottomItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-white/80 transition hover:text-lime-400"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#2d1b69] md:hidden">
          <div className="flex items-center px-5 pt-6">
            <button
              type="button"
              onClick={handleCloseMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="flex-1 pr-10 text-center text-2xl font-bold text-white">
              Menu
            </h2>
          </div>

          {/* Search */}
          <div className="mx-5 mt-6">
            <div className="flex items-center rounded-lg border border-white/20 bg-transparent px-4 py-3">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/50 outline-none"
              />
              <div className="ml-3 border-l border-white/30 pl-3 text-white">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="mt-8 flex flex-1 flex-col items-center gap-5 overflow-y-auto px-5">
            {mobileNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xl font-semibold text-white transition hover:text-white/80"
                onClick={handleCloseMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Chat */}
          <div className="px-5 pb-8">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500 shadow-lg"
            >
              <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <UpgradePlanModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </>
  );
};

export default Navbar;
