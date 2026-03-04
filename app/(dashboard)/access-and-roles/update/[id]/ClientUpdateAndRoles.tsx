"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useColumnsData } from "@/app/data/dataColumns";

export default function UpdateAccessAndRoles({ id }: { id: string }) {
    const [selectedAddRole, setSelectedAddRole] = useState<string | null>("");
    const [selectedAccess, setSelectedAccess] = useState<string | null>("");

    const columns = useColumnsData();

    const [checked, setChecked] = useState(
        columns.map(col => col.map(() => false))
    );

    const toggleCheckbox = (colIndex: any, idx: any) => {
        const newChecked = [...checked];
        newChecked[colIndex][idx] = !newChecked[colIndex][idx];
        setChecked(newChecked);
    };

    return (
        <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[25px] ">
            <div className="flex flex-col gap-[23px] pt-[23px]">
                <h2 className="text-[#1D1D1D] font-semibold text-base whitespace-nowrap">تعديل دور</h2>
                <ul className="flex flex-col gap-5 relative z-1">
                    <li className="border border-1 border-[var(--gray)] rounded-[16px] py-[16px] px-[25px]">
                        <label onClick={() =>
                            setSelectedAddRole(prev =>
                                prev === "Add Role" ? null : "Add Role"
                            )
                        }>
                            <div title="تعديل دور" className="cursor-pointer py-[13px] w-full flex justify-between items-center">
                                <span className="text-base font-semibold">تعديل دور</span>
                                <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedAddRole == 'Add Role' && 'rotate-179'}`} />
                            </div>
                        </label>
                        <hr className="text-[var(--color-black-05)]" />
                        {
                            <div
                                className={`w-[250px] mt-[12px] overflow-hidden transition-all duration-300 ${selectedAddRole === "Add Role" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="flex flex-col gap-[12px]">
                                    <h3 className="text-xs text-[var(--color-dark-bg-tow)]">الاسم الدور ( AR )</h3>
                                    <input type="text" placeholder="ادخل الاسم" className="text-xs py-[9px] px-[12px] border border-1 border-[var(--gray)] rounded-[8px] text-[var(--color-grayish-blue)]" />
                                </div>
                            </div>
                        }
                    </li>
                    <li className="border border-1 border-[var(--gray)] rounded-[16px] py-[16px] px-[25px]">
                        <label onClick={() =>
                            setSelectedAccess(prev =>
                                prev === "access" ? null : "access"
                            )
                        }>
                            <div title="تعديل دور" className="cursor-pointer py-[13px] w-full flex justify-between items-center">
                                <span className="text-base font-semibold">الصلاحيات ( AR )</span>
                                <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedAccess == 'access' && 'rotate-179'}`} />
                            </div>
                        </label>
                        <hr className="text-[var(--color-black-05)]" />
                        {
                            <div
                                className={`mt-[12px] overflow-hidden transition-all duration-300 ${selectedAccess === "access" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="flex flex-wrap justify-between gap-5">
                                    {columns.map((col, colIndex) => (
                                        <div key={colIndex} className="flex flex-col gap-[12px]">
                                            {col.map((label, idx) => (
                                                <label key={idx} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="peer sr-only"
                                                        checked={checked[colIndex][idx]}
                                                        onChange={() => toggleCheckbox(colIndex, idx)}
                                                    />
                                                    <div className="w-[20px] h-[20px] border-1 border-[#E9EAF0] rounded-[4px] transition-all duration-200 relative">
                                                        {checked[colIndex][idx] && (
                                                            <div className="absolute z-10 w-full h-full">
                                                                <img src="/assets/icons/Checkbox.svg" alt="صج" width={20} height={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px]">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </li>
                </ul>
                <div className="flex justify-between">
                    <Link href="/access-and-roles" className="border border-1 border-[var(--gray)] flex gap-[8px] rounded-[8px] py-[7px] px-[23px]">
                        <span className="font-semibold text-[var(--color-black-50)]">الغاء</span>
                    </Link>
                    <button className="border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-sm px-[23px] py-[7px] rounded-[12px] font-medium">
                        اضافة
                    </button>
                </div>
            </div>
        </section>
    )
}