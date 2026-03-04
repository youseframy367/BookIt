"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";
import { useAuthFlow } from "@/app/(main)/context/AuthFlowContext";

export default function Otp() {
  const { fromPage } = useAuthFlow();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fromPage === "register") router.push("/register-pages/register-coffee-or-restaurant/register-your-product");

    if (fromPage === "signIn") router.push("/");

    if (fromPage === "forgot") router.push("/login/login-coffee-or-restaurant/forget-password")

    // setLoading(true);

    // try {
    //   const code = inputsRef.current
    //     .map((input) => input?.value ?? "")
    //     .join("");

    //   if (code.length !== 6) {
    //     toast.error("OTP code is incomplete");
    //     return;
    //   }

    //   if (fromPage === "register") {
    //     console.log("register");
    //   }

    //   if (fromPage === "forgot") {
    //     console.log("forgot");
    //     // verify login otp
    //   }

    //   // router.push("/");

    // } catch (err: any) {
    //   toast.error(err?.response?.data?.data || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    e.target.value = value;

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const code = inputsRef.current
      .map((input) => input?.value ?? "")
      .join("");

    setActive(code.length === 6);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <section dir="rtl">
      <LayoutLoginAndRegister
        isActiveLogo={false}
        width="w-full md:w-[450px]"
        onSubmit={handleLogin}
        bg='bg-otp-mobile.png'
      >
        <div className="font-cairo mt-10 w-full flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[12px] md:gap-[16px]">
            <h2 className="text-xl font-semibold">
              رمز التحقق
              {/* {mounted ? t("verification-code") : "..."} */}
            </h2>
            <span className="text-[var(--color-gray-medium)] font-normal text-base">
              ستتلقى رمز تحقق مكون من 6 أرقام
              {/* {mounted ? t("you-will-send-code") : "..."} */}
            </span>
          </div>

          <div dir="ltr" className="mt-5 mb-5 flex justify-center gap-[16px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-[50px] w-[50px] rounded-lg border-2 border-[var(--color-gray-light-transparent)] text-center text-2xl font-semibold outline-none focus:border-[#E22023]"
              />
            ))}
          </div>
          <Submit title="تاكيد" width="w-full" loading={loading} />
          {/* {mounted ? t('confirm') : 'Send Code'} */}
        </div>

        <ToastContainer />
      </LayoutLoginAndRegister>
    </section>
  );
}
