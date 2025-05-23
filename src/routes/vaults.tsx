import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useState } from 'react'

import { HiCheck, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'

// Features
import VaultsFeature from '@/features/vaults'
import NotificationFeature from '@/features/notifications'

export const Route = createFileRoute('/vaults')({
  component: VaultsPage,
})

function VaultsPage() {
  const { vaults, vaultsLoading, vaultsError } = useStore(
    VaultsFeature.store.default,
  )
  const [deleteModalState, setDeleteModalState] = useState<{
    vaultId: number | null
  }>({
    vaultId: null,
  })
  const handleDeleteVault = async (id: number) => {
    await VaultsFeature.store.deleteVault(id)
    NotificationFeature.store.addNotification(
      'success',
      'Vault deleted successfully',
      5000,
    )
  }

  const createVaultSchema = z.object({
    name: z
      .string()
      .min(1, 'Vault name is required')
      .max(50, 'Vault name must be less than 50 characters'),
  })
  const [createModalState, setCreateModalState] = useState<{
    open: boolean
    name: string
  }>({
    open: false,
    name: '',
  })

  const handleAddVault = async () => {
    const parsedData = createVaultSchema.safeParse({
      name: createModalState.name,
    })

    if (!parsedData.success) {
      for (const issue of parsedData.error.issues) {
        NotificationFeature.store.addNotification(
          'warning',
          issue.message,
          5000,
        )
      }
      return
    }

    const result = await VaultsFeature.store.addVault(createModalState.name)

    if (typeof result == 'number') {
      NotificationFeature.store.addNotification(
        'success',
        'Vault created successfully',
        5000,
      )
    } else {
      NotificationFeature.store.addNotification(
        'error',
        'There was a problem creating the vauly',
        5000,
      )
    }

    setCreateModalState({
      open: false,
      name: '',
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <dialog open={deleteModalState.vaultId !== null} className="modal z-40">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Delete Vault</h2>
          <p className="py-4">
            Are you sure you want to delete this vault? This action cannot be
            undone.
          </p>

          <div className="modal-action">
            <div className="flex gap-2">
              <button
                className="btn"
                onClick={() => {
                  setDeleteModalState({ vaultId: null })
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={() => {
                  handleDeleteVault(deleteModalState.vaultId as number)
                  setDeleteModalState({ vaultId: null })
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog open={createModalState.open} className="modal z-40">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Create Vault</h2>
          <p className="py-4">Set the name of the vault you want to create.</p>

          <input
            type="text"
            placeholder="Vault Name"
            className="input input-bordered w-full"
            value={createModalState.name}
            onChange={(e) => {
              setCreateModalState({
                ...createModalState,
                name: e.target.value,
              })
            }}
          />

          <div className="modal-action">
            <div className="flex gap-2">
              <button
                className="btn"
                onClick={() => {
                  setCreateModalState({
                    open: false,
                    name: '',
                  })
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={() => {
                  handleAddVault()
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <div role="alert" className="alert" hidden>
        <HiCheck className="h-6 w-6" />
        <span>12 unread messages. Tap to see.</span>
      </div>

      <div className="w-full max-w-xl card bg-base-100 shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Vaults</h1>

        {/* Add Vault */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCreateModalState({
                open: true,
                name: '',
              })
            }}
            className="btn btn-primary gap-2 w-full"
          >
            <HiOutlinePlus />
            Create A New Vault
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
                onClick={() => {
                  setDeleteModalState({
                    vaultId: vault.id as number,
                  })
                }}
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

      <NotificationFeature.ContextHolder />
    </div>
  )
}
