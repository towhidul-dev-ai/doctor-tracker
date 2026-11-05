
import { Suspense } from "react";
import type { ReactNode } from "react";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      }
    >
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </Suspense>
  );
}
