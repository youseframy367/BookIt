/* ============================== Hook: الأعلى تقييماً / الأكثر حجزاً — داتا حقيقية ==============================
   GET /api/public/top-rated → [{id,name,type,address,location,phone,logo,description,avgRating,reviewCount,bookingCount}]
   يحول النتيجة إلى شكل TopRatedOrMostBooked: [{header:{title,subTitle}, items:[RestaurantItem], href}]
   حقل img يُملأ من logo (مسار نسبي من BASE_URL أو مسافة افتراضية عند الفشل)
   ============================================================================ */
"use client";
import { useState, useEffect } from "react";
import { publicApi } from "@/utils/api";

/* العناوين حسب اللغة (نفس نمط الداتا الوهمية القديمة) */
const headers = {
  ar: {
    topRated: { title: "الأكثر تقييماً", subTitle: "اكتشف أفضل المطاعم والكافيهات التي حصلت على أعلى التقييمات من عملائنا" },
    mostBooked: { title: "الأكثر حجزاً", subTitle: "اكتشف المطاعم والكافيهات التي حجزها عملاؤنا أكثر من غيرهم" },
  },
  en: {
    topRated: { title: "Top Rated", subTitle: "Discover the best restaurants and cafes with the highest ratings" },
    mostBooked: { title: "Most Booked", subTitle: "Discover the restaurants and cafes our customers book the most" },
  },
};

/* تحويل بزنس واحد من الباك إند إلى شكل RestaurantItem */
function toRestaurantItem(biz: any, t: any, lang: string) {
  return {
    // بديل مرئي آمن عند غياب شعار المنشأة من بيانات الـ API.
    img: biz.logo || "/media/shared/ui/image-placeholder.svg",
    name: biz.name || "",
    rating: Number(biz.avgRating ?? 0),
    des: biz.description || "",
    like: false,
    area: biz.location || biz.address || "",
    id: biz.id,
  };
}

export function useTopRatedData() {
  const [dataRealtied, setDataRealtied] = useState<any[]>([]);
  const [dataBooked, setDataBooked] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        /* تحميل القسمين بالتوازي: الأعلى تقييماً + الأكثر حجزاً */
        const [topRes, mostRes] = await Promise.allSettled([
          publicApi.topRated(),
          publicApi.mostBooked(),
        ]);
        const top = topRes.status === "fulfilled" ? topRes.value.data : [];
        const most = mostRes.status === "fulfilled" ? mostRes.value.data : [];

        const t = (v: any) => v;
        setDataRealtied([
          {
            header: headers.ar.topRated,
            items: Array.isArray(top) ? top.slice(0, 6).map((b: any) => toRestaurantItem(b, t, "ar")) : [],
            href: "/most-booked-or-top-reatied",
          },
        ]);
        setDataBooked([
          {
            header: headers.ar.mostBooked,
            items: Array.isArray(most) ? most.slice(0, 6).map((b: any) => toRestaurantItem(b, t, "ar")) : [],
            href: "/most-booked-or-top-reatied",
          },
        ]);
      } catch (e) {
        console.error("فشل تحميل الأعلى تقييماً/الأكثر حجزاً:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { dataRealtied, dataBooked, loading };
}
