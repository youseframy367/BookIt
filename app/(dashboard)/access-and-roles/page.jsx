"use client";


import { useState, useRef } from "react";
import RemoveRoles from "./removeRoles";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccessAndRoles() {

  const router = useRouter()

  const numbersRef = useRef(null);
  const [expor, setExport] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [numRow, setNumRow] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeClint, setRemovClint] = useState(false)
  const [numperOfId, setId] = useState()
  const [filterData, setFilterData] = useState({ site: "", type: "", date: "" });
  const [removeRoles, setRemovRoles] = useState(false)

  const DataCustomers = [
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233034" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233035" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233036" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "معلق", time: "10/2/2025", statusNow: "اعاده التفعيل", id: "233037" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233038" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233039" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233040" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233041" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233042" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233043" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233044" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233045" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233046" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233047" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233048" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233049" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233050" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233051" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233052" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233053" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233034" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233035" },
    { roles: "مشرف", access: "( مشاهدة كفاه الصلاجيات الموجودة في النظام )", status: "نشط", time: "10/2/2025", statusNow: "الغاء التقعيل", id: "233036" },

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

      {removeRoles && (
        <RemoveRoles
          id={numperOfId}
          onClose={() => setRemovRoles(false)}
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
        <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">كل الادوار</p>
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

          <Link href="/access-and-roles/add-role" className="text-center border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px] whitespace-nowrap">
            اضافة
          </Link>
        </div>
      </div>

      {/*--------------------------------------------- tabel Customers -----------------------------------------------*/}

      <div className="h-[80vh] mb-[30px] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <table className="min-w-full text-right">
          <thead className="sticky top-0 bg-[#F6F6F6] z-10 rounded-[4px]">
            <tr >



              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                الدور
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                الصلاحيات الفعالة
              </th>

              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center" >
                الحالة
              </th>


              <th className="px-4 py-3 text-[12px] font-bold text-[#475467]  whitespace-nowrap text-center">
                تاريخ الاضافة
              </th>


              <th className="px-4 py-3 text-[12px] font-bold text-[#475467] whitespace-nowrap text-center">
                التفعيل
              </th>




              <th className=" py-3 text-[12px] font-bold text-[#475467] pl-[25px]  whitespace-nowrap text-center">
                الاجراء
              </th>





            </tr>
          </thead>
          <tbody className="divide-gray-50">
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((customer, idx) => (
                <tr key={idx} className={`hover:bg-[#F9FAFB]/50 transition-colors ${customer.status === "معلق" && "opacity-50"
                  }`}>
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)]  overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ">{customer.roles}</td>
                  <td className="px-[8px] py-[15px]   text-[10px] font-[400] text-[var(--color-go-password)] underline overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.access}</td>
                  <td className={`px-[8px] py-[15px]   text-[10px] font-[400]  text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ${customer.status === "معلق" ? 'text-[var(--color-red-table)]' : 'text-green-500'}`}>{customer.status}</td>
                  <td className="px-[8px] py-[15px]  text-[8px] font-[500] text-[#183866] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">{customer.time}</td>
                  <td className={`px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center ${customer.statusNow === "اعاده التفعيل" && 'text-[var(--color-red-table)]'}`}>
                    <span className={`${customer.statusNow === "اعاده التفعيل" ? 'bg-[var(--color-red-again)]' : 'bg-[var(--color-tow-template)]'} rounded-[4px] px-[11px] py-[5px]`}>{customer.statusNow}</span>
                  </td>

                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                    <div className="flex items-center justify-center gap-[10px]">
                      <span className="flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                        () => {

                          window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                          router.push("/ModeratorsThree/detalsMoerators");

                        }}>
                        <img src="/img/كمغخخحه.svg" width="10" height="8px" />
                      </span>

                      <img src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                        router.push(`/access-and-roles/${customer.id}`);
                      }}
                      />

                      <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                        setRemovRoles(true)
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
    </div >
  );
}
