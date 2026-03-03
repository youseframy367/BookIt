"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AddOrUpdatePopUp from "@/app/components/Cashier/AddOrUpdatePopUp";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";

export default function Customers() {
    const [selectedAddRole, setSelectedAddRole] = useState<string | null>("");
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showUpdateCustomer, setShowUpdateCustomer] = useState(false);
    const [removeRoles, setRemovRoles] = useState(false);

    const handleDelete = () => {

    };

    return (
        <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[25px] ">
            <div className="flex flex-col gap-[23px] pt-[23px]">
                <div className="p-[10px] flex flex-wrap items-center justify-between ">
                    <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
                        نقاط البيع المسجله
                    </p>

                    <div className="flex items-center gap-[15px] flex-1 justify-end">
                        <div className="relative w-[300px]">
                            <span className="absolute top-[10px] mr-[10px]">
                                <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                            </span>
                            <input
                                type="search"
                                placeholder="ابحث عن فرع"
                                className="w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
                            />
                        </div>

                        <button title="اضافة فرع" onClick={() => setShowAddCustomer(true)}
                            className="cursor-pointer text-[#fff] bg-[#183866] text-[500] flex items-center justify-center px-5 py-2 rounded-lg text-[10px] font-medium h-[32px]"
                        >
                            اضافة فرع
                        </button>
                    </div>
                </div>

                {
                    showAddCustomer && <AddOrUpdatePopUp setShowCustomer={setShowAddCustomer} title="اضافة فرع" text="من فضلك اضف الفرع الخاص بك" input="أدخل الفرع" />
                }

                {
                    showUpdateCustomer && <AddOrUpdatePopUp setShowCustomer={setShowUpdateCustomer} title="تعديل فرع" text="من فضلك قم بالتعديل" input="المنصوره , حي الجامعه" />
                }

                {removeRoles && (
                    <RemoveRoles
                        text="هل أنت متأكد أنك تريد حذف هذا الفرع ؟"
                        handleDelete={handleDelete}
                        onClose={() => setRemovRoles(false)} />
                )
                }
                <ul className="flex flex-col gap-5 relative z-1">
                    <li className="border border-1 border-[var(--color-navbar)] rounded-[16px] py-[16px]">
                        <label onClick={() =>
                            setSelectedAddRole(prev =>
                                prev === "Add Role" ? null : "Add Role"
                            )
                        }>
                            <div className="py-[13px] w-full flex justify-between items-center px-[25px]">
                                <span className="text-base font-semibold">اضافة فرع جديد</span>
                                <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedAddRole == 'Add Role' && 'rotate-179'}`} />
                            </div>
                        </label>
                        <hr className="text-[var(--color-line-update)]" />
                        {
                            <div
                                className={`w-full px-[25px] w-[250px] mt-[12px] overflow-hidden transition-all duration-300 ${selectedAddRole === "Add Role" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="flex flex-col gap-[12px]">
                                    <h3 className="text-xs text-[var(--color-name-role)]">أدخل عنوان الفرع</h3>
                                    <div className="text-xs border border-1 border-[var(--color-navbar)] rounded-[8px] text-[var(--color-placholder-input)] relative flex items-center">
                                        <div className="absolute left-2">
                                            <div className="flex items-center justify-center gap-[10px]">
                                                <div onClick={() => {
                                                    setRemovRoles(true)
                                                }} >
                                                    <img className="cursor-pointer" title="حذف" src="/assets/icons/remove.svg" width="24px" height="24px" alt="حذف" />
                                                </div>
                                                <div onClick={() => setShowUpdateCustomer(true)}>
                                                    <img className="cursor-pointer" title="تعديل" src="/img/تعديل.svg" width="24px" height="24px" />
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" className="py-[9px] px-[12px] w-full h-full" placeholder="المنصوره , حي الجامعه" />
                                    </div>
                                </div>
                            </div>
                        }
                    </li>
                </ul>
                <div className="flex justify-between">
                    <Link href="/AccessAndRoles" className="border border-1 border-[var(--color-navbar)] flex gap-[8px] rounded-[8px] py-[7px] px-[23px]">
                        <span className="font-semibold text-[var(--color-btn-update)]">الغاء</span>
                    </Link>
                    <button className="border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-sm px-[23px] py-[7px] rounded-[12px] font-medium">
                        اضافة
                    </button>
                </div>
            </div>
        </section>
    )
}