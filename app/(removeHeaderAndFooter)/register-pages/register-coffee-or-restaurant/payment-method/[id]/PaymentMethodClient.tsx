"use client";

import Footer from "@/app/components/PaymentMethods/Footer";
import Images from "@/app/components/PaymentMethods/Images";
import Squares from "@/app/components/PaymentMethods/Squares";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PaymentMethodClient({ id }: { id: string }) {
    const [mounted, setMounted] = useState(false);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative" dir="rtl">
            <div className="font-cairo pb-[30px] pt-[80px] text-white">
                <Images />
                <div className="container relative">
                    <Squares />
                    <div className="grid md:grid-cols-[7.8fr_3.2fr] gap-[50px]">
                        <div className="flex h-full flex-col gap-[23px] md:border-l-1 md:pe-[50px]">
                            <h2 className="text-lg font-semibold">حدد طريقة الدفع</h2>
                            <div className="h-full relative border border-1 border-[var(--color-gray-light-translucent)] py-[15px] md:py-[41px] px-[20px] md:px-[56px] rounded-[32px] bg-[linear-gradient(to_bottom,var(--color-one-payment-card),var(--color-cyan-transparent),var(--color-cyan-light-transparent))]">
                                <div className="absolute left-0 md:-left-22 top-0">
                                    <Image src="/assets/icons/rectangle-1.svg" alt="rectangle" width={500} height={878} className="object-cover" />
                                </div>
                                <ul className="flex flex-col gap-5 relative z-1">
                                    <li className="w-full flex flex-col gap-[23px]">
                                        <label onClick={() => setSelected("card")} className="py-[13px] px-[19px] border border-1 border-[var(--color-white-clean)] rounded-[10px] flex justify-between items-center">
                                            <div className="flex gap-[16px] items-center">
                                                <Image src="/assets/icons/payment-card.svg" alt="payment card" width={30} height={30} />
                                                <span>الدفع بالبطاقه البنكيه</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={selected === "card"}
                                                readOnly
                                                className="
    appearance-none
    w-[20px] h-[20px]
    rounded-full
    border-[2px] border-white
    bg-transparent
    relative
    cursor-pointer
    checked:before:content-['']
    checked:before:absolute
    checked:before:w-[10px]
    checked:before:h-[10px]
    checked:before:rounded-full
    checked:before:bg-white
    checked:before:top-1/2
    checked:before:left-[8.5px]
    checked:before:-translate-x-1/2
    checked:before:-translate-y-1/2
  "
                                            />
                                        </label>
                                        {
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${selected === "card" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="flex justify-center">
                                                    <div className="flex justify-center w-[50%]">
                                                        <Link
                                                            href="/register-pages/register-coffee-or-restaurant/create-template"
                                                            title="اذهب للدفع من خلال الكارت البنكي"
                                                            className="bg-gradient-to-br from-[var(--color-cyan-bright)] to-[var(--color-teal-dark-tow)] border border-2 border-[var(--color-white-light)] font-bold text-xs md:text-base flex items-center gap-2 justify-center px-4 py-[7px] md:px-8 md:py-[11px] w-full rounded-[12px] relative cursor-pointer transition-all duration-300"
                                                        >
                                                            <span className="relative z-1">اذهب للدفع من خلال الكارت البنكي</span>
                                                            <Image src="/assets/icons/icon-bank.svg" alt="icon bank" width={24} height={16} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                    <li className="w-full flex flex-col gap-[23px]">
                                        <label onClick={() => setSelected("wallet")} className="py-[13px] px-[19px] border border-1 border-[var(--color-white-clean)] rounded-[10px] flex justify-between items-center">
                                            <div className="flex gap-[16px] items-center">
                                                <Image src="/assets/icons/payment-wallet.svg" alt="payment wallet" width={30} height={30} />
                                                <span>الدفع بالبطاقه البنكيه</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={selected === "wallet"}
                                                readOnly
                                                className="
    appearance-none
    w-[20px] h-[20px]
    rounded-full
    border-[2px] border-white
    bg-transparent
    relative
    cursor-pointer
    checked:before:content-['']
    checked:before:absolute
    checked:before:w-[10px]
    checked:before:h-[10px]
    checked:before:rounded-full
    checked:before:bg-white
    checked:before:top-1/2
    checked:before:left-[8.5px]
    checked:before:-translate-x-1/2
    checked:before:-translate-y-1/2
  "
                                            />
                                        </label>
                                        {
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${selected === "wallet" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <form className="flex gap-[14px]">
                                                    <input type="text" className="md:w-[365px] py-[11px] px-[21px] rounded-[12px] border border-2 border-[var(--color-white-light)] bg-gradient-to-br from-[var(--color-white-overlay)] to-[var(--color-transparent)]" placeholder="رقم المحفظه" />
                                                    <div className="relative bg-gradient-to-br from-[var(--color-cyan-bright)] to-[var(--color-teal-dark-tow)] border border-2 border-[var(--color-white-light)] font-bold text-xs md:text-base flex items-center gap-2 justify-center rounded-[12px] relative cursor-pointer transition-all duration-300">
                                                        <input type="submit" value="أدفع الان" title="أدفع الان" className="cursor-pointer py-[7px] pe-9 ps-2 md:py-[11px] w-full" />
                                                        <Image src="/assets/icons/icon-bank.svg" alt="icon bank" width={24} height={16} className="absolute top-[17px] left-1" />
                                                    </div>
                                                </form>
                                            </div>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* h-[90%] */}
                        <div
                            className="md:my-10 relative bg-[linear-gradient(to_bottom,var(--color-one-payment-card),var(--color-cyan-transparent),var(--color-cyan-light-transparent))] text-white flex flex-col gap-[20px] py-[15px] md:py-[55px] px-[31px] rounded-[32px]"
                        >
                            <div className="w-full flex flex-col gap-[10px] md:gap-[20px]">
                                <div className="flex flex-col gap-[20px]">
                                    <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-[var(--color-white-light-transparent)] bg-[var(--color-white-faint)]">
                                        <div className="w-[20px] h-[20px] rounded-full border-5 border-white">
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[9px]">
                                        <h2 className="text-xl font-medium font-SpaceGrotesk">
                                            Business <span className="text-[var(--color-white-translucent)]">( الأكثر شيوعا )</span>
                                        </h2>
                                        <span className="text-sm font-normal">مناسبة للمطاعم المتوسطه والكافيهات</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-1">
                                    <h2 className="flex gap-3 text-5xl font-medium font-SpaceGrotesk">
                                        EGB
                                        <span>350</span>
                                    </h2>
                                    <span className="font-Amiri text-[var(--color-white-light-gray)] text-lg font-normal">
                                        / شهريا
                                    </span>
                                </div>
                                <hr className="text-[var(--color-white-light-translucent)]" />
                            </div>
                            <ul className="flex flex-col gap-[7px] md:gap-[16px]">
                                <li
                                    className="flex gap-[10px] items-center"
                                >
                                    <Image
                                        src="/assets/icons/like.svg"
                                        alt="صح"
                                        width={16}
                                        height={16}
                                        className="mt-[2px]"
                                    />
                                    <span className="text-[var(--color-white-light-gray)] text-sm font-medium">
                                        يشمل السعر ضريبة القيمة المضافة 14٪
                                    </span>
                                </li>
                                <li
                                    className="flex gap-[10px] items-center"
                                >
                                    <Image
                                        src="/assets/icons/like.svg"
                                        alt="صح"
                                        width={16}
                                        height={16}
                                        className="mt-[2px]"
                                    />
                                    <span className="text-[var(--color-white-light-gray)] text-sm font-medium">
                                        يتم التجديد شهريا
                                    </span>
                                </li>
                                <li
                                    className="flex gap-[10px] items-center"
                                >
                                    <Image
                                        src="/assets/icons/like.svg"
                                        alt="صح"
                                        width={16}
                                        height={16}
                                        className="mt-[2px]"
                                    />
                                    <span className="text-[var(--color-white-light-gray)] text-sm font-medium">
                                        اجمالي المبلغ <span className="text-green-500">399</span> جنيه
                                    </span>
                                </li>
                            </ul>
                            <div className="relative w-full h-[200px]">
                                <Image src="/assets/icons/credit-card.png" alt="caredit card" fill className="rounded-2xl object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </section >
    )
}