import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useStore } from '@tanstack/react-store'

import {
  HiInformationCircle,
  HiExclamationCircle,
  HiCheckCircle,
  HiXCircle,
} from 'react-icons/hi'

import NotificationStore from './store'

export default function ContextHolder() {
  const { notifications } = useStore(NotificationStore)
  const [fading, setFading] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timeouts: Record<string, number> = {}

    notifications.forEach((notification) => {
      const { id, timeout } = notification
      if (timeouts[id]) return // Already scheduled

      // Start fading out 1s before removal
      timeouts[id] = window.setTimeout(() => {
        setFading((prev) => ({ ...prev, [id]: true }))
      }, timeout - 1000)
    })

    return () => {
      Object.values(timeouts).forEach(clearTimeout)
    }
  }, [notifications])

  return (
    <div className="z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-sm px-4">
      <AnimatePresence>
        {notifications.map((n) => {
          let icon = <HiInformationCircle className="w-6 h-6" />
          switch (n.type) {
            case 'error':
              icon = <HiXCircle className="w-6 h-6" />
              break
            case 'success':
              icon = <HiCheckCircle className="w-6 h-6" />
              break
            case 'warning':
              icon = <HiExclamationCircle className="w-6 h-6" />
              break
          }

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={`alert alert-${n.type} shadow-lg`}
              style={{
                opacity: fading[n.id] ? 0 : 1,
                transition: 'opacity 1s ease-in-out',
              }}
            >
              <div className="flex gap-2 items-center">
                {icon}
                <span>{n.message}</span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
