"use client";

/* ============================== استفسارات العملاء — داتا حقيقية ==============================
   المصدر: GET /api/business/inquiries → [{id, name, email, message, status, createdAt, ...}]
   ============================================================================ */
import { useState, useEffect } from "react";
import { useMsgData } from "@/app/data/dataMsg";
import api from "@/utils/api";

export default function CustomerInquiries() {
  const Masg = useMsgData();
  const [inquiries, setInquiries] = useState<any[] | null>(null);

  useEffect(() => {
    /* نجلب استفسارات العملاء الحقيقية (آخر 20 استفسار) */
    (async () => {
      try {
        const { data } = await api.get("/business/inquiries", { params: { limit: 20 } });
        setInquiries(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("فشل تحميل الاستفسارات:", e);
      }
    })();
  }, []);

  /* إن نجح التحميل نعرض الداتا الحقيقية، وإلا نعود للداتا الوهمية */
  const items = inquiries
    ? inquiries.map((inq: any) => ({
        maseg: `[استفسار] ${inq.name || "زائر"}: ${inq.message || ""}`.slice(0, 120),
        time: new Date(inq.createdAt).toLocaleString("ar-EG", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        icon: "/media/shared/chat/message.svg",
      }))
    : Masg;

  return (
    <div dir="rtl" className="border border-1 border-[rgba(0,0,0,0.1)] w-[37%] bg-[#fff] rounded-[12px] overflow-hidden h-[300px]">

      {/*---------------------------------------- Header Inquiries--------------------------------------- */}

      <div className="w-full flex items-center px-[10px] py-[15px]  justify-between rounded-t-[10px]  ">
        <p className="text-[14px] font-semibold text-[#1D2026]">الاشعارات</p>
        <div className="flex items-center gap-[10px] text-[#6E7485] text-[12px] font-normal cursor-pointer ml-[10px]">
          <span>هذا الأسبوع</span>
          <img src="/media/shared/ui/chevron-down.svg" alt="icon" />
        </div>
      </div>
      <hr className="w-[100%] h-[1px] bg-[#E9EAF0] border-none" ></hr>

      {/*----------------------------------------- Messages  Inquiries-----------------------------------------------------*/}
      <div
        className="flex flex-col p-[10px] gap-2 overflow-y-auto min-h-[300px] max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}

      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-[10px] p-[10px] hover:bg-gray-50 rounded-lg transition-colors items-start "
          >
            {/* Icon Container */}
            <div className="bg-[#F2F4F7] p-1 rounded-full shrink-0">
              <img src={item.icon} alt="msg-icon" className="w-[32px] h-[32px]" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1">
              <p className="text-[12px] text-[#1D2026] leading-[1.6] font-medium mt-[-5px]">
                {item.maseg}
              </p>
              <p className="text-[12px] text-[#8C94A3]">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}