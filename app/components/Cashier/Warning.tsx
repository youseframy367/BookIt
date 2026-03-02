"use client";
import Image from "next/image";

export default function WarningProducts({ isStyleBtn, onClose }: any) {
    return (
        <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
            <div className="w-[684px] h-[178px] rounded-[12px] bg-white p-[20px]">
                <div>
                    <div className="w-full flex flex-col gap-[25px]">
                        <div className="flex gap-[8px]">
                            <Image src="/assets/icons/warning.svg" alt="تحذير" width={19} height={17} />
                            <span className="font-semibold text-xl text-[var(--color-warning)]">تحذير</span>
                        </div>

                        <p className="text-[rgba(19,19,19,0.5)] text-lg font-normal">
                            منتج  <span className="text-[var(--color-warning)]">( اللبن - السكر )</span> قد وصلوا الي الحد الادني كن حذرا
                        </p>
                    </div>
                    <div className="flex justify-end gap-[16px] mt-[20px]">
                        <button
                            title="عدم تنفيذ العمليه"
                            className="cursor-pointer bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[7px] rounded-[8px] h-[38px] flex justify-center items-center"
                            onClick={onClose}
                        >
                            عدم تنفيذ العمليه
                        </button>
                        <button
                            title="تنفيذ علي أي حال"
                            className={`${isStyleBtn} cursor-pointer bg-[var(--color-warning)] text-white text-[14px] font-medium py-[13px] px-[7px] rounded-[8px] h-[38px] flex justify-center items-center`}
                            onClick={onClose}
                        >
                            تنفيذ علي أي حال
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
