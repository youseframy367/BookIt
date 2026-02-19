"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";
import { useAuthFlow } from "@/app/(main)/context/AuthFlowContext";

export default function ForgetPassword() {
  const { setFromPage } = useAuthFlow();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setFromPage("forgot");
      router.push("/otp-register-or-login");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section dir="rtl">
      <LayoutLoginAndRegister isActiveLogo={false} width="md:w-[450px]" onSubmit={handleLogin} bg='bg-otp-mobile.png'>
        <div className="font-cairo mt-10 w-full flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-xl font-semibold">نسيت كلمة المرور ؟</h2>
            {/* {mounted ? t('forgot-password') : '...'} */}
            <span className="text-[var(--color-text-login)] font-normal text-base">لا تقلق، سنساعدك في إعادة تعيين كلمة المرور الخاصة بك.</span>
            {/* {mounted ? t('dont-worry') : '...'} */}
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col w-full gap-2 mb-2 mt-2">
              <label
                htmlFor="Email"
                className="text-[var(--color-label-input)] text-sm font-medium"
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
                className="text-[var(--color-input)] px-3 py-2 border border-1 border-[var(--color-navbar)] rounded-lg"
              />
              {/* {mounted ? t('enter-email') : 'Enter your email'} */}
            </div>
          </div>
          <Submit title="ارسال" width="w-full" loading={loading} />
          {/* {mounted ? t("Send") : '...'} */}
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
