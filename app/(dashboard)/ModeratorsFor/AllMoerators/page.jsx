
"use client";


import { useState, useMemo, } from "react";
import { useRouter } from "next/navigation";
import { usePagnation } from "../../../hooks/usePagnation";
import { useMsgModetor } from "../../../data/dataModetor";
//import ControlTable from "../../partes/controlTable";
import Pagnation from "../../../components/public/Pagnation";
import ConfirmModal from "../../../components/Dashborad/AccessAndRoles/sure";
export default function AllMoerators() {
  const router = useRouter()
  const [remove, setRemove] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
 // const [numRow, setNumRow] = useState(10);
 // const [currentPage, setCurrentPage] = useState(1);
  const [numId ,setNumId]=useState()


  const dataMoerators = useMsgModetor()



  const filtered = useMemo(() => {
    if (!searchTerm) return dataMoerators;

    const lowerSearch = searchTerm.toLowerCase();

    return dataMoerators.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [searchTerm, dataMoerators]);

const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
  usePagnation(filtered, searchTerm);



 /// const numPages = Math.ceil(filtered.length / numRow);
 // const startIndex = (currentPage - 1) * numRow;
 // const displayedCustomers = filtered.slice(startIndex, startIndex + numRow);

  return (
    <div className="flex w-[98%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]">
      {remove && (
        
             <ConfirmModal
                  id={numId}
                  apiUrl="https://your-api.com/moerators"
                  title= " تأكيد الإجراء"
                  message=  "هل أنت متأكد أنك تريد حذف هذا المدير ؟"
                  confirmText="تأكيد"
                  cancelText="إلغاء"
                  onClose={() => setRemove(false)}
                />
        
        
        
       )}

      {/*---------------------------------------header Bage ----------------------------------------------------*/}

      <div className="p-[10px] flex flex-wrap items-center justify-between ">
        <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
          كل المشرفين
        </p>

        <div className="flex items-center gap-[15px] flex-1 justify-end">
          <div className="relative w-[300px]">
            <span className="absolute top-[10px] mr-[10px]">
              <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
            </span>
            <input
              type="search"
              placeholder="ابحث عن مشرف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
            />
          </div>

          <button
            className=" text-[#fff] bg-[#183866] text-[500] flex items-center justify-center px-5 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px]"

            onClick={() => {

              router.push("/ModeratorsFor/AddMoerators");
            }}
          >
            إضافة
          </button>
        </div>
      </div>

      <div className="h-[80vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} >
        <table className="w-[100%] text-right">
          <thead className="sticky top-[0px] bg-[#F9FAFB] z-10">
            <tr>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap" >الصورة</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الكود</th>
              <th className="px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467]  whitespace-nowrap" >الاسم</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">رقم الجوال</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">البريد</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">رقم الهويه</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467] whitespace-nowrap">العنوان</th>
              <th className="px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467] whitespace-nowrap">المسمى الوظيفي</th>
              <th className="px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467]  whitespace-nowrap">الصلاحيات</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الحاله</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الحساب</th>
              <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الاجراء</th>


            </tr>
          </thead>

          <tbody className="divide-gray-50">
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((m, i) => (
                <tr key={i} className="hover:bg-[#F9FAFB]/50 transition-colors">
                  <td className="px-[8px] py-[12px]" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <img src={m.img} alt="صورة" className="w-[40px] h-[28px] rounded-[4px] mx-auto" />
                  </td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.code}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.name}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.numperPone}</td>
                  <td className="px-[8px] py-[12px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.email}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.idNumber}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.title}</td>


                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.nameGop}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                  >{m.Powers}</td>
                  <td className="px-[8px] py-[16px]  text-center text-[10px] text-[400] " style={{
                    color: m.acount ? "#23BD33" : '#FF3A3A'
                  }}

                    onClick={() => {


                      window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                      router.push("/ModeratorsFor/updateMoerators");


                    }}



                  >{m.stat ? "نشط" : "معطل"}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] " style={{
                    color: m.acount ? "#183866" : '#FF3A3A'
                  }}

                    onClick={() => {


                      window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                      router.push("/ModeratorsFor/updateMoerators");


                    }}


                  >{m.acount ? "ايقاف الحساب" : 'تفعيل'}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]" >


                    <div className="flex items-center justify-center gap-[10px]">
                      <img src="/img/كمغخخحه.svg" width="10px" height="8px"

                        onClick={
                          () => {

                            window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                            router.push("/ModeratorsFor/detalsMoerators");

                          }}

                      />


                      <img src="/img/تعديل.svg" onClick={() => {
                        window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                        router.push("/ModeratorsFor/updateMoerators");


                      }}
                      ></img>
                      <img src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                        setNumId(m.id)
                        setRemove(true)

                      }} />
                    </div>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="p-[20px] text-center text-gray-500 text-[12px]">
                  لا يوجد سجلات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



 {/* ------------------------------------filter Bage----------------------------------------- */}
      <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* ---------------------------------------------control of bage -----------------------------------------



     <ControlTable
   //     numRow={numRow}
  //      setNumRow={setNumRow}
   //     numPages={numPages}
   //     currentPage={currentPage}
   //     setCurrentPage={setCurrentPage}
   //   />
   */}
    </div>
  );
}
