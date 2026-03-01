"use client"

import { useState } from "react";
import Image from "next/image"
import { usePaymentGetwayData } from "@/app/data/dataPaymentGetway";

export default function SideBar() {
    const [selectedDetailsEmployees, setSelectedDetailsEmployees] = useState<string | null>("");
    const [selectedDetailsClients, setSelectedDetailsClients] = useState<string | null>("");
    const [selectedProducts, setSelectedProducts] = useState<string | null>("");

    const [paymentGetway, setPaymentGetway] = useState(usePaymentGetwayData());
    const [activePaymentIndex, setActivePaymentIndex] = useState(0);

    const [takeawayOrSala, setTakeawayOrSala] = useState(0);

    return (
        <div className="relative">
            <div className="sticky top-22 flex flex-col gap-[10px]">
                <div className="shadow-[0_0_10px_rgba(0,0,0,0.10)] bg-[#fff] rounded-[11px] py-[24px] px-[15px] flex flex-col gap-[24px]">
                    <div className="flex gap-[6px] justify-center">
                        <button onClick={() => setTakeawayOrSala(0)} title="صاله" className={`${takeawayOrSala == 0 && 'hover:text-[var(--color-btn-sidebar)] hover:bg-white bg-[var(--color-btn-sidebar)] text-white'} text-[var(--color-btn-sidebar)] cursor-pointer text-xs font-semibold transition-all duration-300 py-[8px] px-[40px] border border-2 border-[var(--color-btn-sidebar)] rounded-[13px]`}>
                            صاله
                        </button>
                        <button onClick={() => setTakeawayOrSala(1)} title="تيك اوي" className={`${takeawayOrSala == 1 && 'hover:text-[var(--color-btn-sidebar)] hover:bg-white bg-[var(--color-btn-sidebar)] text-white'} cursor-pointer text-xs text-[var(--color-btn-sidebar)] hover:text-white font-semibold transition-all duration-300 py-[8px] px-[40px] hover:bg-[var(--color-btn-sidebar)] border border-2 border-[var(--color-btn-sidebar)] rounded-[13px]`}>
                            تيك اوي
                        </button>
                    </div>
                    <div className="flex flex-col gap-[13px]">
                        <div>
                            <h2 className="font-semibold text-lg text-[var(--color-title-sidebar)]">تفاصيل الفاتوره</h2>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedDetailsEmployees(prev =>
                                    prev === "Details Employees" ? null : "Details Employees"
                                )
                            }>
                                <h2 className="font-semibold text-sm">بيانات الموظف</h2>
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedDetailsEmployees === "Details Employees" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <span className={`text-[var(--color-sub-title)] overflow-hidden transition-all duration-300 ${selectedDetailsEmployees === "Details Employees" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                مؤمن الزبده
                            </span>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedDetailsClients(prev =>
                                    prev === "Details Clients" ? null : "Details Clients"
                                )
                            }>
                                <h2 className="font-semibold text-sm">بيانات العميل</h2>
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedDetailsClients === "Details Clients" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <div className={`flex justify-between overflow-hidden transition-all duration-300 ${selectedDetailsClients === "Details Clients" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <span className="text-[var(--color-sub-title)]">
                                    كود العميل
                                </span>
                                <span className="text-[var(--color-sub-title)]">
                                    #
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedProducts(prev =>
                                    prev === "products" ? null : "products"
                                )
                            }>
                                <h2 className="font-semibold text-sm">المنتجات</h2>
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedProducts === "products" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <ul>
                                <li className={`flex justify-between overflow-hidden transition-all duration-300 ${selectedProducts === "products" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <span className="text-[var(--color-sub-title)]">
                                        لم يحدد بعد
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-[11px]">
                            <div className="flex justify-between" onClick={() =>
                                setSelectedProducts(prev =>
                                    prev === "Invoice Details" ? null : "Invoice Details"
                                )
                            }>
                                <h2 className="font-semibold text-sm">تفاصيل الفاتوره</h2>
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedProducts === "Invoice Details" ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                        </div>
                        <hr className="text-[var(--color-hero)]" />
                        <div className="flex flex-col gap-[13px]">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[var(--color-sub-title)]">الاجمالي</span>
                                <span className="text-[var(--color-total-line)]">-------</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[22px]">
                            <div className="flex flex-col gap-[13px]">
                                <h2 className="font-semibold text-sm">تفاصيل الدفع</h2>
                                <div className="flex gap-[6px] justify-between">
                                    {
                                        paymentGetway.map((item, index) => {
                                            return <button key={index} onClick={() => setActivePaymentIndex(index)} title={item.title} className={`${activePaymentIndex == index ? 'bg-[var(--color-btn-sidebar)] text-white hover:bg-white hover:text-[var(--color-btn-sidebar)]' : 'hover:text-white hover:bg-[var(--color-btn-sidebar)]'} group text-[var(--color-btn-sidebar)] transition-all duration-300 cursor-pointer w-full py-[8px] flex gap-[6px] justify-center border border-[var(--color-btn-sidebar)] rounded-[8px]`}>
                                                <Image src={`/assets/icons/${item.icon}`} alt="critical" width={20} height={15} className={`${activePaymentIndex == index ? 'brightness-0 invert group-hover:brightness-[unset] group-hover:invert-[unset]' : 'group-hover:brightness-0 group-hover:invert'} transition-all duration-300`} />
                                                <span className="text-[14px]">{item.title}</span>
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex gap-[12px]">
                                {/* cursor-pointer */}
                                {/* transition-all duration-300 */}
                                {/* hover:text-[var(--color-btn-sidebar)] hover:bg-white */}
                                <button title="طباعه ، وتأكيد العمليه" className="opacity-[0.5] w-full text-sm text-white font-semibold py-[12px] border border-2 border-[var(--color-btn-sidebar)] bg-[var(--color-btn-sidebar)] rounded-[13px]">
                                    طباعه ، وتأكيد العمليه
                                </button>
                                <Image src="/assets/icons/remove.svg" alt="critical" width={31} height={31} className="cursor-pointer" title="Remove" />
                            </div>
                        </div>
                    </div>
                </div>
                {activePaymentIndex != 0 && (
                    <div className="shadow-[0_0_10px_rgba(0,0,0,0.10)] bg-[#fff] rounded-[16px] py-[24px] px-[15px] flex items-center gap-[13px]">
                        <Image src="/assets/icons/pin.svg" alt="pin" width={15} height={15} />
                        <span className="font-semibold text-xs text-[var(--color-text-popup)]">سيتم تسجيل العمليه عند مشرف المطعم بأنها قد تمت من خلال البطاقه البنكيه وليس دفع نقدي .</span>
                    </div>
                )}
            </div>
        </div>
    )
}