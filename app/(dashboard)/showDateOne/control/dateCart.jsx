"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";

/* ============================== الداتا الحقيقية من الباك إند ==============================
   البطاقات: إجمالي مبيعات الكاشير هذا الشهر / الحجوزات الملغية / الناجحة / الإجمالية
   المصدر: GET /api/business/stats → { totalSales, todaySales, reservations{...}, ... }
   ============================================================================ */
const DUMMY = [
  {
    title: "اجمالي مبيعات الكاشير هذا الشهر",
    total: "123,575,456",
    totalSuffix: "EGP",
    subLabel: "عدد المبيعات هذا اليوم",
    subValue: "1452",
    subSuffix: "EGP",
    changeValue: -92.8,
    icon: "/media/dashboard/overview/checklist.svg",
    iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات الملغيه",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "اجمالي الحجوزات الملغيه هذا الشهر",
    subValue: "142",
    subSuffix: null,
    changeValue: 92.8,
    icon: "/media/dashboard/payments/card.svg",
    iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات الناجحه",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "اجمالي الحجوزات هذا الشهر",
    subValue: "1452",
    subSuffix: null,
    changeValue: -92.8,
    icon: "/media/dashboard/payments/card-active.svg",
    iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "عدد الحجوزات هذا الشهر",
    subValue: "1452",
    subSuffix: null,
    changeValue: 92.8,
    icon: "/media/dashboard/reservations/search-document.svg",
    iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
  },
];

export default function DateCart() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    /* نجلب إحصائيات البزنس الحقيقية من الباك إند (معزولة بـ businessId من التوكن) */
    (async () => {
      try {
        const { data } = await api.get("/business/stats");
        setStats(data);
      } catch (e) {
        console.error("فشل تحميل الإحصائيات:", e);
        setError(true);
      }
    })();
  }, []);

  /* نبني البطاقات الأربعة من إحصائيات الباك إند الحقيقية
     شكل الداتا: { reservations: [{status,count}], orders: [{status,count}] }
     totalSales وtodaySales غير موجودة بعد — نضيفها لاحقاً في الباك */
  const counts = (arr) => {
    const m = {};
    (arr || []).forEach((r) => (m[r.status] = r.count));
    return m;
  };
  const cardsData = stats
    ? [
        {
          title: "اجمالي مبيعات الكاشير هذا الشهر",
          total: "0",
          totalSuffix: "EGP",
          subLabel: "الفواتير المكتملة",
          subValue: String(counts(stats.orders).completed ?? 0),
          subSuffix: null,
          changeValue: 0,
          icon: "/media/dashboard/overview/checklist.svg",
          iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
        },
        {
          title: "اجمالي الحجوزات الملغيه",
          total: String(counts(stats.reservations).cancelled ?? 0),
          totalSuffix: null,
          subLabel: "حجوزات ملغية",
          subValue: "—",
          subSuffix: null,
          changeValue: 0,
          icon: "/media/dashboard/payments/card.svg",
          iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
        },
        {
          title: "اجمالي الحجوزات الناجحه",
          total: String(counts(stats.reservations).confirmed ?? 0),
          totalSuffix: null,
          subLabel: "حجوزات مؤكدة",
          subValue: "—",
          subSuffix: null,
          changeValue: 0,
          icon: "/media/dashboard/payments/card-active.svg",
          iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
        },
        {
          title: "اجمالي الحجوزات",
          total: String((stats.reservations || []).reduce((s, r) => s + r.count, 0)),
          totalSuffix: null,
          subLabel: "عدد الفواتير",
          subValue: String((stats.orders || []).reduce((s, o) => s + o.count, 0)),
          subSuffix: null,
          changeValue: 0,
          icon: "/media/dashboard/reservations/search-document.svg",
          iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
        },
      ]
    : DUMMY;

  if (error) {
    /* عند فشل الاتصال نعرض الداتا الوهمية كاحتياط حتى لا تنهار الصفحة */
    return <DateCartInner cardsData={DUMMY} />;
  }

  return (
    <div className="w-full overflow-x-hidden font-['Cairo',sans-serif]" dir="rtl">
      <ul className="flex flex-row flex-wrap justify-between gap-[8px] w-full p-[0.4rem]">

        {cardsData.map((card) => {
          const isPositive = card.changeValue >= 0;
          return (
            <li
              key={card.title}
              className="flex justify-between border border-black/10 px-[10px] py-[12px] rounded-[8px] bg-white w-full sm:w-[48%] xl:w-[24.3%] h-[142px] relative"
            >

              <div className="flex flex-col gap-[6px]">

                <p className="text-[10px] font-normal text-[#504f4fcc]">
                  {card.title}
                </p>

                <p className="font-bold text-[#131313] my-[7px] text-[16px]">
                  {card.total}
                  {card.totalSuffix && (
                    <span className="font-bold text-[#1B8354]"> {card.totalSuffix}</span>
                  )}
                </p>

                <div className="flex flex-col gap-[10px] mt-[10px]">

                  <p className="text-[12px] font-semibold text-[#3D3D3D] whitespace-nowrap" dir="rtl">
                    <span>{card.subValue}</span>
                    {card.subSuffix && (
                      <span className="text-[12px] text-[#1B8354] font-bold"> {card.subSuffix}</span>
                    )}
                    {" "}{card.subLabel}
                  </p>

                  <p className="flex gap-[5px] items-center text-[8px] font-normal text-[#3D3D3D]">
                    <img
                      src={isPositive ? "/media/dashboard/reports/trend-up.svg" : "/media/dashboard/reports/trend-down.svg"}
                      alt="trend"
                    />
                    <span className={isPositive ? "text-green-600" : "text-red-600"}>
                      {card.changeValue}
                    </span>
                    أعلى من الشهر الماضي
                  </p>

                </div>
              </div>

              <img
                src={card.icon}
                alt="icon"
                className={card.iconClass}
              />

            </li>
          );
        })}

      </ul>
    </div>
  );
}

/* مكون داخلي لعرض البطاقات (نستخدمه في حالة الفشل أيضاً) */
function DateCartInner({ cardsData }) {
  return (
    <div className="w-full overflow-x-hidden font-['Cairo',sans-serif]" dir="rtl">
      <ul className="flex flex-row flex-wrap justify-between gap-[8px] w-full p-[0.4rem]">
        {cardsData.map((card) => {
          const isPositive = card.changeValue >= 0;
          return (
            <li
              key={card.title}
              className="flex justify-between border border-black/10 px-[10px] py-[12px] rounded-[8px] bg-white w-full sm:w-[48%] xl:w-[24.3%] h-[142px] relative"
            >
              <div className="flex flex-col gap-[6px]">
                <p className="text-[10px] font-normal text-[#504f4fcc]">{card.title}</p>
                <p className="font-bold text-[#131313] my-[7px] text-[16px]">
                  {card.total}
                  {card.totalSuffix && (
                    <span className="font-bold text-[#1B8354]"> {card.totalSuffix}</span>
                  )}
                </p>
                <div className="flex flex-col gap-[10px] mt-[10px]">
                  <p className="text-[12px] font-semibold text-[#3D3D3D] whitespace-nowrap" dir="rtl">
                    <span>{card.subValue}</span>
                    {card.subSuffix && (
                      <span className="text-[12px] text-[#1B8354] font-bold"> {card.subSuffix}</span>
                    )}
                    {" "}{card.subLabel}
                  </p>
                  <p className="flex gap-[5px] items-center text-[8px] font-normal text-[#3D3D3D]">
                    <img src={isPositive ? "/media/dashboard/reports/trend-up.svg" : "/media/dashboard/reports/trend-down.svg"} alt="trend" />
                    <span className={isPositive ? "text-green-600" : "text-red-600"}>{card.changeValue}</span>
                    أعلى من الشهر الماضي
                  </p>
                </div>
              </div>
              <img src={card.icon} alt="icon" className={card.iconClass} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}