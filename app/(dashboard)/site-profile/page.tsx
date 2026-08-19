/* ============================================================
   بيانات موقع النشاط
   ------------------------------------------------------------
   الصفحة التي يدخل منها صاحب المطعم أو الكافيه البيانات التي
   ستظهر في القالب العام: الهوية، التواصل، التوصيل والسياسات.
   لا تحفظ أي بيانات داخلية أو حساسة للموقع العام.
   ============================================================ */
import { FormEvent, useCallback, useEffect, useState } from "react";
import { FiAlertCircle, FiCheck, FiGlobe, FiImage, FiMapPin, FiRefreshCw, FiSave, FiTruck } from "react-icons/fi";
import { getErrorMessages, siteProfileApi } from "@/utils/api";

type FormState = {
  templateKey: string; displayName: string; tagline: string; about: string;
  logoUrl: string; coverImageUrl: string; whatsapp: string; publicPhone: string; workingHours: string; mapUrl: string;
  facebook: string; instagram: string; tiktok: string; x: string;
  deliveryEnabled: boolean; deliveryFee: string; minimumOrder: string; estimatedMinutes: string; pickupEnabled: boolean;
  orderingPolicy: string; deliveryPolicy: string; reservationsPolicy: string; privacyPolicy: string;
  seoTitle: string; seoDescription: string; isPublished: boolean;
};

const emptyForm: FormState = {
  templateKey: "cafe-classic", displayName: "", tagline: "", about: "", logoUrl: "", coverImageUrl: "", whatsapp: "", publicPhone: "", workingHours: "", mapUrl: "",
  facebook: "", instagram: "", tiktok: "", x: "", deliveryEnabled: false, deliveryFee: "", minimumOrder: "", estimatedMinutes: "", pickupEnabled: true,
  orderingPolicy: "", deliveryPolicy: "", reservationsPolicy: "", privacyPolicy: "", seoTitle: "", seoDescription: "", isPublished: false,
};

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#183866] focus:ring-2 focus:ring-[#183866]/10";
const toNumber = (value: string) => value.trim() === "" ? undefined : Number(value);

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-sm font-semibold text-slate-700">{label}</span>{hint && <span className="block text-xs leading-5 text-slate-400">{hint}</span>}{children}</label>;
}

export default function SiteProfilePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const { data } = await siteProfileApi.me();
      const delivery = data?.deliverySettings || {}; const policies = data?.sitePolicies || {}; const seo = data?.seo || {}; const social = data?.socialLinks || {};
      setForm({
        ...emptyForm, ...data,
        facebook: social.facebook || "", instagram: social.instagram || "", tiktok: social.tiktok || "", x: social.x || "",
        deliveryEnabled: Boolean(delivery.enabled), deliveryFee: delivery.fee === undefined ? "" : String(delivery.fee), minimumOrder: delivery.minimumOrder === undefined ? "" : String(delivery.minimumOrder), estimatedMinutes: delivery.estimatedMinutes === undefined ? "" : String(delivery.estimatedMinutes), pickupEnabled: delivery.pickupEnabled !== false,
        orderingPolicy: policies.ordering || "", deliveryPolicy: policies.delivery || "", reservationsPolicy: policies.reservations || "", privacyPolicy: policies.privacy || "",
        seoTitle: seo.title || "", seoDescription: seo.description || "", isPublished: Boolean(data?.isPublished),
      });
    } catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    try {
      await siteProfileApi.update({
        templateKey: form.templateKey, displayName: form.displayName.trim(), tagline: form.tagline.trim() || undefined, about: form.about.trim() || undefined,
        logoUrl: form.logoUrl.trim() || undefined, coverImageUrl: form.coverImageUrl.trim() || undefined, whatsapp: form.whatsapp.trim() || undefined, publicPhone: form.publicPhone.trim() || undefined, workingHours: form.workingHours.trim() || undefined, mapUrl: form.mapUrl.trim() || undefined,
        socialLinks: Object.fromEntries(Object.entries({ facebook: form.facebook, instagram: form.instagram, tiktok: form.tiktok, x: form.x }).filter(([, value]) => value.trim())),
        deliverySettings: { enabled: form.deliveryEnabled, fee: toNumber(form.deliveryFee), minimumOrder: toNumber(form.minimumOrder), estimatedMinutes: toNumber(form.estimatedMinutes), pickupEnabled: form.pickupEnabled },
        sitePolicies: { ordering: form.orderingPolicy.trim() || undefined, delivery: form.deliveryPolicy.trim() || undefined, reservations: form.reservationsPolicy.trim() || undefined, privacy: form.privacyPolicy.trim() || undefined },
        seo: { title: form.seoTitle.trim() || undefined, description: form.seoDescription.trim() || undefined }, isPublished: form.isPublished,
      });
      setNotice("تم حفظ بيانات موقعك. ستظهر البيانات المنشورة في القالب المرتبط بنشاطك.");
      await load();
    } catch (requestError) { setError(getErrorMessages(requestError)[0]); }
    finally { setSaving(false); }
  };

  return <main dir="rtl" className="min-h-screen bg-[#f6f8fc] px-3 py-5 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <header className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#183866] p-5 text-white shadow-lg sm:flex-row sm:items-end sm:justify-between sm:p-7">
      <div><p className="mb-2 text-xs font-medium text-blue-100">المطعم أو الكافيه الخاص بك</p><h1 className="text-2xl font-bold sm:text-3xl">بيانات الموقع الإلكتروني</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">كل ما يحتاجه العميل ليرى نشاطك ويتواصل معك ويطلب التوصيل، دون عرض بياناتك الداخلية.</p></div>
      <button onClick={() => void load()} disabled={loading || saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#183866] transition hover:bg-blue-50 disabled:opacity-60"><FiRefreshCw className={loading ? "animate-spin" : ""} /> تحديث</button>
    </header>
    {error && <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><FiAlertCircle />{error}</div>}
    {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700"><FiCheck />{notice}</div>}
    {loading ? <div className="grid gap-5 md:grid-cols-2"><div className="h-80 animate-pulse rounded-2xl bg-slate-200" /><div className="h-80 animate-pulse rounded-2xl bg-slate-200" /></div> : <form onSubmit={save} className="space-y-5">
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(24,56,102,0.06)] sm:p-6"><div className="mb-5 flex items-start gap-3"><span className="rounded-xl bg-blue-50 p-2.5 text-[#183866]"><FiGlobe /></span><div><h2 className="font-bold text-[#183866]">الهوية والقالب</h2><p className="mt-1 text-xs text-slate-500">اختر شكل موقعك ثم أضف الاسم والوصف اللذين يظهران للزوار.</p></div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Field label="نوع الموقع والقالب"><select className={inputClass} value={form.templateKey} onChange={(event) => updateField("templateKey", event.target.value)}><option value="cafe-classic">كافيه — كلاسيكي دافئ</option><option value="cafe-modern">كافيه — حديث وبسيط</option><option value="cafe-dark">كافيه — داكن ومميز</option><option value="restaurant-elegant">مطعم — أنيق</option><option value="restaurant-family">مطعم — عائلي</option><option value="restaurant-modern">مطعم — حديث</option></select></Field>
        <Field label="اسم النشاط"><input required maxLength={150} className={inputClass} value={form.displayName} onChange={(event) => updateField("displayName", event.target.value)} placeholder="مثال: كافيه البن" /></Field>
        <Field label="عبارة تعريفية"><input maxLength={180} className={inputClass} value={form.tagline} onChange={(event) => updateField("tagline", event.target.value)} placeholder="قهوة مختصة طوال اليوم" /></Field>
        <Field label="رابط الشعار" hint="ضع رابط صورة منشورة فقط"><input inputMode="url" maxLength={500} className={inputClass} value={form.logoUrl} onChange={(event) => updateField("logoUrl", event.target.value)} placeholder="https://…" /></Field>
        <Field label="رابط صورة الغلاف" hint="يظهر في رأس القالب"><input inputMode="url" maxLength={500} className={inputClass} value={form.coverImageUrl} onChange={(event) => updateField("coverImageUrl", event.target.value)} placeholder="https://…" /></Field>
        <Field label="حالة الموقع"><select className={inputClass} value={form.isPublished ? "published" : "draft"} onChange={(event) => updateField("isPublished", event.target.value === "published")}><option value="draft">مسودة — لا يظهر الملف العام</option><option value="published">منشور — يظهر للزوار</option></select></Field>
      </div><Field label="نبذة عن النشاط"><textarea maxLength={5000} rows={4} className={inputClass} value={form.about} onChange={(event) => updateField("about", event.target.value)} placeholder="اكتب قصة قصيرة عن المطعم أو الكافيه وما يميزه…" /></Field></section>
      <section className="grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6"><div className="mb-5 flex items-start gap-3"><span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700"><FiMapPin /></span><div><h2 className="font-bold text-[#183866]">التواصل والموقع</h2><p className="mt-1 text-xs text-slate-500">يظهر لزوار الموقع فقط ما تضيفه هنا.</p></div></div><div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2"><Field label="واتساب الطلبات"><input maxLength={40} className={inputClass} value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="2010…" /></Field><Field label="هاتف للظهور بالموقع"><input maxLength={40} inputMode="tel" className={inputClass} value={form.publicPhone} onChange={(event) => updateField("publicPhone", event.target.value)} placeholder="2010…" /></Field></div><Field label="ساعات العمل"><input maxLength={300} className={inputClass} value={form.workingHours} onChange={(event) => updateField("workingHours", event.target.value)} placeholder="يومياً من 8 ص إلى 12 م" /></Field><Field label="رابط الخريطة"><input inputMode="url" maxLength={500} className={inputClass} value={form.mapUrl} onChange={(event) => updateField("mapUrl", event.target.value)} placeholder="رابط Google Maps" /></Field><div className="grid gap-3 sm:grid-cols-2"><Field label="Facebook"><input inputMode="url" className={inputClass} value={form.facebook} onChange={(event) => updateField("facebook", event.target.value)} placeholder="https://…" /></Field><Field label="Instagram"><input inputMode="url" className={inputClass} value={form.instagram} onChange={(event) => updateField("instagram", event.target.value)} placeholder="https://…" /></Field><Field label="TikTok"><input inputMode="url" className={inputClass} value={form.tiktok} onChange={(event) => updateField("tiktok", event.target.value)} placeholder="https://…" /></Field><Field label="X"><input inputMode="url" className={inputClass} value={form.x} onChange={(event) => updateField("x", event.target.value)} placeholder="https://…" /></Field></div></div></div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6"><div className="mb-5 flex items-start gap-3"><span className="rounded-xl bg-amber-50 p-2.5 text-amber-700"><FiTruck /></span><div><h2 className="font-bold text-[#183866]">التوصيل والاستلام</h2><p className="mt-1 text-xs text-slate-500">تظهر هذه الإعدادات في شاشة الطلب بالقالب العام.</p></div></div><div className="space-y-4"><label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">تفعيل التوصيل<input type="checkbox" checked={form.deliveryEnabled} onChange={(event) => updateField("deliveryEnabled", event.target.checked)} /></label><div className="grid gap-3 sm:grid-cols-3"><Field label="رسوم التوصيل"><input min="0" type="number" className={inputClass} value={form.deliveryFee} onChange={(event) => updateField("deliveryFee", event.target.value)} /></Field><Field label="الحد الأدنى"><input min="0" type="number" className={inputClass} value={form.minimumOrder} onChange={(event) => updateField("minimumOrder", event.target.value)} /></Field><Field label="دقائق الوصول"><input min="1" type="number" className={inputClass} value={form.estimatedMinutes} onChange={(event) => updateField("estimatedMinutes", event.target.value)} /></Field></div><label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">السماح بالاستلام من الفرع<input type="checkbox" checked={form.pickupEnabled} onChange={(event) => updateField("pickupEnabled", event.target.checked)} /></label></div></div></section>
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6"><div className="mb-5 flex items-start gap-3"><span className="rounded-xl bg-violet-50 p-2.5 text-violet-700"><FiImage /></span><div><h2 className="font-bold text-[#183866]">السياسات والظهور في البحث</h2><p className="mt-1 text-xs text-slate-500">أضف فقط النصوص التي تريد نشرها لزوار موقعك.</p></div></div><div className="grid gap-4 lg:grid-cols-2"><Field label="سياسة الطلب"><textarea rows={3} maxLength={5000} className={inputClass} value={form.orderingPolicy} onChange={(event) => updateField("orderingPolicy", event.target.value)} /></Field><Field label="سياسة التوصيل"><textarea rows={3} maxLength={5000} className={inputClass} value={form.deliveryPolicy} onChange={(event) => updateField("deliveryPolicy", event.target.value)} /></Field><Field label="سياسة الحجوزات"><textarea rows={3} maxLength={5000} className={inputClass} value={form.reservationsPolicy} onChange={(event) => updateField("reservationsPolicy", event.target.value)} /></Field><Field label="سياسة الخصوصية"><textarea rows={3} maxLength={5000} className={inputClass} value={form.privacyPolicy} onChange={(event) => updateField("privacyPolicy", event.target.value)} /></Field><Field label="عنوان نتيجة البحث"><input maxLength={150} className={inputClass} value={form.seoTitle} onChange={(event) => updateField("seoTitle", event.target.value)} /></Field><Field label="وصف نتيجة البحث"><textarea rows={2} maxLength={300} className={inputClass} value={form.seoDescription} onChange={(event) => updateField("seoDescription", event.target.value)} /></Field></div></section>
      <div className="sticky bottom-3 flex justify-end"><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#183866] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#102b51] disabled:opacity-60"><FiSave />{saving ? "جارٍ الحفظ…" : "حفظ بيانات الموقع"}</button></div>
    </form>}
  </div></main>;
}
