"use client";

import { useState } from "react";
import RemoveRoles from "./removeRoles";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pagnation from "../../components/public/Pagnation";
import { usePagnation } from "../../hooks/usePagnation";
import { useAccessAndRolesData } from "../../data/dataAccessAndRoles";

export default function AccessAndRoles() {
  const router = useRouter()
  const [expor, setExport] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [numperOfId, setId] = useState()
  const [removeRoles, setRemovRoles] = useState(false)

  const DataCustomers = useAccessAndRolesData();

  const { setFilterData, currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
    usePagnation(DataCustomers, searchTerm)

  return (
    <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[15px] ">
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

      {/* ------------------------------------filter Bage----------------------------------------- */}
      <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </section>
  );
}
