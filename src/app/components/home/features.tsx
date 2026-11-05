
import {
  Users,
  UserRound,
  Search,
  ChartNoAxesCombined,
  ShieldCheck,
  Database,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Doctor Management",
    description:
      "Create, organize, and manage doctor profiles with specialization, hospital, and contact information.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: UserRound,
    title: "Patient Management",
    description:
      "Keep patient records organized, update information, and manage doctor-patient relationships.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Find the right doctor or patient instantly with powerful search, filtering, and pagination.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Data Analytics",
    description:
      "Understand healthcare activity through clear charts, registration trends, and statistics.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Protect administrative access with secure authentication and authorization.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Database,
    title: "Optimized Performance",
    description:
      "Experience efficient data retrieval with optimized queries and structured database management.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#f7faff] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Powerful Features
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything to manage healthcare efficiently.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            A complete set of tools designed to simplify administration
            and make healthcare data easier to manage.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200/70 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
