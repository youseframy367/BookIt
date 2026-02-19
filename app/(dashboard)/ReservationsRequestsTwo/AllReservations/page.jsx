"use client";


import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
//////////////////////////////////////////////////////////
//// طلبات الحجوزات
//////////////////////////////////////////////////////////
export default function AllReservations() {
 
  const router=useRouter()

  const numbersRef = useRef(null);
  const [expor, setExport]=useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [numRow, setNumRow] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeClint,setRemovClint]=useState(false)
  const [numperOfId ,setId]=useState()
const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });
  const DataCustomers = [
    { CustomerName: "مصطفى رامى عفيفى", numBerson: 3, Date: "20/10/2025", time: "5:00 PM", MobileNumber: "01055395693", mail: "hisham@icloud.com", id: "233034" },
  { CustomerName: "أحمد خالد السعيد", numBerson: 2, Date: "22/10/2025", time: "7:30 PM", MobileNumber: "01024578965", mail: "ahmed.khaled@gmail.com", id: "233035" },
  { CustomerName: "محمد طارق حسن", numBerson: 5, Date: "25/10/2025", time: "8:15 PM", MobileNumber: "01112589634", mail: "m.tarek@hotmail.com", id: "233036" },
  { CustomerName: "مروان إبراهيم على", numBerson: 4, Date: "26/10/2025", time: "6:45 PM", MobileNumber: "01255647895", mail: "marwan.ibrahim@gmail.com", id: "233037" },
  { CustomerName: "عمر فؤاد عبد العزيز", numBerson: 6, Date: "27/10/2025", time: "9:00 PM", MobileNumber: "01099887766", mail: "omar.fouad@yahoo.com", id: "233038" },
  { CustomerName: "ياسين عبد الرحمن", numBerson: 3, Date: "28/10/2025", time: "4:30 PM", MobileNumber: "01522334455", mail: "yassin.a@gmail.com", id: "233039" },
  { CustomerName: "عبدالله سامح مجدى", numBerson: 2, Date: "29/10/2025", time: "5:15 PM", MobileNumber: "01288779900", mail: "abdallah.m@gmail.com", id: "233040" },
  { CustomerName: "نورهان شريف محمود", numBerson: 4, Date: "30/10/2025", time: "8:00 PM", MobileNumber: "01022557788", mail: "nourhan.sh@gmail.com", id: "233041" },
  { CustomerName: "ملك عمرو فاروق", numBerson: 5, Date: "31/10/2025", time: "6:00 PM", MobileNumber: "01155667788", mail: "malek.farouk@gmail.com", id: "233042" },
  { CustomerName: "هاجر مصطفى كامل", numBerson: 3, Date: "01/11/2025", time: "7:00 PM", MobileNumber: "01033445566", mail: "hager.kamel@gmail.com", id: "233043" },
  { CustomerName: "يحيى عبد الله محمد", numBerson: 2, Date: "02/11/2025", time: "4:45 PM", MobileNumber: "01245678901", mail: "yehia.a@gmail.com", id: "233044" },
  { CustomerName: "سارة جمال السيد", numBerson: 6, Date: "03/11/2025", time: "9:30 PM", MobileNumber: "01598765432", mail: "sarah.gamal@gmail.com", id: "233045" },
  { CustomerName: "حازم أحمد علاء", numBerson: 3, Date: "04/11/2025", time: "5:45 PM", MobileNumber: "01012457896", mail: "hazem.alaa@gmail.com", id: "233046" },
  { CustomerName: "ليلى محمود حسن", numBerson: 4, Date: "05/11/2025", time: "7:15 PM", MobileNumber: "01233557799", mail: "layla.mh@gmail.com", id: "233047" },
  { CustomerName: "إسراء خالد عبد الحليم", numBerson: 5, Date: "06/11/2025", time: "6:30 PM", MobileNumber: "01147896532", mail: "esraa.khaled@gmail.com", id: "233048" },
  { CustomerName: "آدم فادى عادل", numBerson: 3, Date: "07/11/2025", time: "8:00 PM", MobileNumber: "01033366677", mail: "adam.fady@gmail.com", id: "233049" },
  { CustomerName: "ندى سامى رجب", numBerson: 2, Date: "08/11/2025", time: "4:30 PM", MobileNumber: "01299887755", mail: "nada.samy@gmail.com", id: "233050" },
  { CustomerName: "سيف عماد يوسف", numBerson: 4, Date: "09/11/2025", time: "6:15 PM", MobileNumber: "01533557766", mail: "saif.emad@gmail.com", id: "233051" },
  { CustomerName: "ريهام طارق حسن", numBerson: 3, Date: "10/11/2025", time: "9:00 PM", MobileNumber: "01022446688", mail: "reham.tarek@gmail.com", id: "233052" },
  { CustomerName: "زياد هانى مصطفى", numBerson: 5, Date: "11/11/2025", time: "8:45 PM", MobileNumber: "01177889900", mail: "ziyad.hani@gmail.com", id: "233053" },
   { CustomerName: "مصطفى رامى عفيفى", numBerson: 3, Date: "20/10/2025", time: "5:00 PM", MobileNumber: "01055395693", mail: "hisham@icloud.com", id: "233034" },
  { CustomerName: "أحمد خالد السعيد", numBerson: 2, Date: "22/10/2025", time: "7:30 PM", MobileNumber: "01024578965", mail: "ahmed.khaled@gmail.com", id: "233035" },
  { CustomerName: "محمد طارق حسن", numBerson: 5, Date: "25/10/2025", time: "8:15 PM", MobileNumber: "01112589634", mail: "m.tarek@hotmail.com", id: "233036" },
  { CustomerName: "مروان إبراهيم على", numBerson: 4, Date: "26/10/2025", time: "6:45 PM", MobileNumber: "01255647895", mail: "marwan.ibrahim@gmail.com", id: "233037" },
  { CustomerName: "عمر فؤاد عبد العزيز", numBerson: 6, Date: "27/10/2025", time: "9:00 PM", MobileNumber: "01099887766", mail: "omar.fouad@yahoo.com", id: "233038" },
  { CustomerName: "ياسين عبد الرحمن", numBerson: 3, Date: "28/10/2025", time: "4:30 PM", MobileNumber: "01522334455", mail: "yassin.a@gmail.com", id: "233039" },
  { CustomerName: "عبدالله سامح مجدى", numBerson: 2, Date: "29/10/2025", time: "5:15 PM", MobileNumber: "01288779900", mail: "abdallah.m@gmail.com", id: "233040" },
  { CustomerName: "نورهان شريف محمود", numBerson: 4, Date: "30/10/2025", time: "8:00 PM", MobileNumber: "01022557788", mail: "nourhan.sh@gmail.com", id: "233041" },
  { CustomerName: "ملك عمرو فاروق", numBerson: 5, Date: "31/10/2025", time: "6:00 PM", MobileNumber: "01155667788", mail: "malek.farouk@gmail.com", id: "233042" },
  { CustomerName: "هاجر مصطفى كامل", numBerson: 3, Date: "01/11/2025", time: "7:00 PM", MobileNumber: "01033445566", mail: "hager.kamel@gmail.com", id: "233043" },
  { CustomerName: "يحيى عبد الله محمد", numBerson: 2, Date: "02/11/2025", time: "4:45 PM", MobileNumber: "01245678901", mail: "yehia.a@gmail.com", id: "233044" },
  { CustomerName: "سارة جمال السيد", numBerson: 6, Date: "03/11/2025", time: "9:30 PM", MobileNumber: "01598765432", mail: "sarah.gamal@gmail.com", id: "233045" },
  { CustomerName: "حازم أحمد علاء", numBerson: 3, Date: "04/11/2025", time: "5:45 PM", MobileNumber: "01012457896", mail: "hazem.alaa@gmail.com", id: "233046" },
  { CustomerName: "ليلى محمود حسن", numBerson: 4, Date: "05/11/2025", time: "7:15 PM", MobileNumber: "01233557799", mail: "layla.mh@gmail.com", id: "233047" },
  { CustomerName: "إسراء خالد عبد الحليم", numBerson: 5, Date: "06/11/2025", time: "6:30 PM", MobileNumber: "01147896532", mail: "esraa.khaled@gmail.com", id: "233048" },
  { CustomerName: "آدم فادى عادل", numBerson: 3, Date: "07/11/2025", time: "8:00 PM", MobileNumber: "01033366677", mail: "adam.fady@gmail.com", id: "233049" },
  { CustomerName: "ندى سامى رجب", numBerson: 2, Date: "08/11/2025", time: "4:30 PM", MobileNumber: "01299887755", mail: "nada.samy@gmail.com", id: "233050" },
  { CustomerName: "سيف عماد يوسف", numBerson: 4, Date: "09/11/2025", time: "6:15 PM", MobileNumber: "01533557766", mail: "saif.emad@gmail.com", id: "233051" },
  { CustomerName: "ريهام طارق حسن", numBerson: 3, Date: "10/11/2025", time: "9:00 PM", MobileNumber: "01022446688", mail: "reham.tarek@gmail.com", id: "233052" },
  { CustomerName: "زياد هانى مصطفى", numBerson: 5, Date: "11/11/2025", time: "8:45 PM", MobileNumber: "01177889900", mail: "ziyad.hani@gmail.com", id: "233053" },
   { CustomerName: "مصطفى رامى عفيفى", numBerson: 3, Date: "20/10/2025", time: "5:00 PM", MobileNumber: "01055395693", mail: "hisham@icloud.com", id: "233034" },
  { CustomerName: "أحمد خالد السعيد", numBerson: 2, Date: "22/10/2025", time: "7:30 PM", MobileNumber: "01024578965", mail: "ahmed.khaled@gmail.com", id: "233035" },
  { CustomerName: "محمد طارق حسن", numBerson: 5, Date: "25/10/2025", time: "8:15 PM", MobileNumber: "01112589634", mail: "m.tarek@hotmail.com", id: "233036" },
  { CustomerName: "مروان إبراهيم على", numBerson: 4, Date: "26/10/2025", time: "6:45 PM", MobileNumber: "01255647895", mail: "marwan.ibrahim@gmail.com", id: "233037" },
  { CustomerName: "عمر فؤاد عبد العزيز", numBerson: 6, Date: "27/10/2025", time: "9:00 PM", MobileNumber: "01099887766", mail: "omar.fouad@yahoo.com", id: "233038" },
  { CustomerName: "ياسين عبد الرحمن", numBerson: 3, Date: "28/10/2025", time: "4:30 PM", MobileNumber: "01522334455", mail: "yassin.a@gmail.com", id: "233039" },
  { CustomerName: "عبدالله سامح مجدى", numBerson: 2, Date: "29/10/2025", time: "5:15 PM", MobileNumber: "01288779900", mail: "abdallah.m@gmail.com", id: "233040" },
  { CustomerName: "نورهان شريف محمود", numBerson: 4, Date: "30/10/2025", time: "8:00 PM", MobileNumber: "01022557788", mail: "nourhan.sh@gmail.com", id: "233041" },
  { CustomerName: "ملك عمرو فاروق", numBerson: 5, Date: "31/10/2025", time: "6:00 PM", MobileNumber: "01155667788", mail: "malek.farouk@gmail.com", id: "233042" },
  { CustomerName: "هاجر مصطفى كامل", numBerson: 3, Date: "01/11/2025", time: "7:00 PM", MobileNumber: "01033445566", mail: "hager.kamel@gmail.com", id: "233043" },
  { CustomerName: "يحيى عبد الله محمد", numBerson: 2, Date: "02/11/2025", time: "4:45 PM", MobileNumber: "01245678901", mail: "yehia.a@gmail.com", id: "233044" },
  { CustomerName: "سارة جمال السيد", numBerson: 6, Date: "03/11/2025", time: "9:30 PM", MobileNumber: "01598765432", mail: "sarah.gamal@gmail.com", id: "233045" },
  { CustomerName: "حازم أحمد علاء", numBerson: 3, Date: "04/11/2025", time: "5:45 PM", MobileNumber: "01012457896", mail: "hazem.alaa@gmail.com", id: "233046" },
  { CustomerName: "ليلى محمود حسن", numBerson: 4, Date: "05/11/2025", time: "7:15 PM", MobileNumber: "01233557799", mail: "layla.mh@gmail.com", id: "233047" },
  { CustomerName: "إسراء خالد عبد الحليم", numBerson: 5, Date: "06/11/2025", time: "6:30 PM", MobileNumber: "01147896532", mail: "esraa.khaled@gmail.com", id: "233048" },
  { CustomerName: "آدم فادى عادل", numBerson: 3, Date: "07/11/2025", time: "8:00 PM", MobileNumber: "01033366677", mail: "adam.fady@gmail.com", id: "233049" },
  { CustomerName: "ندى سامى رجب", numBerson: 2, Date: "08/11/2025", time: "4:30 PM", MobileNumber: "01299887755", mail: "nada.samy@gmail.com", id: "233050" },
  { CustomerName: "سيف عماد يوسف", numBerson: 4, Date: "09/11/2025", time: "6:15 PM", MobileNumber: "01533557766", mail: "saif.emad@gmail.com", id: "233051" },
  { CustomerName: "ريهام طارق حسن", numBerson: 3, Date: "10/11/2025", time: "9:00 PM", MobileNumber: "01022446688", mail: "reham.tarek@gmail.com", id: "233052" },
  { CustomerName: "زياد هانى مصطفى", numBerson: 5, Date: "11/11/2025", time: "8:45 PM", MobileNumber: "01177889900", mail: "ziyad.hani@gmail.com", id: "233053" },
  
  ]
  
const filteredCustomers = DataCustomers.filter((customer) => {
  const lowerSearch = searchTerm.toLowerCase();
  const searchMatch =
    !searchTerm ||
    Object.values(customer).some(
      (val) => val && val.toString().toLowerCase().includes(lowerSearch)
    );

  const siteMatch =
    !filterData.site ||
    customer.theSite.toLowerCase().includes(filterData.site.toLowerCase());

  const typeMatch =
    !filterData.type ||
    customer.TypeOfTrade.toLowerCase().includes(filterData.type.toLowerCase());

  const dateMatch =
    !filterData.date ||
    customer.JoiningDate
      .split("/")
      .reverse()
      .join("-")
      .includes(filterData.date);

  const subscriptionMatch =
    !filterData.subscription ||
    customer.SubscriptionType.includes(filterData.subscription);

  return searchMatch && siteMatch && typeMatch && dateMatch && subscriptionMatch;
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

{removeClint && (
  <RemoveCustomer 
    id={numperOfId} 
    onClose={() => setRemovClint(false)} 
  />
)}

{/*---------------------------- --------filter customers---------------------------------------------------*/}

      {filter && <Fillter setFilter={setFilter} onSearch={setFilterData} />}

{/* ------------------------------------- export file date --------------------------------------------------*/}      
{expor && (
  <Export 
    data={filteredCustomers} 
    onClose={() => setExport(false)} 
  />
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

    <button className="border-[1px] bprder-[#183866] text-[#183866] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[132px] whitespace-nowrap"
    onClick={()=>{
      router.push("/ReservationsRequestsTwo/Rejectedbookings")
    }}>
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
                    <p className="w-[69px] h-[24px] bg-[#1838660D] flex justify-center rounded-[4px] items-center text-[8px] font-[500] text-[#183866]">
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
