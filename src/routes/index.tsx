import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  FiActivity,
  FiCalendar,
  FiClock,
  FiDownload,
  FiEdit3,
  FiLayers,
  FiShield,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import { Button } from "antd";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["landing"]);

  return (
    <main className="min-h-screen bg-slate-800 flex flex-col items-center">
      <div className="w-full w-full relative bg-black/50 h-[50vh] flex flex-col items-center justify-center">
        <h1 className=" text-5xl font-extrabold text-center text-gray-900 dark:text-white">
          {t("title")}
        </h1>

        <p className="mt-4 max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
          Your offline-first, all-in-one productivity workspace. No login, no
          cloud, full privacy, just open the app and start getting things done.
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 absolute bottom-2 right-2">
          Created with ❤️ by{" "}
          <a href="https://github.com/Asterki/" className="underline">
            Asterki
          </a>
        </p>
      </div>

      <div className="mt-10 flex gap-4 justify-center">
        <Button
          onClick={() => {
            navigate({
              to: "/profiles",
            });
          }}
          type="primary"
          size="large"
        >
          Get Started
        </Button>
        <Button color="purple" size="large">
          Learn More
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        some other content and images here, not here yet simply because the app
        is not finished
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
