import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profiles/import')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profiles/import"!</div>
}
