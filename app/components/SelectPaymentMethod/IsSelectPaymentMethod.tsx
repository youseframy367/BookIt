"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface typeAllChecked {
    allChecked: boolean;
}

export default function IsSelectPaymentMethod({ allChecked }: typeAllChecked) {
    const { i18n, t, mounted } = useTranslationSetup();
    const [isMobile, setIsMobile] = useState(false);
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="mt-[57px]">
            <div className="container-payment-method">
                <div className="flex flex-col gap-[60px]">
                    <div className="flex flex-col gap-[43px] text-center">
                        <h2 data-aos="fade-up" className="text-[var(--strong-red)] text-[22px] md:text-[56px] font-bold">{mounted ? t('select-payment-method') : '...'}</h2>
                        <div className="flex flex-col md:flex-row gap-[49px]" data-aos="fade-up">
                            {showWarning && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded">
                                    Please complete the previous step first
                                </div>
                            )}
                            <div className="h-full">
                                <div onClick={isMobile ? () => setIsFirstOpen(!isFirstOpen) : undefined} className={`${allChecked && "group"} flex flex-col relative`} onMouseEnter={() => {
                                    !allChecked && setShowWarning(true);
                                }}
                                    onMouseLeave={() => setShowWarning(false)}>
                                    <div className="shadow-xl rounded-[20px] bg-gradient-to-br to-[var(--strong-red)] from-[var(--color-red-bright-four)] w-full relative">
                                        <div className="relative w-full h-[199px] md:h-[350px]">
                                            <Image src="/assets/icons/wallet-numbers.svg" alt="user visa" fill className="object-cover rounded-[20px]" />
                                        </div>
                                        <div className="py-[24px] px-[19px] flex flex-col justify-center gap-[17px] font-medium">
                                            <p className="text-white text-[8px] md:text-base leading-[18px] md:leading-[unset]">{mounted ? t('text-payment-1') : '...'}</p>
                                            <div className="text-[var(--color-gray-tow)] flex justify-center items-center gap-2">
                                                <span className="text-sm">{mounted ? t('click-to-pay') : '...'}</span>
                                                <Image src="/assets/icons/cursor-finger.svg" alt="cursor finger" width={14} height={14} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${allChecked && isMobile ? (isFirstOpen && "h-[70px]") : "group-hover:h-[70px]"} h-0 transition-all duration-500`}>
                                        <div className={`shadow-xl rounded-b-[20px] pb-[16px] w-full absolute -z-1 ${allChecked && isMobile ? (isFirstOpen && "z-0 bottom-1 md:bottom-4") : "group-hover:z-0 group-hover:-bottom-4 "} bottom-0 border border-t-0 border-1 border-[var(--color-black-tow)] flex justify-center items-end overflow-hidden h-[148px] transition-all duration-500`}>
                                            <div className="flex justify-center">
                                                <Link
                                                    href="/register-pages/register-coffee-or-restaurant/create-template"
                                                    title={mounted ? t('procedd-to-pay') : '...'}
                                                    className="text-white bg-gradient-to-b from-[var(--strong-red)] to-[var(--color-dark-blue)] font-semibold text-[10px] md:text-lg flex items-center gap-2 justify-center px-8 py-[11px] w-full rounded-[12px] relative cursor-pointer"
                                                >
                                                    <div className="relative w-[18px] h-[12px] md:w-[24px] md:h-[16px]">
                                                        <Image src="/assets/icons/icon-bank.svg" alt="icon bank" fill />
                                                    </div>
                                                    <span className="relative z-1">{mounted ? t('procedd-to-pay') : '...'}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full">
                                <div onClick={isMobile ? () => setIsSecondOpen(!isSecondOpen) : undefined} className={`${allChecked && "group"} flex flex-col relative`} onMouseEnter={() => {
                                    !allChecked && setShowWarning(true);
                                }}
                                    onMouseLeave={() => setShowWarning(false)}>
                                    <div className="h-full shadow-xl rounded-[20px] bg-gradient-to-br to-[var(--strong-red)] from-[var(--color-red-bright-four)] w-full relative">
                                        <div className="relative w-full h-[199px] md:h-[350px]">
                                            <Image src="/assets/icons/face-wallet.svg" alt="user visa" fill className="object-cover rounded-[20px]" />
                                        </div>
                                        <div className="py-[24px] px-[19px] flex flex-col justify-center gap-[17px] font-medium">
                                            <p className="text-white text-[8px] md:text-base leading-[18px] md:leading-[unset]">{mounted ? t('text-payment-2') : '...'}</p>
                                            <div className="text-[var(--color-gray-tow)] flex justify-center items-center gap-2">
                                                <span className="text-sm">{mounted ? t('wallet') : '...'}</span>
                                                <Image src="/assets/icons/cursor-finger.svg" alt="cursor finger" width={14} height={14} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${allChecked && isMobile ? (isSecondOpen && "h-[70px]") : "group-hover:h-[70px]"} h-0 transition-all duration-500`}>
                                        <div className={`shadow-xl rounded-b-[20px] pb-[16px] w-full absolute -z-1 ${allChecked && isMobile ? (isSecondOpen && "z-0 bottom-1 md:bottom-4") : "group-hover:z-0 group-hover:-bottom-4 "} bottom-0 border border-t-0 border-1 border-[var(--color-black-tow)] flex justify-center items-end overflow-hidden h-[148px] transition-all duration-500`}>
                                            <form className="flex gap-[14px]">
                                                <input type="email" placeholder={mounted ? t('enter-wallet-number') : '...'} className="text-xs md:text-base input-email font-normal placeholder:text-[var(--strong-red)] bg-[var(--color-danger-light)] px-7 rounded-xl w-full lg:w-[372px]" />
                                                <div className="bg-gradient-to-b from-[var(--strong-red)] to-[var(--color-dark-blue)] flex items-center gap-2 justify-center rounded-[12px] relative cursor-pointer">
                                                    <input type="submit" value={mounted ? t('pay-now') : '...'} title={mounted ? t('pay-now') : '...'} className="text-xs md:text-base mt-[1px] text-white py-[7px] ps-9 pe-2 md:py-[11px] w-full" />
                                                    <div className={`absolute top-[9px] md:top-[17px] ${mounted ? i18n.language === 'ar' ? "right-1" : "left-1" : ""}`}>
                                                        <div className="relative w-[18px] h-[12px] md:w-[24px] md:h-[16px]">
                                                            <Image src="/assets/icons/icon-bank.svg" alt="icon bank" fill />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}