import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
} from 'react-icons/fi'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function Feature({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode
  label: string
  description: string
}) {
  return (
    <div className="card bg-base-200 shadow-md rounded-lg p-6 flex space-x-4 gap-2">
      <div className="flex items-center justify-center mx-auto w-12 h-12 text-white bg-primary bg-opacity-20 text-primary rounded-full text-2xl">
        {icon}
      </div>
      <div className="flex flex-col items-center justify-center text-center ">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {label}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>
    </div>
  )
}

function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-20 px-4">
      <img
        src={logo}
        alt="Dashboard logo"
        width={112}
        height={112}
        className="mx-auto animate-spin-slow"
        style={{ animationTimingFunction: 'linear', animationDuration: '20s' }}
      />

      <h1 className="mt-6 text-5xl font-extrabold text-center text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <p className="mt-4 max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        Your offline-first, all-in-one productivity workspace. No login, no
        cloud — just open the app and start getting things done.
      </p>

      <div className="mt-10 flex gap-4 justify-center">
        <button
          onClick={() => {
            navigate({
              to: '/vaults',
            })
          }}
          className="btn btn-primary px-8 text-lg font-semibold"
        >
          See Vaults
        </button>
        <button className="btn btn-outline btn-secondary px-8 text-lg font-semibold">
          Learn More
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Feature
          icon={<FiClock />}
          label="Pomodoro & Timers"
          description="Stay focused with customizable pomodoro timers and quick alerts."
        />
        <Feature
          icon={<FiCalendar />}
          label="Agenda & Calendar"
          description="Plan your day, week, and month with an intuitive calendar view."
        />
        <Feature
          icon={<FiEdit3 />}
          label="Notes & Drawing"
          description="Jot down ideas or sketch freely with offline note-taking and drawing tools."
        />
        <Feature
          icon={<FiUsers />}
          label="Tasks & Contacts"
          description="Manage your to-dos and contacts easily with offline storage."
        />
        <Feature
          icon={<FiShield />}
          label="Offline & Private"
          description="All your data stays on your device — no cloud, no tracking."
        />
        <Feature
          icon={<FiZap />}
          label="Instant Access"
          description="No setup or accounts required — open and start working immediately."
        />
        <Feature
          icon={<FiLayers />}
          label="Multi-tool Dashboard"
          description="Everything you need in one place — planning, reminders, drawing, and more."
        />
        <Feature
          icon={<FiActivity />}
          label="Performance Focused"
          description="Lightweight, fast, and reliable, so your workflow never slows down."
        />
        <Feature
          icon={<FiDownload />}
          label="Install & Go"
          description="Add as a PWA for quick desktop access, offline usage, and more."
        />
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
  )
}
