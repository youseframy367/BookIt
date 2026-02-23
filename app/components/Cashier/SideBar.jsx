"use client"

import { useState } from "react";
import Image from "next/image"

export default function SideBar() {
    const [selectedDetailsEmployees, setSelectedDetailsEmployees] = useState("");
    const [selectedDetailsClients, setSelectedDetailsClients] = useState("");
    const [selectedProducts, setSelectedProducts] = useState("");

    return (
        <div className="relative">
            <div className="sticky top-22">
                <div className="bg-[#fff] rounded-[11px] py-[24px] px-[15px] flex flex-col gap-[13px]">
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
                            <span className="text-[var(--color-sub-title)]">الاجمالي</span>
                            <span className="text-[var(--color-total-line)]">-------</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}