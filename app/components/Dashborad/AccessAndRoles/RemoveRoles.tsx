"use client";

interface typeData {
    text: string;
    onClose: () => void;
    handleDelete: () => void;
    onDeleted?: (id?: string) => void;
}

export default function RemoveRoles({ text, handleDelete, onClose, onDeleted }: typeData) {
    return (
        <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center ">
            <div className="w-[min(684px,92%)] h-auto rounded-[12px] bg-white p-[20px]">
                <div>
                    <div className="w-full flex flex-col gap-[25px]">
                        <p className="text-[#131313] font-semibold text-[20px]">
                            تأكيد الإجراء
                        </p>

                        <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-normal">
                            {text}
                        </p>
                    </div>
                    <div className="flex gap-[16px] justify-end mt-[20px]">
                        <button
                            className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                            onClick={() => {
                                handleDelete()
                                onDeleted && onDeleted()
                                onClose()
                            }}
                        >
                            تأكيد
                        </button>

                        <button
                            className="bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                            onClick={onClose}
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
