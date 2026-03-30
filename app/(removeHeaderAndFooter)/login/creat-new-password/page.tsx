"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Submit from "@/app/components/public/Submit";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function NewBassword() {
  const { t, mounted } = useTranslationSetup();

  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activ, setActive] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password]);

  const handleSubmit = async () => {
    setClick(true);

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Password changed successfully!");
      // navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
      setClick(false);
    }
  };

  return (
    <section>
      <div
        className="h-screen flex flex-col justify-center bg-cover bg-center -z-1"
        style={{ backgroundImage: "url('/assets/icons/bg-new-password.png')" }}
      >
        <div className="w-full h-full absolute bg-black opacity-[0.5] absolute">
        </div>
        <div className="relative z-1 container flex flex-col justify-center items-center">
          <form action=""
            method=""
            onClick={handleSubmit} className="flex flex-col items-center md:w-[781px] h-[659px] p-10 bg-white rounded-lg">
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
              <Submit title={mounted ? t('confirm') : '...'} width="w-full" />
            </div>

          </form>
        </div>
      </div>
    </section >
  );
}