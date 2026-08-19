"use client";
import { useState, useRef, useEffect } from "react";
// import { Oval } from "react-loader-spinner";
import Image from "next/image";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function VerificationCodeNewAcount() {
  const [click, setClick] = useState(false);
  const [pop, setPop] = useState(false);
  const [active, setActive] = useState(false);
  const inputsRef = useRef([]);

  // Popup auto close
  useEffect(() => {
    if (pop) {
      const timer = setTimeout(() => {
        setPop(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [pop]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      e.target.value = value;
      if (value && index < 5) inputsRef.current[index + 1].focus();

      const code = inputsRef.current.map((i) => i.value).join("");
      setActive(code.length === 6);
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    if (!active) return;
    setClick(true);

    const code = inputsRef.current.map((i) => i.value).join("");
    /* الإيميل محفوظ من صفحة إنشاء الحساب السابقة */
    const email = sessionStorage.getItem("reset_email") || "";

    try {
      /* === التحقق من كود OTP (الغرض: email_verification) === */
      await api.post("/auth/otp/verify", {
        email,
        code,
        purpose: "email_verification",
      });

      toast.success("تم التحقق من الإيميل بنجاح ✅");
      setTimeout(() => setPop(true), 600);
      /* بعد التحقق: تسجيل دخول تلقائي والتوجه للصفحة الرئيسية
         (كلمة المرور محفوظة مؤقتاً في sessionStorage من صفحة إنشاء الحساب) */
      const tmpPassword = sessionStorage.getItem("tmp_password") || "";
      if (tmpPassword) {
        const { data } = await api.post("/auth/login", { email, password: tmpPassword });
        const { accessToken, refreshToken, user } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
      }
      /* تنظيف البيانات المؤقتة */
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("tmp_password");
      setTimeout(() => (window.location.href = "/home"), 3500);
    } catch (err) {
      console.error(err);
      toast.error("الكود غير صحيح أو انتهت صلاحيته ❌");
      setClick(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[url('/media/platform/auth/otp-background.webp')] bg-cover bg-center">

      {/* Popup */}
      {pop && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="flex h-auto w-[90%] sm:w-[50%] md:w-[40%] flex-col items-center justify-around gap-4 rounded-xl bg-white p-5 shadow-xl">
            <img src="/imgBegScren/Group 40861.png" alt="success" />
            <div className="text-center">
              <p className="text-[17px] font-medium text-[#1C1C1C]">
                تم إنشاء حسابك بنجاح وتم التحقق من بريدك ✅
              </p>
              <p className="mt-1 text-[15px] text-[#74727280]">
                جارٍ تسجيل الدخول تلقائياً والانتقال للصفحة الرئيسية...
              </p>
            </div>            
            {/* <Oval height={40} width={40} color="#E22023" /> */}
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="flex h-auto w-[92%] md:w-[781px] flex-col items-center rounded-xl bg-white px-[33px] py-[40px] shadow-lg">

        {/* Back */}
        <div className="w-full flex justify-end">
          <button
            className="border-none outline-none"
          >
            {/* onClick={() => navigate("/login")} */}
            <div className="w-[20px] h-[20px] relative">
              <Image src="/media/shared/icons/close.png" alt="back" fill />
            </div>
          </button>
        </div>

        {/* Logo */}
        <Image
          src="/media/shared/icons/logo-navbar.png"
          width={80}
          height={70}
          className="-mt-2"
          alt="logo"
        />

        {/* Title */}
        <p className="mt-4 text-[30px] font-semibold leading-[38px] text-[#2B2F38]">
          Verification Code
        </p>

        {/* Subtitle */}
        <p className="text-[#667085]">
          You will receive a 6-digit verification code
        </p>

        {/* Code Inputs */}
        <div className="mt-5 mb-5 flex justify-center gap-[60px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-[50px] w-[40px] rounded-lg border-2 border-[#8d8989ff] text-center text-2xl font-semibold outline-none focus:border-[#E22023]"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          disabled={!active || click}
          onClick={handleVerify}
          className={`mt-2 w-[90%] rounded-md px-5 py-2 text-base font-medium text-white transition
            ${active
              ? "bg-[#E22023] hover:bg-red-600"
              : "cursor-not-allowed bg-black/50"
            }`}
        >
          Send Code
        </button>
      </div>
    </div>
  );
}
