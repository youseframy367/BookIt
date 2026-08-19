"use client";

import dynamic from "next/dynamic";

/*
  هذه الشاشة من واجهات الكاشير القديمة وتعتمد على مكونات JavaScript عميلة.
  نعطّل SSR لها فقط حتى لا يستدعي Next hooks الخاصة بها خلال التصدير الثابت.
*/
const ClientDetailsEmployees = dynamic(() => import("./ClientDetailsEmployees"), {
  ssr: false,
  loading: () => <section className="p-6 text-sm text-slate-500">جارٍ تحميل تفاصيل الموظف…</section>,
});

export default function EmployeeDetailsClientShell({ id }: { id: string }) {
  return <ClientDetailsEmployees id={id} />;
}
