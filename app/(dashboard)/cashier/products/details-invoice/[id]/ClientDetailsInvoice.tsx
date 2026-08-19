"use client";

import { useState } from "react";
import Image from "next/image";
import { useInvoiceOfFillingsData } from "@/app/data/dataInvoiceOfFillings";

export default function ClientDetailsInvoice({ id }: { id: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const useDataInvoiceOfFilling = useInvoiceOfFillingsData();

    return (
        <section className="flex w-[98%] m-[1%] bg-[#fff] rounded-[11px] flex-col gap-[40px] pb-[15px] px-[15px] ">
            {showFilter && (
                <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                    <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[484px] rounded-[12px] bg-white py-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[25px]">
                                    <div className="flex items-center justify-between px-[20px]">
                                        <p className="text-[#131313] font-semibold text-[20px]">
                                            فلتر المبيعات
                                        </p>
                                        <Image src="/media/shared/icons/close.png" alt="close" width={18} height={18} onClick={() => setShowFilter(false)} className="cursor-pointer" title="اغلاق" />
                                    </div>
                                    <hr className="text-[var(--color-gray-six)]" />

                                    <div className="px-[20px] flex flex-col gap-[16px]">
                                        <div className="flex gap-[12px]">
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">المبلغ</label>
                                                <input type="text" placeholder="جنيه" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">تاريخ العمليه</label>
                                                <input type="date" placeholder="اخر عملية جرد" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-[16px] justify-between mt-[20px] px-[20px]">
                                    <button
                                        className="bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                                        onClick={() => setShowFilter(false)}
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                                        onClick={() => {
                                            setShowFilter(false)
                                        }}
                                    >
                                        بحث
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            <div className="p-[10px] flex flex-wrap items-center justify-between gap-4 ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">تفاصيل فاتورة مبيعات</p>
                <div className="flex items-center gap-[10px] flex-1 justify-end ml-[10px]">

                    <div className="relative w-full max-w-[200px]">
                        <span className="absolute top-[10px] mr-[10px]">
                            <img src="/media/shared/ui/search.svg" className="w-4 h-4" />
                        </span>
                        <input
                            type="search"
                            placeholder="البحث عن فاتوره جديده بكود الفاتوره"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
                        />
                    </div>
                </div>
            </div>
            <div className="border border-[var(--color-black-tow)] py-[20px] px-[24px] rounded-[16px]">
                <ul className="flex flex-col gap-[19px]">
                    {
                        useDataInvoiceOfFilling.map((item, index) => {
                            return (
                                <li key={index} className="border border-[var(--color-black-tow)] flex justify-between p-[13px] rounded-[8px]">
                                    <span>{item.title}</span>
                                    <span>{item.subTitle}</span>
                                </li>
                            )
                        })
                    }
                    <li className="font-semibold border border-[var(--color-black-tow)] flex flex-col p-[13px] rounded-[8px]">
                        <div className="grid grid-cols-[5fr_2fr_2fr_2fr] w-full text-center">
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                اسم المنتج
                            </div>
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                الكميه
                            </div>
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                سعر الوحده
                            </div>
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                الاجمالي
                            </div>
                            <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                <span>كرانشي رانشي</span>
                            </div>
                            <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                <span>5</span>
                            </div>
                            <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                <span>40 جنيه مصري</span>
                            </div>
                            <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                <span>120 جنيه مصري</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-[9fr_2fr] w-full text-center">
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                اجمالي السعر بدون ضريبة القيمه المضافه
                            </div>
                            <div className="bg-black text-white text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                120 جنيه مصري
                            </div>
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                ضريبة القيمه المضافه
                            </div>
                            <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                20 جنيه مصري
                            </div>
                            <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                                اجمالي الفاتوره
                            </div>
                            <div className="bg-black text-white text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                120 جنيه مصري
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}