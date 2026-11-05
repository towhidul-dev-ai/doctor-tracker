
type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  email: string;
};

type DoctorsResponse = {
  success: boolean;
  data: Doctor[];
};

async function getDoctors(): Promise<Doctor[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }

  const response = await fetch(`${apiUrl}/doctors`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch doctors');
  }

  const result: DoctorsResponse = await response.json();

  return result.data;
}

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            All Doctors
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage all registered doctors.
          </p>
        </div>

        {/* Doctor Count */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Doctors
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {doctors.length}
          </p>
        </div>

        {/* Doctors List */}
        {doctors.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No doctors found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Doctors will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {doctor.name?.charAt(0).toUpperCase() || 'D'}
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {doctor.specialty}
                </p>

                <p className="mt-3 break-words text-sm text-gray-500">
                  {doctor.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}