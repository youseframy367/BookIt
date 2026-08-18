"use client";

/* ============================== نافذة إضافة/تعديل — تدعم الحفظ الفعلي ==============================
   onSave(value): يُستدعى عند الضغط على "حفظ" مع قيمة الحقل
   ============================================================================ */
import Image from "next/image"
import { useState } from "react"

interface typeData {
    title: string;
    text: string;
    input: string;
    defaultText?: string;
    onSave?: (value: string) => void | Promise<void>;
    setShowCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddOrUpdatePopUp({ title, text, input, defaultText, onSave, setShowCustomer }: typeData) {
    const [value, setValue] = useState(defaultText || "");
    const [saving, setSaving] = useState(false);
    return (
    <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
        <div className="w-[448px] rounded-[12px] bg-white py-[20px]">
            <div>
                <div className="w-full flex flex-col gap-[15px]">
                    <div className="flex justify-between items-center px-[20px]">
                        <p className="text-[#131313] font-semibold text-sm">
                            {title}
                        </p>
                        <div className="cursor-pointer" title="close" onClick={() => setShowCustomer(false)}>
                            <Image src="/assets/icons/close.png" alt="close" width={18} height={18} />
                        </div>
                    </div>

                    <hr className="text-[var(--color-grayish-blue)]" />

                    <div className="px-[20px] flex flex-col gap-[15px]">
                        <p className="text-[var(--color-dark-bg-tow)] text-xs font-normal">
                            {text}
                        </p>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={input}
                            className="text-xs border border-[var(--color-grayish-blue)] rounded-[8px] py-[12px] px-[12px]"
                        />
                    </div>
                </div>
                <div className="px-[20px] flex justify-between gap-[16px] direction-ltr mt-[20px]">
                    <button onClick={() => setShowCustomer(false)}
                        className="bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                    >
                        إلغاء
                    </button>

                    <button
                        disabled={saving}
                        onClick={async () => {
                            if (onSave) {
                                setSaving(true);
                                try {
                                    await onSave(value);
                                } finally {
                                    setSaving(false);
                                }
                            }
                            setShowCustomer(false);
                        }}
                        className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center disabled:opacity-50"
                    >
                        {saving ? "جارٍ..." : "حفظ"}
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}