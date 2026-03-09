import { useState } from "react";
import {
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaceSmileIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";

const HomeView = ({ onStartConversation }) => (
  <div className="flex flex-col h-full overflow-y-auto">
    <div className="px-6 pt-6 pb-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-300">
        <MusicalNoteIcon className="h-6 w-6 text-purple-600" />
      </div>
      <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
        Hello{" "}
        <span role="img">
          👋
        </span>
      </h2>
      <p className="mt-1 text-base text-gray-500">
        Got a question? We would love to help you!
      </p>
    </div>

    {/* Conversation Card */}
    <div className="mx-6 rounded-2xl border border-gray-200 p-5">
      <h3 className="text-lg font-bold text-gray-900">Start a conversation</h3>
      <div className="mt-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40?img=47"
          alt="Support avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <PhoneIcon className="h-4 w-4 text-purple-600" />
          <span>
            We&apos;ll be back: <strong>18:00</strong>
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onStartConversation}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-purple-500 py-4 text-base font-semibold text-white transition hover:bg-purple-600"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        Start conversation
      </button>
    </div>

    <div className="mx-6 mt-5 mb-6 rounded-2xl border border-gray-200 p-5">
      <h3 className="text-lg font-bold text-gray-900">Find an answer</h3>

      {/* Search  */}
      <div className="mt-4 flex overflow-hidden rounded-xl border border-gray-200">
        <input
          type="text"
          placeholder="Search for articles"
          className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        <button
          type="button"
          className="flex w-12 items-center justify-center bg-purple-500 text-white transition hover:bg-purple-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
      {["Creator Help Center", "Artist Help Center", "FAQ's"].map((label) => (
        <button
          key={label}
          type="button"
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-gray-200 px-5 py-4 text-left text-base font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          {label}
          <ChevronRightIcon className="h-4 w-4 text-purple-600" />
        </button>
      ))}
    </div>
  </div>
);

const ConversationView = ({ onBack }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: trimmed, time: getCurrentTime() }]);
    setMessage("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 rounded-t-2xl bg-purple-500 px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="text-white transition hover:opacity-75"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300">
          <MusicalNoteIcon className="h-5 w-5 text-purple-600" />
        </div>
        <span className="flex-1 text-base font-bold text-white">
          Thematic Team
        </span>
        <button
          type="button"
          className="text-white transition hover:opacity-75"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-2xl" role="img">
            💡
          </span>
          <p className="text-sm leading-relaxed text-gray-600">
            Sorry, we are not available now. We&apos;ve got your message though
            and we&apos;ll reply to you as soon as we can.
          </p>
        </div>
        {messages.length > 0 && (
          <>
            <p className="mt-16 text-center text-4 text-gray-500">Today</p>
            <div className="mt-8 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[75%] rounded-3xl rounded-br-md bg-purple-500 px-4 py-3 text-white shadow-sm">
                    <p className="break-words font-medium leading-tight">{msg.text}</p>
                    <p className="mt-1 text-[9px] text-white/90">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Message */}
      <div className="flex items-center gap-3 border-t border-gray-200 px-4 py-3">
        <button
          type="button"
          className="text-gray-400 transition hover:text-gray-600"
        >
          <FaceSmileIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="text-purple-500 transition hover:text-purple-600"
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("home");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setView("home");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[200]">
      {isOpen && (
        <div className="mb-4 h-[580px] w-[370px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col">
          {view === "home" ? (
            <HomeView onStartConversation={() => setView("conversation")} />
          ) : (
            <ConversationView onBack={() => setView("home")} />
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500 shadow-lg transition hover:bg-purple-600"
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7 text-white" />
        ) : (
          <ChatBubbleLeftEllipsisIcon className="h-7 w-7 text-white" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
