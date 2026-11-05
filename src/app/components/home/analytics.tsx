
import { ArrowUpRight, TrendingUp } from "lucide-react";

const bars = [35, 55, 42, 75, 60, 90, 68, 82, 52, 72, 95, 80];

export default function Analytics() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Data-Driven Insights
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Turn healthcare data into meaningful insights.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Monitor patient registrations, understand doctor workloads,
            and discover trends with an intuitive analytics dashboard.
          </p>

          <div className="mt-8 space-y-5">
            {[
              "Visualize patient registration trends",
              "Monitor patients assigned to each doctor",
              "Analyze healthcare activity over time",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <ArrowUpRight size={14} />
                </div>

                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Patient Registration
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                2,450
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                <TrendingUp size={16} />
                Registration overview
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">
              Monthly
            </div>
          </div>

          <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">
            {bars.map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 items-end"
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-full rounded-t-md transition ${
                    index === 10
                      ? "bg-blue-600"
                      : "bg-blue-200 hover:bg-blue-400"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between text-xs text-slate-400">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              Visualize registration activity and identify patterns
              throughout the year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
