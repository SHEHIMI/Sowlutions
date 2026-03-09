import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import thematicClient, { getProjectId } from "../services/api/thematicClient";
import { formatViewCount } from "../utils/utils";

const RecentPickups = () => {
  const [pickups, setPickups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const { data } = await thematicClient.get(`/projects/${getProjectId()}/pickups`);
        setPickups(Array.isArray(data) ? data : []);
      } catch {
        console.error("Failed to load pickups");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPickups();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isLoading || pickups.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pt-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">
            Get inspired by the creators you follow and the music they Love
          </h2>
          <div className="ml-4 flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* cards */}
        <div
          ref={scrollRef}
          className="mt-6 flex gap-5 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pickups.map((pickup) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${pickup.video_id}/hqdefault.jpg`;
            const creatorAvatar = pickup.creator?.profile_image_url;
            const creatorName = pickup.channelTitle || pickup.creator?.profile_name || "Unknown";

            return (
              <a
                key={pickup.id}
                href={`https://www.youtube.com/watch?v=${encodeURIComponent(pickup.video_id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[320px] shrink-0 md:w-[380px]"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src={thumbnailUrl}
                    alt={pickup.video_title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/90 shadow-lg transition group-hover:bg-purple-600">
                      <PlayIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  {creatorAvatar ? (
                    <img
                      src={creatorAvatar}
                      alt={creatorName}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-white">
                      {creatorName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold text-gray-900">
                      {pickup.video_title}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="truncate text-sm text-gray-500">
                        {creatorName}
                      </span>
                      <span className="ml-2 shrink-0 text-sm text-gray-400">
                        {formatViewCount(pickup.views)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Songs: </span>
                      {pickup.song_name}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentPickups;
