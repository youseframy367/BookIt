"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Submit from "@/app/components/public/Submit";

export default function VerificationCode() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [active, setActive] = useState(false);

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

  const handleVerify = async () => {
    setClick(true);

    const code = inputsRef.current.map((input) => input?.value || "").join("");

    if (code.length !== 6) {
      alert("Please enter all 6 digits");
      setClick(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Invalid code");

      const result = await response.json();
      console.log("Verification success:", result);

      alert("Code verified successfully!");
      window.location.href = "/login/creat-new-password";
      // router.push("/new-password");
    } catch (error) {
      console.error(error);
      alert("Invalid or expired code");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="fixed inset-0 flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/icons/bg-otp.png')" }}
      >
        <div className="container flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-full md:w-[781px] h-[637px] p-10 bg-white rounded-lg shadow-md">
            {/* Back Button */}
            <div className="w-full flex justify-end">
              <button
                className="border-none outline-none"
                onClick={() => router.back()}
              >
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

            {/* Titles */}
            <p className="text-[#2B2F38] text-2xl font-semibold mt-4 mb-1">
              Verification Code
            </p>
            <p className="text-[#667085] text-sm leading-6">
              You will receive a 6-digit verification code
            </p>

            {/* Code Inputs */}
            <div className="flex justify-center gap-14 my-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-xl font-semibold border-2 border-gray-400 rounded outline-none"
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
              <Submit title="Send Code" width="w-full" onSubmit={handleVerify} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
