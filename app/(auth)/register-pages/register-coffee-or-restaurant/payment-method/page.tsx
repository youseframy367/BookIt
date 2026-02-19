"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePaymentData } from "@/app/data/dataPayment";
import Images from "@/app/components/PaymentMethods/Images";
import Footer from "@/app/components/PaymentMethods/Footer";
import Squares from "@/app/components/PaymentMethods/Squares";

type Period = "شهري" | "ربع سنويه" | "سنوي";

export default function PaymentMethod() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [period, setPeriod] = useState<Period>("شهري");

    const isPaymentsMethod = usePaymentData();

    return (
        <section className="font-cairo w-full relative" dir="rtl">
            <div className="flex justify-center pt-[80px]">
                <ul className={`before:transition-all before:duration-200 relative before:content-[''] ${period == 'شهري' ? 'before:right-2' : period == 'ربع سنويه' ? 'before:right-28' : 'before:right-59 before:!w-[58px]'} before:w-[88px] before:h-[35px] before:absolute before:rounded-[8px] before:bg-gradient-to-br before:from-[var(--color-active-payment)] before:to-[var(--color-active-payment-tow)] py-[5] px-[18px] gap-[35px] rounded-[12px] flex bg-[var(--color-nav-payments)] border border-2 border-[var(--color-border-pamyments)]`}>
                    <li onClick={() => setPeriod("شهري")} className={`${period == 'شهري' && '!text-black'} text-white relative text-sm font-medium cursor-pointer ms-2 p-[8px]`} title="شهري">شهري</li>
                    <li onClick={() => setPeriod("ربع سنويه")} className={`${period == 'ربع سنويه' && '!text-black'} text-white relative text-sm font-medium cursor-pointer ms-2 p-[8px]`} title="ربع سنويه">ربع سنويه</li>
                    <li onClick={() => setPeriod("سنوي")} className={`${period == 'سنوي' && '!text-black'} text-white relative text-sm font-medium cursor-pointer ms-2 p-[8px]`} title="سنوي">سنوي</li>
                </ul>
            </div>
            <Images />
            <div className="container mt-10">
                <div className="relative flex flex-col gap-15">
                    <Squares />
                    <div className="grid md:grid-cols-3 gap-[20px] md:gap-[80px]">
                        {
                            isPaymentsMethod.map((item, index) => {
                                const isActive = activeIndex === index;

                                return <div key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
        relative flex flex-col gap-[20px] md:gap-[44px] py-[15px] md:py-[55px] px-[31px] rounded-[32px] text-white        
        ${isActive ? 'border border-[1px] border-[var(--color-active-payment)] bg-gradient-to-b from-[var(--color-one-payment-card-hover)] to-[var(--color-one-payment-card)]' : 'bg-[linear-gradient(to_bottom,var(--color-one-payment-card),var(--color-tow-payment-card),var(--color-three-payment-card))]'}
      `}
                                >
                                    <div className={`
          transition-all duration-300 absolute -top-1 left-[34%] h-[15px]
          ${isActive ? 'w-[136px]' : 'w-0'}
        `}>
                                        <Image src="/assets/icons/line.svg" alt="line" fill />
                                    </div>
                                    <div className="w-full flex flex-col gap-[10px] md:gap-[20px]">
                                        <div className="flex flex-col gap-[20px]">
                                            <div className="transition-all duration-300 group-hover:bg-[var(--color-active-payment-tow)] flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-[var(--color-border-payment)] bg-[var(--color-border-pamyments)]">
                                                <div className="transition-all duration-300 w-[20px] h-[20px] rounded-full border-5 group-hover:border-[var(--color-search-mobile)] border-white">
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-[9px]">
                                                <h2 className="text-xl font-medium font-SpaceGrotesk">
                                                    {item.title} <span className="text-[var(--color-title-card)]">{item.titleTow}</span>
                                                </h2>
                                                <span className="text-sm font-normal">{item.subTitle}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-1">
                                            <h2 className="flex gap-3 text-5xl font-medium font-SpaceGrotesk">
                                                {item.currens}
                                                <span>{item.prices[period]}</span>
                                            </h2>
                                            <span className="font-Amiri text-[var(--color-text-payment)] text-lg font-normal">
                                                / {period}
                                            </span>
                                        </div>
                                        <div className="flex w-full">
                                            <Link
                                                href={item.link}
                                                title="اشترك الان"
                                                className={`${isActive ? 'from-[var(--color-active-payment)] to-[var(--color-card-btn-tow)] bg-gradient-to-br' : ''} border border-2 border-[var(--color-border-btn-payment)] bg-gradient-to-br from-[var(--color-nav-payments)] to-[var(--color-btn-tow)] font-bold text-xs md:text-base flex items-center gap-2 flex-row-reverse justify-center px-4 py-[7px] md:px-8 md:py-[11px] w-full rounded-[12px] relative cursor-pointer transition-all duration-300`}
                                            >
                                                <span className="relative z-1">اشترك الان</span>
                                            </Link>
                                        </div>
                                        <hr className="text-[var(--color-line-payment)]" />
                                    </div>
                                    <div>
                                        <span>{item.titleMenu}</span>
                                        <ul className="flex flex-col gap-[7px] md:gap-[16px] md:mt-6">
                                            {
                                                item.features.map((item, index) => {
                                                    return <li key={index}
                                                        className="flex gap-[10px] items-center"
                                                    >
                                                        <Image
                                                            src="/assets/icons/like.svg"
                                                            alt="صح"
                                                            width={16}
                                                            height={16}
                                                            className="mt-[2px]"
                                                        />
                                                        <span className="text-[var(--color-text-payment)] text-sm font-medium">
                                                            {item}
                                                        </span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="w-[70%]">
                                            <Link
                                                href=""
                                                title={item.link}
                                                className={`border border-2 border-[var(--color-border-btn-payment)] bg-gradient-to-br from-[var(--color-nav-payments)] to-[var(--color-btn-tow)] font-bold text-xs md:text-base flex items-center gap-2 flex-row-reverse justify-center px-4 py-[7px] md:px-8 md:py-[11px] w-full rounded-[12px] relative cursor-pointer transition-all duration-300`}
                                            >
                                                <span className="relative z-1">عرض المزيد عن هذه الباقه</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        </section>
    )
}