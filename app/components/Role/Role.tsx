"use client";
import { useState } from "react";
// import { Oval } from "react-loader-spinner";
import Image from "next/image";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function Role() {
    const { t, mounted } = useTranslationSetup();

    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState<"Customer" | "Owner">("Customer");

    const handleStart = () => role === "Owner" ? window.location.href = "/role-restaurant-or-coffee" : window.location.href = "/register-pages/new-account";

    return (
        <section>
            <div className="w-full h-full pb-[4%] flex flex-col items-center justify-center text-center bg-[#F8F5F9]">
                <div className="container">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <Image
                            src="/assets/icons/logo-navbar.png"
                            alt="logo"
                            className="mt-[-10px]"
                            width={180}
                            height={160}
                        />
                    </div>

                    {/* Title */}
                    <div className="mt-5 md:mt-0 flex flex-col justify-center items-center gap-5 md:gap-10">
                        <p className="text-[var(--color-red)] text-3xl md:text-6xl font-semibold mt-[-50px]">
                            {mounted ? t("choose-register") : '...'}
                        </p>

                        {/* Description */}
                        <p className="text-[16px] md:text-[22px] w-full md:w-[70%] text-[rgba(85,85,85,0.38)] font-normal leading-normal">
                            {mounted ? t("join-choose-register") : '...'}
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="my-5 md:my-15 flex gap-[25px] md:gap-[90px] flex-wrap justify-center">

                        {/* Customer */}
                        <div onClick={() => setRole("Customer")}
                            className={`w-full md:w-[360px] py-3 rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Customer"
                                    ? "border-4 border-[var(--color-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <Image src="/assets/icons/iconUser.png" width={124} height={30} alt="icon user" className="object-cover" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Customer" ? "text-[var(--color-active-choose)]" : "text-black"}`}>
                                {mounted ? t("customer") : '...'}
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                {mounted ? t("log-up") : '...'}
                            </p>
                        </div>

                        {/* Business Owner */}
                        <div onClick={() => setRole("Owner")}
                            className={`w-full md:w-[360px] py-3 rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Owner"
                                    ? "border-4 border-[var(--color-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <Image src="/assets/icons/onerIcon.png" width={124} height={30} alt="icon user" className="object-cover" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Owner" ? "text-[var(--color-active-choose)]" : "text-black"}`}>
                                {mounted ? t("owner") : '...'}
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                {mounted ? t("log-up-owner") : '...'}
                            </p>
                        </div>

                    </div>

                    {/* Start Button */}
                    <button disabled={isLoading}
                        onClick={() => {
                            setIsActive(true);
                            handleStart();
                        }} className="w-full md:w-[360px] cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-2 py-3 rounded-xl">{mounted ? t("start-now") : '...'}</button>

                    {/* Loader Overlay */}
                    {isLoading && (
                        <div className="fixed inset-0 bg-[rgba(22,22,22,0.3)] flex items-end justify-center pb-[5%]">
                            {/* <Oval height={60} width={60} color="#E22023" /> */}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}