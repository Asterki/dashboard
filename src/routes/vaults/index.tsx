import { z } from 'zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useState } from 'react'

import { HiOutlinePlus } from 'react-icons/hi'

// Features
import VaultsFeature from '@/features/vaults'
import NotificationFeature from '@/features/notifications'

export const Route = createFileRoute('/vaults/')({
  component: VaultsPage,
})

function VaultsPage() {
  const navigate = useNavigate()

  const { vaults, vaultsLoading, vaultsError } = useStore(
    VaultsFeature.store.default,
  )

  const createVaultSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Vault name is required')
      .max(50, 'Vault name must be less than 50 characters'),
    description: z
      .string()
      .max(100, 'Description must be less than 100 characters'),
  })
  const [createModalState, setCreateModalState] = useState<{
    open: boolean
    name: string
    description: string
  }>({
    open: false,
    name: '',
    description: '',
  })

  const handleAddVault = async () => {
    const parsedData = createVaultSchema.safeParse({
      name: createModalState.name,
      description: createModalState.description.trim(),
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

    const result = await VaultsFeature.actions.create({
      features: {},
      description: parsedData.data.description,
      name: parsedData.data.name,
    })

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
      description: '',
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <dialog open={createModalState.open} className="modal z-40">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Create Vault</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Vault Details</legend>

            <label className="label">Name</label>
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

            <label className="label mt-2">Description</label>
            <input
              type="text"
              placeholder="Vault Description"
              className="input input-bordered w-full"
              value={createModalState.description}
              onChange={(e) => {
                setCreateModalState({
                  ...createModalState,
                  description: e.target.value,
                })
              }}
            />
          </fieldset>

          <div className="modal-action">
            <div className="flex gap-2">
              <button
                className="btn"
                onClick={() => {
                  setCreateModalState({
                    open: false,
                    name: '',
                    description: '',
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

      <div className="w-full p-6 space-y-6 flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">Vaults</h1>

        {/* Add Vault */}
        <div className="flex gap-2 max-w-xl w-full">
          <button
            onClick={() => {
              setCreateModalState({
                open: true,
                name: '',
                description: '',
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
        <div className="flex flex-wrap w-full items-stretch justify-center gap-4">
          {vaults.map((vault) => (
            <div key={vault.id} className="card bg-base-200 w-96 shadow-sm">
              <figure>
                <img
                  src={'https://placehold.co/400x300'}
                  alt="Vault image"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/400'
                  }}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{vault.name}</h2>
                {vault.description !== '' && <p>{vault.description}</p>}
                <p className="text-sm text-gray-500">
                  <p>
                    Created At: {new Date(vault.createdAt).toLocaleDateString()}
                  </p>

                  <p>
                    Updated At: {new Date(vault.updatedAt).toLocaleTimeString()}
                  </p>
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate({
                        to: `/vaults/${vault.id}`,
                      })
                    }}
                  >
                    Enter Vault
                  </button>
                </div>
              </div>
            </div>
          ))}
          {vaults.length === 0 && !vaultsLoading && (
            <li className="text-gray-500 italic">No vaults yet.</li>
          )}
        </div>
      </div>

      <NotificationFeature.ContextHolder />
    </div>
  )
}
