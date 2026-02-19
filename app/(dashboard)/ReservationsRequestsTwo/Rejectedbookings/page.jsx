"use client";


import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RemoveBooking from "../removeBooking";
import Filter from "../filter";

//////////////////////////////////////////////////////////
//////// الحجوزات المرفوضه
/////////////////////////////////////////////////////////

export default function Rejectedbookings() {
 
  const router=useRouter()

  const numbersRef = useRef(null);
  const [expor, setExport]=useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [numRow, setNumRow] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeBooKing,setRemovBooKing]=useState(false)
  const [numperOfId ,setId]=useState()
const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });
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
  
const filteredCustomers = Rejectedbooking.filter((customer) => {
  const lowerSearch = searchTerm.toLowerCase();

  const searchMatch =
    !searchTerm ||
    Object.values(customer).some((val) =>
      val?.toString().toLowerCase().includes(lowerSearch)
    );

  const siteMatch =
    !filterData.site ||
    customer.SinceDay.toLowerCase().includes(filterData.site.toLowerCase());

  const typeMatch =
    !filterData.type ||
    customer.today.toLowerCase().includes(filterData.type.toLowerCase());

  const dateMatch =
    !filterData.date ||
    customer.SinceDay.toLowerCase().includes(filterData.date.toLowerCase());

  return searchMatch && siteMatch && typeMatch && dateMatch;
});


 const numPages = Math.ceil(filteredCustomers.length / numRow);
const displayedCustomers = filteredCustomers.slice(
  (currentPage - 1) * numRow,
  currentPage * numRow
);

 const scroll = (direction) => {
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
  />
)}

{/*---------------------------- --------filter customers---------------------------------------------------*/}

      {filter && <Filter setFilter={setFilter} onSearch={setFilterData} />}


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

    <button className="border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] whitespace-nowrap">
أيام الحجوزات التي تم رفعها        
  </button>

          <button className="border-[1px] bprder-[#183866] text-[#183866] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[116px] whitespace-nowrap">
التي تمت الموافقه عليها 
          </button>
          <button className="border-[1px] bprder-[#183866] text-[#183866] text-[500] px-3 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[280px] whitespace-nowrap flex gap-[10px]"  >
تعيين ايام الحجز والأعداد التي يمكنك استيعابها 
<img src="/img/fgtfddg.svg"></img>
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
      <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                          ()=>{
                   
    window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                        router.push("/ModeratorsThree/detalsMoerators");

                          }}>
                        <img src="/img/كمغخخحه.svg" width="10" height="8px"/>
</span>

                        <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                       window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                        router.push("/ModeratorsThree/updateMoerators");

               
                          }}
                        ></img>
                      
                        <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={()=>{
                          setRemovBooKing(true)
                           setId(customer.id);
                        }
                          
                        }   />
                   
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
        }}            value={numRow}
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
      {/* السهم اليسار */}
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


      {/* الأرقام */}
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
                ${
                  isActive
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
