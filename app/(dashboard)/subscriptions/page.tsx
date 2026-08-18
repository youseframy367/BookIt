"use client";

/* ============================================================
   إدارة الباقات والمزايا
   ------------------------------------------------------------
   بوابة داخلية تمنع الوصول افتراضياً. يرسل المستخدم طلباً من
   الداشبورد، ويعتمده مدير المشروع من قائمة الطلبات داخل النظام.
   لا توجد أي بيانات باقات تجريبية أو مسار إرسال بريد إلكتروني.
   ============================================================ */
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiCheck, FiClipboard, FiClock, FiCreditCard, FiLock, FiPlus, FiRefreshCw, FiShield, FiTrash2, FiUsers } from "react-icons/fi";
import { getErrorMessages, subscriptionsApi } from "@/utils/api";

type Tab = "plans" | "assignment" | "requests";

const money = (value: unknown, currency = "EGP") => new Intl.NumberFormat("ar-EG", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));
const date = (value?: string | null) => value ? new Date(value).toLocaleDateString("ar-EG") : "—";
const stateLabel: Record<string, string> = { pending: "بانتظار القرار", approved: "مقبول", rejected: "مرفوض", active: "مفعّلة", paused: "موقوفة", expired: "منتهية" };
const stateTone: Record<string, string> = { pending: "bg-amber-50 text-amber-700", approved: "bg-emerald-50 text-emerald-700", rejected: "bg-rose-50 text-rose-700", active: "bg-emerald-50 text-emerald-700", paused: "bg-slate-100 text-slate-600", expired: "bg-rose-50 text-rose-700" };

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(24,56,102,0.06)] sm:p-6"><div className="mb-5"><h2 className="text-base font-bold text-[#183866]">{title}</h2>{hint && <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>}</div>{children}</section>;
}

function Status({ value }: { value?: string }) {
  const key = value || "pending";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stateTone[key] || "bg-slate-100 text-slate-600"}`}>{stateLabel[key] || key}</span>;
}

export default function SubscriptionsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState<Tab>("plans");
  const [access, setAccess] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [current, setCurrent] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [featureRows, setFeatureRows] = useState([{ code: "", nameAr: "", value: "" }]);

  const isAllowed = Boolean(access?.allowed);
  const pendingRequests = useMemo(() => requests.filter((request) => request.status === "pending"), [requests]);
  const input = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#183866] focus:ring-2 focus:ring-[#183866]/10";

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const accessResponse = await subscriptionsApi.access();
      const nextAccess = accessResponse.data;
      setAccess(nextAccess);
      const reviewResponse = await subscriptionsApi.accessRequests().catch(() => null);
      setRequests(reviewResponse?.data || []);
      if (nextAccess.allowed) {
        const [plansResponse, currentResponse] = await Promise.all([subscriptionsApi.plans(), subscriptionsApi.current()]);
        setPlans(plansResponse.data || []); setCurrent(currentResponse.data || null);
      } else { setPlans([]); setCurrent(null); }
    } catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const run = async (action: () => Promise<unknown>, message: string) => {
    setSaving(true); setError(""); setNotice("");
    try { await action(); setNotice(message); await load(); }
    catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setSaving(false); }
  };

  const requestAccess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    void run(() => subscriptionsApi.requestAccess({ requestNote: String(form.get("requestNote") || "") || undefined }), "تم تسجيل طلب الوصول. سيبقى القسم محجوباً حتى يعتمد مدير المشروع الطلب.");
  };

  const createPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const features = featureRows.filter((row) => row.code.trim() && row.nameAr.trim()).map((row, index) => ({ code: row.code.trim().toLowerCase(), nameAr: row.nameAr.trim(), value: row.value.trim() || undefined, isIncluded: true, sortOrder: index }));
    if (!features.length) { setError("أضف ميزة واحدة على الأقل إلى الباقة."); return; }
    void run(() => subscriptionsApi.createPlan({
      code: String(form.get("code")).trim().toLowerCase(), nameAr: String(form.get("nameAr")).trim(), nameEn: String(form.get("nameEn") || "").trim() || undefined,
      description: String(form.get("description") || "").trim() || undefined, monthlyPrice: Number(form.get("monthlyPrice")), annualPrice: form.get("annualPrice") ? Number(form.get("annualPrice")) : undefined,
      currency: String(form.get("currency") || "EGP"), isPublished: form.get("isPublished") === "on", sortOrder: Number(form.get("sortOrder") || 0), features,
    }), "تم إنشاء الباقة ومزاياها بنجاح.");
    event.currentTarget.reset(); setFeatureRows([{ code: "", nameAr: "", value: "" }]);
  };

  const decide = (id: string, status: "approved" | "rejected") => {
    const decisionNote = window.prompt(status === "approved" ? "ملاحظة الاعتماد (اختيارية)" : "سبب الرفض (اختياري)") || undefined;
    void run(() => subscriptionsApi.decideAccess(id, { status, decisionNote }), status === "approved" ? "تم اعتماد طلب الوصول." : "تم رفض طلب الوصول.");
  };

  if (loading) return <main dir="rtl" className="min-h-screen bg-[#f6f8fc] px-3 py-5 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3"><div className="h-40 animate-pulse rounded-2xl bg-slate-200" /><div className="h-40 animate-pulse rounded-2xl bg-slate-200" /><div className="h-40 animate-pulse rounded-2xl bg-slate-200" /></div></main>;

  return <main dir="rtl" className="min-h-screen bg-[#f6f8fc] px-3 py-5 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
    <header className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#183866] p-5 text-white shadow-lg sm:flex-row sm:items-end sm:justify-between sm:p-7">
      <div><p className="mb-2 text-xs font-medium text-blue-100">إدارة اشتراكات BookIt من داخل الداشبورد</p><h1 className="text-2xl font-bold sm:text-3xl">الباقات والمزايا</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">حدد ما تتضمنه كل باقة، ثم عيّن الباقة المناسبة للنشاط بعد اعتماد صلاحية الوصول من مدير المشروع.</p></div>
      <button onClick={() => void load()} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#183866] transition hover:bg-blue-50 disabled:opacity-60"><FiRefreshCw /> تحديث الحالة</button>
    </header>
    {error && <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><FiAlertCircle />{error}</div>}
    {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700"><FiCheck />{notice}</div>}
    {!isAllowed ? <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <Card title="قسم محمي بموافقة مدير المشروع" hint="لا يمكن استعراض الباقات أو تعديلها أو اختيارها قبل اعتماد طلبك من لوحة المدير."><div className="flex items-start gap-3 rounded-xl bg-[#f6f8fc] p-4"><FiLock className="mt-0.5 shrink-0 text-xl text-[#183866]" /><div><p className="font-bold text-slate-800">حالة طلبك: <Status value={access?.request?.status} /></p><p className="mt-2 text-sm leading-6 text-slate-500">{access?.request ? "تم تسجيل آخر طلب لك. يمكنك متابعة حالته من هذه الصفحة." : "لم ترسل طلب دخول بعد. اكتب سبباً مختصراً وسيظهر للمدير في صندوق الموافقات الداخلي."}</p>{access?.request?.decisionNote && <p className="mt-2 rounded-lg bg-white p-2 text-xs text-slate-600">ملاحظة المدير: {access.request.decisionNote}</p>}</div></div></Card>
      <Card title="طلب دخول القسم" hint="لا يمنح إرسال الطلب أي صلاحية تلقائية."><form onSubmit={requestAccess} className="space-y-3"><textarea name="requestNote" maxLength={500} rows={5} className={input} placeholder="سبب احتياجك لإدارة الباقات والمزايا (اختياري)" /><button disabled={saving || access?.request?.status === "pending"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"><FiShield />{access?.request?.status === "pending" ? "الطلب قيد المراجعة" : "إرسال طلب وصول"}</button></form></Card>
      {requests.length > 0 && <section className="lg:col-span-2"><Card title={`صندوق موافقات مدير المشروع (${pendingRequests.length} معلّق)`} hint="يظهر هذا الصندوق لحسابات الإدارة فقط، حتى يمكن للمدير اعتماد أول طلب وصول دون تجاوز البوابة."><ApprovalTable requests={requests} saving={saving} onDecide={decide} /></Card></section>}
    </div> : <>
      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="أقسام الباقات">{([ ["plans", "الباقات والمزايا", FiCreditCard], ["assignment", "باقة النشاط", FiClipboard], ["requests", "طلبات الوصول", FiUsers] ] as const).map(([id, label, Icon]) => <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === id ? "bg-[#183866] text-white shadow" : "bg-white text-slate-600 hover:bg-slate-100"}`}><Icon />{label}{id === "requests" && pendingRequests.length > 0 && <span className="rounded-full bg-amber-100 px-1.5 text-xs text-amber-800">{pendingRequests.length}</span>}</button>)}</nav>
      {tab === "plans" && <div className="grid gap-5 xl:grid-cols-[1.3fr_.7fr]"><Card title="الباقات المنشأة" hint="المزايا المعروضة تأتي من إعدادات الباقة الفعلية.">{plans.length ? <div className="grid gap-4 md:grid-cols-2">{plans.map((plan) => <article key={plan.id} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-slate-800">{plan.nameAr}</h3><p className="mt-1 text-xs text-slate-400">{plan.code}</p></div><Status value={plan.isPublished ? "active" : "paused"} /></div><p className="mt-3 text-2xl font-bold text-[#183866]">{money(plan.monthlyPrice, plan.currency)}<span className="text-xs font-normal text-slate-500"> / شهرياً</span></p>{plan.annualPrice != null && <p className="mt-1 text-xs text-slate-500">سنوي: {money(plan.annualPrice, plan.currency)}</p>}<p className="mt-3 min-h-10 text-sm leading-5 text-slate-500">{plan.description || "لا يوجد وصف مختصر لهذه الباقة."}</p><ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">{(plan.features || []).map((feature: any) => <li key={feature.id || feature.code} className="flex items-center gap-2 text-xs text-slate-600"><FiCheck className="shrink-0 text-emerald-600" />{feature.nameAr}{feature.value && <span className="mr-auto text-slate-400">{feature.value}</span>}</li>)}</ul><button onClick={() => { if (window.confirm("هل تريد حذف الباقة؟ لا يمكن حذف باقة مرتبطة بنشاط.")) void run(() => subscriptionsApi.deletePlan(plan.id), "تم حذف الباقة."); }} disabled={saving} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"><FiTrash2 />حذف الباقة</button></article>)}</div> : <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">لم تُنشأ باقات بعد.</div>}</Card>
      <Card title="إضافة باقة جديدة" hint="يمكن لصاحب المشروع تقسيم المزايا كما يحتاج قبل نشر الباقة."><form onSubmit={createPlan} className="space-y-3"><input required name="nameAr" maxLength={120} className={input} placeholder="اسم الباقة، مثال: الاحترافية" /><input required name="code" maxLength={60} className={input} placeholder="رمز فريد، مثال: professional" /><textarea name="description" maxLength={1000} rows={2} className={input} placeholder="وصف مختصر" /><div className="grid grid-cols-2 gap-2"><input required name="monthlyPrice" min="0" type="number" className={input} placeholder="السعر الشهري" /><input name="annualPrice" min="0" type="number" className={input} placeholder="السعر السنوي" /></div><div className="grid grid-cols-2 gap-2"><input name="currency" defaultValue="EGP" maxLength={5} className={input} placeholder="العملة" /><input name="sortOrder" defaultValue="0" min="0" type="number" className={input} placeholder="ترتيب العرض" /></div><label className="flex items-center gap-2 text-sm text-slate-600"><input name="isPublished" type="checkbox" defaultChecked /> نشر الباقة ليستطيع مالك النشاط اختيارها</label><div className="rounded-xl bg-slate-50 p-3"><div className="mb-2 flex items-center justify-between"><p className="text-sm font-bold text-slate-700">المزايا</p><button type="button" onClick={() => setFeatureRows((rows) => [...rows, { code: "", nameAr: "", value: "" }])} className="inline-flex items-center gap-1 text-xs font-bold text-[#183866]"><FiPlus />إضافة ميزة</button></div>{featureRows.map((feature, index) => <div className="mb-2 grid grid-cols-[1fr_1.4fr_auto] gap-2" key={index}><input required value={feature.code} onChange={(event) => setFeatureRows((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, code: event.target.value } : row))} className={input} placeholder="رمز" /><input required value={feature.nameAr} onChange={(event) => setFeatureRows((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, nameAr: event.target.value } : row))} className={input} placeholder="اسم الميزة" /><button type="button" disabled={featureRows.length === 1} onClick={() => setFeatureRows((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} className="rounded-xl px-2 text-rose-500 disabled:opacity-30"><FiTrash2 /></button><input value={feature.value} onChange={(event) => setFeatureRows((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, value: event.target.value } : row))} className={`${input} col-span-2`} placeholder="قيمة أو حد الميزة (اختياري)" /></div>)}</div><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white disabled:opacity-60">حفظ الباقة</button></form></Card></div>}
      {tab === "assignment" && <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]"><Card title="باقة النشاط الحالية" hint="يستطيع مالك أو مدير النشاط اختيار باقة منشورة فقط.">{current?.plan ? <div className="rounded-xl bg-[#f6f8fc] p-5"><div className="flex items-center justify-between gap-3"><div><h3 className="text-lg font-bold text-[#183866]">{current.plan.nameAr}</h3><p className="mt-1 text-sm text-slate-500">بدأت في {date(current.startsAt)}</p></div><Status value={current.status} /></div><p className="mt-4 text-2xl font-bold text-slate-800">{money(current.plan.monthlyPrice, current.plan.currency)} <span className="text-xs font-normal text-slate-500">/ شهرياً</span></p><div className="mt-4 grid gap-2 sm:grid-cols-2">{(current.plan.features || []).map((feature: any) => <p key={feature.id || feature.code} className="rounded-lg bg-white p-2 text-xs text-slate-600"><FiCheck className="ml-1 inline text-emerald-600" />{feature.nameAr}</p>)}</div></div> : <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">لا توجد باقة معيّنة لنشاطك حتى الآن.</div>}</Card><Card title="اختيار أو تغيير الباقة"><div className="space-y-3">{plans.filter((plan) => plan.isPublished).length ? plans.filter((plan) => plan.isPublished).map((plan) => <button key={plan.id} onClick={() => void run(() => subscriptionsApi.select({ planId: plan.id, status: "active" }), `تم تعيين باقة ${plan.nameAr} للنشاط.`)} disabled={saving} className="w-full rounded-xl border border-slate-200 p-4 text-right transition hover:border-[#183866] hover:bg-blue-50 disabled:opacity-60"><p className="font-bold text-slate-800">{plan.nameAr}</p><p className="mt-1 text-sm text-slate-500">{money(plan.monthlyPrice, plan.currency)} شهرياً</p></button>) : <p className="text-sm text-slate-500">لا توجد باقات منشورة للاختيار.</p>}</div></Card></div>}
      {tab === "requests" && <Card title={`طلبات الوصول (${pendingRequests.length} معلّق)`} hint="لا يستطيع مدير المشروع منح أي طلب مراجع مسبقاً؛ تُسجل النتيجة وتاريخها داخل النظام."><ApprovalTable requests={requests} saving={saving} onDecide={decide} /></Card>}
    </>}
  </div></main>;
}

function ApprovalTable({ requests, saving, onDecide }: { requests: any[]; saving: boolean; onDecide: (id: string, status: "approved" | "rejected") => void }) {
  if (!requests.length) return <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">لا توجد طلبات وصول مسجلة حالياً.</div>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-right text-sm"><thead className="border-b border-slate-100 text-xs text-slate-500"><tr><th className="pb-3">مقدم الطلب</th><th className="pb-3">النشاط</th><th className="pb-3">سبب الطلب</th><th className="pb-3">التاريخ</th><th className="pb-3">الحالة</th><th className="pb-3">القرار</th></tr></thead><tbody>{requests.map((request) => <tr key={request.id} className="border-b border-slate-50"><td className="py-3"><p className="font-semibold text-slate-700">{request.requester?.nameAr || "—"}</p><p className="text-xs text-slate-400">{request.requester?.email || "—"}</p></td><td className="py-3">{request.business?.nameAr || "مدير المشروع"}</td><td className="max-w-52 py-3 text-xs text-slate-500">{request.requestNote || "—"}</td><td className="py-3 text-xs text-slate-500">{date(request.createdAt)}</td><td className="py-3"><Status value={request.status} /></td><td className="py-3">{request.status === "pending" ? <div className="flex gap-2"><button disabled={saving} onClick={() => onDecide(request.id, "approved")} className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white disabled:opacity-60">اعتماد</button><button disabled={saving} onClick={() => onDecide(request.id, "rejected")} className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 disabled:opacity-60">رفض</button></div> : <span className="text-xs text-slate-400">تمت المراجعة</span>}</td></tr>)}</tbody></table></div>;
}
