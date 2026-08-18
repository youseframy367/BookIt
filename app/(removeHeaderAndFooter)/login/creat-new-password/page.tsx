"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Submit from "@/app/components/public/Submit";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function NewBassword() {
  const { t, mounted } = useTranslationSetup();

  const [click, setClick] = useState(false);
  /* === الإيميل والكود من خطوة التحقق السابقة (حُفظا في sessionStorage) === */
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [activ, setActive] = useState(false);

  useEffect(() => {
    /* نجلب الإيميل والكود اللذين تحققت منهما صفحة verification-code */
    const savedEmail = sessionStorage.getItem("reset_email") || "";
    const savedCode = sessionStorage.getItem("reset_code") || "";
    setEmail(savedEmail);
    setCode(savedCode);
  }, []);

  useEffect(() => {
    if (email !== "" && code !== "" && password !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, code, password]);

  /* === إعادة تعيين كلمة المرور: الباك يعيد التحقق من الكود ثم يحدّثها === */
  const handleSubmit = async () => {
    setClick(true);
    const data = { email, code, password };

    try {
      await api.post("/auth/password/reset", data);
      toast.success("تم تغيير كلمة المرور بنجاح ✅");
      /* مسح البيانات المؤقتة والعودة لتسجيل الدخول */
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_code");
      window.location.href = "/login/logIn-your-account";
    } catch (error: any) {
      console.error(error);
      toast.error("خطأ أثناء إعادة تعيين كلمة المرور ❌");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="h-screen flex flex-col justify-center bg-cover bg-center -z-1"
        style={{ backgroundImage: "url('/assets/webp/bg-new-password.webp')" }}
      >
        <div className="w-full h-full absolute bg-black opacity-[0.5]">
        </div>
        <div className="relative z-1 container flex flex-col justify-center items-center">
          <form action=""
            method=""
            onClick={handleSubmit} className="flex flex-col items-center w-[95%] md:w-[781px] h-auto md:h-[659px] p-6 md:p-10 bg-white rounded-lg">
            <div className="w-full flex justify-end">
              <button
                className="border-none outline-none"
              >
                <div className="w-[20px] h-[20px] relative">
                  <Image src="/assets/icons/close.png" alt="back" fill />
                </div>
              </button>
            </div>

            <Image
              src="/assets/icons/logo-navbar.png"
              width={80}
              height={70}
              className="-mt-2"
              alt="logo"
            />

            <p className="text-[#2B2F38] text-xl md:text-2xl font-semibold mt-4">
              {mounted ? t('create-new-password') : '...'}
            </p>

            <p className="text-center mt-[5px] md:mt-[12px] text-sm md:text-md text-[#667085] font-normal leading-6">
              {mounted ? t('change-your-passowrd') : '...'}
            </p>

            {/* كود التحقق (يظهر فقط إذا لم يكن محفوظاً بعد — حالة التنقل المباشر) */}
            {code === "" && (
              <div className="flex flex-col w-full md:w-[90%] gap-2 mt-4 text-xs md:text-sm">
                <label
                  htmlFor="Code"
                  className="text-[#48505E] font-medium"
                >
                  {mounted ? t('verification-code') : '...'}
                </label>
                <input
                  type="text"
                  placeholder={mounted ? t('enter-otp-code') : 'Enter OTP code'}
                  required
                  id="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-cairo p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col w-full md:w-[90%] gap-2 mt-4 text-xs md:text-sm">
              <label
                htmlFor="Email"
                className="text-[#48505E] font-medium"
              >
                {mounted ? t('email') : '...'}
              </label>
              <input
                type="email"
                placeholder={mounted ? t('enter-email') : 'Enter your email'}
                required
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-cairo p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full md:w-[90%] gap-2 mt-3 text-xs md:text-sm">
              <label
                htmlFor="Password"
                className="text-[#48505E] font-medium"
              >
                {mounted ? t('password') : '...'}
              </label>
              <input
                type="password"
                placeholder={mounted ? t('enter-password') : 'Enter your password'}
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-cairo p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
              />
            </div>

            <div className="my-4 w-full md:w-[90%]">
              <Submit title={mounted ? t('confirm') : '...'} width="w-full" loading={click} />
            </div>

          </form>
        </div>
      </div>
    </section >
  );
}