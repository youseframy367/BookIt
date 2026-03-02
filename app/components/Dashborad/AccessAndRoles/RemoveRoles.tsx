"use client";

export default function RemoveRoles({ handleDelete, onClose }: any) {
    return (
        <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
            <div className="w-[684px] h-[178px] rounded-[12px] bg-white p-[20px]">
                <div>
                    <div className="w-full flex flex-col gap-[25px]">
                        <p className="text-[#131313] font-semibold text-[20px]">
                            تأكيد الإجراء
                        </p>

                        <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-normal">
                            هل أنت متأكد أنك تريد حذف هذا الدور
                        </p>
                    </div>
                    <div className="flex gap-[16px] direction-ltr mt-[20px]">
                        <button
                            className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                            onClick={() => {
                                handleDelete()
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
