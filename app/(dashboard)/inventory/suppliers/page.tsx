
"use client";

import { useState, useMemo, useRef, } from "react";
import { usePagnation } from "../../../hooks/usePagnation";
import { useSuppliersData } from "../../../data/dataSuppliers";
import Pagnation from "../../../components/public/Pagnation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function Suppliers() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const tableRef = useRef<HTMLDivElement>(null);

    const dataMoerators = useSuppliersData();

    const [removeRoles, setRemovRoles] = useState(false);

    const filtered = useMemo(() => {
        if (!searchTerm) return dataMoerators;

        const lowerSearch = searchTerm.toLowerCase();

        return dataMoerators.filter((item) =>
            Object.values(item).some(
                (val) =>
                    val &&
                    val.toString().toLowerCase().includes(lowerSearch)
            )
        );
    }, [searchTerm, dataMoerators]);

    const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
        usePagnation(filtered, searchTerm);

    // حذف مورد عبر الـ API
    const handleDelete = async () => {
        try {
            // TODO: عدّل المسار هنا إلى مسار حذف المورد في الـ API الخاص بك
            const API_DELETE_PATH = "/inventory/supplier";
            await api.delete(API_DELETE_PATH);
            toast.success("تم حذف المورد بنجاح ✅");
        } catch (error) {
            console.error("Failed to delete:", error);
            toast.error("حدث خطأ أثناء حذف المورد ❌");
        }
    };

    // تطبيق فلتر الموردين
    const applyFilter = () => {
        // ملاحظة: يمكنك تطوير هذا الفلتر مستقبلاً ليشمل التاريخ والفلوس
        console.log("تم تطبيق الفلتر");
    };

    return (
        <section className="flex w-[98%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]">
            {removeRoles && (
                <RemoveRoles
                    text="هل أنت متأكد أنك تريد حذف هذا المورد ؟"
                    handleDelete={handleDelete}
                    onClose={() => setRemovRoles(false)} />
            )
            }
            {showFilter && (
                <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[484px] rounded-[12px] bg-white py-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[25px]">
                                    <div className="flex items-center justify-between px-[20px]">
                                        <p className="text-[#131313] font-semibold text-[20px]">
                                            فلتر الموردين
                                        </p>
                                        <Image src="/assets/icons/close.png" alt="close" width={18} height={18} onClick={() => setShowFilter(false)} className="cursor-pointer" title="اغلاق" />
                                    </div>
                                    <hr className="text-[var(--color-gray-six)]" />

                                    <div className="px-[20px] flex flex-col gap-[16px]">
                                        <div className="flex gap-[12px]">
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">العنوان</label>
                                                <input type="text" placeholder="العنوان" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">تاريخ الاضافه</label>
                                                <input type="date" placeholder="اخر عملية جرد" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                        </div>
                                        <div className="flex gap-[12px]">
                                            <div className="flex flex-col gap-[12px]">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">له فلوس</label>
                                                <input type="number" placeholder="جنيه" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">عليه فلوس</label>
                                                <input type="number" placeholder="جنيه" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
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
                                            applyFilter()
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

            {/*---------------------------------------header Bage ----------------------------------------------------*/}

            <div className="p-[10px] flex flex-wrap items-center justify-between ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
                    كل الموردين
                </p>

                <div className="flex items-center gap-[15px] flex-1 justify-end">
                    <div className="relative w-[300px]">
                        <span className="absolute top-[10px] mr-[10px]">
                            <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                        </span>
                        <input
                            type="search"
                            placeholder="ابحث عن مشرف..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
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

                    <Link href="/inventory/suppliers/add-suppliers" className="cursor-pointer text-center border-[1px] border-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px] whitespace-nowrap">
                        اضافة
                    </Link>
                </div>
            </div>

            <div className="h-[80vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} ref={tableRef}>
                <table className="min-w-full text-right">
                    <thead className="sticky top-0 bg-[#F9FAFB] rounded-[4px]">
                        <tr>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap" >اسم المورد</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">تاريخ الاضافه</th>
                            <th className="px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467]  whitespace-nowrap" >رقم الجوال</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">البريد</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">رقم الهوية</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">العنوان</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">اسم الشركه</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">له فلوس</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">عليه فلوس</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الاجراء</th>
                        </tr>
                    </thead>

                    <tbody className="divide-gray-50">
                        {displayedCustomers.length > 0 ? (
                            displayedCustomers.map((m: any, i: any) => (
                                <tr key={i} className="hover:bg-[#F9FAFB]/50 transition-colors">
                                    <td className="flex justify-center items-center px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)] px-[8px] py-[12px]">
                                        {m.name}
                                    </td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.date}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.number}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.mail}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-dark-blue-gray)]"
                                    >{m.id}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.address}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.namecompany}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-green-bright)]"
                                    >{m.fromMonay}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-red-bright-tow)]"
                                    >{m.toMonay}</td>
                                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                                        <div className="flex items-center justify-center gap-[10px]">

                                            <img className="cursor-pointer" title="تعديل" src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                                                router.push("/inventory/1");
                                            }} />

                                            <img className="cursor-pointer" title="حذف" src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                                                setRemovRoles(true)
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-[20px] text-center text-gray-500 text-[12px]">
                                    لا يوجد سجلات
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* ------------------------------------filter Bage----------------------------------------- */}
            <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    );
}
