export default function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Share a Beer — Admin</h1>
        <p className="mt-2 text-sm text-gray-700">
          Moderation queue and account administration (UC-25, UC-26). Auth + MFA login wiring ships
          in Phase 6.
        </p>
        <p className="mt-6 text-xs uppercase tracking-wide text-gray-500">v0 shell</p>
      </div>
    </main>
  );
}
