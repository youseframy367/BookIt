"use client";

import { useEffect, useMemo } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RemoveBooking from "../removeBooking";
import Filter from "../filter";
import AddBookingDays from "../../../components/Dashborad/Reservations/AddBookingDays";
import { useDataRejectedBookingData } from "@/app/data/dataRejectedbooking";

type BookingEdit = {
  numPersons: number;
  dateFrom: string;
  dateTo: string;
  startTime: string;
  endTime: string;
  id: string;
  approved: boolean;
  hidenBtn: boolean;
};

export default function Rejectedbookings() {

  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState<BookingEdit | null>(null);
  const numbersRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [numRow, setNumRow] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeBooKing, setRemovBooKing] = useState(false)
  const [numperOfId, setId] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean | null>(null);

  const [typeApproved, setTypeApproved] = useState(false);

  useEffect(() => {
    const typeFilter = window.sessionStorage.getItem("type");
    setTypeApproved(typeFilter === "true");
  }, []);

  const [AddDay, setAddDay] = useState(false)
  const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });
  
  const Rejectedbooking = useDataRejectedBookingData();

  function saveDataInSecon(customer: any) {
    const bookingData = {
      numPersons: customer.numPerson,
      dateFrom: customer.SinceDay,
      dateTo: customer.today,
      startTime: customer.ClosedFrom,
      endTime: customer.openFrom,
      id: customer.id,
      approved: customer.approved,
      hidenBtn: false,
    };

    window.sessionStorage.setItem("bookingEditData", JSON.stringify(bookingData));
    setSelectedBooking(bookingData);
    setAddDay(true);
  }

  function showData(customer: any) {
    const bookingData = {
      numBerson: customer.numPerson,
      dateFrom: customer.SinceDay,
      Date: customer.today,
      time: customer.ClosedFrom,
      MobileNumber: customer.numPon,
      PreferenceForSitting: customer.PreferenceForSitting,
      CustomerName: customer.nameClint,
      note: customer.note,
      mail: customer.mail,
      hidenBtn: false,
      occasion: customer.occasion

    };

    window.sessionStorage.setItem("bookingEditData", JSON.stringify(bookingData));
    router.push("/ReservationsRequestsTwo/OrderDetails");
  }
  function to24Hour(timeStr: any) {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours.padStart(2, "0")}:${minutes}`;
  }

  const filteredCustomers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return Rejectedbooking.filter((customer) => {
      const searchMatch =
        !searchTerm ||
        Object.values(customer).some((val) =>
          val?.toString().toLowerCase().includes(lowerSearch)
        );

      const siteMatch =
        !filterData.site ||
        customer.numPerson.toString() === String(filterData.site);

      const timeMatch = (() => {
        if (!filterData.type) return true;
        const custTime24 = to24Hour(customer.ClosedFrom);
        const filterTime = String(filterData.type).slice(0, 5);
        return custTime24 === filterTime;
      })();

      const dateMatch = (() => {
        if (!filterData.date) return true;
        if (!customer.SinceDay) return false;
        const [d, m, y] = customer.SinceDay.split("/");
        const formattedDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
        return formattedDate === filterData.date;
      })();

      if (typeApproved === true) return customer.approved === true && searchMatch && siteMatch && timeMatch && dateMatch;
      if (typeApproved === false) return customer.approved === false && searchMatch && siteMatch && timeMatch && dateMatch;
      return searchMatch && siteMatch && timeMatch && dateMatch;
    });
  }, [Rejectedbooking, searchTerm, filterData, typeApproved]);
  const numPages = Math.ceil(filteredCustomers.length / numRow);
  const displayedCustomers = filteredCustomers.slice(
    (currentPage - 1) * numRow,
    currentPage * numRow
  );

  const scroll = (direction: any) => {
    if (!numbersRef.current) return;
    const scrollAmount = 120;
    numbersRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px] ">
      {/*----------------------------------------this is componnt control remove customers----------------------*/}

      {removeBooKing && (
        <RemoveBooking
          id={numperOfId}
          onClose={() => setRemovBooKing(false)}
          typeApproved={approved}
        />
      )}

      {/*---------------------------- --------filter customers---------------------------------------------------*/}

      {filter && <Filter setFilter={setFilter} onSearch={setFilterData} />}


      {/*-------------------------------------- Add Day ----------------------------------------------------------*/}
      {AddDay && (
        <AddBookingDays onClose={() => setAddDay(false)} />
      )}


      {/* ------------------------------------ head bage show all customers----------------------------------------*/}



      <div className="p-[10px] px-[0px] flex flex-wrap items-center justify-between gap-4 ">
        <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">قائمة طلبات الحجز بالكامل</p>
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
            src="/img/Frame 1686553878.svg"
            className="w-[32px] h-[32px] cursor-pointer"
            alt="filter"
            onClick={() => setFilter(true)}
          />

          <button
            className={`border-[1px] bprder-[#183866] ${typeApproved === false
              ? "bg-[#183866] text-[#fff]"
              : "text-[#183866]"
              } text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] whitespace-nowrap`}
            onClick={() => {
              setTypeApproved(false);
            }}
          >
            أيام الحجوزات التي تم رفعها
          </button>

          <button
            className={`border-[1px] bprder-[#183866] ${typeApproved === true
              ? "bg-[#183866] text-[#fff]"
              : "text-[#183866]"
              } text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[116px] whitespace-nowrap`}
            onClick={() => {
              setTypeApproved(true);
            }}
          >
            التي تمت الموافقة عليها
          </button>
          <button
            className={`border-[1px] border-[#183866] ${AddDay
              ? "bg-[#183866] text-white"
              : "text-[#183866]"
              } text-[500] px-3 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[260px] whitespace-nowrap flex justify-center items-center gap-[10px]`}
            onClick={() => {
              window.sessionStorage.removeItem("bookingEditData");
              setAddDay(true);
              setTypeApproved(false);
            }}
          >
            تعيين ايام الحجز والأعداد التي يمكنك استيعابها

            <img src={AddDay ? "/img/77777.svg" : "/img/fgtfddg.svg"} alt="icon" />

          </button>

        </div>
      </div>

      {/*--------------------------------------------- tabel Customers -----------------------------------------------*/}

      <div className="h-[80vh] mb-[30px] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <table className="min-w-full text-right">
          <thead className="sticky top-0 bg-[#F6F6F6] z-10 rounded-[4px]">
            <tr >
              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                اليوم من
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                اليوم الى
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center" >
                عدد الاشخاص المتاح لاستقبالهم
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                مغلق من
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                مغلق الى
              </th>
              <th className=" py-3 text-[12px] font-bold text-[#475467] pl-[5px]  whitespace-nowrap text-center">
                الاجراء
              </th>

            </tr>
          </thead>
          <tbody className="divide-gray-50">
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.SinceDay}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.today}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.numPerson}</td>
                  <td className="px-[8px] py-[15px]  text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.ClosedFrom}</td>
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.openFrom}</td>

                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                    <div className="flex items-center justify-center gap-[10px]">
                      <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={() => { typeApproved === true ? showData(customer) : saveDataInSecon(customer) }}>
                        <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                      </span>
                      {!typeApproved && (
                        <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => saveDataInSecon(customer)}
                        ></img>
                      )}
                      <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                        setRemovBooKing(true)
                        setId(customer.id);
                        setApproved(customer.approved)
                      }

                      } />

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-8 text-center text-[12px] text-[rgba(29,29,29,0.7)]">
                  لا يوجد سجلات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*------------------------------ control of bage ------------------------------------------------------------*/}
      <div className="flex w-full justify-between items-center p-[20px]">
        <div className="flex items-center gap-[10px]">
          <p className="text-[12px] font-normal text-[rgba(29,29,29,0.8)]">
            حدد عدد صفوف السجلات لكل صفحة
          </p>
          <select
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundColor: "white",
              fontSize: "16px",
              backgroundImage: "url('arrow.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "12px",
            }} value={numRow}
            onChange={(e) => setNumRow(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-1 text-[12px] text-[#1D1D1D] focus:outline-none focus:ring-1 focus:ring-[#183866]"
          >
            {[10, 20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* ------------------------------------filter Bage-----------------------------------------*/}

        <div className="flex items-center justify-center gap-2 m-5">
          <button
            onClick={() => scroll("left")}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-r-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200"
          >
            <img
              src="/img/;lhjn;jh.svg"
              className="w-3 h-3"
              alt="next"
            />
          </button>

          <div
            ref={numbersRef}
            className="flex overflow-x-auto overflow-y-hidden w-[200px] scroll-smooth no-scrollbar"
          >
            {[...Array(numPages)].map((_, i) => {
              const isActive = currentPage === i + 1;
              return (
                <div
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`min-w-[40px] h-[40px] shadow-[0_0_2px_#00000040] flex items-center justify-center  text-[13px] font-medium cursor-pointer transition-all duration-200
                ${isActive
                      ? "bg-[#183866] text-white shadow-[0_0_4px_#18386680]"
                      : "bg-white text-[#1D1D1D] hover:bg-[#f3f4f6] shadow-[0_0_2px_#59595933]"
                    }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>




          <button
            onClick={() => scroll("right")}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-l-[8px] bg-white shadow-[0_0_2px_#00000040] hover:bg-[#f7f8fa] transition-all duration-200"
          >
            <img
              src="/img/;lhjn;jh.svg"
              className="w-3 h-3 rotate-180"
              alt="prev"
            />
          </button>

        </div>

      </div>
    </div>
  );
}
