"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../../components/public/Submit";
import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function ForgetPassword() {
  const { t, mounted } = useTranslationSetup();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /* === إرسال كود OTP لإعادة التعيين (الباك يبعث كود صالح 10 دقائق) === */
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      /* نحفظ الإيميل للخطوة التالية (verification-code + creat-new-password) */
      sessionStorage.setItem("reset_email", email);
      await api.post("/auth/password/forgot", { email });
      router.push("/login/verification-code");
      toast.success("تم إرسال كود التحقق إلى بريدك ✅");
    } catch (err: any) {
      /* ملاحظة: الباك بيرد رسالة موحدة حتى لا يكشف وجود الإيميل */
      toast.error("تعذر إرسال الكود — تأكد من البريد الإلكتروني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleSendCode} bg='webp/select.webp'>

        {/* Titles */}
        <p className="text-[#2B2F38] text-xl md:text-2xl font-semibold mt-4 mb-1">
          {mounted ? t("forgot-password") : '...'}
        </p>
        <p className="text-center mt-[5px] md:mt-[12px] text-[#667085] text-sm md:text-md leading-6">
          {mounted ? t("dont-worry") : '...'}
        </p>

        {/* Email Input */}
        <div className="text-xs md:text-sm flex flex-col w-full md:w-[90%] gap-2 my-3">
          <label htmlFor="Email" className="text-[#48505E] font-medium">
            {mounted ? t("email") : '...'}
          </label>
          <input
            type="email"
            id="Email"
            placeholder={mounted ? t("enter-email") : '...'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
          />
        </div>

        {/* Send Code Button */}
        <div className="my-4 w-full md:w-[90%]">
          <Submit title={mounted ? t("send-code") : '...'} width="w-full" loading={loading} />
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
