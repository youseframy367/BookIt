/* ============================== المطاعم المفضلة — داتا حقيقية ==============================
   GET /api/public/favorites → [{id, business}] (بزنسات مفضلة للعميل، يتطلب توكن)
   عند فشل الاتصال أو عدم تسجيل الدخول: fallback على الداتا الوهمية (dataRelatied)
   ============================================================================ */
"use client";
import { useState, useEffect } from "react";
import { publicApi } from "@/utils/api";
import { useDataRelatied } from "@/app/data/dataRelatied";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

/* تحويل بزنس مفضل إلى شكل RestaurantItem (like=true) */
function toLikedItem(biz: any) {
  const b = biz.business || biz;
  return {
    img: b?.logo || "/assets/icons/top-rated-1.png",
    name: b?.name || "",
    rating: Number(b?.avgRating ?? 0),
    des: b?.description || "",
    like: true,
    area: b?.location || b?.address || "",
    id: b?.id,
  };
}

export function useFavoritesData() {
  const { t } = useTranslationSetup();
  const { likedDataRealited } = useDataRelatied();
  const [sections, setSections] = useState(likedDataRealited);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await publicApi.favorites();
        if (Array.isArray(data) && data.length > 0) {
          setSections([
            {
              header: { title: t("top-rated"), subTitle: t("check-best-restaruant") },
              items: data.map(toLikedItem),
              href: "/most-booked-or-top-reatied?type=top-ratied",
            },
          ]);
        }
      } catch (e) {
        console.error("فشل تحميل المفضلة — باستخدام الداتا الوهمية:", e);
      }
    })();
  }, [t]);

  return sections;
}
