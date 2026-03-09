import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const CheckIcon = () => <CheckCircleIcon className="h-5 w-5 text-lime-400" />;

const plans = [
  {
    name: "Free",
    price: "$0.00",
    featured: false,
    cardBg: "bg-purple-50",
    buttonLabel: "Current Plan",
    buttonStyle: "border-2 border-gray-300 text-gray-900 hover:bg-gray-50",
    features: [
      "Limited songs + SFX",
      "Limited downloads",
      "Safe YouTube + Socials",
      "2 Personal Playlists",
      "Access to our community Discord",
    ],
  },
  {
    name: "Premium",
    price: "$8.99",
    featured: true,
    cardBg: "bg-purple-900",
    buttonLabel: "Get Started",
    buttonStyle: "bg-purple-500 text-white hover:bg-purple-600",
    features: [
      "Access to all songs",
      "Unlimited Downloads",
      "Safe for YouTube, Socials + Podcasts",
      "Unlimited personal playlists",
      "100s of curated song collections",
      "Premium SFX + Creator Perks",
      "Premium access to our Discord",
    ],
  },
  {
    name: "Pro",
    price: "$24.99",
    featured: false,
    cardBg: "bg-purple-50",
    buttonLabel: "Get Started",
    buttonStyle: "bg-purple-500 text-white hover:bg-purple-600",
    features: [
      "Everything in Premium",
      "Unlimited YouTube Channels",
      "High Quality + Instrumental Versions",
      "Early access to new song drops",
      "Invite team members",
      "Unlimited SFX + SFX Packs",
      "All Creators Perks + Discounts",
    ],
  },
];

const UpgradePlanModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8 sm:items-center sm:py-12">
    <div className="relative w-full max-w-5xl rounded-3xl bg-white px-4 py-8 shadow-2xl sm:px-8 sm:py-10 md:px-12">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 text-gray-400 transition hover:text-gray-700"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <h2 className="text-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
        Upgrade your plan to unlock this feature
      </h2>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex overflow-hidden rounded-full bg-purple-200">
          <button
            type="button"
            className="rounded-full bg-purple-900 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Monthly
          </button>
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-gray-600 transition"
          >
            Annual
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border ${plan.cardBg} ${
              plan.featured
                ? "border-purple-500 ring-2 ring-purple-500"
                : "border-gray-200"
            }`}
          >
            {plan.featured && (
              <div className="rounded-t-2xl bg-purple-500 py-2 text-center text-sm font-bold text-white">
                Most Popular
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <h3
                className={`text-lg font-bold ${plan.featured ? "text-white" : "text-gray-900"}`}
              >
                {plan.name}
              </h3>

              <div
                className={`mt-3 flex items-baseline gap-1.5 border-b pb-5 ${plan.featured ? "border-purple-700" : "border-gray-200"}`}
              >
                <span
                  className={`text-4xl font-extrabold ${plan.featured ? "text-white" : "text-gray-900"}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${plan.featured ? "text-purple-300" : "text-gray-500"}`}
                >
                  / month
                </span>
              </div>

              <ul className="mt-5 flex flex-1 flex-col gap-3.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 text-sm ${plan.featured ? "text-purple-100" : "text-gray-700"}`}
                  >
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-6 w-full rounded-full py-3.5 text-base font-semibold transition ${plan.buttonStyle}`}
              >
                {plan.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UpgradePlanModal;
