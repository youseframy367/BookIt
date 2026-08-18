"use client";

/* ============================== حذف حجز — داتا حقيقية ==============================
   المصدر: DELETE /api/reservations/:id
   ============================================================================ */
import api from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RemoveBooking({ id, onClose, onDeleted }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      toast.success("تم حذف الحجز بنجاح ✅");
      /* نُخبر الصفحة الأم بحذف الصف من الجدول مباشرة */
      if (onDeleted) onDeleted(id);
      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("حدث خطأ أثناء حذف الحجز ❌");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "0px",
        width: "100%",
        height: "100%",
        background: "rgba(29,29,29,0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
      }}
    >
      <div
        style={{
          width: "min(684px, 90%)",
          minHeight: "178px",
          height: "auto",
          borderRadius: "12px",
          background: "#fff",
          padding: "20px",
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "25px",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                color: "#131313",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              تأكيد الإجراء
            </p>
            <p
              style={{
                color: "rgba(19,19,19,0.5)",
                fontSize: "18px",
                fontWeight: "400",
              }}
            >
              هل أنت متأكد أنك تريد حذف هذا اليوم المحدد من الحجوزات؟
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              direction: "ltr",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                background: "#183866",
                border: "solid 1px rgba(12, 10, 52, 0.2)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                padding: "13px 31px",
                borderRadius: "8px",
                width: "90px",
                height: "38px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleDelete(id)}
            >
              تأكيد
            </button>

            <button
              style={{
                background: "#F5F7FA",
                border: "none",
                color: "#183866",
                fontSize: "14px",
                fontWeight: "500",
                padding: "13px 31px",
                borderRadius: "8px",
                width: "90px",
                height: "38px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
