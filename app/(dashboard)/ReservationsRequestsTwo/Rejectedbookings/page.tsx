"use client";

import { useState, useMemo } from "react";
import Pagnation from "@/app/components/public/Pagnation";
import { usePagnation } from "@/app/hooks/usePagnation";
import { useRouter } from "next/navigation";
import { useAllReservationsData, UpdatedReservations } from "../../../data/dataAllReservations";
import RemoveBooking from "../removeBooking";
import Filter from "../filter";
import AddBookingDays from "../../../components/Dashborad/Reservations/AddBookingDays";

export default function Rejectedbookings() {
  const router = useRouter();

  const [filter, setFilter] = useState(false);
  const [typeTable, setTypeTable] = useState<"Booking" | "Days">("Booking");
  const [removeBooking, setRemoveBooking] = useState(false);
  const [numperOfId, setId] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean | null>(true);
  const [addDay, setAddDay] = useState(false);
  const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingEdit | null>(null);

  const allData = useAllReservationsData();
  const reservationsAvailable = UpdatedReservations();

  const filteredBookings = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return allData.filter((item) => {
      const matchesSearch = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lowerSearch)
      );

      const matchesFilter =
        (!filterData.site || item.numBerson == filterData.site) &&
        (!filterData.type || item.time.includes(filterData.type)) &&
        (!filterData.date || item.Date === filterData.date);

      return matchesSearch && matchesFilter;
    });
  }, [allData, searchTerm, filterData]);

  const filteredDays = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return reservationsAvailable.filter((item) => {
      const matchesSearch = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lowerSearch)
      );

      const matchesFilter =
        (!filterData.site || item.numPerson == filterData.site) &&
        (!filterData.type || (item.ClosedFrom + " " + item.openFrom).includes(filterData.type)) &&
        (!filterData.date || item.SinceDay === filterData.date);

      return matchesSearch && matchesFilter;
    });
  }, [reservationsAvailable, searchTerm, filterData]);

  const paginationBookings = usePagnation(filteredBookings, searchTerm);
  const paginationDays = usePagnation(filteredDays, searchTerm);

  const currentPagination =
    typeTable === "Booking" ? paginationBookings : paginationDays;

  const {
    currentPage,
    setCurrentPage,
    numPages,
    setNumRow,
    displayedCustomers,
    scroll,
    numRow,
    numbersRef,
  } = currentPagination;



  function saveDataInSecon(customer: any) {
    const bookingData = {
      numPersons: customer.numPerson,
      dateFrom: customer.SinceDay,
      dateTo: customer.today,
      startTime: customer.ClosedFrom,
      endTime: customer.openFrom,
      id: customer.id,
      approved: customer.approved,
    };

    window.sessionStorage.setItem("bookingEditData", JSON.stringify(bookingData));
    setSelectedBooking(bookingData);
    setAddDay(true);
  }

  return (
    <div className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px]">
      {removeBooking && (
        <RemoveBooking
          id={numperOfId}
          onClose={() => setRemoveBooking(false)}
        />
      )}

      {filter && <Filter setFilter={setFilter} onSearch={setFilterData} />}

      {addDay && <AddBookingDays onClose={() => setAddDay(false)} />}

      <div className="flex flex-wrap items-center justify-between gap-4 p-[10px]">
        <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
          {typeTable === "Booking"
            ? "قائمة طلبات الحجز بالكامل"
            : "أيام الحجوزات التي تم رفعها"}
        </p>

        <div className="flex items-center gap-[10px] flex-1 justify-end ml-[10px]">
          <div className="relative w-full max-w-[200px]">
            <span className="absolute top-[10px] mr-[10px]">
              <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
            </span>
            <input
              type="search"
              placeholder="البحث"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
            />
          </div>

          <img
            src={
              filter
                ? "/img/Frame 1686554170.svg"
                : "/img/Frame 1686553878.svg"
            }
            className="w-[32px] h-[32px] cursor-pointer"
            alt="filter"
            onClick={() => setFilter(true)}
          />

          <button
            className={`border-[1px] border-[#183866] cursor-pointer px-2 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] ${typeTable === "Days" ? "bg-[#183866] text-white" : "text-[#183866]"
              }`}
            onClick={() => setTypeTable("Days")}
          >
            أيام الحجوزات التي تم رفعها
          </button>

          <button
            className={`border-[1px] border-[#183866] ${addDay ? "bg-[#183866] text-white" : "text-[#183866]"
              } cursor-pointer font-[500] px-3 py-2 rounded-lg text-[10px] h-[32px] w-[260px] whitespace-nowrap flex justify-center items-center gap-[10px]`}
            onClick={() => {
              window.sessionStorage.removeItem("bookingEditData");
              setAddDay(true);
            }}
          >
            تعيين أيام الحجز والأعداد التي يمكنك استيعابها
            <img
              src={addDay ? "/img/77777.svg" : "/img/fgtfddg.svg"}
              alt="icon"
            />
          </button>
        </div>
      </div>

      {typeTable === "Booking" ? (
        <div className="h-[87vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <table className="min-w-full max-h-[80%] text-right">
            <thead className="sticky top-0 bg-[#F6F6F6] z-10 rounded-[4px]">
              <tr>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">اسم العميل</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">عدد الاشخاص</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">يوم الحجز المرغوب</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">التوقيت</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">رقم الجوال</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">البريد</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">الحاله</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">مبلغ تحت الحساب</th>
              </tr>
            </thead>
            <tbody className="divide-gray-50">
              {displayedCustomers.length > 0 ? (
                displayedCustomers.map((customer: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors"
                    onClick={() => {
                      const customerWithBtn = { ...customer, hidenBtn: customer.hidenBtn ?? true };
                      window.sessionStorage.setItem("bookingEditData", JSON.stringify(customerWithBtn));
                      router.push("/ReservationsRequestsTwo/OrderDetails");
                    }}>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{customer.CustomerName}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{customer.numBerson}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{customer.Date}</td>
                    <td className="px-3 py-4 text-[10px] text-[#183866] text-center">{customer.time}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{customer.MobileNumber}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{customer.mail}</td>
                    <td
                      className="px-3 py-4 text-[10px] text-center"
                      style={{
                        color:
                          customer.state === "ملغى" ? "#FF3A3A" :
                            customer.state === "مستكمل" ? "#22C55E" :
                              customer.state ==="لم يتم التأكيد" ? "#D69C21" :
                                "#1D1D1DB3" 
                      }}
                    >{customer.state}</td>
                    <td className="px-3 py-4 text-[10px] text-[#C68700] text-center">{customer.AmountBaid}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-[30px] text-center text-[12px] text-[#8C94A3]">
                    لا يوجد سجلات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-[87vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <table className="min-w-full max-h-[80%] text-right">
            <thead className="sticky top-0 bg-[#F6F6F6] z-10 rounded-[4px]">
              <tr>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">اليوم من</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">اليوم إلى</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">عدد الأشخاص المتاح لاستقبالهم</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">غير متاح من</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">متاح من</th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center">مقدم حجز </th>
                <th className="px-4 py-3 text-[12px] font-bold text-[#475467] text-center"> الاجراء</th>
              </tr>
            </thead>
            <tbody className="divide-gray-50">
              {displayedCustomers.length > 0 ? (
                displayedCustomers.map((day: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{day.SinceDay}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{day.today}</td>
                    <td className="px-3 py-4 text-[10px] text-[#1D1D1DB3] text-center">{day.numPerson}</td>
                    <td className="px-3 py-4 text-[10px] text-[#183866] text-center">{day.ClosedFrom}</td>
                    <td className="px-3 py-4 text-[10px] text-[#183866] text-center">{day.openFrom}</td>
                    <td className="px-3 py-4 text-[10px] text-[#D69815] text-center">{day.ReservationBrovider}</td>
                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                      <div className="flex items-center justify-center gap-[10px]">
                        <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={() => { saveDataInSecon(day) }}>
                          <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                        </span>
                        <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => saveDataInSecon(day)}
                        ></img>

                        <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                          setRemoveBooking(true)
                          setId(day.id);
                          setApproved(day.approved)
                        }

                        } />

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-[30px] text-center text-[12px] text-[#8C94A3]">
                    لا توجد أيام مضافة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagnation
        numRow={numRow}
        setNumRow={setNumRow}
        scroll={scroll}
        numbersRef={numbersRef}
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}