
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#f7faff] px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
      <div className="absolute right-0 top-0 -z-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <ShieldCheck size={16} />
            Smart Healthcare Management
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Healthcare management,
            <span className="text-blue-600"> made simpler.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Manage doctors, organize patient records, and gain meaningful
            insights with one powerful healthcare administration platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              Secure management
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              Real-time insights
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/60 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-900/10 sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Stethoscope size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Doctor Tracker
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administration overview
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                System Active
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-sm text-slate-500">Total Doctors</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  128
                </h3>
                <p className="mt-2 text-xs text-blue-600">
                  Medical professionals
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm text-slate-500">Total Patients</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  2,450
                </h3>
                <p className="mt-2 text-xs text-emerald-600">
                  Patient records
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-800">
                  Patient Overview
                </h4>
                <span className="text-xs text-slate-400">This week</span>
              </div>

              <div className="mt-5 flex h-32 items-end gap-3">
                {[45, 70, 55, 85, 65, 95, 75].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col justify-end"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className={`rounded-t-lg ${
                        index === 5 ? "bg-blue-600" : "bg-blue-200"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
