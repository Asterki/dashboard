import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { Store, useStore } from '@tanstack/react-store'

import VaultsFeature from '../../features/vaults'

export const Route = createFileRoute('/vaults/')({
  component: VaultsPage,
})

function VaultsPage() {
  const VaultsState = useStore(VaultsFeature.store.default)

  const { vaults, vaultsLoading, vaultsError } = VaultsState
  const [newVaultName, setNewVaultName] = useState('')

  const handleAddVault = async () => {
    if (!newVaultName.trim()) return
    await VaultsFeature.store.addVault(newVaultName)
    setNewVaultName('')
  }

  const handleDeleteVault = async (id: number) => {
    await VaultsFeature.store.deleteVault(id)
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-xl card bg-base-100 shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Vaults</h1>

        {/* Add Vault */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New vault name"
            value={newVaultName}
            onChange={(e) => setNewVaultName(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleAddVault} className="btn btn-primary gap-2">
            <HiOutlinePlus />
            Add
          </button>
        </div>

        {/* Status */}
        {vaultsLoading && (
          <div className="alert alert-info text-sm">
            <span>Loading vaults...</span>
          </div>
        )}

        {vaultsError && (
          <div className="alert alert-error text-sm">
            <span>Error: {vaultsError}</span>
          </div>
        )}

        {/* Vault List */}
        <ul className="space-y-2">
          {vaults.map((vault) => (
            <li
              key={vault.id}
              className="flex justify-between items-center p-3 border rounded bg-base-200"
            >
              <span className="truncate">{vault.name}</span>
              <button
                onClick={() => handleDeleteVault(vault.id!)}
                className="btn btn-sm btn-ghost text-red-500 hover:text-red-700"
                title="Delete"
              >
                <HiOutlineTrash />
              </button>
            </li>
          ))}
          {vaults.length === 0 && !vaultsLoading && (
            <li className="text-gray-500 italic">No vaults yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
