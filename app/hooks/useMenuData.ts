/* ============================== Hook القائمة من الباك إند ==============================
   يحوّل داتا القائمة الحقيقية من الباك إند إلى الشكل الذي يعتمده الكاشير:
   [{title, icon, active, items: [{image, name, price, rating, quantity}]}]
   (نفس شكل Category في app/data/dataProducts حتى تتوافق مع كومبوننت Products)
   المصدر: GET /api/menu/categories + GET /api/menu/items
   fallback: داتا dataProducts الوهمية عند فشل الاتصال
   ============================================================================ */
"use client";

import { useState, useEffect } from "react";
import { useProductsData, Category } from "@/app/data/dataProducts";
import { menuApi } from "@/utils/api";

export const useMenuData = (): { data: Category[]; setData: React.Dispatch<React.SetStateAction<Category[]>>; realData: boolean } => {
  const dummy = useProductsData();
  const [categories, setCategories] = useState<Category[] | null>(null);
  /* نحفظ مرجع setData من الداتا الوهمية بنفس النوع حتى تكون الدالة متوافقة مع نوع Category */
  const [setData] = useState<React.Dispatch<React.SetStateAction<Category[]>>>(dummy.setData);

  useEffect(() => {
    (async () => {
      try {
        /* 1) نجلب كل الأقسام النشطة */
        const { data: cats } = await menuApi.listCategories();
        const activeCats = Array.isArray(cats) ? cats.filter((c: any) => c.isActive !== false) : [];
        if (activeCats.length === 0) throw new Error("لا توجد أقسام");

        /* 2) نجلب الأصناف لكل قسم */
        const { data: items } = await menuApi.listItems();
        const activeItems = Array.isArray(items) ? items.filter((i: any) => i.isActive !== false) : [];

        /* 3) نحولها للشكل الذي يعتمد عليه الكاشير (نفس شكل dataProducts) */
        const mapped: Category[] = activeCats.map((c: any, idx: number) => ({
          title: c.titleAr || c.titleEn || c.title,
          icon: "products.svg",
          active: idx === 0,
          items: activeItems
            .filter((i: any) => i.categoryId === c.id)
            .map((i: any) => ({
              image: i.image || "no-image.png",
              name: i.titleAr || i.titleEn || i.title,
              price: Number(i.price) || 0,
              rating: Number(i.rating) || 0,
              quantity: 0,
            })),
        }));

        /* نتجاهل أي قسم لا يحتوي أصنافاً فعّالة */
        setCategories(mapped.filter((c) => c.items.length > 0));
      } catch (e) {
        console.error("فشل تحميل القائمة من الباك — نستخدم الداتا الوهمية:", e);
        setCategories(null);
      }
    })();
  }, []);

  return { data: categories ?? dummy.data, setData, realData: categories !== null };
};
