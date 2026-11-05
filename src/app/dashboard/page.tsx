import Link from 'next/link';
import {
  Stethoscope,
  Users,
  UserCheck,
  TrendingUp,
  ArrowUpRight,
  CalendarDays,
  Activity,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Doctors',
    value: '24',
    change: '+12%',
    description: 'Compared to last month',
    icon: Stethoscope,
    color: 'blue',
    href: '/dashboard/doctors',
  },
  {
    title: 'Total Patients',
    value: '386',
    change: '+18%',
    description: 'Compared to last month',
    icon: Users,
    color: 'violet',
    href: '/dashboard/patients',
  },
  {
    title: 'Active Doctors',
    value: '21',
    change: '+8%',
    description: 'Currently available',
    icon: UserCheck,
    color: 'emerald',
    href: '/dashboard/doctors',
  },
  {
    title: 'New Patients',
    value: '42',
    change: '+15%',
    description: 'Added this month',
    icon: TrendingUp,
    color: 'orange',
    href: '/dashboard/patients',
  },
];

const activities = [
  {
    title: 'New patient registered',
    description: 'A new patient was added to the system.',
    time: '10 minutes ago',
    color: 'bg-blue-500',
  },
  {
    title: 'Doctor profile updated',
    description: 'A doctor profile was recently updated.',
    time: '35 minutes ago',
    color: 'bg-violet-500',
  },
  {
    title: 'Patient record updated',
    description: 'Patient information was modified.',
    time: '1 hour ago',
    color: 'bg-emerald-500',
  },
];

const monthlyPatients = [
  { month: 'Jan', patients: 35 },
  { month: 'Feb', patients: 48 },
  { month: 'Mar', patients: 42 },
  { month: 'Apr', patients: 65 },
  { month: 'May', patients: 55 },
  { month: 'Jun', patients: 78 },
  { month: 'Jul', patients: 68 },
  { month: 'Aug', patients: 90 },
  { month: 'Sep', patients: 74 },
  { month: 'Oct', patients: 105 },
  { month: 'Nov', patients: 85 },
  { month: 'Dec', patients: 120 },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Here is what is happening with your clinic.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <CalendarDays size={18} className="text-blue-600" />
          November 2026
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              href={stat.href}
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    stat.color === 'blue'
                      ? 'bg-blue-50 text-blue-600'
                      : stat.color === 'violet'
                        ? 'bg-violet-50 text-violet-600'
                        : stat.color === 'emerald'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-orange-50 text-orange-600'
                  }`}
                >
                  <Icon size={23} />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  {stat.change}
                  <ArrowUpRight size={14} />
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Chart and Activity */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Patient Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Patient Growth
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly patient registration overview
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              Patients
            </div>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="flex h-64 items-end justify-between gap-2 sm:gap-4">
            {monthlyPatients.map((item) => {
              const height = `${(item.patients / 120) * 100}%`;

              return (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end">
                    <div
                      title={`${item.patients} patients`}
                      style={{ height }}
                      className="w-full rounded-t-md bg-blue-500 transition hover:bg-blue-700"
                    />
                  </div>

                  <span className="text-[10px] text-slate-400 sm:text-xs">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest system updates
            </p>
          </div>

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="relative">
                  <div
                    className={`h-3 w-3 rounded-full ${activity.color}`}
                  />

                  {index !== activities.length - 1 && (
                    <div className="absolute left-1.5 top-3 h-14 w-px bg-slate-200" />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {activity.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your management pages.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/doctors"
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Stethoscope size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Manage Doctors
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View and manage doctor records.
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/patients"
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Users size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Manage Patients
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View and manage patient records.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Data Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Activity
          size={20}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <p className="text-sm leading-6 text-amber-800">
          This dashboard currently uses sample statistics and chart data.
          We will connect it to your MongoDB analytics API after the
          doctor and patient management features are completed.
        </p>
      </div>
    </div>
  );
}