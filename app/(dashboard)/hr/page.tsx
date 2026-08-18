"use client";

/* ============================================================
   لوحة الموارد البشرية للمطاعم والكافيهات
   ------------------------------------------------------------
   واجهة موحّدة في نمط داشبورد BookIt لإدارة الموظفين والأقسام
   والورديات والحضور والإجازات والرواتب. لا تعرض الصفحة بيانات
   تجريبية: كل بطاقاتها وجداولها تعتمد على HR API المحمي.
   ============================================================ */
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  FiAlertCircle, FiCalendar, FiCheck, FiClock, FiDollarSign,
  FiFileText, FiPlus, FiRefreshCw, FiUsers,
} from "react-icons/fi";
import { businessApi, getErrorMessages, hrApi, usersApi } from "@/utils/api";

type TabKey = "overview" | "employees" | "schedule" | "attendance" | "leaves" | "payroll";

const today = () => new Date().toISOString().slice(0, 10);
const number = (value: unknown) => new Intl.NumberFormat("ar-EG").format(Number(value || 0));
const currency = (value: unknown) => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(Number(value || 0));

const tabs: Array<{ id: TabKey; label: string; icon: typeof FiUsers }> = [
  { id: "overview", label: "نظرة عامة", icon: FiUsers },
  { id: "employees", label: "الموظفون", icon: FiUsers },
  { id: "schedule", label: "الورديات", icon: FiCalendar },
  { id: "attendance", label: "الحضور", icon: FiClock },
  { id: "leaves", label: "الإجازات", icon: FiFileText },
  { id: "payroll", label: "الرواتب", icon: FiDollarSign },
];

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(24,56,102,0.06)] sm:p-6">
    <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
      <div><h2 className="text-base font-bold text-[#183866]">{title}</h2>{hint && <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>}</div>
    </div>
    {children}
  </section>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">{text}</div>;
}

export default function HrPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dashboard, setDashboard] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [payrollPeriods, setPayrollPeriods] = useState<any[]>([]);
  const [businessUsers, setBusinessUsers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [workDate, setWorkDate] = useState(today());

  const availableUsers = useMemo(() => {
    const profiled = new Set(employees.map((employee) => employee.userId));
    return businessUsers.filter((user) => !profiled.has(user.id));
  }, [businessUsers, employees]);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [dashboardRes, employeesRes, departmentsRes, shiftsRes, assignmentsRes, attendanceRes, leavesRes, payrollRes, usersRes, branchesRes] = await Promise.all([
        hrApi.dashboard(), hrApi.employees(), hrApi.departments(), hrApi.shifts(), hrApi.assignments(workDate),
        hrApi.attendance(workDate), hrApi.leaves(), hrApi.payrollPeriods(), usersApi.list(), businessApi.branches(),
      ]);
      setDashboard(dashboardRes.data); setEmployees(employeesRes.data); setDepartments(departmentsRes.data);
      setShifts(shiftsRes.data); setAssignments(assignmentsRes.data); setAttendance(attendanceRes.data);
      setLeaves(leavesRes.data); setPayrollPeriods(payrollRes.data); setBusinessUsers(usersRes.data); setBranches(branchesRes.data);
    } catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setLoading(false); }
  }, [workDate]);

  useEffect(() => { void load(); }, [load]);

  const submit = async (action: () => Promise<any>, success: string) => {
    setSaving(true); setError(""); setNotice("");
    try { await action(); setNotice(success); await load(); }
    catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setSaving(false); }
  };

  const handleDepartment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    void submit(() => hrApi.createDepartment({ nameAr: data.get("nameAr"), nameEn: data.get("nameEn") || undefined, description: data.get("description") || undefined }), "تمت إضافة القسم.");
    event.currentTarget.reset();
  };

  const handleEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    void submit(() => hrApi.createEmployee({
      userId: data.get("userId"), employeeNumber: data.get("employeeNumber"), jobTitleAr: data.get("jobTitleAr"),
      employmentType: data.get("employmentType"), hireDate: data.get("hireDate"), baseSalary: Number(data.get("baseSalary")),
      departmentId: data.get("departmentId") || undefined, branchId: data.get("branchId") || undefined,
    }), "تم إنشاء الملف الوظيفي وربطه بالمستخدم.");
    event.currentTarget.reset();
  };

  const handleShift = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    void submit(() => hrApi.createShift({ nameAr: data.get("nameAr"), startsAt: data.get("startsAt"), endsAt: data.get("endsAt"), branchId: data.get("branchId") || undefined, graceMinutes: Number(data.get("graceMinutes") || 10) }), "تمت إضافة الوردية.");
    event.currentTarget.reset();
  };

  const handleAssignment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    void submit(() => hrApi.assignShift({ employeeProfileId: data.get("employeeProfileId"), shiftId: data.get("shiftId"), workDate: data.get("workDate"), branchId: data.get("branchId") || undefined }), "تمت جدولة الوردية.");
  };

  const handleAttendance = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const clockIn = data.get("clockInAt") ? `${data.get("workDate")}T${data.get("clockInAt")}:00` : undefined;
    const clockOut = data.get("clockOutAt") ? `${data.get("workDate")}T${data.get("clockOutAt")}:00` : undefined;
    void submit(() => hrApi.recordAttendance({ employeeProfileId: data.get("employeeProfileId"), workDate: data.get("workDate"), status: data.get("status"), clockInAt: clockIn, clockOutAt: clockOut, branchId: data.get("branchId") || undefined }), "تم حفظ سجل الحضور.");
  };

  const handlePayrollPeriod = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    void submit(() => hrApi.createPayrollPeriod({ nameAr: data.get("nameAr"), periodStart: data.get("periodStart"), periodEnd: data.get("periodEnd") }), "تم إنشاء فترة الرواتب كمسودة.");
    event.currentTarget.reset();
  };

  const handlePayrollEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget); const periodId = String(data.get("periodId"));
    void submit(() => hrApi.upsertPayrollEntry(periodId, {
      employeeProfileId: data.get("employeeProfileId"), baseSalary: Number(data.get("baseSalary")), allowances: Number(data.get("allowances") || 0), overtimeAmount: Number(data.get("overtimeAmount") || 0), deductions: Number(data.get("deductions") || 0),
    }), "تم احتساب صافي راتب الموظف وحفظه في المسودة.");
  };

  const selectClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#183866] focus:ring-2 focus:ring-[#183866]/10";
  const inputClass = selectClass;

  return <main dir="rtl" className="min-h-screen bg-[#f6f8fc] px-3 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#183866] p-5 text-white shadow-lg sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div><p className="mb-2 text-xs font-medium text-blue-100">تشغيل الموظفين للمطاعم والكافيهات</p><h1 className="text-2xl font-bold sm:text-3xl">نظام الموارد البشرية</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">إدارة مركزية للموظفين والورديات والحضور والإجازات والرواتب، ضمن حدود نشاطك وفروعك فقط.</p></div>
        <button onClick={() => void load()} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#183866] transition hover:bg-blue-50 disabled:opacity-60"><FiRefreshCw className={loading ? "animate-spin" : ""} /> تحديث البيانات</button>
      </header>

      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="أقسام الموارد البشرية">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === id ? "bg-[#183866] text-white shadow" : "bg-white text-slate-600 hover:bg-slate-100"}`}><Icon />{label}</button>)}
      </nav>

      {error && <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><FiAlertCircle />{error}</div>}
      {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700"><FiCheck />{notice}</div>}
      {loading ? <div className="grid gap-4 md:grid-cols-3"><div className="h-32 animate-pulse rounded-2xl bg-slate-200" /><div className="h-32 animate-pulse rounded-2xl bg-slate-200" /><div className="h-32 animate-pulse rounded-2xl bg-slate-200" /></div> : <>
        {tab === "overview" && <div className="space-y-5">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["إجمالي الموظفين", dashboard?.metrics?.totalEmployees, FiUsers, "bg-blue-50 text-blue-700"],
              ["نشطون حالياً", dashboard?.metrics?.activeEmployees, FiCheck, "bg-emerald-50 text-emerald-700"],
              ["حضور اليوم", dashboard?.metrics?.presentToday, FiClock, "bg-amber-50 text-amber-700"],
              ["تأخر اليوم", dashboard?.metrics?.lateToday, FiAlertCircle, "bg-rose-50 text-rose-700"],
              ["طلبات بانتظار القرار", dashboard?.metrics?.pendingLeaves, FiFileText, "bg-violet-50 text-violet-700"],
            ].map(([label, value, Icon, tone]) => <div key={String(label)} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><div className={`mb-4 inline-flex rounded-xl p-2.5 ${tone}`}><Icon as any /></div><p className="text-2xl font-bold text-slate-800">{number(value)}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
          </section>
          <Panel title="ورديات اليوم" hint={`الجدول بتاريخ ${dashboard?.today || workDate}`}>
            {dashboard?.upcomingShifts?.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-right text-sm"><thead className="border-b border-slate-100 text-xs text-slate-500"><tr><th className="pb-3">الموظف</th><th className="pb-3">الوردية</th><th className="pb-3">الفرع</th><th className="pb-3">الحالة</th></tr></thead><tbody>{dashboard.upcomingShifts.map((row: any) => <tr className="border-b border-slate-50" key={row.id}><td className="py-3 font-medium text-slate-700">{row.employee?.user?.nameAr || "—"}</td><td className="py-3">{row.shift?.nameAr} <span className="text-xs text-slate-400">{row.shift?.startsAt}–{row.shift?.endsAt}</span></td><td className="py-3">{row.branch?.nameAr || "كل الفروع"}</td><td className="py-3"><span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">{row.status}</span></td></tr>)}</tbody></table></div> : <EmptyState text="لا توجد ورديات مجدولة لهذا اليوم." />}
          </Panel>
        </div>}

        {tab === "employees" && <div className="grid gap-5 xl:grid-cols-[1.4fr_.9fr]">
          <Panel title="دليل الموظفين" hint="الملف الوظيفي يرتبط بحساب مستخدم موجود مسبقاً في BookIt.">
            {employees.length ? <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-right text-sm"><thead className="border-b border-slate-100 text-xs text-slate-500"><tr><th className="pb-3">الموظف</th><th className="pb-3">المسمى</th><th className="pb-3">القسم</th><th className="pb-3">الفرع</th><th className="pb-3">الحالة</th><th className="pb-3">الراتب الأساسي</th></tr></thead><tbody>{employees.map((employee) => <tr className="border-b border-slate-50" key={employee.id}><td className="py-3"><p className="font-semibold text-slate-700">{employee.user?.nameAr || "—"}</p><p className="text-xs text-slate-400">{employee.employeeNumber}</p></td><td className="py-3">{employee.jobTitleAr}</td><td className="py-3">{employee.department?.nameAr || "غير محدد"}</td><td className="py-3">{employee.branch?.nameAr || "كل الفروع"}</td><td className="py-3"><span className={`rounded-full px-2 py-1 text-xs ${employee.employmentStatus === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{employee.employmentStatus}</span></td><td className="py-3 font-medium">{currency(employee.baseSalary)}</td></tr>)}</tbody></table></div> : <EmptyState text="لم تُنشأ ملفات وظيفية بعد. أنشئ مستخدم الموظف أولاً من قسم المشرفين ثم اربطه هنا." />}
          </Panel>
          <div className="space-y-5">
            <Panel title="إضافة قسم"><form onSubmit={handleDepartment} className="space-y-3"><input name="nameAr" required maxLength={120} className={inputClass} placeholder="اسم القسم، مثال: المطبخ" /><input name="nameEn" maxLength={120} className={inputClass} placeholder="الاسم بالإنجليزية (اختياري)" /><textarea name="description" maxLength={500} className={inputClass} placeholder="وصف مختصر" rows={2} /><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white disabled:opacity-60">حفظ القسم</button></form></Panel>
            <Panel title="إنشاء ملف وظيفي" hint="تظهر فقط حسابات المستخدمين غير المرتبطة بملف HR."><form onSubmit={handleEmployee} className="space-y-3"><select required name="userId" className={selectClass} defaultValue=""><option value="" disabled>اختر مستخدم الموظف</option>{availableUsers.map((user) => <option key={user.id} value={user.id}>{user.nameAr} — {user.email}</option>)}</select><div className="grid grid-cols-2 gap-2"><input name="employeeNumber" required className={inputClass} placeholder="رقم الموظف" /><input name="jobTitleAr" required className={inputClass} placeholder="المسمى الوظيفي" /></div><select name="departmentId" className={selectClass} defaultValue=""><option value="">بدون قسم</option>{departments.filter((item) => item.isActive).map((item) => <option value={item.id} key={item.id}>{item.nameAr}</option>)}</select><select name="branchId" className={selectClass} defaultValue=""><option value="">كل الفروع</option>{branches.map((branch) => <option value={branch.id} key={branch.id}>{branch.nameAr}</option>)}</select><div className="grid grid-cols-2 gap-2"><select name="employmentType" className={selectClass} defaultValue="full-time"><option value="full-time">دوام كامل</option><option value="part-time">دوام جزئي</option><option value="contract">عقد</option><option value="seasonal">موسمي</option></select><input name="hireDate" type="date" required defaultValue={today()} className={inputClass} /></div><input name="baseSalary" type="number" min="0" required className={inputClass} placeholder="الراتب الأساسي" /><button disabled={saving || !availableUsers.length} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white disabled:opacity-60">إضافة موظف</button></form></Panel>
          </div>
        </div>}

        {tab === "schedule" && <div className="grid gap-5 xl:grid-cols-[1.4fr_.9fr]">
          <Panel title="جدول الورديات" hint="يمكن تخصيص وردية لكل موظف في اليوم المحدد."><div className="mb-4 flex flex-wrap items-center gap-2"><label className="text-xs text-slate-500">التاريخ</label><input type="date" value={workDate} onChange={(event) => setWorkDate(event.target.value)} className={`${inputClass} w-auto`} /></div>{assignments.length ? <div className="space-y-2">{assignments.map((assignment) => <div key={assignment.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"><div><p className="font-semibold text-slate-700">{assignment.employee?.user?.nameAr}</p><p className="text-xs text-slate-500">{assignment.shift?.nameAr} — {assignment.shift?.startsAt} إلى {assignment.shift?.endsAt}</p></div><div className="flex items-center gap-2"><span className="text-xs text-slate-500">{assignment.branch?.nameAr || "كل الفروع"}</span><select value={assignment.status} onChange={(event) => void submit(() => hrApi.updateAssignmentStatus(assignment.id, event.target.value), "تم تحديث حالة الوردية.")} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option value="scheduled">مجدولة</option><option value="completed">مكتملة</option><option value="absent">غياب</option><option value="swapped">تبديل</option><option value="leave">إجازة</option></select></div></div>)}</div> : <EmptyState text="لا توجد ورديات في هذا التاريخ." />}</Panel>
          <div className="space-y-5"><Panel title="تعريف وردية"><form onSubmit={handleShift} className="space-y-3"><input name="nameAr" required className={inputClass} placeholder="مثال: وردية الصباح" /><div className="grid grid-cols-2 gap-2"><input name="startsAt" type="time" required className={inputClass} /><input name="endsAt" type="time" required className={inputClass} /></div><select name="branchId" className={selectClass} defaultValue=""><option value="">كل الفروع</option>{branches.map((branch) => <option value={branch.id} key={branch.id}>{branch.nameAr}</option>)}</select><input name="graceMinutes" type="number" min="0" defaultValue="10" className={inputClass} placeholder="سماح التأخير بالدقائق" /><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white">حفظ الوردية</button></form></Panel><Panel title="جدولة موظف"><form onSubmit={handleAssignment} className="space-y-3"><select name="employeeProfileId" required className={selectClass} defaultValue=""><option value="" disabled>اختر الموظف</option>{employees.filter((item) => item.employmentStatus === "active").map((item) => <option key={item.id} value={item.id}>{item.user?.nameAr} — {item.jobTitleAr}</option>)}</select><select name="shiftId" required className={selectClass} defaultValue=""><option value="" disabled>اختر وردية</option>{shifts.filter((item) => item.isActive).map((item) => <option key={item.id} value={item.id}>{item.nameAr} ({item.startsAt}–{item.endsAt})</option>)}</select><input name="workDate" type="date" required defaultValue={workDate} className={inputClass} /><select name="branchId" className={selectClass} defaultValue=""><option value="">حسب وردية/ملف الموظف</option>{branches.map((branch) => <option value={branch.id} key={branch.id}>{branch.nameAr}</option>)}</select><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white">جدولة الوردية</button></form></Panel></div>
        </div>}

        {tab === "attendance" && <div className="grid gap-5 xl:grid-cols-[1.4fr_.9fr]"><Panel title="حضور وانصراف اليوم" hint="تحديث سجل الموظف في التاريخ نفسه لا ينشئ سجلاً مكرراً."><div className="mb-4 flex items-center gap-2"><label className="text-xs text-slate-500">التاريخ</label><input type="date" value={workDate} onChange={(event) => setWorkDate(event.target.value)} className={`${inputClass} w-auto`} /></div>{attendance.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-right text-sm"><thead className="border-b border-slate-100 text-xs text-slate-500"><tr><th className="pb-3">الموظف</th><th className="pb-3">الفرع</th><th className="pb-3">دخول</th><th className="pb-3">خروج</th><th className="pb-3">الحالة</th></tr></thead><tbody>{attendance.map((record) => <tr key={record.id} className="border-b border-slate-50"><td className="py-3 font-medium">{record.employee?.user?.nameAr}</td><td className="py-3">{record.branch?.nameAr || "—"}</td><td className="py-3">{record.clockInAt ? new Date(record.clockInAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) : "—"}</td><td className="py-3">{record.clockOutAt ? new Date(record.clockOutAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) : "—"}</td><td className="py-3"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{record.status}</span></td></tr>)}</tbody></table></div> : <EmptyState text="لا توجد سجلات حضور لهذا اليوم." />}</Panel><Panel title="تسجيل حضور أو تعديل السجل"><form onSubmit={handleAttendance} className="space-y-3"><select name="employeeProfileId" required className={selectClass} defaultValue=""><option value="" disabled>اختر الموظف</option>{employees.map((item) => <option key={item.id} value={item.id}>{item.user?.nameAr}</option>)}</select><input name="workDate" type="date" defaultValue={workDate} className={inputClass} required /><div className="grid grid-cols-2 gap-2"><input name="clockInAt" type="time" className={inputClass} /><input name="clockOutAt" type="time" className={inputClass} /></div><select name="status" className={selectClass} defaultValue="present"><option value="present">حاضر</option><option value="late">متأخر</option><option value="absent">غائب</option><option value="half-day">نصف يوم</option></select><select name="branchId" className={selectClass} defaultValue=""><option value="">حسب ملف الموظف</option>{branches.map((branch) => <option value={branch.id} key={branch.id}>{branch.nameAr}</option>)}</select><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white">حفظ الحضور</button></form></Panel></div>}

        {tab === "leaves" && <Panel title="طلبات الإجازات" hint="تظهر هنا الطلبات المقدمة من حسابات الموظفين، ويمكن للمالك أو المدير اعتمادها أو رفضها.">{leaves.length ? <div className="space-y-3">{leaves.map((leave) => <article key={leave.id} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-700">{leave.employee?.user?.nameAr}</p><p className="mt-1 text-sm text-slate-600">{leave.leaveType} · من {leave.startDate} إلى {leave.endDate} · {leave.totalDays} يوم</p><p className="mt-1 text-xs text-slate-400">{leave.reason}</p></div><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs ${leave.status === "pending" ? "bg-amber-50 text-amber-700" : leave.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{leave.status}</span>{leave.status === "pending" && <><button disabled={saving} onClick={() => void submit(() => hrApi.reviewLeave(leave.id, { status: "approved" }), "تم اعتماد طلب الإجازة.")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">اعتماد</button><button disabled={saving} onClick={() => void submit(() => hrApi.reviewLeave(leave.id, { status: "rejected" }), "تم رفض طلب الإجازة.")} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white">رفض</button></>}</div></article>)}</div> : <EmptyState text="لا توجد طلبات إجازات حالياً." />}</Panel>}

        {tab === "payroll" && <div className="grid gap-5 xl:grid-cols-[1.4fr_.9fr]"><Panel title="فترات الرواتب" hint="يتم إنشاء الفترة كمسودة، ثم يضيف المدير بنود الموظفين، ولا يستطيع اعتمادها أو تعليمها كمدفوعة إلا المالك.">{payrollPeriods.length ? <div className="space-y-3">{payrollPeriods.map((period) => <article key={period.id} className="rounded-xl border border-slate-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-slate-700">{period.nameAr}</p><p className="mt-1 text-xs text-slate-500">{period.periodStart} ← {period.periodEnd} · {period.entries?.length || 0} موظف</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{period.status}</span>{period.status === "draft" && <button disabled={saving} onClick={() => void submit(() => hrApi.updatePayrollStatus(period.id, "approved"), "تم اعتماد فترة الرواتب.")} className="rounded-lg border border-[#183866] px-3 py-1.5 text-xs font-bold text-[#183866]">اعتماد</button>}{period.status === "approved" && <button disabled={saving} onClick={() => void submit(() => hrApi.updatePayrollStatus(period.id, "paid"), "تم تعليم فترة الرواتب كمدفوعة.")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">تم الدفع</button>}</div></div>{period.entries?.length ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{period.entries.map((entry: any) => <div key={entry.id} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">صافي بند راتب: <b className="text-slate-800">{currency(entry.netSalary)}</b></div>)}</div> : null}</article>)}</div> : <EmptyState text="لا توجد فترات رواتب. ابدأ بإنشاء مسودة للشهر أو للأسبوع." />}</Panel><div className="space-y-5"><Panel title="إنشاء فترة رواتب"><form onSubmit={handlePayrollPeriod} className="space-y-3"><input name="nameAr" required className={inputClass} placeholder="مثال: رواتب أغسطس 2026" /><div className="grid grid-cols-2 gap-2"><input name="periodStart" type="date" required className={inputClass} /><input name="periodEnd" type="date" required className={inputClass} /></div><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white">إنشاء مسودة</button></form></Panel><Panel title="إضافة بند راتب"><form onSubmit={handlePayrollEntry} className="space-y-3"><select name="periodId" required className={selectClass} defaultValue=""><option value="" disabled>اختر فترة مسودة</option>{payrollPeriods.filter((period) => period.status === "draft").map((period) => <option key={period.id} value={period.id}>{period.nameAr}</option>)}</select><select name="employeeProfileId" required className={selectClass} defaultValue=""><option value="" disabled>اختر الموظف</option>{employees.filter((employee) => employee.employmentStatus === "active").map((employee) => <option key={employee.id} value={employee.id}>{employee.user?.nameAr}</option>)}</select><input name="baseSalary" type="number" min="0" required className={inputClass} placeholder="الراتب الأساسي" /><div className="grid grid-cols-3 gap-2"><input name="allowances" type="number" min="0" className={inputClass} placeholder="بدلات" /><input name="overtimeAmount" type="number" min="0" className={inputClass} placeholder="إضافي" /><input name="deductions" type="number" min="0" className={inputClass} placeholder="استقطاعات" /></div><button disabled={saving} className="w-full rounded-xl bg-[#183866] py-2.5 text-sm font-bold text-white">احتساب وحفظ</button></form></Panel></div></div>}
      </>}
    </div>
  </main>;
}
