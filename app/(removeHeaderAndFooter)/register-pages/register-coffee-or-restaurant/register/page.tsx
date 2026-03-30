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

export default function Register() {
    const { setFromPage } = useAuthFlow();

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            setFromPage("register");
            router.push("/otp-register-or-login");
        } catch (err: any) {
            toast.error(err.response.data.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section dir="rtl">
            <LayoutLoginAndRegister isActiveLogo={false} width="md:w-[450px]" onSubmit={handleLogin} bg='bg-login.svg'>
                <div className="font-cairo mt-10 w-full flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[16px]">
                        <h2 className="text-xl font-semibold">مرحبًا بك <span className="text-2xl movementHasn">👋</span></h2>
                        {/* {mounted ? t('welcome-you') : '...'} */}
                        {/* "welcome-you": "مرحبًا بك", */}
                        {/* "welcome-you": "Welcome You", */}
                        <span className="text-[var(--color-gray-medium)] font-normal text-base">مرحبا بك في BOOK IN لادارة حجوزاتك، انشئ متجرك الان</span>
                        {/* {mounted ? t('welcome-you-register') : '...'} */}
                        {/* "welcome-you-register": "مرحبا بك في BOOK IN لادارة حجوزاتك، انشئ متجرك الان", */}
                        {/* "welcome-you-register": "Welcome to BOOK IN, please register to manage your reservations", */}
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
                                htmlFor=""
                                className="text-[var(--color-black)] text-sm font-medium"
                            >
                                كلمة المرور
                                {/* {mounted ? t('password') : '...'} */}
                            </label>
                            <input
                                type="password"
                                placeholder="أدخل كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
                            />
                            {/* {mounted ? t('enter-password') : 'Enter your password'} */}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col w-full gap-2">
                            <label
                                htmlFor=""
                                className="text-[var(--color-black)] text-sm font-medium"
                            >
                                تأكيد كلمة المرور
                                {/* {mounted ? t('confirm-password') : '...'} */}
                            </label>
                            <input
                                type="password"
                                placeholder="أدخل كلمة المرور"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="text-[var(--color-black-light)] px-3 py-2 border border-1 border-[var(--gray)] rounded-lg"
                            />
                            {/* placeholder={mounted ? t('enter-password') : 'Enter your password'} */}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="my-4">
                            <Submit title="استكمال خطوات انشاء الحساب" width="w-full" loading={loading} />
                            {/* "continue-new-account": "Completing the account creation steps", */}
                            {/* {mounted ? t("continue-new-account") : '...'} */}
                            {/* "continue-new-account": "استكمال خطوات انشاء الحساب", */}
                        </div>
                        <span className="font-normal text-center">هل لديك حساب ؟ <Link href="/login/login-coffee-or-restaurant/login" className="text-[var(--color-dark-blue-gray)]">تسجيل الدخول</Link></span>
                    </div>
                </div>
                <ToastContainer />
            </LayoutLoginAndRegister>
        </section>
    );
}
