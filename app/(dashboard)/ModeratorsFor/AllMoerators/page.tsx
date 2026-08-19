
"use client";

/* ============================== كل المشرفين — داتا حقيقية ==============================
   المصدر: GET /api/users → قائمة مستخدمي الأونر (مشرفين/سيلز/مديرين)
   الحقول: {id, nameAr, email, phone, nationalId, titleAr, role, status, roleId, ...}
   ============================================================================ */
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePagnation } from "../../../hooks/usePagnation";
import { useMsgModetor } from "../../../data/dataModetor";
import Pagnation from "../../../components/public/Pagnation";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import api from "@/utils/api";
import { usersApi } from "@/utils/api";
import { toast } from "react-toastify";

export default function AllMoerators() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [removeRoles, setRemovRoles] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [users, setUsers] = useState<any[] | null>(null); // null = لم يُحمّل بعد
  const dataMoerators = useMsgModetor()

  /* نجلب قائمة المستخدمين الحقيقية من الباك إند */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await usersApi.list();
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("فشل تحميل المشرفين:", e);
        setUsers(null); // null = فشل التحميل، نرجع للداتا الوهمية
      }
    })();
  }, []);

  /* إن نجح التحميل نعرض الداتا الحقيقية (مع تحويل الحقول)، وإلا الداتا الوهمية */
  const realRows = useMemo(() => {
    if (!Array.isArray(users)) return null;
    return users.map((u: any) => ({
      id: u.id,
      code: u.id ? u.id.slice(0, 8) : "",
      name: u.nameAr || u.nameEn || "—",
      numperPone: u.phone || "—",
      email: u.email || "—",
      idNumber: u.nationalId || "—",
      title: u.titleAr || u.titleEn || u.role || "—",
      nameGop: u.role || "—",
      Powers: u.roleId ? "مُعيّن" : "غير معيّن",
      stat: u.status === "ACTIVE",
      acount: u.status === "ACTIVE",
      img: u.avatar || "/media/dashboard/profile/member-portrait.jpg",
    }));
  }, [users]);

  const filtered = useMemo(() => {
    const source = realRows ?? dataMoerators;
    if (!searchTerm) return source;

    const lowerSearch = searchTerm.toLowerCase();

    return source.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [searchTerm, realRows, dataMoerators]);

  const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
    usePagnation(filtered, searchTerm);

  // حذف مشرف عبر الـ API (DELETE /users/:id)
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await api.delete(`/users/${selectedId}`);
      setUsers((prev) => (prev ? prev.filter((u) => u.id !== selectedId) : prev));
      toast.success("تم حذف المدير بنجاح ✅");
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("حدث خطأ أثناء حذف المدير ❌");
    } finally {
      setRemovRoles(false);
      setSelectedId(null);
    }
  };

  // تفعيل/إيقاف حساب مشرف عبر الـ API (PATCH /users/:id/status)
  const handleToggleStatus = async (u: any) => {
    try {
      const { data } = await api.patch(`/users/${u.id}/status`);
      setUsers((prev) => (prev ? prev.map((x) => (x.id === u.id ? { ...x, ...data } : x)) : prev));
      toast.success("تم تحديث حالة الحساب ✅");
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error("حدث خطأ أثناء تحديث الحالة ❌");
    }
  };

  return (
    <div className="flex w-[98%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]">
      {removeRoles && (
        <RemoveRoles
          text="هل أنت متأكد أنك تريد حذف هذا المدير ؟"
          handleDelete={handleDelete}
          onClose={() => setRemovRoles(false)} />
      )
      }

      {/*---------------------------------------header Bage ----------------------------------------------------*/}

      <div className="p-[10px] flex flex-wrap items-center justify-between ">
        <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
          كل المشرفين
        </p>

        <div className="flex items-center gap-[15px] flex-1 justify-end">
          <div className="relative w-[300px]">
            <span className="absolute top-[10px] mr-[10px]">
              <img src="/media/shared/ui/search.svg" className="w-4 h-4" />
            </span>
            <input
              type="search"
              placeholder="ابحث عن مشرف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
            />
          </div>

          <button title="إضافة"
            className="cursor-pointer text-[#fff] bg-[#183866] text-[500] flex items-center justify-center px-5 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px]"

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
              displayedCustomers.map((m: any, i: any) => (
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
                  <td className="px-[8px] py-[16px]  whitespace-nowrap text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
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
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]  whitespace-nowrap"
                  >{m.Powers}</td>
                  <td className="px-[8px] py-[16px]  text-center text-[10px] text-[400]  whitespace-nowrap" style={{
                    color: m.acount ? "#23BD33" : '#FF3A3A'
                  }}

                    onClick={() => {
                      if (realRows) handleToggleStatus(m); else {
                        window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                        router.push("/ModeratorsFor/updateMoerators");
                      }
                    }}

                  >{m.stat ? "نشط" : "معطل"}</td>
                  <td className="px-[8px] py-[16px] text-center text-[10px] text-[400]  whitespace-nowrap" style={{
                    color: m.acount ? "#183866" : '#FF3A3A'
                  }}

                    onClick={() => {


                      window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                      router.push("/ModeratorsFor/updateMoerators");


                    }}

                  >{m.acount ? "ايقاف الحساب" : 'تفعيل'}</td>
                  <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                    <div className="flex items-center justify-center gap-[10px]">
                      <span title="معاينه" className="cursor-pointer flex justify-center items-center bg-[#F4F4FE] rounded-full h-[24px] w-[24px]" onClick={
                        () => {
                          window.sessionStorage.setItem("dateAcuntModetor", JSON.stringify(m));
                          router.push("/ModeratorsFor/detalsMoerators");
                        }}>
                        <img src="/media/dashboard/actions/chevron-up.svg" width="10" height="8px" />
                      </span>

                      <img className="cursor-pointer" title="تعديل" src="/media/dashboard/actions/edit.svg" width="24px" height="24px" onClick={() => {
                        router.push("/ModeratorsFor/updateMoerators");
                      }} />

                      <img className="cursor-pointer" title="حذف" src="/media/dashboard/actions/delete.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                        /* حفظ الـ id الحقيقي للمستخدم ثم فتح نافذة تأكيد الحذف */
                        setSelectedId(m.id ?? null);
                        setRemovRoles(true)
                      }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-[20px] text-center text-gray-500 text-[12px]">
                  لا يوجد سجلات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ------------------------------------filter Bage----------------------------------------- */}
      <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
