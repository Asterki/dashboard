import { createFileRoute, useParams } from '@tanstack/react-router'

import VaultsFeature from '@/features/vaults'
import type { Vault } from '@/features/vaults'

export const Route = createFileRoute('/vaults/$vaultid/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { vaultid } = useParams({ from: '/vaults/$vaultid/' })

  // const [vault, setVault] = useState<vault

  return (
    <div>
      <h1>jewq</h1>
    </div>
  )
}
