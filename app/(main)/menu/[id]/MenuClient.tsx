/* ============================== صفحة المنيو — داتا حقيقية ==============================
   GET /api/public/businesses/:id/menu → { businessName?, categories:[{id,titleAr,titleEn}], items:[{id,title,subTitle,price,rating,icon,categoryId,isActive}] }
   يحول الـ items إلى شكل Products المطلوب: {id,title,subTitle,amount,rating,active,icon}
   عند فشل الاتصال أو عدم وجود بيانات: fallback على الداتا الوهمية القديمة
   ============================================================================ */
"use client";

import Hero from "../../../components/menu/Hero";
import Products from "../../../components/menu/Products";
import { useEffect, useState } from "react";
import { publicApi } from "@/utils/api";

/* داتا وهمية احتياطية (نفس المنتجات القديمة) */
const dummyProducts = [
  { id: 1, active: true, icon: "fattoush-salad", title: "Fattoush salad", subTitle: "Description of the item", amount: "24.00", rating: "4.9" },
  { id: 2, active: false, icon: "vegetable-salad", title: "Vegetable Salad", subTitle: "Description of the item", amount: "26.00", rating: "4.6" },
  { id: 3, active: false, icon: "egg-salad", title: "Egg Salad", subTitle: "Description of the item", amount: "23.00", rating: "4.5" },
  { id: 4, active: true, icon: "fattoush-salad", title: "Fattoush salad", subTitle: "Description of the item", amount: "24.00", rating: "4.9" },
  { id: 5, active: false, icon: "vegetable-salad", title: "Vegetable Salad", subTitle: "Description of the item", amount: "26.00", rating: "4.6" },
  { id: 6, active: false, icon: "egg-salad", title: "Egg Salad", subTitle: "Description of the item", amount: "23.00", rating: "4.5" },
];

/* تحويل صنف المنيو من الباك إند إلى شكل Products */
function toProduct(item: any, index: number) {
  return {
    id: item.id || index + 1,
    active: Boolean(item.isActive),
    icon: item.icon || "fattoush-salad",
    title: item.title || "",
    subTitle: item.subTitle || "Description of the item",
    amount: String(item.price ?? ""),
    rating: item.rating !== undefined ? String(item.rating) : "4.5",
  };
}

export default function MenuClient({ id }: { id: string }) {
  const [products, setProducts] = useState(dummyProducts);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await publicApi.menu(id);
        const items = data?.items ?? data;
        if (Array.isArray(items) && items.length > 0) {
          setProducts(items.map(toProduct));
        } else if (data?.categories?.length > 0 || data?.items?.length === 0) {
          /* المنصة لا تملك أصناف بعد — عرض رسالة فارغة بدل الداتا الوهمية */
          setProducts([]);
        }
      } catch (e) {
        console.error("فشل تحميل المنيو — باستخدام الداتا الوهمية:", e);
      }
    })();
  }, [id]);

  return (
    <>
      <Hero />
      <Products products={products} marginTop={products.length === 0 ? "min-h-[300px] flex items-center" : undefined} />
      {products.length === 0 && (
        <div className="container-content text-center text-[var(--dark-gray)] text-2xl py-16">
          لا توجد أطباق متاحة في المنيو حالياً
        </div>
      )}
    </>
  );
}
