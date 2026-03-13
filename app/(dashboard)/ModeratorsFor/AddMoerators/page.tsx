"use client";

import { useState } from "react";
import AddAndUploadData from "@/app/components/Dashborad/AddAndUploadData";

export default function AddModerators() {
  const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev: any) => setImageSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <AddAndUploadData title="اضافة مشرف" subTitle="بيانات المشرف" shadow="shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
      <div className="rounded-[20px] ml-2 flex justify-center items-center flex-col bg-[var(--color-gray-seven)]">
        <div className="relative w-[163px]">
          <img src={imageSrc} width="163px" height="164px" alt="معاينة الصورة" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex justify-center items-center bg-[rgba(19,19,19,0.5)] text-white text-xs font-medium gap-2.5 w-[163px] h-8 rounded-lg -mt-7.5 relative z-[99] cursor-pointer"
          >
            <img src="/img/UploadSimple.svg" alt="أيقونة تحميل" />
            تحميل الصورة
          </label>
        </div>
        <p className="text-[#6E7485] font-normal text-xs w-[178px] text-center mt-5">
          يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
        </p>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-[17px]">
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المشرف (AR)</label>
            <input
              type="text"
              className="text-[#8C94A3] text-sm font-normal h-[42px] border border-gray-300 rounded-[8px] px-2"
              placeholder="أدخل اسم المشرف"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">عنوان الفرع</label>
            <select name="" id="" required className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم جوال</label>
            <input
              type="number"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل رقم الجوال"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم الهوية </label>
            <input
              type="number"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل رقم الهوية"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">البريد الالكتروني</label>
            <input
              type="email"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل البريد الالكتروني"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الدور</label>
            <select name="" id="" required className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">كلمة المرور</label>
            <input
              type="password"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs"> تأكيد كلمة المرور</label>
            <input
              type="password"
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>
        </div>
      </div>
    </AddAndUploadData>
  )
}