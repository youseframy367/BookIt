/* ============================== صفحة التواصل — داتا حقيقية ==============================
   POST /api/public/inquiries → {name,email,phone,altPhone,subject/message}
   عند النجاح: رسالة تأكيد، عند الفشل: toast خطأ
   ============================================================================ */
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import { publicApi } from "@/utils/api";

export default function Content() {
    const { i18n, t, mounted } = useTranslationSetup();
    const [form, setForm] = useState({ name: "", email: "", phone: "", altPhone: "", subject: "" });
    const [sending, setSending] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.subject) {
            toast.error(mounted ? "يرجى ملء الاسم والإيميل والموضوع" : "Please fill name, email and subject");
            return;
        }
        setSending(true);
        try {
            await publicApi.submitInquiry({
                name: form.name,
                email: form.email,
                phone: form.phone,
                altPhone: form.altPhone,
                message: form.subject,
            });
            toast.success(mounted ? "تم إرسال استفسارك بنجاح" : "Inquiry sent successfully");
            setForm({ name: "", email: "", phone: "", altPhone: "", subject: "" });
        } catch (err) {
            console.error(err);
            toast.error(mounted ? "فشل إرسال الاستفسار، حاول مرة أخرى" : "Failed to send inquiry");
        } finally {
            setSending(false);
        }
    };

    return (
        <section>
            <div className="mt-10">
                <div className="container">
                    <div className="flex flex-col gap-2 md:gap-5">
                        <h2 className="font-semibold text-2xl md:text-[44px]"><span className="text-[var(--strong-red)]">{mounted ? t('Connect') : '...'}</span> {mounted ? t('with-us') : '...'}</h2>
                        <span className="text-[var(--color-gray-medium-transparent)] text-md md:text-3xl font-normal">{mounted ? t('fill-out') : '...'}</span>
                    </div>
                    <div className="p-5 md:p-10 mt-5 md:mt-15 border border-6 border-[var(--color-gray-faint-transparent)] rounded-2xl shadow-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--slate-gray)] text-base font-medium">
                                                {mounted ? t('name') : '...'}
                                            </label>
                                            <input type="text" required value={form.name} onChange={set("name")} className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-name') : '...'} />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--slate-gray)] text-base font-medium">
                                                {mounted ? t('email') : '...'}
                                            </label>
                                            <input type="email" required value={form.email} onChange={set("email")} className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-email') : '...'} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--slate-gray)] text-base font-medium">
                                                {mounted ? t('phone-number') : '...'}
                                            </label>
                                            <input type="number" value={form.phone} onChange={set("phone")} className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-number') : '...'} />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--slate-gray)] text-base font-medium">
                                                {mounted ? t('enter-number-2') : '...'}
                                            </label>
                                            <input type="number" value={form.altPhone} onChange={set("altPhone")} className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('please-enter-number-2') : '...'} />
                                        </div>
                                    </div>
                                    <div className="w-full relative flex flex-col gap-3">
                                        <label className="text-[var(--slate-gray)] text-base font-medium">
                                            {mounted ? t('subject') : '...'}
                                        </label>
                                        <textarea required value={form.subject} onChange={set("subject")} className="resize-none w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:px-5 md:py-7 h-[300px]" placeholder={mounted ? t('enter-subject') : '...'}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="relative flex gap-5 rounded-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px]">
                                    <input value={mounted ? (sending ? "..." : t('Send')) : '...'} type="submit" disabled={sending} className="text-[var(--slate-gray)] ps-5 pe-13 py-3 cursor-pointer disabled:opacity-50" />
                                    <Image src="/assets/icons/arrow-up.svg" alt="arraw up" width={20} height={20} className={`absolute ${mounted ? i18n.language === 'ar' ? "left-6 rotate-[-75deg]" : "right-6" : ""} top-[13px]`} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}