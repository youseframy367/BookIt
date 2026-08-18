"use client";

import Pagnation from "@/app/components/public/Pagnation";
import { useProductsCahsersData } from "@/app/data/dataProductsCahser";
import { usePagnation } from "@/app/hooks/usePagnation";
import { useState } from "react";
import Image from "next/image";

export default function ClientDetailsEmployees({ id }: { id: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const DataCustomers = useProductsCahsersData();

    const { currentPage, setCurrentPage, numPages, setNumRow, scroll, numRow, numbersRef } =
        usePagnation(DataCustomers, searchTerm)

    return (
        <section className="flex w-[98%] m-[1%] bg-[#fff] rounded-[11px] flex-col gap-[40px] pb-[15px] px-[15px] ">
            {showFilter && (
                <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[484px] rounded-[12px] bg-white py-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[25px]">
                                    <div className="flex items-center justify-between px-[20px]">
                                        <p className="text-[#131313] font-semibold text-[20px]">
                                            فلتر المبيعات
                                        </p>
                                        <Image src="/assets/icons/close.png" alt="close" width={18} height={18} onClick={() => setShowFilter(false)} className="cursor-pointer" title="اغلاق" />
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
            )
            }
            <div className="p-[10px] flex flex-wrap items-center justify-between gap-4 ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">اجمالي مبيعات الكاشير المسجله</p>
                <div className="flex items-center gap-[10px] flex-1 justify-end ml-[10px]">

                    <div className="relative w-full max-w-[200px]">
                        <span className="absolute top-[10px] mr-[10px]">
                            <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                        </span>
                        <input
                            type="search"
                            placeholder="ابحث عن اسم او تاريخ عمليه"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
                        />
                    </div>
                    <img
                        onClick={() => {
                            setShowFilter(true)
                        }}
                        src="/img/Frame 1686553878.svg"
                        className="w-[32px] h-[32px] cursor-pointer"
                        alt="filter"
                    />
                </div>
            </div>
            <ul className="flex flex-col gap-[39px]">
                <li className="border border-[var(--color-black-tow)] py-[16px] rounded-[16px] flex flex-col gap-[18px]">
                    <div className="flex items-center justify-between px-[24px]">
                        <p className="font-semibold text-base">تفاصيل اليوم والموظف</p>
                        <div className="bg-[var(--color-dark-blue-overlay)] py-[6px] px-[11px] rounded-[8px]">
                            <span className="text-[var(--color-dark-blue-gray)] text-xs">مشاهدة الملف الشخصي للموظف</span>
                        </div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between px-[24px]">
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اسم موظف المبيعات المسجل لدي هذا النظام</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="هشام عبد الحميد محمد" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>تاريخ العمليات</span>
                            <input type="date" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اجمالي مبلغ المبيعات</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="50,000 جنيه مصري" />
                        </label>
                    </div>
                </li>
                <li className="border border-[var(--color-black-tow)] py-[16px] rounded-[16px] flex flex-col gap-[18px]">
                    <div className="flex items-center justify-between px-[24px]">
                        <p className="font-semibold text-base">تفاصيل اليوم والموظف</p>
                        <div className="bg-[var(--color-dark-blue-overlay)] py-[6px] px-[11px] rounded-[8px]">
                            <span className="text-[var(--color-dark-blue-gray)] text-xs">مشاهدة الملف الشخصي للموظف</span>
                        </div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between px-[24px]">
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اسم موظف المبيعات المسجل لدي هذا النظام</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="هشام عبد الحميد محمد" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>تاريخ العمليات</span>
                            <input type="date" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اجمالي مبلغ المبيعات</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="50,000 جنيه مصري" />
                        </label>
                    </div>
                </li>
                <li className="border border-[var(--color-black-tow)] py-[16px] rounded-[16px] flex flex-col gap-[18px]">
                    <div className="flex items-center justify-between px-[24px]">
                        <p className="font-semibold text-base">تفاصيل اليوم والموظف</p>
                        <div className="bg-[var(--color-dark-blue-overlay)] py-[6px] px-[11px] rounded-[8px]">
                            <span className="text-[var(--color-dark-blue-gray)] text-xs">مشاهدة الملف الشخصي للموظف</span>
                        </div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between px-[24px]">
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اسم موظف المبيعات المسجل لدي هذا النظام</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="هشام عبد الحميد محمد" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>تاريخ العمليات</span>
                            <input type="date" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اجمالي مبلغ المبيعات</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="50,000 جنيه مصري" />
                        </label>
                    </div>
                </li>
                <li className="border border-[var(--color-black-tow)] py-[16px] rounded-[16px] flex flex-col gap-[18px]">
                    <div className="flex items-center justify-between px-[24px]">
                        <p className="font-semibold text-base">تفاصيل اليوم والموظف</p>
                        <div className="bg-[var(--color-dark-blue-overlay)] py-[6px] px-[11px] rounded-[8px]">
                            <span className="text-[var(--color-dark-blue-gray)] text-xs">مشاهدة الملف الشخصي للموظف</span>
                        </div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between px-[24px]">
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اسم موظف المبيعات المسجل لدي هذا النظام</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="هشام عبد الحميد محمد" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>تاريخ العمليات</span>
                            <input type="date" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" />
                        </label>
                        <label className="text-xs flex flex-col gap-[13px] w-full md:w-[250px]">
                            <span>اجمالي مبلغ المبيعات</span>
                            <input type="text" className="border border-[var(--alpha)] py-4 px-2 rounded-[6px]" placeholder="50,000 جنيه مصري" />
                        </label>
                    </div>
                </li>
            </ul>

            <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    )
}