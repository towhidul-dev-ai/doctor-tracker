
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
  },
  {
    number: "02",
    icon: Users,
    title: "Manage Patients",
    description:
      "Assign patients to doctors and manage patient records from one organized place.",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Analyze Data",
    description:
      "Explore healthcare statistics and understand your system through visual insights.",
  },
];

export default function Workflow() {
  return (
    <section className="bg-[#f7faff] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Simple Workflow
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Manage healthcare in three simple steps.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            A straightforward workflow that keeps your administrative
            tasks organized and efficient.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-blue-600">
                    STEP {step.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="absolute -right-3 top-1/2 z-10 hidden text-blue-400 md:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
