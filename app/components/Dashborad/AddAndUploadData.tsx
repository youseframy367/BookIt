"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface typeAllData {
    title?: string;
    subTitle?: string;
    shadow?: string;
    children: React.ReactNode;
    isShowUpdate?: boolean;
    isTureUpdateTitle?: string;
    isFalseUpdateTitle?: string;
    isShowData?: boolean;
}

export default function AddAndUploadData({ isShowData, isTureUpdateTitle, isFalseUpdateTitle, title, subTitle, children, shadow, isShowUpdate }: typeAllData) {
    const router = useRouter();

    const [check, setCheck] = useState(false);

    const [removeRoles, setRemovRoles] = useState(false);

    const [formData, setFormData] = useState({
        stateAcunt: true
    });

    return (
        <section>
            <div className="w-[97%] mx-[1%] mt-[2%] flex flex-col p-[10px] bg-[#FEFEFE] rounded-[10px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
                {
                    title &&
                    <div className={`${!isShowUpdate && 'py-5'} flex justify-between items-center`}>
                        <p className="text-[#131313] font-semibold">{title}</p>
                        {
                            isShowUpdate &&
                            <button className="py-[18px] px-[24px] bg-[#F3F5F7] text-[12px] text-[500]" style={{
                                color: formData.stateAcunt ? "#183866" : "#FF3A3A",
                            }}
                                onClick={() => {
                                    setCheck(true)
                                }}>
                                {formData.stateAcunt ? isTureUpdateTitle : isFalseUpdateTitle}
                            </button>
                        }
                    </div>
                }
                <div className={`${shadow} mx-[1%] flex flex-col ${subTitle && 'p-4'} bg-[#FEFEFE] rounded-2xl`}>
                    {
                        subTitle && <div className="py-2">
                            <p className="text-[#131313] font-semibold">{subTitle}</p>
                        </div>
                    }
                    <div className="grid grid-cols-[2fr_8fr] gap-[17px] my-[10px]">
                        {children}
                    </div>
                </div>
                <div className="w-[94%] m-[3%] flex justify-between">
                    <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
                        onClick={() => {
                            router.push("./ModeratorsFor/AllMoerators")
                        }}>
                        إلغاء
                    </button>
                    <button
                        onClick={() => setRemovRoles(true)}
                        style={{
                            background: "#183866"
                        }}
                        className=" text-[#fff] w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%]"
                    >
                        اضافة
                    </button>
                </div>
            </div>
        </section>
    );
}