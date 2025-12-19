import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profiles/$profileId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profileId } = Route.useParams();
  return (
    <main className="min-h-screen bg-slate-800 text-gray-100 flex flex-col items-center py-24 px-4">
      <div>Hello "/profiles/$profileId/"!</div>

      <p>
        Profile ID: <strong>{profileId}</strong>
      </p>
    </main>
  );
}
