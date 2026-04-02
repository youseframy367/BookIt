"use client";

import { useRef, useState } from "react";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import { useRouter } from "next/navigation";
import Pagnation from "../../../components/public/Pagnation";
import { usePagnation } from "../../../hooks/usePagnation";
import { useProductsCahsersData } from "../../../data/dataProductsCahser";
import Export from "@/app/components/Dashborad/Inventory/Export";

export default function Products() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [numperOfId, setId] = useState()
    const [removeRoles, setRemovRoles] = useState(false)

    const tableRef = useRef<HTMLDivElement>(null);

    const DataCustomers = useProductsCahsersData();

    const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
        usePagnation(DataCustomers, searchTerm)

    const handleDelete = () => {

    };

    return (
        <section className="flex w-[98%] m-[1%] bg-[#fff] rounded-[11px] flex-col px-[15px] ">
            {removeRoles && (
                <RemoveRoles
                    text="هل أنت متأكد أنك تريد حذف هذا الدور ؟"
                    handleDelete={handleDelete}
                    onClose={() => setRemovRoles(false)} />
            )
            }
            <div className="p-[10px] flex flex-wrap items-center justify-between gap-4 ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">كل المشرفين</p>
                <div className="flex items-center gap-[10px] flex-1 justify-end ml-[10px]">

                    <div className="relative w-full max-w-[200px]">
                        <span className="absolute top-[10px] mr-[10px]">
                            <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                        </span>
                        <input
                            type="search"
                            placeholder="البحث"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
                        />
                    </div>
                    <Export displayedCustomers={displayedCustomers} tableRef={tableRef}  />
                </div>
            </div>

            {/*--------------------------------------------- tabel Customers -----------------------------------------------*/}

            <div className="h-[74vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} ref={tableRef}>
                <table className="min-w-full text-right h-[95%]">
                    <thead className="sticky top-0 bg-[#F6F6F6] rounded-[4px]">
                        <tr >

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                اسم الموظف
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                كود العميل
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center" >
                                تاريخ العمليه
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                طريقة الدفع
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                العنوان
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                سعر الفاتوره
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                نوع الأوردر
                            </th>

                            <th className=" py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                الاجراء
                            </th>
                        </tr>
                    </thead >
                    <tbody className="divide-gray-50">
                        {displayedCustomers.length > 0 ? (
                            displayedCustomers.map((customer: any, idx: any) => (
                                <tr key={idx} className={`hover:bg-[#F9FAFB]/50 transition-colors ${customer.status === "معلق" && "opacity-50"
                                    }`}>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[400] text-[var(--color-go-password)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.name}</td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[400] text-[var(--color-go-password)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                                        {customer.code}
                                    </td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[500] text-[var(--color-go-password)] overflow-hidden whitespace-nowrap text-center">{customer.time}</td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[500] text-[#144EA1] overflow-hidden whitespace-nowrap text-center">{customer.paymentGetway}</td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[500] text-[var(--color-go-password)] overflow-hidden whitespace-nowrap text-center">{customer.address}</td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[500] text-[#23BD33] overflow-hidden whitespace-nowrap text-center">{customer.price}</td>
                                    <td className="px-[8px] py-[10px] text-[10px] font-[500] text-[var(--color-go-password)] overflow-hidden whitespace-nowrap text-center">{customer.typeOrder}</td>

                                    <td className="px-[8px] py-[10px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-[10px]">
                                            <span title="معاينه" className="cursor-pointer flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                                                () => {
                                                    router.push(`/cashier/products/details-invoice/${customer.id}`);
                                                }}>
                                                <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                                            </span>

                                            <img className="cursor-pointer" title="تعديل" src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                                                router.push(`/cashier/products/details-employees/${customer.id}`);
                                            }} />

                                            <img className="cursor-pointer" title="حذف" src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                                                setRemovRoles(true)
                                                setId(customer.id);
                                            }} />

                                        </div>
                                    </td>
                                </tr >
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="p-8 text-center text-[12px] text-[rgba(29,29,29,0.7)]">
                                    لا يوجد سجلات
                                </td>
                            </tr>
                        )
                        }
                    </tbody >
                </table >
            </div >

            {/* ------------------------------------filter Bage----------------------------------------- */}
            <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section >
    );
}