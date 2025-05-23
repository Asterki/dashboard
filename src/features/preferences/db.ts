import Dexie from 'dexie'
import type { Table } from 'dexie'

export type Preferences = {
  theme: 'light' | 'dark' | 'system'
}

class PreferencesDB extends Dexie {
  preferences!: Table<Preferences, number>
}

export const db = new PreferencesDB('vaults')
db.version(1).stores({
  vaults: '++id,theme',
})
