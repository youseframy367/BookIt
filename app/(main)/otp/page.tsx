"use client";

import ContentDetailsCustomer from "../../components/DetailsCustomer/Content";
import Hero from "../../components/public/Hero";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Submit from "../../components/public/Submit";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useMenuSearch } from "@/app/hooks/useBodyClass";

export default function Otp() {
    const { i18n, t, mounted } = useTranslationSetup();

    const {
        show,
        setShow,
    } = useMenuSearch();

    const [otp, setOtp] = useState("");

    function handleotp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShow(true);
    }

    const particles = [
        "/assets/icons/star-otp.svg",
        "/assets/icons/square.svg",
        "/assets/icons/dot.svg",
        "/assets/icons/line-1.svg",
        "/assets/icons/line-2.svg",
        "/assets/icons/star-1.svg",
    ];

    return (
        <>
            <Hero image="bg-otp-mobile.png" title={`${mounted ? t('verification-code') : '...'}`} nextPage={true} />
            <ContentDetailsCustomer padding="px-10 py-30 md:p-30">
                <form action="" onSubmit={handleotp} className="relative flex flex-col gap-15">
                    <div className="flex flex-col md:justify-center md:items-center gap-5 text-center md:text-start">
                        <h2 className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Inter" : ""} font-semibold text-3xl`}>{mounted ? t('verification-code') : '...'}</h2>
                        <span className="text-base font-normal text-[var(--color-gray-cool)]">{mounted ? t('you-will-send-code') : '...'}</span>
                        <div className="w-full md:w-[70%]">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle={{ display: 'flex', justifyContent: "space-between" }}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="mx-1 md:mx-0 !w-10 h-10 md:!w-12 md:h-12 text-center border border-gray-400 rounded-md focus:border-red-500 focus:outline-none"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Submit title={mounted ? t('confirm') : '...'} width="w-[712px]" />
                    </div>
                    {
                        show &&
                        <div className="px-5 md:px-0 z-3 fixed top-0 left-0 flex justify-center items-center w-full h-full">
                            <div className="p-5 w-full md:w-[500px] bg-white rounded-[25px] flex flex-col items-center justify-center gap-2 md:gap-9">

                                <div className="flex justify-end w-full">
                                    <div
                                        onClick={() => setShow(false)}
                                        title="close"
                                        className="cursor-pointer p-4 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[20px] h-[20px] relative"
                                    >
                                        <Image src="/assets/icons/close.png" alt="back" fill />
                                    </div>
                                </div>

                                <div className="p-7 relative">
                                    {particles.map((src, i) => {
                                        const angle = (i / particles.length) * 2 * Math.PI;
                                        const radius = 180;
                                        const x = Math.cos(angle) * radius;
                                        const y = Math.sin(angle) * radius;

                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                                animate={{ x, y, opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.5 }}
                                                className="hidden md:block p-7 absolute left-[115px] top-[110px]"
                                                style={{ transform: "translate(-50%, -50%)" }}
                                            >
                                                <Image src={src} alt="particle" width={40} height={40} />
                                            </motion.div>
                                        );
                                    })}

                                    <div className="breathe p-7 relative before:content[''] before:absolute before:rounded-full">
                                        <Image
                                            src="/assets/icons/icon-success.svg"
                                            alt="success"
                                            width={210}
                                            height={210}
                                            className="relative z-10"
                                        />
                                    </div>
                                </div>
                                <div className="text-center px-5 text-[var(--slate-gray)] font-semibold text-[22px]">
                                    <span>{mounted ? t('booking-confirmed') : '...'}</span>
                                </div>
                            </div>
                        </div>
                    }
                </form>
            </ContentDetailsCustomer>
        </>
    )
}