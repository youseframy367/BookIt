"use client";

/* ============================== فروع نقاط البيع — داتا حقيقية ==============================
   المصدر: GET /api/business/branches → [{id, titleAr, address, phone, isActive, ...}]
   + POST /business/branches — PATCH /business/branches/:id — DELETE /business/branches/:id — toggle
   ============================================================================ */
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import AddOrUpdatePopUp from "@/app/components/Dashborad/Cashier/AddOrUpdatePopUp";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import Pagnation from "@/app/components/public/Pagnation";
import { usePagnation } from "@/app/hooks/usePagnation";
import { useSelectCustomersData } from "@/app/data/dataSelectCusomers";
import { businessApi } from "@/utils/api";

export default function Customers() {
    const [selectedAddRole, setSelectedAddRole] = useState<string | null>("");
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showUpdateCustomer, setShowUpdateCustomer] = useState(false);
    const [removeRoles, setRemovRoles] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAddRoles, setSelectedAddRoles] = useState<string[]>([]);
    const [editTarget, setEditTarget] = useState<string | null>(null);

    const dummyData = useSelectCustomersData();

    /* === داتا حقيقية من الباك إند (fallback على الوهمية عند الفشل) === */
    const [branches, setBranches] = useState<any[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await businessApi.branches();
                setBranches(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("فشل تحميل الفروع:", e);
                setBranches(null);
            }
        })();
    }, []);

    /* نمطط الفروع الحقيقية إلى شكل {key, title} الذي يعتمد عليه التصميم */
    const realRows = useMemo(() => {
        if (!Array.isArray(branches)) return null;
        return branches.map((b: any) => ({
            key: b.id,
            title: b.titleAr || b.nameAr || b.address || b.title,
            branch: b,
        }));
    }, [branches]);

    const DataCustomers = realRows ?? dummyData;

    const handleDelete = async () => {
        if (!editTarget) return;
        try {
            await businessApi.removeBranch(editTarget);
            setBranches((prev) => (prev ? prev.filter((b) => b.id !== editTarget) : prev));
            toast.success("تم حذف الفرع بنجاح ✅");
        } catch (e) {
            console.error("فشل حذف الفرع:", e);
            toast.error("حدث خطأ أثناء حذف الفرع ❌");
        } finally {
            setRemovRoles(false);
            setEditTarget(null);
        }
    };

    const { currentPage, setCurrentPage, numPages, setNumRow, displayedCustomers, scroll, numRow, numbersRef } =
        usePagnation(DataCustomers, searchTerm)

    return (
        <section className="flex w-[98%] m-[1%] bg-[#fff] rounded-[11px] flex-col px-[25px] h-[85vh] overflow-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            <div className="flex flex-col gap-[23px] pt-[23px]">
                <div className="p-[10px] flex flex-wrap items-center justify-between ">
                    <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
                        نقاط البيع المسجله
                    </p>

                    <div className="flex items-center gap-[15px] flex-1 justify-end">
                        <div className="relative w-[300px]">
                            <span className="absolute top-[10px] mr-[10px]">
                                <img src="/media/shared/ui/search.svg" className="w-4 h-4" />
                            </span>
                            <input
                                type="search"
                                placeholder="ابحث عن فرع"
                                className="w-[300px] h-[36px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[6px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[#183866]"
                            />
                        </div>

                        <button title="اضافة فرع" onClick={() => setShowAddCustomer(true)}
                            className="cursor-pointer text-[#fff] bg-[#183866] text-[500] flex items-center justify-center px-5 py-2 rounded-lg text-[10px] font-medium h-[32px]"
                        >
                            اضافة فرع
                        </button>
                    </div>
                </div>

                {
                    showAddCustomer && (
                        <AddOrUpdatePopUp
                            setShowCustomer={setShowAddCustomer}
                            title="اضافة فرع"
                            text="من فضلك اضف الفرع الخاص بك"
                            input="أدخل الفرع"
                            /* عند الحفظ الفعلي ننشئ الفرع في الباك إند */
                            onSave={async (value) => {
                                if (!value?.trim()) { toast.error("يرجى إدخال عنوان الفرع"); return; }
                                try {
                                    await businessApi.createBranch({ titleAr: value, address: value });
                                    setBranches((prev) => (prev ? [...prev, { id: "new", titleAr: value, address: value }] : prev));
                                    toast.success("تم إضافة الفرع بنجاح ✅");
                                } catch (e) {
                                    console.error("فشل إضافة الفرع:", e);
                                    toast.error("حدث خطأ أثناء إضافة الفرع ❌");
                                }
                            }}
                        />
                    )
                }

                {
                    showUpdateCustomer && (
                        <AddOrUpdatePopUp
                            setShowCustomer={setShowUpdateCustomer}
                            title="تعديل فرع"
                            text="من فضلك قم بالتعديل"
                            input="المنصوره , حي الجامعه"
                            /* عند الحفظ الفعل نحدّث الفرع في الباك إند */
                            onSave={async (value) => {
                                if (!editTarget || !value?.trim()) { toast.error("يرجى إدخال عنوان الفرع"); return; }
                                try {
                                    await businessApi.updateBranch(editTarget, { titleAr: value, address: value });
                                    setBranches((prev) => (prev ? prev.map((b) => (b.id === editTarget ? { ...b, titleAr: value, address: value } : b)) : prev));
                                    toast.success("تم تعديل الفرع بنجاح ✅");
                                } catch (e) {
                                    console.error("فشل تعديل الفرع:", e);
                                    toast.error("حدث خطأ أثناء تعديل الفرع ❌");
                                }
                            }}
                        />
                    )
                }

                {removeRoles && (
                    <RemoveRoles
                        text="هل أنت متأكد أنك تريد حذف هذا الفرع ؟"
                        handleDelete={handleDelete}
                        onClose={() => setRemovRoles(false)} />
                )
                }
                <ul className="flex flex-col gap-5 relative z-1 h-[80%] overflow-scroll"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}

                >
                    {
                        DataCustomers.map((item, index) => {
                            return <li key={index} className="border border-1 border-[var(--gray)] rounded-[16px] py-[16px]">
                                <label onClick={() => {
                                    setSelectedAddRoles(prev =>
                                        prev.includes(item.key)
                                            ? prev.filter(key => key !== item.key)
                                            : [...prev, item.key]
                                    );
                                }}>
                                    <div className="py-[13px] w-full flex justify-between items-center px-[25px]">
                                        <span className="text-base font-semibold">اضافة فرع جديد</span>
                                        <Image src="/media/shared/icons/arraw-down.svg" alt="arraw" width={10} height={10} className={`transition-all duration-300 ${selectedAddRoles.includes(item.key) && 'rotate-179'}`} />
                                    </div>
                                </label>
                                <hr className="text-[var(--color-black-05)]" />
                                {
                                    <div
                                        className={`w-full px-[25px] w-[250px] mt-[12px] overflow-hidden transition-all duration-300 ${selectedAddRoles.includes(item.key) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="flex flex-col gap-[12px]">
                                            <h3 className="text-xs text-[var(--color-dark-bg-tow)]">أدخل عنوان الفرع</h3>
                                            <div className="text-xs border border-1 border-[var(--gray)] rounded-[8px] text-[var(--color-grayish-blue)] relative flex items-center">
                                                <div className="absolute left-2">
                                                    <div className="flex items-center justify-center gap-[10px]">
                                                        <div onClick={() => {
                                                            setEditTarget(item.key);
                                                            setRemovRoles(true);
                                                        }} >
                                                            <img className="cursor-pointer" title="حذف" src="/media/shared/icons/remove.svg" width="24px" height="24px" alt="حذف" />
                                                        </div>
                                                        <div onClick={() => { setEditTarget(item.key); setShowUpdateCustomer(true); }}>
                                                            <img className="cursor-pointer" title="تعديل" src="/media/dashboard/actions/edit.svg" width="24px" height="24px" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-[9px] px-[12px] w-full h-full">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
            <Pagnation numRow={numRow} setNumRow={setNumRow} scroll={scroll} numbersRef={numbersRef} numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    )
}