"use client";
import { useState, useEffect } from "react";
import Submit from "@/app/components/public/Submit";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function CreateNewAccount() {
  const { t, mounted } = useTranslationSetup();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [click, setClick] = useState(false);
  const [activ, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && password && confirmPassword) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/register-pages", { email, password });
      router.push("/login/verification-code");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleSubmit} bg='webp/bg-login.webp'>

        <p className="text-[#2B2F38] text-xl md:text-2xl font-semibold mt-4">
          {mounted ? t("create-new-account") : '...'}
        </p>

        <p className="mt-[5px] md:mt-[12px] text-sm md:text-md text-[#667085] font-normal leading-6">
          {mounted ? t("change-your-passowrd") : '...'}
        </p>

        {/* Email */}
        <div className="flex flex-col w-full md:w-[90%] gap-2 mt-4 text-xs md:text-sm">
          <label className="font-medium text-[#48505E]">
            {mounted ? t("email") : '...'}
          </label>
          <input
            type="email"
            placeholder={mounted ? t("enter-email") : '...'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-cairo px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full md:w-[90%] gap-2 mt-3 text-xs md:text-sm">
          <label className="font-medium text-[#48505E]">
            {mounted ? t("password") : '...'}
          </label>
          <input
            type="password"
            placeholder={mounted ? t("enter-password") : '...'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col w-full md:w-[90%] gap-2 mt-3 text-xs md:text-sm">
          <label className="font-medium text-[#48505E]">
            {mounted ? t("confirm-password") : '...'}
          </label>
          <input
            type="password"
            placeholder={mounted ? t("enter-password") : '...'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="font-cairo px-3 py-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="my-4 w-full md:w-[90%]">
          <Submit title={mounted ? t("confirm") : '...'} width="w-full" loading={loading} />
        </div>

        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}