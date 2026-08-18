"use client";

/* ============================== حجوزاتي — داتا حقيقية ==============================
   GET /api/reservations/my → حجوزات العميل الحالية
   إلغاء الحجز: DELETE /api/public/reservations/:id (للعميل)
   مع fallback على الداتا الوهمية عند فشل الاتصال
   ============================================================================ */
import { useBookitsData } from "@/app/data/dataBookits";
import api, { reservationsApi } from "@/utils/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function MyBookits() {
    const dummyBookits = useBookitsData();
    const { t, mounted } = useTranslationSetup();
    const [bookits, setBookits] = useState(dummyBookits);
    const [removeRoles, setRemovRoles] = useState(false);
    const [cancelTarget, setCancelTarget] = useState<any>(null);

    /* تحميل حجوزات العميل الحقيقية */
    useEffect(() => {
        (async () => {
            try {
                const { data } = await reservationsApi.myReservations();
                if (Array.isArray(data) && data.length > 0) {
                    setBookits(
                        data.map((r: any) => ({
                            id: r.id,
                            name: r.customerName || "",
                            numberOfPepole: r.numberOfPeople || 0,
                            reservationTime: r.startTime || "",
                            reservationDate: r.dateFrom ? new Date(r.dateFrom).toLocaleDateString("ar-EG") : "",
                            branchLocation: r.business?.name || "",
                            status: r.status,
                            /* زر الإلغاء يظهر للحجوزات المنتظرة فقط */
                            action: r.status === "PENDING" ? "الغاء الحجز" : r.status === "CONFIRMED" ? "تاكيد" : r.status === "CANCELLED" ? "ملغية" : "الأنتظار",
                        }))
                    );
                }
            } catch (e) {
                console.error("فشل تحميل حجوزاتي — باستخدام الداتا الوهمية:", e);
            }
        })();
    }, []);

    /* إلغاء الحجز عبر الباك إند: PATCH /reservations/:id/cancel */
    const handleCancel = async () => {
        const target = cancelTarget as any;
        if (!target?.id) return;
        try {
            await api.patch(`/reservations/${target.id}/cancel`);
            setBookits(prev => prev.map((b: any) => (b.id === target.id ? { ...b, action: "ملغية", status: "CANCELLED" } : b)));
        } catch (e) {
            console.error("فشل إلغاء الحجز:", e);
        } finally {
            setRemovRoles(false);
            setCancelTarget(null);
        }
    };

    return (
        <section>
            <div className="shadow-[0_1px_6px_var(--color-black-tow)] fixed top-0 p-[15px] bg-white z-1 flex items-center w-full">
                <div className="flex flex-1">
                    <Image src="/assets/icons/close.svg" alt="close" width={24} height={24} />
                </div>
                <div className="flex flex-[1.7]">
                    <h2 className="text-[var(--strong-red)] text-lg font-medium">My Bookings</h2>
                </div>
            </div>
            <div className="container">
                {removeRoles && (
                    <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[684px] h-[178px] rounded-[12px] bg-white p-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[12px]">
                                    <p className="text-[#131313] font-semibold text-[20px]">
                                        Action Confirm
                                    </p>

                                    <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-normal">
                                        Are you sure you want to delete this reservation?
                                    </p>
                                </div>
                                <div className="flex gap-[16px] justify-end mt-[20px]">
                                    <button
                                        className="bg-[var(--color-danger-light)] text-[var(--strong-red)] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[40px] flex justify-center items-center"
                                        onClick={() => {
                                            setRemovRoles(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-[var(--strong-red)] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[40px] flex justify-center items-center"
                                        onClick={handleCancel}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                <ul className="mt-[73px] md:mt-[43] flex flex-col md:gap-[24px]">
                    {
                        bookits.map((item, index) => {
                            return (
                                <li key={index} data-aos="fade-up" className="w-full overflow-auto">
                                    <div className="w-[1000px] md:w-[unset] overflow-scroll shadow-[0_1px_6px_#E5E9F2] md:py-[8px] px-[17px] flex flex-col md:gap-[18px] rounded-[16px]">
                                        <div className="rounded-[4px] text-xs font-normal flex">
                                            <div className="flex flex-col gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px] ps-[15px]">
                                                    <span>{mounted ? t("customer-name") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)] ps-[15px]">{item.name}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("number-of-people") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.numberOfPepole}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("reservation-time") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.reservationTime}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("reservation-date") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.reservationDate}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("branch-location") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.branchLocation}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("reservation-name") : "..."}</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.name}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>{mounted ? t("action") : "..."}</span>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div onClick={() => {
                                                        item.action == "الغاء الحجز" && (setCancelTarget(item), setRemovRoles(true))
                                                    }} className={`relative bottom-[6px] rounded-[4px] ${item.action == "الغاء الحجز" ? 'cursor-pointer text-[var(--strong-red)] bg-[var(--color-danger-light)]' : 'text-[var(--color-green-1)] bg-[var(--color-black-seven)]'} p-[7.5px]`}>
                                                        <span>{item.action}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}