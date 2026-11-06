
import Link from "next/link";
import {
  UserPlus,
  Users,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Add Doctors",
    description:
      "Create doctor profiles with their specialization, hospital, and contact information.",
    href: "/dashboard/doctors",
    buttonText: "Explore Doctors",
  },
  {
    number: "02",
    icon: Users,
    title: "Manage Patients",
    description:
      "Assign patients to doctors and manage patient records from one organized place.",
    href: "/dashboard/patients",
    buttonText: "Explore Patients",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Analyze Data",
    description:
      "Explore healthcare statistics and understand your system through visual insights.",
    href: "/dashboard",
    buttonText: "View Dashboard",
  },
];

export default function Workflow() {
  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold tracking-wide text-blue-700">
            Simple Workflow
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Manage Healthcare in Three Simple Steps
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Everything you need to organize doctor information,
            manage patient records, and monitor your healthcare
            operations in one place.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Link
                href={step.href}
                key={step.number}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
              >
                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-blue-600">
                    STEP {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="mt-8 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>

                {/* Card Link */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-semibold text-blue-600">
                    {step.buttonText}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
