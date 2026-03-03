"use client";
import axios from "axios";
import React from "react";

export default function ConfirmModal({
  id,
  apiUrl,
  title = "تأكيد الإجراء",
  message = "هل أنت متأكد أنك تريد تنفيذ هذا الإجراء؟",
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onClose,

}) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      console.log("Deleted successfully:", response.data);
      console.log(" تم الحذف بنجاح ")
      if (onSuccess) onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("حدث خطأ أثناء عملية الحذف");
    }
  };

  return (
  <div className="fixed top-0 left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[9999]">
  <div className="w-[684px] h-[178px] rounded-[12px] bg-[#ffffff] p-[20px]">
    <div className="flex flex-col gap-[25px]">
      <p className="text-[#131313] font-[600] text-[20px]">{title}</p>
      <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-[400]">
        {message}
      </p>
    </div>

    <div className="flex gap-[16px] mt-[20px]" dir="ltr">
      <button
        onClick={handleDelete}
        className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-[#ffffff] text-[14px] font-[500] tracking-[0px] px-[31px] py-[13px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
      >
        {confirmText}
      </button>

      <button
        onClick={onClose}
        className="bg-[#F5F7FA] border-none text-[#183866] text-[14px] font-[500] tracking-[0px] px-[31px] py-[13px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
      >
        {cancelText}
      </button>
    </div>
  </div>
</div>
  );
}