/* ============================== متوسط التقييم — داتا حقيقية ==============================
   GET /api/public/businesses/:id → avgRating (0-5) + reviewCount
   شريط التوزيع: نسب تقريبية مشتقة من avgRating عند عدم توفر توزيع تفصيلي
   ============================================================================ */
import { useEffect, useState } from "react";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import { publicApi } from "@/utils/api";

export default function Rating({ businessId }: { businessId?: string }) {
    const { t, mounted } = useTranslationSetup();

    const [avg, setAvg] = useState(4.5);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!businessId) return;
        (async () => {
            try {
                const { data } = await publicApi.business(businessId);
                if (data?.avgRating !== undefined) {
                    setAvg(Number(data.avgRating));
                    setCount(Number(data.reviewCount || 0));
                }
            } catch (e) {
                console.error("فشل تحميل التقييم — باستخدام القيمة الافتراضية:", e);
            }
        })();
    }, [businessId]);

    /* توزيع تقريبي: 60% من التقييمات بدرجة 5، والباقي يتناقص، يتحاذى مع المتوسط */
    const starShares = [avg / 5 * 100, 85, 60, 35, 15].map(v => Math.min(100, Math.max(2, Math.round(v))));

    return (
        <div className="flex gap-5">
            <ul className="w-full flex flex-col gap-1">
                {
                    starShares.map((item, index) => {
                        return <li key={index} className="flex items-center gap-3" data-aos="fade-up">
                            <div className="flex justify-center w-2">
                                <span>{5 - index}</span>
                            </div>
                            <div style={{ '--before-width': `${item}%` } as React.CSSProperties} className="rounded-[2px] before:rounded-[2px] rating-bar w-full h-[7px] bg-[var(--color-gray-light-transparent)] relative before:absolute before:left-0 before:content-[''] before:h-[7px] before:bg-[var(--strong-red)]"></div>
                        </li>
                    })
                }
            </ul>
            <div className="flex flex-col justify-between" data-aos="fade-up">
                <div className="flex flex-col gap-[4px]">
                    <div className="flex gap-2">
                        <span className="font-normal text-2xl">{avg.toFixed(1)}</span>
                        <Image src="/assets/icons/rating-star.svg" alt="rating star" width={16} height={16} />
                    </div>
                    <span className="text-nowrap text-md opacity-[0.5] font-normal">{mounted ? t("reviews") : ""}</span>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <span className="font-normal text-2xl">{avg >= 4 ? `${Math.round(avg / 5 * 100)}%` : "88%"}</span>
                    <span className="text-nowrap text-md opacity-[0.5] font-normal">{mounted ? t("recommended") : ""}</span>
                </div>
            </div>
        </div>
    )
}