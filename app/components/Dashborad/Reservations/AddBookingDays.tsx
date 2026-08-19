"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface passClose {
  onClose: () => void;
}

export default function AddBookingDays({ onClose }: passClose) {
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null);
  const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(null);
  const [numPersons, setNumPersons] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [minDeposit, setMinDeposit] = useState<number | "">("");
  const [isFreeBooking, setIsFreeBooking] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("bookingEditData");
    if (stored) {
      const data = JSON.parse(stored);
      setIsEditMode(true);

      setNumPersons(data.numPersons || "");

      const [dFrom, mFrom, yFrom] = data.dateFrom?.split("/") || [];
      const [dTo, mTo, yTo] = data.dateTo?.split("/") || [];

      setSelectedDateFrom(
        data.dateFrom ? new Date(`${yFrom}-${mFrom}-${dFrom}`) : null
      );

      setSelectedDateTo(
        data.dateTo ? new Date(`${yTo}-${mTo}-${dTo}`) : null
      );

      const parseTime = (timeStr: any) => {
        if (!timeStr) return null;
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        hours = modifier === "PM" && hours !== "12" ? +hours + 12 : hours;
        hours = modifier === "AM" && hours === "12" ? 0 : +hours;
        const date = new Date();
        date.setHours(hours, +minutes, 0, 0);
        return date;
      };

      setStartTime(parseTime(data.startTime));
      setEndTime(parseTime(data.endTime));
    }
  }, []);

  const handleSubmit = async () => {
    if (!selectedDateFrom || !selectedDateTo || !numPersons) {
      alert("من فضلك أدخل كل البيانات المطلوبة");
      return;
    }

    const payload = {
      numPersons: Number(numPersons),
      dateFrom: selectedDateFrom?.toISOString(),
      dateTo: selectedDateTo?.toISOString(),
      startTime: startTime ? startTime.toISOString() : null,
      endTime: endTime ? endTime.toISOString() : null,
      minDeposit: isFreeBooking ? 0 : minDeposit,
    };

    try {
      setLoading(true);

      const endpoint = isEditMode
        ? "/api/bookings/update-day"
        : "/api/bookings/add-days";

      const response = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("فشل في إرسال البيانات");

      const data = await response.json();
      console.log("✅ تم الإرسال بنجاح:", data);
      alert(isEditMode ? "تم تعديل اليوم بنجاح!" : "تم إضافة الأيام بنجاح!");
      window.sessionStorage.removeItem("bookingEditData");
      onClose();
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      alert("حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[rgba(29,29,29,0.25)] flex justify-center items-center fixed top-[70px] left-0 z-[999] w-full h-full">
      <div className="w-[448px] bg-[#fff] rounded-[12px] flex flex-col">
        <div className="w-full flex justify-between p-[20px] border-b border-[#E9EAF0] rounded-t-[12px]">
          <h2 className="text-[14px] font-[500] text-[#1D2026] mb-1">
            {isEditMode
              ? "مشاهده ونعديل تفاصيل اليوم"
              : "اضافة ايام حجز جديده"}
          </h2>
          <img
            src="/media/shared/ui/close-muted.svg"
            width="18px"
            height="18px"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="p-[20px] flex flex-col gap-6 border-b border-[#E9EAF0]">

          <div className="flex flex-col gap-[18px]">
            <label className="text-[12px] font-medium text-[#1D2026]" htmlFor="num">حدد الحد الادنى لمقدم الحجز</label>
            <input
              type="number"
              value={isFreeBooking ? 0 : minDeposit}
              onChange={(e) =>
                setMinDeposit(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="ادخل الحد الادنى"
              className="no-spinner border text-[#8C94A3] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 h-[42px]"
            />
            <div className=" flex gap-[10px] px-2">
              <input

                checked={isFreeBooking}
                onChange={(e) => setIsFreeBooking(e.target.checked)}
                type="checkbox" id="check"></input>
              <label htmlFor="check" className=" text-[10px] font-[500] text-[#636872]">لا ؛ أريد الحجز مجاني بدون دفع مقدم</label>

            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            <label className="text-[12px] font-medium text-[#1D2026]">
              عدد الأشخاص المتاح استقبالهم
            </label>
            <input
              type="number"
              placeholder="ادخل عدد الأشخاص"
              value={numPersons}
              onChange={(e) => setNumPersons(e.target.value)}
              className="no-spinner border text-[#8C94A3] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 h-[42px]"
            />
          </div>

          <div className="flex flex-col gap-[18px]">
            <label className="text-[12px] font-medium text-[#1D2026]">
              اختر الفترة
            </label>
            <div className="flex gap-3 w-full">
              <div className="flex w-[195px]">
                <DatePicker
                  selected={selectedDateFrom}
                  onChange={(date: any) => setSelectedDateFrom(date)}
                  placeholderText="من"
                  className="border text-[#8C94A3] h-[42px] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 w-[195px]"
                />
                <img
                  src="/media/dashboard/reservations/calendar-grid.svg"
                  width="16px"
                  height="17px"
                  className="relative left-[30px]"
                />
              </div>

              <div className="flex w-[195px]">
                <DatePicker
                  selected={selectedDateTo}
                  onChange={(date: any) => setSelectedDateTo(date)}
                  placeholderText="الى ( اختيارى )"
                  className="border text-[#8C94A3] h-[42px] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 w-[195px]"
                />
                <img
                  src="/media/dashboard/reservations/calendar-grid.svg"
                  width="16px"
                  height="17px"
                  className="relative left-[30px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <label className="text-[12px] font-medium text-[#1D2026]">
              أدخل الوقت الغير متاح في هذا اليوم (في حاله عدم الاضافه يصبح اليوم متاح)
            </label>
            <div className="flex gap-3 w-full">
              <div className="flex w-[195px]">
                <DatePicker
                  selected={startTime}
                  onChange={(date: any) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="من"
                  dateFormat="HH:mm"
                  placeholderText="00 : 00 PM"
                  className="border text-[#8C94A3] h-[42px] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 w-[195px]"
                />
                <img
                  src="/media/shared/ui/clock.svg"
                  width="16px"
                  height="17px"
                  className="relative left-[30px]"
                />
              </div>

              <div className="flex w-[195px]">
                <DatePicker
                  selected={endTime}
                  onChange={(date: any) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="إلى"
                  dateFormat="HH:mm"
                  placeholderText="00 : 00 PM"
                  className="border text-[#8C94A3] h-[42px] text-[12px] font-[400] border-gray-300 rounded-md px-3 py-2 w-[195px]"
                />
                <img
                  src="/media/shared/ui/clock.svg"
                  width="16px"
                  height="17px"
                  className="relative left-[30px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between  m-2">
            <button
              className="bg-[#F5F7FA] text-[#131313] rounded-lg font-medium text-[12px] w-[90px] h-[38px] cursor-pointer"
              onClick={onClose}
            >
              الغاء
            </button>
            <button
              className="bg-[#183866] text-white rounded-lg font-medium text-[12px] w-[90px] h-[38px] cursor-pointer"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "جارٍ الإرسال..."
                : isEditMode
                  ? "تعديل اليوم"
                  : "اضف اليوم"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}