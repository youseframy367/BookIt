"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Pagnation from "@/app/components/public/Pagnation";
import { usePagnation } from "@/app/hooks/usePagnation";
import { useRouter } from "next/navigation";
import RemoveBooking from "../removeBooking";
import Filter from "../filter";
import AddBookingDays from "../../../components/Dashborad/Reservations/AddBookingDays";
//import { useDataRejectedBookingData } from "@/app/data/dataRejectedbooking";
import { useAllReservationsData } from "../../../data/dataAllReservations";

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
  // const numbersRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  //  const [numRow, setNumRow] = useState(13);
  // const [currentPage, setCurrentPage] = useState(1);
  const [typeTable, setTypeTable] = useState("Booking");
  const [removeBooKing, setRemovBooKing] = useState(false)
  const [numperOfId, setId] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean | null>(true);

  const [typeApproved, setTypeApproved] = useState(false);

  const allData = useAllReservationsData();



  const Rejectedbooking = [
    { SinceDay: "10/2/2025", today: "20/10/2025", numPerson: 2, ClosedFrom: "5:00 PM", openFrom: "5:00 PM", id: "233034" },
    { SinceDay: "11/2/2025", today: "21/10/2025", numPerson: 4, ClosedFrom: "11:00 PM", openFrom: "1:00 PM", id: "233035" },
    { SinceDay: "12/2/2025", today: "22/10/2025", numPerson: 3, ClosedFrom: "10:30 PM", openFrom: "2:00 PM", id: "233036" },
    { SinceDay: "13/2/2025", today: "23/10/2025", numPerson: 5, ClosedFrom: "12:00 AM", openFrom: "6:00 PM", id: "233037" },
    { SinceDay: "14/2/2025", today: "24/10/2025", numPerson: 2, ClosedFrom: "4:00 PM", openFrom: "10:00 AM", id: "233038" },
    { SinceDay: "15/2/2025", today: "25/10/2025", numPerson: 1, ClosedFrom: "11:00 PM", openFrom: "12:00 PM", id: "233039" },
    { SinceDay: "16/2/2025", today: "26/10/2025", numPerson: 3, ClosedFrom: "9:00 PM", openFrom: "5:00 PM", id: "233040" },
    { SinceDay: "17/2/2025", today: "27/10/2025", numPerson: 6, ClosedFrom: "11:30 PM", openFrom: "4:00 PM", id: "233041" },
    { SinceDay: "18/2/2025", today: "28/10/2025", numPerson: 2, ClosedFrom: "10:00 PM", openFrom: "3:00 PM", id: "233042" },
    { SinceDay: "19/2/2025", today: "29/10/2025", numPerson: 4, ClosedFrom: "11:00 PM", openFrom: "6:00 PM", id: "233043" },
    { SinceDay: "20/2/2025", today: "30/10/2025", numPerson: 2, ClosedFrom: "8:00 PM", openFrom: "2:00 PM", id: "233044" },
    { SinceDay: "21/2/2025", today: "31/10/2025", numPerson: 7, ClosedFrom: "9:00 PM", openFrom: "1:00 PM", id: "233045" },
    { SinceDay: "22/2/2025", today: "01/11/2025", numPerson: 2, ClosedFrom: "5:30 PM", openFrom: "11:00 AM", id: "233046" },
    { SinceDay: "23/2/2025", today: "02/11/2025", numPerson: 8, ClosedFrom: "10:00 PM", openFrom: "12:00 PM", id: "233047" },
    { SinceDay: "24/2/2025", today: "03/11/2025", numPerson: 4, ClosedFrom: "11:45 PM", openFrom: "5:00 PM", id: "233048" },
    { SinceDay: "25/2/2025", today: "04/11/2025", numPerson: 1, ClosedFrom: "6:00 PM", openFrom: "8:00 AM", id: "233049" },
    { SinceDay: "26/2/2025", today: "05/11/2025", numPerson: 3, ClosedFrom: "10:00 PM", openFrom: "3:00 PM", id: "233050" },
    { SinceDay: "27/2/2025", today: "06/11/2025", numPerson: 5, ClosedFrom: "9:30 PM", openFrom: "2:00 PM", id: "233051" },
    { SinceDay: "28/2/2025", today: "07/11/2025", numPerson: 9, ClosedFrom: "10:30 PM", openFrom: "12:00 PM", id: "233052" },
    { SinceDay: "01/3/2025", today: "08/11/2025", numPerson: 2, ClosedFrom: "11:00 PM", openFrom: "6:00 PM", id: "233053" },
    { SinceDay: "10/2/2025", today: "20/10/2025", numPerson: 2, ClosedFrom: "5:00 PM", openFrom: "5:00 PM", id: "233034" },
    { SinceDay: "11/2/2025", today: "21/10/2025", numPerson: 4, ClosedFrom: "11:00 PM", openFrom: "1:00 PM", id: "233035" },
    { SinceDay: "12/2/2025", today: "22/10/2025", numPerson: 3, ClosedFrom: "10:30 PM", openFrom: "2:00 PM", id: "233036" },
    { SinceDay: "13/2/2025", today: "23/10/2025", numPerson: 5, ClosedFrom: "12:00 AM", openFrom: "6:00 PM", id: "233037" },
    { SinceDay: "14/2/2025", today: "24/10/2025", numPerson: 2, ClosedFrom: "4:00 PM", openFrom: "10:00 AM", id: "233038" },
    { SinceDay: "15/2/2025", today: "25/10/2025", numPerson: 1, ClosedFrom: "11:00 PM", openFrom: "12:00 PM", id: "233039" },
    { SinceDay: "16/2/2025", today: "26/10/2025", numPerson: 3, ClosedFrom: "9:00 PM", openFrom: "5:00 PM", id: "233040" },
    { SinceDay: "17/2/2025", today: "27/10/2025", numPerson: 6, ClosedFrom: "11:30 PM", openFrom: "4:00 PM", id: "233041" },
    { SinceDay: "18/2/2025", today: "28/10/2025", numPerson: 2, ClosedFrom: "10:00 PM", openFrom: "3:00 PM", id: "233042" },
    { SinceDay: "19/2/2025", today: "29/10/2025", numPerson: 4, ClosedFrom: "11:00 PM", openFrom: "6:00 PM", id: "233043" },
    { SinceDay: "20/2/2025", today: "30/10/2025", numPerson: 2, ClosedFrom: "8:00 PM", openFrom: "2:00 PM", id: "233044" },
    { SinceDay: "21/2/2025", today: "31/10/2025", numPerson: 7, ClosedFrom: "9:00 PM", openFrom: "1:00 PM", id: "233045" },
    { SinceDay: "22/2/2025", today: "01/11/2025", numPerson: 2, ClosedFrom: "5:30 PM", openFrom: "11:00 AM", id: "233046" },
    { SinceDay: "23/2/2025", today: "02/11/2025", numPerson: 8, ClosedFrom: "10:00 PM", openFrom: "12:00 PM", id: "233047" },
    { SinceDay: "24/2/2025", today: "03/11/2025", numPerson: 4, ClosedFrom: "11:45 PM", openFrom: "5:00 PM", id: "233048" },
    { SinceDay: "25/2/2025", today: "04/11/2025", numPerson: 1, ClosedFrom: "6:00 PM", openFrom: "8:00 AM", id: "233049" },
    { SinceDay: "26/2/2025", today: "05/11/2025", numPerson: 3, ClosedFrom: "10:00 PM", openFrom: "3:00 PM", id: "233050" },
    { SinceDay: "27/2/2025", today: "06/11/2025", numPerson: 5, ClosedFrom: "9:30 PM", openFrom: "2:00 PM", id: "233051" },
    { SinceDay: "28/2/2025", today: "07/11/2025", numPerson: 9, ClosedFrom: "10:30 PM", openFrom: "12:00 PM", id: "233052" },
    { SinceDay: "01/3/2025", today: "08/11/2025", numPerson: 2, ClosedFrom: "11:00 PM", openFrom: "6:00 PM", id: "233053" },





  ]




  // filter data 
  const { allDataTrue, allDataFalse } = useMemo(() => {
    const allDataTrue = allData.filter((item) => item.RequestStatus === true);
    const allDataFalse = allData.filter((item) => item.RequestStatus === false);
    return { allDataTrue, allDataFalse };
  }, [allData]);

  const [AddDay, setAddDay] = useState(false)
  const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });

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
      occasion: customer.occasion

    };

    window.sessionStorage.setItem("bookingEditData", JSON.stringify(bookingData));
    router.push("/ReservationsRequestsTwo/OrderDetails");
  }

  const filteredCustomers = useMemo(() => {
    const sourceData = typeTable === "Booking"
      ? (typeApproved ? allDataTrue : allDataFalse)
      : Rejectedbooking;

    const lowerSearch = searchTerm.toLowerCase();

    return sourceData.filter((item) => {
      const searchMatch =
        !searchTerm || Object.values(item).some(
          (val) => val?.toString().toLowerCase().includes(lowerSearch)
        );

      return searchMatch
    });
  }, [allDataTrue, allDataFalse, searchTerm, filterData, typeApproved, typeTable]);

  // استدعاء الباجنيشن
  const {
    currentPage,
    setCurrentPage,
    numPages,
    setNumRow,
    displayedCustomers,
    scroll,
    numRow,
    numbersRef,
  } = usePagnation(
    filteredCustomers, // <-- استخدم always filteredCustomers
    searchTerm
  );
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

      <div className="flex flex-wrap items-center justify-between gap-4 p-[10px]">
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
            className={`border-[1px] bprder-[#183866] cursor-pointer
              "text-[#183866]" 
               text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] whitespace-nowrap`}
            onClick={() => {
              setTypeTable("Days");
            }}
          >
            أيام الحجوزات التي تم رفعها
          </button>

          <button
            className={`border-[1px] border-[#183866] ${AddDay
              ? "bg-[#183866] text-white"
              : "text-[#183866]"
              } cursor-pointer text-[500] px-3 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[260px] whitespace-nowrap flex justify-center items-center gap-[10px]`}
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
      {/*--------------------------------------------- tabel booking -----------------------------------------------*/}
      {typeTable === "Booking" ? (

        <div className="h-[87vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <table className="min-w-full h-[80%] text-right">
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

                <th className=" py-3 text-[12px] font-bold text-[#475467]   whitespace-nowrap text-center">
                  مبلغ تحت الحساب
                </th>
              </tr>
            </thead>
            <tbody className="divide-gray-50">
              {displayedCustomers.length > 0 ? (
                displayedCustomers.map((customer: any, idx: any) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.CustomerName}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.numBerson}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.Date}</td>
                    <td className="px-[8px] py-[15px] text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.time}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.MobileNumber}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.mail}</td>
                      <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                        <div className="flex items-center justify-center gap-[10px]">
                          <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={() => { typeApproved === true ? showData(customer) : saveDataInSecon(customer) }}>
                            <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                          </span>
                            <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => saveDataInSecon(customer)}
                            ></img>
                         
                          <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                            setRemovBooKing(true)
                            setId(customer.id);
                            setApproved(customer.approved)
                          }

                          } />

                        </div>
                      </td>
                  

                      <td className=" py-[15px] flex justify-center items-center  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                        <p className="w-[69px] h-[24px] bg-[#1838660D] flex justify-center rounded-[4px] items-center text-[8px] font-[500] text-[#183866] cursor-pointer"
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
      ) : (

        <div className="h-[87vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <table className="min-w-full h-[80%] text-right">
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
                displayedCustomers.map((customer: any, idx: any) => (

                  <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.SinceDay}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.today}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.numPerson}</td>
                    <td className="px-[8px] py-[15px] text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.ClosedFrom}</td>
                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.openFrom}</td>

                    <td className="px-[8px] py-[15px] text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                      <div className="flex items-center justify-center gap-[10px]">
                        <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                          () => {

                            window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(customer));
                            router.push("/ModeratorsThree/detalsMoerators");

                          }}>
                          <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                        </span>

                        <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                          window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(customer));
                          router.push("/ModeratorsThree/updateMoerators");


                        }}
                        ></img>

                        <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                          setRemovBooKing(true)
                          setId(customer.id);
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
      )
      }
      {/*------------------------------ control of bage ------------------------------------------------------------*/}
      <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
