export default function PatientsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Patients
        </h1>

        <p className="mt-2 text-slate-500">
          Manage patient records and their doctor relationships.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Patient management is coming next
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We will add patient records, search, filtering, and pagination.
        </p>
      </div>
    </div>
  );
}
