"use client";

/* ============================== عرض الدور — داتا حقيقية ==============================
   المصدر: GET /api/roles/:id → {id, nameAr, permissions: [...], isActive, ...}
   + PATCH /roles/:id/toggle
   ============================================================================ */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image"
import Link from "next/link"
import api from "@/utils/api";

export default function UpdateAccessAndRoles({ id }: { id: string }) {
    const router = useRouter();
    const [role, setRole] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/roles/${id}`);
                setRole(data);
            } catch (e) {
                console.error("فشل تحميل الدور:", e);
            }
        })();
    }, [id]);

    /* تفعيل/إيقاف الدور عبر PATCH /roles/:id/toggle */
    const handleToggle = async () => {
        try {
            await api.patch(`/roles/${id}/toggle`);
            setRole((r: any) => ({ ...r, isActive: !r?.isActive }));
            toast.success("تم تحديث حالة الدور ✅");
        } catch (e) {
            console.error("فشل تغيير الحالة:", e);
            toast.error("حدث خطأ أثناء تغيير حالة الدور ❌");
        }
    };

    if (!role) {
        return (
            <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] items-center justify-center">
                <p className="text-[#8C94A3]">جارٍ تحميل بيانات الدور...</p>
            </section>
        );
    }

    return (
        <section className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[25px] ">
            <div className="flex flex-col gap-[23px]">
                <div className="pt-[23px] flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-[#1D1D1D] font-semibold text-base whitespace-nowrap">عرض الدور</h2>
                    <div
                        className="cursor-pointer text-xs font-semibold bg-[var(--color-red-dark-transparent)] rounded-[10px] px-[15px] py-[10px]"
                        style={{ color: role.isActive ? "var(--color-red-bright)" : "var(--color-green-bright)" }}
                        onClick={handleToggle}
                    >
                        <span>{role.isActive ? "اعاده التفعيل" : "تفعيل"}</span>
                    </div>
                </div>
                <div className="border border-1 border-[var(--gray)] rounded-[16px] py-[16px] px-[25px]">
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-base">عرض تفاصيل الدور ( AR )</span>
                            <Link href={`/access-and-roles/update/${id}`} className="border border-1 border-[var(--gray)] flex gap-[8px] rounded-[8px] py-[11px] px-[16px]">
                                <Image src="/assets/icons/update.svg" alt="update" width={14} height={14} />
                                <span className="font-semibold text-[var(--color-black-50)]">تعديل</span>
                            </Link>
                        </div>
                        <hr className="text-[var(--color-black-05)]" />
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex md:gap-[312px]">
                                <span className="text-[var(--color-gray-medium-tow)] text-sm font-normal">الاسم : <span className="text-[var(--color-black-50)]">{role.nameAr || role.name}</span></span>
                                <span className="text-[var(--color-gray-medium-tow)] text-sm font-normal">الحالة : <span className={role.isActive ? "text-green-500" : "text-[var(--color-red-bright)]"}>{role.isActive ? "مفعّل" : "معلق"}</span></span>
                            </div>
                            <span className="text-[var(--color-gray-medium-transparent-tow)] text-sm font-normal">الصلاحيات : <span className="text-[var(--color-black-50)]">{(role.permissions || []).join(" - ") || "لا توجد صلاحيات"}</span></span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link title="الغاء" href="/access-and-roles" className="border border-1 border-[var(--gray)] flex gap-[8px] rounded-[8px] py-[7px] px-[23px]">
                        <span className="font-semibold text-[var(--color-black-50)]">الغاء</span>
                    </Link>
                    <button
                        title="حفظ"
                        className="cursor-pointer border-[1px] border-[#183866] bg-[#183866] text-[#fff] text-sm px-[23px] py-[7px] rounded-[12px] font-medium"
                        onClick={() => router.push(`/access-and-roles/update/${id}`)}
                    >
                        تعديل الدور
                    </button>
                </div>
            </div>
        </section>
    )
}