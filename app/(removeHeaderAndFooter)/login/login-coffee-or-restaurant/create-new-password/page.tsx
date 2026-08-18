"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";

export default function CreateNewPassword() {
  const { t, mounted } = useTranslationSetup();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await api.post("/login", { email, password });
      //   router.push("");
    } catch (err: any) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <LayoutLoginAndRegister isActiveLogo={false} width="md:w-[450px]" onSubmit={handleLogin} bg='webp/bg-login.webp'>
        <div className="mt-10 w-full flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <h2 className="text-xl font-semibold">انشاء كلمة مرور جديدة</h2>
            <span className="text-[var(--color-gray-medium)] font-normal text-base">تغير كلمة المرور الخاصه بك ادخل كلمة مرور قوية</span>
          </div>

          <div className="flex flex-col gap-[16px]">
            {/* Password */}
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="Password"
                className="text-[var(--color-black)] text-sm font-medium"
              >
                {mounted ? t('new-enter-password') : '...'}
              </label>
              <input
                type="password"
                placeholder={mounted ? t('enter-password') : '...'}
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="Password"
                className="text-[var(--color-black)] text-sm font-medium"
              >
                {mounted ? t('confirm-new-password') : '...'}
              </label>
              <input
                type="password"
                placeholder={mounted ? t('enter-password') : '...'}
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
              />
            </div>
          </div>
          <div className="my-4">
            <Submit title={mounted ? t("confirm") : '...'} width="w-full" loading={loading} />
          </div>
        </div>
        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
