/* ============================== تفاصيل المحل — داتا حقيقية ==============================
   biz = بيانات المحل من GET /api/public/businesses/:id
   الحقول: address, location, phone, altPhone, description, workingHours, type
   ============================================================================ */
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";

export default function ContentDetails({ business }: { business?: any }) {
    const { t, i18n, mounted } = useTranslationSetup();

    return (
        <section>
            <div className="mt-[35px]">
                <div className="container">
                    <div className="flex flex-col gap-[62px]">
                        <div className="w-full h-[250px] md:h-[600px] relative">
                            <iframe
                                className="w-full h-full border-0"
                                loading="lazy"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(business?.location || business?.address || "Cairo, Egypt")}&z=13&output=embed`}
                            ></iframe>
                        </div>
                        <div className="w-full md:w-[50%] flex flex-col gap-[30px] md:gap-[60px]">
                            <div className="w-full relative">
                                <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                    <Image src="/media/shared/icons/location.svg" alt="location" width={20} height={20} />
                                    <span className="text-[10px] md:text-xl font-medium">{mounted ? t("location") : ""}</span>
                                </label>
                                <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                    <span className="opacity-[0.5]">{business?.address || "Nile Corniche, Qasr Ad Dobarah, Qasr El Nil, Cairo Governorate 11511, Egypt"}</span>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/phone.svg" alt="phone" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("phone-1") : ""}</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">{business?.phone || "01055395693"}</span>
                                    </div>
                                </div>
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/phone.svg" alt="phone" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("phone-2") : ""}</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">{business?.altPhone || "01055395693"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/Cuisines.svg" alt="Cuisines" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("cuisines") : ""}</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">{business?.type === "CAFE" ? "كافيه، مشروبات ساخنة وباردة" : "مطعم، مأكولات شرقية وعالمية"}</span>
                                    </div>
                                </div>
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/clock-2.svg" alt="Hours of operation" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("hours-of-operation") : ""}</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">{business?.workingHours
                                            ? `يومياً من ${business.workingHours.open || ""} حتى ${business.workingHours.close || ""}`
                                            : "Daily 12:30 pm–1:00 am"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/neighborhood.svg" alt="Neighborhood" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("neighborhood") : ""}</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 rounded-[30px] p-5" placeholder={business?.location || "Cairo, Egypt"} />
                                </div>
                                <div className="w-full relative">
                                    <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                        <Image src="/media/shared/icons/code.svg" alt="Dress code" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">{mounted ? t("dress-code") : ""}</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">{business?.description || "Business Casual"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative">
                                <label className={`flex gap-2 items-center absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "right-9" : "left-9" : ""}`}>
                                    <Image src="/media/shared/icons/site.svg" alt="External Link" width={20} height={20} />
                                    <span className="text-[10px] md:text-xl font-medium">{mounted ? t("external-link") : ""}</span>
                                </label>
                                <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                    <span className="opacity-[0.5]">{business?.email || "https://www.example-website-for-demo-purposes.com"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}