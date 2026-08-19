"use client";

import dynamic from "next/dynamic";

const DashboardRuntime = dynamic(() => import("./DashboardRuntime"), {
  ssr: false,
  loading: () => <main className="min-h-screen bg-[#f6f6f6]" aria-busy="true" />,
});

export default function DashboardClientShell({ children }: { children: React.ReactNode }) {
  return <DashboardRuntime>{children}</DashboardRuntime>;
}
