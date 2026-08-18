/* ============================== الأعلى تقييماً / الأكثر حجزاً — داتا حقيقية ==============================
   GET /api/public/top-rated  → [{id,name,type,address,location,phone,logo,description,avgRating,reviewCount,bookingCount}]
   GET /api/public/most-booked → نفس الشكل
   يحول النتيجة إلى: [{header:{title,subTitle}, items:[RestaurantItem], href}]
   عند فشل الاتصال: fallback على الداتا الوهمية القديمة
   ============================================================================ */
import { useState, useEffect } from "react";
import { publicApi } from "@/utils/api";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

/* داتا وهمية احتياطية (نفس البيانات القديمة) */
const dummyItems = [
  {
    img: "/assets/icons/top-rated-1.png",
    name: "قصر الكبابجى",
    rating: 0.9,
    des: "مطعم يقدم أشهى المأكولات الشرقية",
    like: false,
    area: "القاهرة",
  },
  {
    img: "/assets/icons/top-rated-2.png",
    name: "كافيه النورس",
    rating: 0.6,
    des: "أجواء هادئة ومشروبات متنوعة",
    like: false,
    area: "الجيزة",
  },
  {
    img: "/assets/icons/top-rated-3.png",
    name: "مطعم الأصيل",
    rating: 0.8,
    des: "أطباق تراثية بلمسة عصرية",
    like: false,
    area: "الإسكندرية",
  },
];

/* تحويل بزنس من الباك إند إلى شكل RestaurantItem */
function toRestaurantItem(biz: any, liked: boolean) {
  return {
    img: biz.logo || "/assets/icons/top-rated-1.png",
    name: biz.name || "",
    rating: Number(biz.avgRating ?? 0),
    des: biz.description || "",
    like: liked,
    area: biz.location || biz.address || "",
    id: biz.id,
  };
}

export const useDataRelatied = () => {
  const { t } = useTranslationSetup();
  const [dataRealtied, setDataRealtied] = useState([
    {
      header: { title: t("top-rated"), subTitle: t("check-best-restaruant") },
      items: dummyItems,
      href: "/most-booked-or-top-reatied?type=top-ratied",
    },
    {
      header: { title: t("most-booked"), subTitle: t("check-best-restaruant-1") },
      items: dummyItems,
      href: "/most-booked-or-top-reatied?type=most-booked",
    },
  ]);

  const [likedDataRealited, setLikedDataRealited] = useState([
    {
      header: { title: t("top-rated"), subTitle: t("check-best-restaruant") },
      items: dummyItems.map(i => ({ ...i, like: true })),
      href: "/most-booked-or-top-reatied?type=top-ratied",
    },
    {
      header: { title: t("most-booked"), subTitle: t("check-best-restaruant-1") },
      items: dummyItems.map(i => ({ ...i, like: true })),
      href: "/most-booked-or-top-reatied?type=most-booked",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        /* تحميل القسمين بالتوازي */
        const [topRes, mostRes] = await Promise.allSettled([
          publicApi.topRated(),
          publicApi.mostBooked(),
        ]);
        const top = topRes.status === "fulfilled" ? topRes.value.data : [];
        const most = mostRes.status === "fulfilled" ? mostRes.value.data : [];

        if (Array.isArray(top) && top.length > 0) {
          setDataRealtied([
            {
              header: { title: t("top-rated"), subTitle: t("check-best-restaruant") },
              items: top.slice(0, 6).map((b: any) => toRestaurantItem(b, false)),
              href: "/most-booked-or-top-reatied?type=top-ratied",
            },
            {
              header: { title: t("most-booked"), subTitle: t("check-best-restaruant-1") },
              items: most.slice(0, 6).map((b: any) => toRestaurantItem(b, false)),
              href: "/most-booked-or-top-reatied?type=most-booked",
            },
          ]);
          setLikedDataRealited([
            {
              header: { title: t("top-rated"), subTitle: t("check-best-restaruant") },
              items: top.slice(0, 6).map((b: any) => toRestaurantItem(b, true)),
              href: "/most-booked-or-top-reatied?type=top-ratied",
            },
            {
              header: { title: t("most-booked"), subTitle: t("check-best-restaruant-1") },
              items: most.slice(0, 6).map((b: any) => toRestaurantItem(b, true)),
              href: "/most-booked-or-top-reatied?type=most-booked",
            },
          ]);
        }
      } catch (e) {
        console.error("فشل تحميل الأعلى تقييماً/الأكثر حجزاً — باستخدام الداتا الوهمية:", e);
      }
    })();
  }, [t]);

  return { dataRealtied, likedDataRealited };
};
