"use client";
import { useState, useRef } from "react";
import Submit from "@/app/components/public/Submit";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function VerificationCode() {
  const { t, mounted } = useTranslationSetup();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (/^[0-9]?$/.test(value)) {
      target.value = value;

      if (value && index < 5) inputsRef.current[index + 1]?.focus();

      const code = inputsRef.current.map((input) => input?.value || "").join("");
      setActive(code.length === 6);
    } else {
      target.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" && !target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputsRef.current.map((input) => input?.value || "").join("");
    setLoading(true);
    try {
      await api.post("/verify-reset-code", { code });
      // router.push("/login/verification-code");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleSendCode} bg='webp/bg-otp.webp'>
        {/* Titles */}
        <p className="text-[#2B2F38] text-2xl font-semibold mt-4 mb-1">
          {mounted ? t('verification-code') : '...'}
        </p>
        <p className="text-[#667085] text-sm leading-6">
          {mounted ? t('you-will-send-code') : '...'}
        </p>

        {/* Code Inputs */}
        <div className="flex justify-center gap-14 my-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="font-cairo w-10 h-12 text-center text-xl font-semibold border-2 border-gray-400 rounded outline-none"
              ref={(el: HTMLInputElement | null) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {/* Send Code Button */}
        <div className="my-4 w-[90%]">
          <Submit title={mounted ? t('send-code') : 'Send Code'} width="w-full" loading={loading} />
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section >
  );
}
