"use client";

/* ============================== أكثر العملاء استمراراً — داتا حقيقية ==============================
   المصدر: GET /api/business/persistent-customers → [{customerId, customerName, bookingCount}]
   (الباك لا يرجع رقم الجوال/الإيميل/آخر حجز، نعرض المتاح فقط ونستخدم الداتا الوهمية fallback)
   ============================================================================ */
import { useState, useEffect } from "react";
import { useCustomersData } from "@/app/data/dataCustomers";
import api from "@/utils/api";

export default function MostPersistentCustomers() {
  const DataCustomers = useCustomersData();
  const [customers, setCustomers] = useState<any[] | null>(null);

  useEffect(() => {
    /* نجلب قائمة أكثر العملاء تكراراً من الباك إند */
    (async () => {
      try {
        const { data } = await api.get("/business/persistent-customers", { params: { limit: 15 } });
        setCustomers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("فشل تحميل أكثر العملاء استمراراً:", e);
      }
    })();
  }, []);

  /* داتا حقيقية إن نجح التحميل، وإلا الداتا الوهمية */
  const rows = customers
    ? customers.map((c: any) => ({
        CustomerName: c.customerName,
        LastReservationDate: `حجوزات: ${c.bookingCount ?? 0}`,
        MobileNumber: "—",
        mail: c.customerId ? `${c.customerId.slice(0, 8)}...` : "—",
      }))
    : DataCustomers;

  const title = [
    "اسم العميل", "اخر تاريخ حجز",
    "رقم الجوال", "البريد", "الاجراء"
  ];

  return (
    <div className="shadow-[0px_0px_1px_0px_#00000040] border border-1 border-[rgba(0,0,0,0.1)] w-[60%]  bg-[#fff] mr-[10px]  rounded-lg h-[300px]  overflow-hidden" dir="rtl">

      {/*--------------------------------------- Header -------------------------------------------------------- */}
      <div className="w-full flex items-center px-[10px] py-[15px] justify-between rounded-t-[10px]  ">
        <p className="text-[14px] font-semibold text-[#131313]">أكثر العملاء استمراراً</p>
        <div className="flex items-center gap-[10px] text-[#6E7485] text-[12px] font-normal cursor-pointer ml-[5px]">
          <span>هذا الشهر</span>
          <img src="/img/ChevronDown.svg" alt="icon" />
        </div>
      </div>
      {/*------------------------------------tabel content most customer -----------------------------------------*/}
      <div className="max-h-[300px] overflow-y-auto" style={{
        msOverflowStyle: "none", scrollbarWidth: "none",
      }} >
        <table className="w-full text-right  ">
          <thead className="sticky top-0 bg-white z-10">
            <tr >
              {title.map((item, index) => (
                <th
                  key={index}
                  className="px-2 py-2 text-[10px] font-semibold  text-center whitespace-nowrap "
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((customer, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors" style={{

              }}>
                <td className="px-[4px] py-[10px] text-[8px] text-[#667085] border-b border-[#F6F6F6] text-center">{customer.CustomerName}</td>
                <td className="px-[4px] py-[10px] text-[8px] text-[#667085] border-b border-[#F6F6F6] text-center">{customer.LastReservationDate}</td>
                <td className="px-[4px] py-[10px] text-[8px] text-[#667085] border-b border-[#F6F6F6] text-center">{customer.MobileNumber}</td>
                <td className="p-[4px] text-[8px] text-[#667085] border-b border-[#F6F6F6] text-center">{customer.mail}</td>
                <td className="p-[4px] text-[8px] border-b border-[#F6F6F6] text-center">
                  <button className="text-[#131313] m-[5px] hover:text-black">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}