"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import api from "@/utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";
import Link from "next/link";
import { useAuthFlow } from "@/app/(main)/context/AuthFlowContext";

export default function LogAcountCoffeeOrResturant() {
  const { setFromPage } = useAuthFlow();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFromPage("signIn");
      router.push("/otp-register-or-login");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section dir="rtl">
      <LayoutLoginAndRegister isActiveLogo={false} width="md:w-[450px]" onSubmit={handleLogin} bg='webp/bg-login.webp'>
        <div className="font-cairo mt-10 w-full flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-xl font-semibold">مرحبًا بك <span className="text-2xl movementHasn">👋</span></h2>
            {/* <h2 className="text-xl font-semibold">{mounted ? t('welcome-you') : '...'} <span className="text-2xl movementHasn">👋</span></h2> */}
            <span className="text-[var(--color-gray-medium)] font-normal text-base">مرحبا بك في BOOK IN ، سجّل الدخول الان</span>
            {/* {mounted ? t('welcome-you-login') : '...'} */}
            {/* "welcome-you-login": "Welcome to BOOK IN, please log in", */}
            {/* "welcome-you-login": "مرحبا بك في BOOK IN ، سجّل الدخول الان", */}
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col w-full gap-2 mb-2 mt-2">
              <label
                htmlFor="Email"
                className="text-[var(--color-black)] text-sm font-medium"
              >
                البريد الإلكتروني
                {/* {mounted ? t('email') : '...'} */}
              </label>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                required
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
              />
              {/* {mounted ? t('enter-email') : 'Enter your email'} */}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="Password"
                className="text-[var(--color-black)] text-sm font-medium"
              >
                كلمة المرور
                {/* {mounted ? t('password') : '...'} */}
              </label>
              <input
                type="password"
                placeholder="أدخل كلمة المرور"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
              />
              {/* {mounted ? t('enter-password') : 'Enter your password'} */}
            </div>
          </div>
          <div className="flex justify-between gap-5 md:gap-0">
            <div className="flex items-center gap-2 items-center">
              <input type="checkbox" id="activ" />
              <label htmlFor="activ" className="text-sm font-medium cursor-pointer">
                تذكّرني
                {/* {mounted ? t("remeber-my") : '...'} */}
                {/* "remeber-my": "Remember me", */}
                {/* "remeber-my": "تذكّرني", */}
              </label>
            </div>

            <p
              className="text-[var(--color-dark-blue-gray)] underline text-sm font-medium cursor-pointer"
              onClick={() => router.push("/login/login-coffee-or-restaurant/forget-password")}
            >
              نسيت كلمة المرور ؟
              {/* {mounted ? t("forgot-password") : '...'} */}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="my-4">
              <Submit title="تسجيل الدخول" width="w-full" loading={loading} />
              {/* {mounted ? t("sign-in") : '...'} */}
            </div>
            <span className="font-normal text-center">ليس لديك حساب ؟ <Link href="/register-pages/register-coffee-or-restaurant/register" className="text-[var(--color-dark-blue-gray)]">انشئ حساب</Link></span>
          </div>
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
