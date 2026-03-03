export default function CheckAcunt({ onClose, typeAcunt, onConfirm }) {

    const bgColor = typeAcunt ? "#23BD33" : "#FF3A3A";

    return (
        <div
            className="fixed top-[0px] left-[0px] w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[9999]">
            <div className="w-[684px] h-[178px] rounded-[12px] bg-[#fff] p-[20px]">
                <div>
                    <div className="w-[100%] flex flex-col gap-[30px]" >
                        <p className="text-[#131313] font-[600] text-[20px]" >
                            تأكيد الإجراء
                        </p>
                        <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-[400]" >
                            هل أنت متأكد أنك تريد{typeAcunt ? "ايقاف تنشيط" : "تفعيل"} هذا الحساب ؟
                        </p>
                    </div>
                    <div className="flex gap-[16px] mt-[10px]" dir="ltr" >
                        <button style={{
                            background: typeAcunt ? "#23BD33" : "#FF3A3A",
                        }} className={`text-[#fff] w-[90px] h-[38px] flex justify-center items-center text-[14px] font-[500] tracking-[0px] py-[13px] px-[31px] rounded-[8px] bg-${bgColor} border-[1px] border-[rgba(12, 10, 52, 0.2)]  `}

                            onClick={onConfirm}
                        >
                            تاكيد
                        </button>
                        <button className="py-[13px] px-[31px] w-[90px] h-[38px] flex flex-col items-center bg-[#F5F7FA] border-none text-[#183866] text-[14px] font-[500] tracking-[0px]"

                            onClick={onClose}

                        >
                            الغاء
                        </button>




                    </div>
                </div>

            </div>


        </div>
    )
}