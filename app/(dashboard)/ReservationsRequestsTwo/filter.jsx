"use client";

export default function Filter({ setFilter, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const site = e.target.elements.site.value;
    const type = e.target.elements.type.value;
    const date = e.target.elements.date.value;

    // إرسال القيم للجدول للفلترة
    onSearch({ site, type, date });

    // إغلاق نافذة الفلترة
    setFilter(false);
  };

  return (
    <div className="bg-[rgba(29,29,29,0.25)] flex justify-center items-center fixed top-[70px] left-0 z-[999] w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="w-[448px] h-[320px] rounded-[12px] bg-white shadow-md p-[20px] flex flex-col gap-[15px]"
      >
        {/* رأس البوب أب */}
        <div className="flex justify-between border-b-[1px] border-b-blue-100 pb-3">
          <h2 className="text-[14px] font-[500] text-[#1D2026] mb-1">
            فلتر الحجوزات
          </h2>
          <img
            src="/img/X.svg"
            width="18px"
            height="18px"
            className="cursor-pointer"
            onClick={() => setFilter(false)}
          />
        </div>

        {/* عدد الأشخاص */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-[13px] text-[#475467] font-medium mb-1">
            عدد الاشخاص
          </label>
          <input
            type="number"
            name="site"
            placeholder="ادخل عدد الاشخاص"
            className="border border-[#E9EAF0] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#183866]"
          />
        </div>

        {/* الوقت واليوم */}
        <div className="grid grid-cols-2 gap-[10px]">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] text-[#475467] font-medium mb-1">
              ادخل الوقت
            </label>
            <input
              type="time"
              name="type"
              className="border border-[#E9EAF0] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#183866]"
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className="text-[13px] text-[#475467] font-medium mb-1">
              اختر اليوم
            </label>
            <input
              type="date"
              name="date"
              className="border border-[#E9EAF0] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#183866]"
            />
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex justify-between mt-[10px]">
          <button
            type="button"
            onClick={() => setFilter(false)}
            className="bg-[#F5F7FA] text-[#183866] px-6 py-2 rounded-lg text-[13px] font-medium hover:bg-[#eaeef3]"
          >
            إلغاء
          </button>
          <button
          onClick={
            handleSubmit
          }
            className="bg-[#183866] text-white px-6 py-2 rounded-lg text-[13px] font-medium hover:bg-[#10284d]"
          >
            بحث
          </button>
        </div>
      </form>
    </div>
  );
}
