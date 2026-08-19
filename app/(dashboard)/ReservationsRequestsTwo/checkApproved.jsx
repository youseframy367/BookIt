"use client";

import { useState } from "react";

export default function ChackApproved({ typeChack, onclose }) {
    const [showNote, setShowNote] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            console.log("تم إرسال الملاحظة:", text);
            setLoading(false);
            onclose();
        }, 1000);
    };

    return (
        <div
           className="bg-[rgba(29,29,29,0.25)] flex justify-center items-center fixed top-[70px] left-0 z-[999] w-full h-full"
            onClick={onclose}
        >
            {!showNote ? (
                <div
                    className="w-[440px] h-[243px] rounded-[16px] bg-[#fff] p-[20px] flex flex-col gap-[10px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-[18px] text-[#131313] font-[600]">إرسال ملاحظة</p>
                    <p className="text-[14px] font-[400] text-[#ABABAB]">
                        يمكنك إرسال ملاحظة للعميل بشأن الحجز وسوف يستقبلها على بريده الإلكتروني.
                    </p>

                    <button
                        className="w-[400px] h-[48px] rounded-[12px] bg-[#193867] text-[#fff] text-[14px] font-[600]"
                        onClick={() => setShowNote(true)}
                    >
                        {typeChack
                            ? "نعم، أريد إرسال ملاحظة مع الحجز"
                            : "نعم، أريد إرسال ملاحظة مع رفض الحجز"}
                    </button>

                    <button
                        className="w-[400px] h-[48px] rounded-[12px] bg-[#F4F4FE] text-[#193867] text-[14px] font-[500]"
                        onClick={onclose}
                    >
                        {typeChack
                            ? "لا، فقط تأكيد الحجز بدون ملاحظة"
                            : "لا، فقط تأكيد رفض الحجز بدون ملاحظة"}
                    </button>
                </div>
            ) : (
                <div
                    className="w-[500px] h-[316px] rounded-[12px] bg-[#fff] shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="flex justify-between p-[20px] rounded-t-[12px]"
                        style={{ boxShadow: "0 0 1px #00000040" }}
                    >
                        <p className="text-[#1D2026] font-[500] text-[14px]">
                            ادخل ملاحظتك
                        </p>
                        <img
                            src="/media/shared/ui/close-muted.svg"
                            alt="close"
                            className="cursor-pointer"
                            onClick={onclose}
                        />
                    </div>

                    <div
                        className="w-full p-[15px]"
                        style={{ boxShadow: "0 0 1px #00000040" }}
                    >
                        <p className="text-[#1D2026] text-[12px] font-[400] mx-[10px]">
                            اكتب الملاحظه التى تريد ارسالها للعميل عبر البريد
                        </p>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-[96%] m-[2%] h-[130px] overflow-y-auto p-[10px] border border-[#E9EAF0] rounded-[8px] text-[12px] text-[#333] focus:outline-none focus:border-[#193867]"
                            placeholder="اكتب ملاحظتك هنا..."
                        />

                        <div className="flex justify-between items-center m-[15px]">
                            <button
                                className="w-[90px] h-[39px] flex justify-center items-center text-[#131313] bg-[#F5F7FA] rounded-[8px] text-[12px] font-[600]"
                                onClick={() => setShowNote(false)}
                            >
                                إلغاء
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-[90px] h-[39px] flex justify-center items-center rounded-[8px] text-[12px] font-[600] ${loading
                                        ? "bg-[#999] text-[#eee] cursor-not-allowed"
                                        : "bg-[#193867] text-[#fff]"
                                    }`}
                            >
                                {loading ? "جارٍ الإرسال..." : "ارسال"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}