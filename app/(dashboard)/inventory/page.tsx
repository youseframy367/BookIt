
"use client";

/* ============================== المخزون — داتا حقيقية من GET /api/inventory ==============================
   كل صف يحفظ الـ id الحقيقي عشان الحذف والتعديل يعملوا على الباك إند
   الحالة: active → "متوفر" (أخضر) / suspended → "حساب معطل" (أحمر)
   ============================================================================ */
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePagnation } from "../../hooks/usePagnation";
import { useInventoryData } from "../../data/dataInventory";
import Pagnation from "../../components/public/Pagnation";
import Image from "next/image";
import Export from "@/app/components/Dashborad/Inventory/Export";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";
import { toast } from "react-toastify";
import { inventoryApi } from "@/utils/api";

/* تحويل عنصر المخزون من الباك إند إلى شكل الجدول مع الحفاظ على الـ id الحقيقي */
const toRow = (item: any) => ({
    ...item,
    _id: item.id,
    img: item.image || "/img/trrruyeryer.svg",
    name: item.nameAr,
    kPrice: item.price ?? "-", // الباك إند لا يخزن سعراً للمكوّن حالياً
    kAmount: `${item.quantity} كيلو`,
    kLimitAmount: item.minQuantity ?? "-",
    date: item.lastInventoryDate || item.createdAt,
    status: item.status === "active" ? "متوفر" : "معطل",
});

export default function Inventory() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const [showStatus, setShowStatus] = useState(false);
    const [textStatus, setTextStatus] = useState("");

    const [removeRoles, setRemovRoles] = useState(false);

    const tableRef = useRef<HTMLDivElement>(null);

    /* داتا حقيقية من الباك إند مع fallback على الداتا الوهمية عند الفشل */
    const dummyData = useInventoryData();
    const [dataMoerators, setDataMoerators] = useState<any[]>(dummyData);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await inventoryApi.list();
                if (Array.isArray(data)) setDataMoerators(data.map(toRow));
            } catch (e) {
                console.error("فشل تحميل المخزون — باستخدام الداتا الوهمية:", e);
                toast.warn("تعذر الاتصال بالخادم — عرض بيانات مؤقتة");
            }
        })();
    }, []);

    /* حذف منتج حقيقي عبر DELETE /inventory/:id */
    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await inventoryApi.remove(selectedId);
            toast.success("تم حذف المنتج من المخزون بنجاح ✅");
            /* إعادة تحميل القائمة بعد الحذف */
            const { data } = await inventoryApi.list();
            if (Array.isArray(data)) setDataMoerators(data.map(toRow));
        } catch (e) {
            console.error("فشل حذف المنتج:", e);
            toast.error("حدث خطأ أثناء حذف المنتج ❌");
        } finally {
            setRemovRoles(false);
            setSelectedId(null);
        }
    };

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

    // تطبيق فلتر المخزون
    const applyFilter = () => {
        if (textStatus) {
            const lowerStatus = textStatus.toLowerCase();
            setSearchTerm((prev) => `${prev} ${lowerStatus}`.trim());
        }
    };

    return (
        <section className="flex w-[98%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]">
            {removeRoles && (
                <RemoveRoles
                    text="هل أنت متأكد أنك تريد حذف المنتج هذا من المخزون ؟"
                    handleDelete={handleDelete}
                    onClose={() => setRemovRoles(false)} />
            )
            }
            {showFilter && (
                <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[484px] rounded-[12px] bg-white py-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[25px]">
                                    <div className="flex items-center justify-between px-[20px]">
                                        <p className="text-[#131313] font-semibold text-[20px]">
                                            فلتر المخزون
                                        </p>
                                        <Image src="/assets/icons/close.png" alt="close" width={18} height={18} onClick={() => setShowFilter(false)} className="cursor-pointer" title="اغلاق" />
                                    </div>
                                    <hr className="text-[var(--color-gray-six)]" />

                                    <div className="px-[20px] flex flex-col gap-[16px]">
                                        <div className="flex flex-col gap-[12px]">
                                            <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">الكميه المتاحه</label>
                                            <input type="text" placeholder="أدخل الكميه" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                        </div>
                                        <div className="flex gap-[12px]">
                                            <div className="relative flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">الحاله</label>
                                                <div onClick={() => setShowStatus(prev => !prev)} className={`${showStatus && 'bg-gray-300'} border border-gray-300 py-[12px] px-2 rounded-[10px] flex justify-between`}>
                                                    <span className={`${showStatus ? 'text-[var(--color-dark-blue-gray)]' : 'text-[#8C94A3]'} text-sm font-normal opacity-[0.5]`}>حدد الحاله</span>
                                                    <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${showStatus && 'rotate-180'}`} />
                                                </div>
                                                {
                                                    showStatus && <ul className="bg-white w-full border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-20 p-[8px] flex flex-col gap-2">
                                                        <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-green-bright)] flex justify-between`} onClick={() => setTextStatus('متوفر')}>
                                                            <span>متوفر</span>
                                                            {textStatus == 'متوفر' && <span>✔</span>}
                                                        </li>
                                                        <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-gold)] flex justify-between`} onClick={() => setTextStatus('كميه قليله ')}>
                                                            <span>كميه قليله </span>
                                                            {textStatus == 'كميه قليله ' && <span>✔</span>}
                                                        </li>
                                                        <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--strong-red)] flex justify-between`} onClick={() => setTextStatus('نفذ')}>
                                                            <span>نفذ</span>
                                                            {textStatus == 'نفذ' && <span>✔</span>}
                                                        </li>
                                                    </ul>
                                                }
                                            </div>
                                            <div className="flex flex-col gap-[12px] w-full">
                                                <label htmlFor="" className="text-xs text-[var(--color-dark-bg-tow)]">تاريخ الاضافه</label>
                                                <input type="date" className="border border-2 py-[9px] px-[12px] rounded-[8px] border-[var(--color-gray-six)]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-[16px] justify-between mt-[20px] px-[20px]">
                                    <button
                                        className="bg-[#F5F7FA] text-[#183866] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                                        onClick={() => setShowFilter(false)}
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        className="bg-[#183866] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[38px] flex justify-center items-center"
                                        onClick={() => {
                                            applyFilter()
                                            setShowFilter(false)
                                        }}
                                    >
                                        بحث
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            )
            }

            {/*---------------------------------------header Bage ----------------------------------------------------*/}

            <div className="p-[10px] flex flex-wrap items-center justify-between ">
                <p className="text-[#1D1D1D] font-bold text-[16px] whitespace-nowrap">
                    المكونات في المخزون
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

                    <img
                        onClick={() => {
                            setShowFilter(true)
                        }}
                        src="/img/Frame 1686553878.svg"
                        className="w-[32px] h-[32px] cursor-pointer"
                        alt="filter"
                    />

                    <Export displayedCustomers={displayedCustomers} tableRef={tableRef} />
                </div>
            </div>

            <div className="h-[80vh] overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} ref={tableRef}>
                <table className="min-w-full text-right">
                    <thead className="sticky top-0 bg-[#F9FAFB] rounded-[4px]">
                        <tr>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap" >صورة المنتج</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">اسم المنتج</th>
                            <th className="px-[8px] py-[15px] text-center text-[12px] font-bold text-[#475467]  whitespace-nowrap" >سعر الكيلو</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الكميه المتاحه</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الحد الأدنى للكميه</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">تاريخ الاضافه</th>
                            <th className="px-[8px] text-center py-[12px] text-[12px] font-bold text-[#475467]  whitespace-nowrap">الحاله</th>
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
                                    >{m.name}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.kPrice}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]" style={{
                                        color: Number(m.kAmount.replace(" كيلو", "")) > 100 || Number(m.kAmount.replace(" كيلو", "")) < 100 && Number(m.kAmount.replace(" كيلو", "")) > 20
                                            ? "#23BD33"
                                            : Number(m.kAmount.replace(" كيلو", "")) < 20 && Number(m.kAmount.replace(" كيلو", "")) > 0 ? "#FFAE00" : "#FF3A3A"
                                    }}
                                    >{m.kAmount}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[var(--color-blue-tow)]"
                                    >{m.kLimitAmount}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]"
                                    >{m.date}</td>
                                    <td className="px-[8px] py-[16px] text-center text-[10px] text-[400] text-[rgba(29, 29, 29, 0.7)]" style={{
                                        color: m.status == "متوفر"
                                            ? "#23BD33"
                                            : m.status == "كميه قليله" ? "#FFAE00" : "#FF3A3A"
                                    }}
                                    >{m.status == "معطل" ? "معطل" : m.status}</td>
                                    <td className="px-[8px] py-[15px]  text-[10px] font-[400] text-[rgba(29,29,29,0.7)] overflow-hidden whitespace-nowrap border-b border-[#F6F6F6] text-center">
                                        <div className="flex items-center justify-center gap-[10px]">
                                            {/* تعديل المنتج — ننتقل لصفحة التعديل مع تمرير الـ id الحقيقي */}
                                            <img className="cursor-pointer" title="تعديل" src="/img/تعديل.svg" width="24px" height="24px" onClick={() => {
                                                window.sessionStorage.setItem("inventoryEditId", m._id);
                                                router.push("/inventory/" + m._id);
                                            }} />

                                            {/* حذف المنتج — فتح تأكيد ثم DELETE /inventory/:id */}
                                            <img className="cursor-pointer" title="حذف" src="/img/Frame 1261153571.svg" width="24px" height="24px" alt="حذف" onClick={() => {
                                                setSelectedId(m._id);
                                                setRemovRoles(true);
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
        </section>
    );
}
