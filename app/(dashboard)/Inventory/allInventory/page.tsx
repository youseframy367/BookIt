"use client";

import { useState } from "react";
//import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import ConfirmModal from "@/app/components/Dashborad/AccessAndRoles/sure"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pagnation from "@/app/components/public/Pagnation";
import { usePagnation } from "@/app/hooks/usePagnation";
import { dateInventory } from "@/app/data/dateInventory";
export default function AllInventory() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [numperOfId, setId] = useState()
    const [removeProdect, setRemovprodect] = useState(false)

    const DataCustomers = dateInventory;

    const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
        usePagnation(DataCustomers, searchTerm)

    return (
        <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px] ">
            {/*----------------------------------------this is componnt control remove customers----------------------*/}

            {removeProdect && (
                
                // <RemoveRoles
                //  id={numperOfId}
                //  onClose={() => setRemovRoles(false)}
                // />
                <ConfirmModal
                    id={numperOfId}
                    apiUrl="https://your-api.com/RemoveBrodect "
                    title=" تأكيد الإجراء"
                    message="هل أنت متأكد أنك تريد حذف هذا المنتج ؟"
                    confirmText="تأكيد"
                    cancelText="إلغاء"
                    onClose={() => setRemovprodect(false)}
                />

            )}
            {/* ------------------------------------ head bage show all customers----------------------------------------*/}

            <div className="p-[10px] px-[0px] flex flex-wrap items-center justify-between gap-4 ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">المكونات فى المخزون</p>
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

                    <Link href="/access-and-roles/add-role" className="text-center border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[126px] whitespace-nowrap">
                        اضافه منتج جديد للمخزون
                    </Link>

                    <Link href="/access-and-roles/add-role" className="text-center border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px] whitespace-nowrap">
                        تصدير
                    </Link>
                </div>
            </div>

            {/*--------------------------------------------- tabel Customers -----------------------------------------------*/}

            <div className="h-[80vh] mb-[30px] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <table className="min-w-full text-right">
                    <thead className="sticky top-0 bg-[#F6F6F6] z-10 rounded-[4px]">
                        <tr >

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                صوره المنتج
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                اسم المنتج
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center" >
                                سعر الكيلو
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                                الكميه
                            </th>

                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                الحد الادنى للكميه

                            </th>


                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                تاريخ الاضافه

                            </th>
                            <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                                الحاله

                            </th>

                            <th className=" py-3 text-[12px] font-bold text-[#475467] pl-[25px]  whitespace-nowrap text-center">
                                الاجراء
                            </th>

                        </tr>
                    </thead>
                    <tbody className="divide-gray-50">
                        {displayedCustomers.length > 0 ? (
                            displayedCustomers.map((inventory: any, idx: any) => (
                                <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors ">
                                    <td className="px-[8px] py-[12px]" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <img src={inventory.img} alt="صورة" className="w-[40px] h-[28px] rounded-[4px] mx-auto" />
                                    </td>
                                    <td className="px-[8px] py-[15px]   text-[10px] font-[400] text-[var(--color-go-password)] underline overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{inventory.nameProdect}</td>
                                    <td className="px-[8px] py-[15px]   text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{inventory.price}</td>
                                    <td className="px-[8px] py-[15px]  text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{inventory.Quantity}</td>
                                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">
                                        {inventory.MinimumQuantity}
                                    </td>
    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">
                                        {inventory.date}
                                    </td>
                                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">
                                     {inventory.MinimumQuantity === inventory.Quantity? "كن حذرا" : inventory.state? " متوفر":" منتهى"}
                                    </td>
                                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                                        <div className="flex items-center justify-center gap-[10px]">
                                            <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                                                () => {
                                                    router.push("/ModeratorsThree/detalsMoerators");
                                                }}>
                                                <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                                            </span>

                                            <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                                                router.push(`/access-and-roles/${inventory.id}`);
                                            }}
                                            />

                                            <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                                                setRemovprodect(true)
                                                setId(inventory.id);
                                            }

                                            } />

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="p-8 text-center text-[12px] text-[rgba(29,29,29,0.7)]">
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
