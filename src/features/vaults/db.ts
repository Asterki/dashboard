import Dexie from 'dexie'
import type { Table } from 'dexie'

export type Vault = { id?: number; name: string }

class VaultsDB extends Dexie {
  vaults!: Table<Vault, number>
}

export const db = new VaultsDB('vaults')
db.version(1).stores({
  vaults: '++id,name',
})
