import { Store } from '@tanstack/store'

// Define the shape of the store
interface Notification {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  id: string
  timeout: number
}

interface NotificationState {
  notifications: Array<Notification>
}

const notifications = new Store<NotificationState>({
  notifications: [],
})

export default notifications

export function addNotification(
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  timeout: number,
): string {
  const id = crypto.randomUUID()
  notifications.setState((prev) => ({
    ...prev,
    notifications: [...prev.notifications, { type, message, id, timeout }],
  }))
  if (timeout) {
    setTimeout(() => {
      removeNotification(id)
    }, timeout)
  }
  return id
}

export function removeNotification(id: string): void {
  notifications.setState((prev) => ({
    ...prev,
    notifications: prev.notifications.filter((n) => n.id !== id),
  }))
}

export function clearNotifications(): void {
  notifications.setState((prev) => ({
    ...prev,
    notifications: [],
  }))
}
