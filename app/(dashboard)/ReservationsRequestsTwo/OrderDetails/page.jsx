"use client";

/* ============================== تفاصيل طلب الحجز — داتا حقيقية ==============================
   المصدر: GET /api/reservations/:id → بيانات الحجز الكاملة
   + PATCH /api/reservations/:id/status → تأكيد (confirmed) / إلغاء (cancelled)
   ============================================================================ */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ChackApproved from "../checkApproved";
import api from "@/utils/api";
import { reservationsApi } from "@/utils/api";

export default function OrderDetails() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  // type Approved true or false
  const [chekApproved, setchekApproved] = useState(false)
  // type requst
  const [type, setType] = useState()
  const [confirming, setConfirming] = useState(false);

  function getStateColor(state) {
    switch (state) {
      case "ملغى": return "#FF3A3A";
      case "مستكمل": return "#22C55E";
      case "لم يتم التأكيد": return "#D69C21";
      default: return "#1D1D1DB3";
    }
  }

  const dateOrder = [
    { key: "CustomerName", label: "اسم العميل", type: "text", color: "#8C94A3" },
    { key: "mail", label: "البريد الإلكتروني", type: "text", color: "#8C94A3", dir: "left" },
    { key: "MobileNumber", label: "رقم الجوال", type: "text", color: "#8C94A3" },
    { key: "numBerson", label: "عدد الأشخاص", type: "text", color: "#23BD33", title: "أشخاص" },
    { key: "time", label: "توقيت الحجز", type: "text", color: "#23BD33" },
    { key: "Date", label: "يوم الحجز المرغوب فيه", type: "text", color: "#23BD33" },
    { key: "PreferenceForSitting", label: "تفضيل الجلوس", type: "text", color: "#8C94A3" },
    { key: "AmountBaid", label: "تم دفع مقدم حجز", type: "text", color: '#C9921A' },
    { key: "note", label: "ملاحظات خاصة على الطعام الذي سيُقدَّم", type: "text", color: "#8C94A3" },

    { key: "occasion", label: "مناسبة خاصة", type: "text", color: "#8C94A3" },
    { key: "state", label: 'حاله الحجز', type: "text", color: '' }

  ];

  useEffect(() => {
    const raw = window.sessionStorage.getItem("bookingEditData");
    const cached = raw ? JSON.parse(raw) : null;
    /* نمزج الكاش مع أحدث داتا من الباك إند إن توفّر الـ id */
    (async () => {
      if (cached?.id) {
        try {
          const { data } = await reservationsApi.get(cached.id);
          if (data) {
            setOrderData({
              ...cached,
              id: data.id,
              CustomerName: data.customerName,
              mail: data.customerEmail,
              MobileNumber: data.customerPhone,
              numBerson: data.numberOfPeople,
              time: data.startTime,
              Date: new Date(data.dateFrom).toLocaleDateString("ar-EG"),
              PreferenceForSitting: data.seatingPreference,
              AmountBaid: data.depositAmount,
              note: data.notes || data.specialRequests,
              occasion: data.specialOccasion,
              state: data.status === "confirmed" ? "مستكمل" : data.status === "cancelled" ? "ملغى" : "لم يتم التأكيد",
              status: data.status,
            });
            return;
          }
        } catch (e) {
          console.error("فشل تحميل تفاصيل الحجز من الباك:", e);
        }
      }
      setOrderData(cached);
    })();
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
      <p className="text-[18px] font-[600] mt-[20px]">تفاصيل طلب الحجز</p>

      {/* أزرار تأكيد / رفض الحجز (تحدّث الحالة في الباك إند مباشرة) */}
      {orderData?.id && (
        <div className="flex items-center gap-[12px] mt-[10px]">
          <button
            disabled={confirming}
            className="bg-[#183866] text-[#fff] text-[13px] font-medium px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={async () => {
              setConfirming(true);
              try {
                /* تأكيد الحجز: pending -> confirmed */
                await reservationsApi.updateStatus(orderData.id, "confirmed");
                toast.success("تم تأكيد الحجز بنجاح ✅");
                setOrderData((d) => ({ ...d, state: "مستكمل", status: "confirmed" }));
              } catch (e) {
                console.error("فشل التأكيد:", e);
                toast.error("حدث خطأ أثناء تأكيد الحجز ❌");
              } finally {
                setConfirming(false);
              }
            }}
          >
            {confirming ? "جارٍ التأكيد..." : "تأكيد الحجز"}
          </button>
          <button
            disabled={confirming}
            className="bg-[#FF3A3A] text-[#fff] text-[13px] font-medium px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={async () => {
              setConfirming(true);
              try {
                /* إلغاء الحجز: أي حالة -> cancelled */
                await reservationsApi.updateStatus(orderData.id, "cancelled");
                toast.success("تم إلغاء الحجز ✅");
                setOrderData((d) => ({ ...d, state: "ملغى", status: "cancelled" }));
              } catch (e) {
                console.error("فشل الإلغاء:", e);
                toast.error("حدث خطأ أثناء إلغاء الحجز ❌");
              } finally {
                setConfirming(false);
              }
            }}
          >
            {confirming ? "جارٍ الإلغاء..." : "رفض الحجز"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-[10px] mt-[10px]">
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
              style={{ color: field.key === "state" ? getStateColor(orderData.state) : field.color }}
              type={field.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}