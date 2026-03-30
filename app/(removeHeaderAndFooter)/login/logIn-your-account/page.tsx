"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Submit from "../../../components/public/Submit";
import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function LogAcount() {
  const { t, mounted, i18n } = useTranslationSetup();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/login", { email, password });
      router.push("/home");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister onSubmit={handleLogin} bg='bg-login.png'>

        {/* Titles */}
        <p className="text-[#2B2F38] text-xl md:text-2xl font-semibold mt-4">
          {mounted ? t("login") : '...'}
        </p>
        <p className="mt-[5px] md:mt-[12px] text-sm md:text-md text-[#667085] font-normal leading-6">
          {mounted ? t("welcome-back") : '...'}
        </p>

        <div className="mt-4 md:mt-0 w-full flex items-center flex-col gap-[13px]">
          <div className="flex flex-col w-full md:w-[90%] gap-3 my-2 text-xs md:text-sm">
            <label
              htmlFor="Email"
              className="text-[#48505E] font-medium"
            >
              {mounted ? t("email") : '...'}
            </label>
            <input
              type="email"
              placeholder={mounted ? t("enter-email") : '...'}
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-cairo p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="text-xs md:text-sm w-full md:w-[90%] flex flex-col gap-2">
            <label
              htmlFor="Password"
              className="text-[#48505E] font-medium"
            >
              {mounted ? t("password") : '...'}
            </label>
            <input
              type="password"
              placeholder={mounted ? t("enter-password") : '...'}
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-cairo p-2 border border-[#D0D5DD] rounded-lg shadow-sm outline-none"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <div className="my-4 w-full md:w-[90%]">
          <Submit title={mounted ? t("confirm") : '...'} width="w-full" loading={loading} />
        </div>

        {/* Remember & Forgot Password */}
        <div className="w-full md:w-[90%] flex justify-between gap-5 md:gap-0">
          <div className="flex items-center gap-4">
            <input type="checkbox" id="activ" />
            <label htmlFor="activ" className="text-[#48505E] text-xs md:text-sm font-medium cursor-pointer">
              {mounted ? t("remeber") : '...'}
            </label>
          </div>

          <p
            className="text-[#BF360C] text-xs md:text-sm font-medium cursor-pointer"
            onClick={() => router.push("/login/forget-bassword")}
          >
            {mounted ? t("forgot-password") : '...'}
          </p>
        </div>

        <p
          className="text-[#3a3838] text-sm font-normal mt-12 px-2 cursor-pointer"
          onClick={() => router.push("/register-pages/new-account")}
        >
          {mounted ? t("dont-have") : '...'}
          <span className="text-[var(--strong-red)] underline"> {mounted ? t("sign-up") : '...'}</span>
        </p>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
