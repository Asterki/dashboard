import { Store } from '@tanstack/store'
import { db } from './db'
import type { Vault } from './db'

// Define the shape of the store
interface VaultsState {
  selectedVaultId: string | null
  vaults: Array<Vault>
  vaultsLoading: boolean
  vaultsError: string | null
}

const vaults = new Store<VaultsState>({
  selectedVaultId: null,
  vaults: [],
  vaultsLoading: false,
  vaultsError: null,
})

export default vaults

export async function loadVaults(): Promise<void> {
  vaults.setState((prev) => ({
    ...prev,
    vaultsLoading: true,
    vaultsError: null,
  }))

  try {
    const all = await db.vaults.toArray()
    vaults.setState((s) => ({ ...s, vaults: all, vaultsLoading: false }))
  } catch (err) {
    vaults.setState((s) => ({
      ...s,
      vaultsError: (err as Error).message,
      vaultsLoading: false,
    }))
  }
}

export async function addVault(name: string): Promise<number> {
  const id = await db.vaults.add({ name })
  await loadVaults()
  return id
}

export async function deleteVault(id: number): Promise<void> {
  await db.vaults.delete(id)
  await loadVaults()
}

export async function renameVault(id: number, name: string): Promise<void> {
  await db.vaults.update(id, { name })
  await loadVaults()
}
