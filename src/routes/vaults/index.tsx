import { createFileRoute } from '@tanstack/react-router'

import VaultsFeature from '../../features/vaults'

export const Route = createFileRoute('/vaults/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { vaults } = VaultsFeature.store.default.state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Vaults</h1>

        <ul className="list-disc list-inside">
          {vaults.map((vault) => (
            <li key={vault.id} className="mb-2">
              {vault.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
