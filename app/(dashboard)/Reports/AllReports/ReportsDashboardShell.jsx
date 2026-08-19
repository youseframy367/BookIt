"use client";

import dynamic from "next/dynamic";

// تعتمد الرسوم ومحدد التاريخ على DOM، لذلك لا نحمّلها خلال التصدير الثابت.
const ReportsDashboardClient = dynamic(() => import("./ReportsDashboardClient"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-100" aria-busy="true" />,
});

export default function ReportsDashboardShell() {
  return <ReportsDashboardClient />;
}
