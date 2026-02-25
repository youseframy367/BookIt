"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Filter from "../filter";
import AddBookingDays from "../AddBookingDays";
import Pagnation from "../../../components/public/Pagnation";
import { usePagnation } from "../../../hooks/usePagnation";
import { useAllReservationsData } from "../../../data/dataAllReservations";

export default function AllReservations() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [removeClint, setRemovClint] = useState(false)
  const [numperOfId, setId] = useState()
  const [AddDay, setAddDay] = useState(false)

  const DataCustomers = useAllReservationsData();

  const { setFilterData, currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
    usePagnation(DataCustomers, searchTerm)

  return (
    <div className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px] ">
      {/*----------------------------------------this is componnt control remove customers----------------------*/}

      {removeClint && (
        <RemoveCustomer
          id={numperOfId}
          onClose={() => setRemovClint(false)}
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

          <button className="border-[1px] border-[#183866] text-[#183866] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] whitespace-nowrap"
            onClick={() => {
              window.sessionStorage.setItem("type", false)
              router.push("/ReservationsRequestsTwo/Rejectedbookings")
            }}>
            أيام الحجوزات التي تم رفعها
          </button>

          <button className="border-[1px] border-[#183866] text-[#183866] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[116px] whitespace-nowrap"

            onClick={() => {
              window.sessionStorage.setItem("type", true)
              router.push("/ReservationsRequestsTwo/Rejectedbookings")
            }}

          >
            التي تمت الموافقه عليها
          </button>
          <button
            className={`border-[1px] border-[#183866] ${AddDay
              ? "bg-[#183866] text-white"
              : "text-[#183866]"
              } text-[500] px-3 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[260px] whitespace-nowrap flex justify-center items-center gap-[10px]`}
            onClick={() => setAddDay(true)}
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
                اسم العميل
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                عدد الاشخاص
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center" >
                يوم الحجز المرغوب
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                التوقيت
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                رقم الجوال
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center"  >
                البريد
              </th>

              <th className=" py-3 text-[12px] font-bold text-[#475467] pl-[25px]  whitespace-nowrap text-center">
                الاجراء
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-50">
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.CustomerName}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.numBerson}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.Date}</td>
                  <td className="px-[8px] py-[15px]  text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.time}</td>
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.MobileNumber}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.mail}</td>

                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                    <p className="w-[69px] h-[24px] bg-[#1838660D] flex justify-center rounded-[4px] items-center text-[8px] font-[500] text-[#183866]"
                      onClick={() => {
                        const customerWithBtn = { ...customer, hidenBtn: customer.hidenBtn ?? true };
                        window.sessionStorage.setItem("bookingEditData", JSON.stringify(customerWithBtn));
                        router.push("/ReservationsRequestsTwo/OrderDetails");
                      }}>
                      رؤيه الطلب
                    </p>
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
      <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
