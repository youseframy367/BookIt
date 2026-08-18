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

    try {
      // ملاحظة: عدّل مسار التحقق حسب الـ API الخاص بك
      await api.post("/verify-code", { code });

      setTimeout(() => setPop(true), 600);
    } catch (err) {
      console.error(err);
      toast.error("فشل التحقق من الرمز ❌");
      setClick(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[url('/assets/webp/bg-otp.webp')] bg-cover bg-center">

      {/* Popup */}
      {pop && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="flex h-auto w-[90%] sm:w-[50%] md:w-[40%] flex-col items-center justify-around gap-4 rounded-xl bg-white p-5 shadow-xl">
            <img src="/imgBegScren/Group 40861.png" alt="success" />
            <div className="text-center">
              <p className="text-[17px] font-medium text-[#1C1C1C]">
                Your account has been created successfully
              </p>
              <p className="mt-1 text-[15px] text-[#74727280]">
                Please wait a few minutes, your account is being activated.
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
              <Image src="/assets/icons/close.png" alt="back" fill />
            </div>
          </button>
        </div>

        {/* Logo */}
        <Image
          src="/assets/icons/logo-navbar.png"
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
