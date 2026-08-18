/* ============================== آراء العملاء — داتا حقيقية ==============================
   GET /api/public/businesses/:id/reviews → [{rating(1-5), comment, customerName, createdAt}]
   عند فشل الاتصال: fallback على الداتا الوهمية القديمة (dataReviews)
   ============================================================================ */
"use client";
import { useState, useEffect } from "react";
import { publicApi } from "@/utils/api";
import { useDataReviews } from "@/app/data/dataReviews";

export function useReviewsData(businessId: string) {
  const dummy = useDataReviews();
  const [reviews, setReviews] = useState(dummy);

  useEffect(() => {
    if (!businessId) return;
    (async () => {
      try {
        const { data } = await publicApi.reviews(businessId);
        if (Array.isArray(data) && data.length > 0) {
          setReviews(
            data.map((r: any) => ({
              title: r.comment || "",
              rating: Math.min(5, Math.max(1, Math.round(Number(r.rating)))),
              name: r.customerName || "عميل BookIt",
              job: new Date(r.createdAt).toLocaleDateString("ar-EG"),
            }))
          );
        }
      } catch (e) {
        console.error("فشل تحميل آراء العملاء — باستخدام الداتا الوهمية:", e);
      }
    })();
  }, [businessId]);

  return reviews;
}
