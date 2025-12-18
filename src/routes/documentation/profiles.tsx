import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/documentation/profiles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/documentation/profiles"!</div>
}
