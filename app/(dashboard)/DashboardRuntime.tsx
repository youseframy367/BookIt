"use client";

import MainLayout from "../SidebarWrapper";
import { InvoiceProvider } from "./context/InvoiceContext";

/** تُحمّل هذه الطبقة بعد hydration لأنها تعتمد على hooks وسياقات الكاشير. */
export default function DashboardRuntime({ children }: { children: React.ReactNode }) {
  return (
    <InvoiceProvider>
      <MainLayout>{children}</MainLayout>
    </InvoiceProvider>
  );
}
