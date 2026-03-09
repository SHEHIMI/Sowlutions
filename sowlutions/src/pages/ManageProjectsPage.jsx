import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";


const channels = [
  {
    id: 1,
    name: "MyChannel",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

const ManageProjectsPage = () => {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="relative flex items-start justify-between">
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Manage Your Projects
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Add or Update your creative projects
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            <PlusIcon className="h-5 w-5" />
            Add Channel
          </button>
        </div>

        {/* Cards */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-lime-300 p-6"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  className="relative text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  Replace
                </button>
              </div>
              <div className="relative mt-2 flex items-center gap-4">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="h-14 w-14 rounded-full border-2 border-white object-cover shadow"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {channel.name}
                  </span>
                  <button
                    type="button"
                    className="text-gray-500 transition hover:text-gray-700"
                  >
                    <StarIcon className="h-4 w-4" />
                  </button>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500">
                    <PencilSquareIcon className="h-3 w-3 text-white" />
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="relative mt-5 flex gap-3">
                <button
                  type="button"
                  className="rounded-full border-2 border-gray-800 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
                >
                  Verify Channel
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border-2 border-gray-800 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
                >
                  Login as this channel
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-purple-500 px-16 py-3.5 text-base font-semibold text-white transition hover:bg-purple-600"
          >
            Done
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ManageProjectsPage;
