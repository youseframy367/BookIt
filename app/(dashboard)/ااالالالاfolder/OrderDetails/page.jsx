"use client";

import { useEffect, useState } from "react";
import ChackApproved from "../checkApproved";
export default function OrderDetails() {
  const [orderData, setOrderData] = useState(null);
  // type Approved true or false
  const [chekApproved, setchekApproved] = useState(false)
  // type requst
  const [type, setType] = useState()

  const dateOrder = [
    { key: "CustomerName", label: "اسم العميل", type: "text", color: "#8C94A3" },
    { key: "mail", label: "البريد الإلكتروني", type: "text", color: "#8C94A3", dir: "left" },
    { key: "MobileNumber", label: "رقم الجوال", type: "text", color: "#8C94A3" },
    { key: "numBerson", label: "عدد الأشخاص", type: "text", color: "#23BD33", title: "أشخاص" },
    { key: "time", label: "توقيت الحجز", type: "text", color: "#23BD33" },
    { key: "Date", label: "يوم الحجز المرغوب فيه", type: "text", color: "#23BD33" },
    { key: "PreferenceForSitting", label: "تفضيل الجلوس", type: "text", color: "#8C94A3" },
    { key: "occasion", label: "مناسبة خاصة", type: "text", color: "#8C94A3" },
    { key: "note", label: "ملاحظات خاصة على الطعام الذي سيُقدَّم", type: "text", color: "#8C94A3" },
  ];

  useEffect(() => {
    const data = window.sessionStorage.getItem("bookingEditData");
    if (data) setOrderData(JSON.parse(data));
  }, []);
  if (!orderData) {
    return (
      <p className="p-5 text-center text-[#8C94A3]">
        جارٍ تحميل بيانات الطلب...
      </p>
    );
  }





  return (
    <div className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px]">

      {chekApproved && (
        <ChackApproved typeChack={type} onclose={() => setchekApproved(false)} />)}
      <p className="text-[18px] font-[600] my-[15px]">تفاصيل طلب الحجز</p>

      <div className="grid grid-cols-2 ml-[20%]">
        {dateOrder.map((field, index) => (
          <div key={index} className="flex flex-col gap-[8px] my-[10px]">
            <label className="text-[14px] font-[400] text-[#131313]">{field.label}</label>
            <input
              value={
                (orderData[field.key] ? orderData[field.key] : "") +
                (field.title ? " " + field.title : "")
              } disabled
              readOnly
              dir={field.dir === "left" ? "ltr" : "rtl"}
              className={`w-[93%] h-[48px] px-[10px] border-[1px] text-[16px] font-[400] border-[#E9EAF0] rounded-[8px] ${field.dir === "left" ? "text-left" : "text-right"}`}
              style={{ color: field.color }}
              type={field.type}
            />
          </div>
        ))}
      </div>

      {orderData.hidenBtn && (
        <div className="flex justify-between items-center m-[2%] w-[94%]">
          <button className="w-[100px] h-[48px] text-[16px] font-[600] text-[rgba(29, 29, 29, 0.7)] border-[1px] border-[#FEFE] rounded-[12px]" onClick={() => {
            setType(false)
            setchekApproved(true)
          }}>
            رفض الحجز
          </button>
          <button className="bg-[#183866] text-[#fff] w-[100px] text-[16px] font-[600] h-[48px] rounded-[12px]" onClick={() => {
            setType(true)
            setchekApproved(true)
          }}>
            تأكيد الحجز
          </button>
        </div>
      )}
    </div>
  );
}