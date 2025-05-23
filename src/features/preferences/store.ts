import { Store } from '@tanstack/store'
import { db } from './db'
import type { Preferences } from './db'

// Store setup
const preferencesStore = new Store<{
  loading: boolean
  error: string | null
  data: Preferences | null
}>({
  loading: true,
  error: null,
  data: null,
})

export default preferencesStore

// Ensures one preferences object exists
const ensurePreferences = async (): Promise<Preferences> => {
  const existing = await db.preferences.limit(1).toArray()
  if (existing.length === 0) {
    const id = await db.preferences.add({ theme: 'system' })
    return (await db.preferences.get(id)) as Preferences
  }
  return existing[0]
}

// Load preferences into the store
export async function loadPreferences(): Promise<void> {
  preferencesStore.setState((prev) => ({ ...prev, loading: true, error: null }))
  try {
    const pref = await ensurePreferences()
    preferencesStore.setState((s) => ({
      ...s,
      loading: false,
      error: null,
      data: pref,
    }))
  } catch (err) {
    preferencesStore.setState((s) => ({
      ...s,
      data: null,
      error: (err as Error).message,
    }))
  }
}

// Auto-load on module import
void loadPreferences()
