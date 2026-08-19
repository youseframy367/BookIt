import DashboardClientShell from "./DashboardClientShell";

/** يبقى المحتوى قابلاً للتمرير إلى العميل، بينما لا تُنفّذ واجهة الداشبورد التفاعلية عند البناء. */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardClientShell>{children}</DashboardClientShell>;
}
