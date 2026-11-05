
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Doctors",
    value: "128",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Patients",
    value: "2,450",
    icon: Activity,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Appointments",
    value: "384",
    icon: CalendarDays,
    color: "bg-violet-50 text-violet-600",
  },
];

export default function DashboardPreview() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Dashboard Preview
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, in one place.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Get a complete overview of your healthcare administration
            with an intuitive and organized dashboard.
          </p>
        </div>

        <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Dashboard Overview
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Your healthcare management at a glance
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">
              View Report
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h4 className="mt-5 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h4>

                  <p className="mt-2 text-sm text-emerald-600">
                    Overview statistics
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 p-5 lg:col-span-2">
              <h4 className="font-semibold text-slate-900">
                Patient Registration Trends
              </h4>

              <div className="mt-6 flex h-44 items-end gap-3">
                {[40, 65, 50, 85, 60, 95, 75, 90, 55, 80, 70, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className="w-full rounded-t-md bg-blue-500/80 transition hover:bg-blue-700"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-5">
              <h4 className="font-semibold text-slate-900">
                Quick Overview
              </h4>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Doctors</span>
                    <span className="font-semibold">128</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-3/4 rounded-full bg-blue-600" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Patients</span>
                    <span className="font-semibold">2,450</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-4/5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
