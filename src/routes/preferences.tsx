import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preferences')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1>
        <h1>jioewq</h1>
      </h1>
    </div>
  )
}
