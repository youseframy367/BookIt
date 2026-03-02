
"use client";

import { useEffect, useState } from "react";

export default function DetilsMoeratore() {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const data = window.sessionStorage.getItem("dateAcuntModetor");
    if (data) {
      setInitialData(JSON.parse(data));
    }
  }, []);

  if (!initialData) {
    return (
      <div className="w-[94%] m-[2%] bg-[#fff] rounded-[11px] p-[15px] h-[85vh] flex items-center justify-center">
        <p>جارٍ تحميل بيانات المشرف...</p>
      </div>
    );
  }

  return (
    <div className="w-[98%] m-[1%] bg-[#fff] rounded-[11px] p-[20px] h-[85vh]">
      <p className="text-[#3D3D3D] font-semibold my-[10px]">عرض تفاصيل المشرف</p>

      {/* ---------------------------------img & name & name Jop --------------------------------------------*/}
      <div className="flex gap-[10px] m-[20px] items-center">
        <img
          src={initialData.img}
          alt="صورة المشرف"
          className="rounded-full w-[50px] h-[50px] object-cover"
        />
        <div className="flex flex-col gap-[15px]">
          <p className="text-[#3D3D3D] text-[14px] font-semibold">
            {initialData.name}
          </p>
          <p className="text-[#3D3D3D] text-[12px] font-medium">
            {initialData.nameGop}
          </p>
        </div>
      </div>

      {/*  ------------------------------------- date moeratore ---------------------------------------------*/}

      <div className="shadow-md bg-[#FEFEFE] flex flex-col gap-[30px] p-[10px] rounded-[16px] m-[10px] ">
        <div className="flex justify-between mx-[20px] my-[10px]">
          <p className="text-[#131313] font-semibold">
            بيانات الـ{initialData.nameGop}
          </p>
        </div>

        <div className="flex justify-between mx-[20px] my-[20px] pl-[80px]">
          <p className="text-[#656565] text-[14px] font-medium">
            الرقم الوظيفي:{" "}
            <span className="text-[#131313]">{initialData.idNumber}</span>
          </p>
          <p className="text-[#656565] text-[14px] font-medium">
            تاريخ التوظيف:{" "}
            <span className="text-[#131313]">{initialData.date}</span>
          </p>
          <p className="text-[#656565] text-[14px] font-medium">
            الحالة:{" "}
            <span
              className={`${initialData.acount ? "text-[#23BD33]" : "text-[#FF3A3A]"
                }`}
            >
              {initialData.acount ? "نشط" : "معطل"}
            </span>
          </p>
        </div>
      </div>

      <div className="shadow-md bg-[#FEFEFE] flex flex-col gap-[16px] p-[10px] rounded-[16px] m-[10px] ">
        <div className="flex justify-between mx-[20px] my-[10px]">
          <p className="text-[#131313] font-semibold">المعلومات الأساسية</p>
        </div>

        <div className="flex justify-between m-[20px] pl-[30px]">
          <div className="flex flex-col gap-[15px]">
            <p className="text-[#656565] text-[14px] font-medium">
              الاسم بالكامل:{" "}
              <span className="text-[#131313]">{initialData.name}</span>
            </p>
            <p className="text-[#656565] text-[14px] font-medium">
              الوظيفة:{" "}
              <span className="text-[#131313]">{initialData.nameGop}</span>
            </p>
          </div>

          <div className="flex flex-col gap-[15px]">
            <p className="text-[#656565] text-[14px] font-medium">
              البريد الإلكتروني (اختياري):{" "}
              <span className="text-[#131313]">{initialData.email}</span>
            </p>
            <p className="text-[#656565] text-[14px] font-medium">
              الصلاحيات:{" "}
              <span className="text-[#131313]">{initialData.Powers}</span>
            </p>
          </div>

          <div className="flex flex-col gap-[15px]">
            <p className="text-[#656565] text-[14px] font-medium">
              الهاتف:{" "}
              <span className="text-[#131313]">{initialData.numperPone}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="shadow-md bg-[#FEFEFE] flex flex-col gap-[16px] p-[10px] rounded-[16px] m-[10px] ">
        <div className="flex justify-between mx-[20px] my-[10px]">
          <p className="text-[#131313] font-semibold">
            معلومات الهوية الوطنية والإقامة
          </p>
        </div>

        <div className="flex items-center gap-[120px] m-[20px]">
          <p className="text-[#656565] text-[14px] font-medium">
            رقم الهوية / الإقامة:{" "}
            <span className="text-[#131313]">{initialData.idNumber}</span>
          </p>
          <p className="text-[#656565] text-[14px] font-medium">
            العنوان الحالي:{" "}
            <span className="text-[#131313]">{initialData.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
