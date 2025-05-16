import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vaults/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vaults/create"!</div>
}
