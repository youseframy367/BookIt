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
    /* callback خارجي لتبديل حالة الحساب (متوفر/معطل) في نافذة التعديل */
    onToggleStatus?: () => void;
    /* زر الحفظ الخارجي من الصفحات — callback + حالة تحميل اختيارية */
    onSave?: () => void | Promise<void>;
    isSaveLoading?: boolean;
}

export default function AddAndUploadData({ isShowData, isTureUpdateTitle, isFalseUpdateTitle, title, subTitle, children, shadow, isShowUpdate, onSave, isSaveLoading, onToggleStatus }: typeAllData) {
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
                                    /* عند توفر callback خارجي (نافذة التعديل) ننفّذه لتبديل الحالة */
                                    if (onToggleStatus) onToggleStatus();
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
                        disabled={isSaveLoading}
                        onClick={onSave ? () => setRemovRoles(true) : undefined}
                        style={{
                            background: "#183866"
                        }}
                        className=" text-[#fff] w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%] disabled:opacity-50"
                    >
                        {isSaveLoading ? "جارٍ..." : (onSave ? "حفظ" : "اضافة")}
                    </button>
                </div>
            </div>
            {removeRoles && (
                <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                    <div className="w-[448px] rounded-[12px] bg-white py-[20px]">
                        <p className="px-[20px] text-[#131313] font-semibold text-[20px]">تأكيد الإجراء</p>
                        <hr className="text-[#6E7485] mt-[12px]" />
                        <p className="px-[20px] text-[rgba(19,19,19,0.5)] text-[18px] font-normal mt-[20px]">
                            هل أنت متأكد من حفظ التعديلات ؟
                        </p>
                        <div className="px-[20px] flex justify-between gap-[16px] mt-[20px]">
                            <button onClick={() => setRemovRoles(false)} className="bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center">إلغاء</button>
                            <button onClick={() => { setRemovRoles(false); onSave?.(); }} className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center">تأكيد</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}