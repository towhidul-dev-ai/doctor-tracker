
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md text-center">

        {/* Loading Icon */}
        <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-800 border-t-teal-400" />

          <div className="text-2xl font-bold text-teal-400">
            +
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          Doctor Tracker
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Preparing your healthcare dashboard...
        </p>

        {/* Loading Bar */}
        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-teal-400" />
        </div>

        <p className="mt-5 text-xs tracking-wide text-slate-500">
          PLEASE WAIT
        </p>
      </div>
    </main>
  );
}
