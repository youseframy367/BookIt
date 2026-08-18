/* ============================== معرض الصور — داتا حقيقية ==============================
   GET /api/public/businesses/:id/gallery → [{id,url,alt}] صور المعرض الحقيقي
   Content يقبل gallery كـ string[] أو GalleryItem[] — نحول الـ urls إلى {icon:url}
   عند فشل الاتصال: fallback على الأيقونات الوهمية القديمة
   ============================================================================ */
"use client";

import { useState, useEffect } from "react";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Content from "../../../components/DetailsRestaurant/Content";
import Hero from "../../../components/public/Hero";
import { useDataImageGallery } from "@/app/data/dataImageCallery";
import { publicApi } from "@/utils/api";

export default function ClientDetailsRestaurant({ id }: { id: string }) {
    const { t, mounted } = useTranslationSetup();

    const dummyGallery = useDataImageGallery();
    const [gallery, setGallery] = useState(dummyGallery);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await publicApi.gallery(id);
                if (Array.isArray(data) && data.length > 0) {
                    /* Content يقبل GalleryItem[] بخصية icon — نستخدم رابط الصورة كـ icon */
                    setGallery(data.map((g: any) => ({ icon: g.url || g.image || g, alt: g.alt || "" })) as any);
                }
            } catch (e) {
                console.error("فشل تحميل المعرض — باستخدام الداتا الوهمية:", e);
            }
        })();
    }, [id]);

    return (
        <>
            <Hero image="webp/hero-gallery.webp" title={mounted ? t("gallery") : '...'} />
            <Content gallery={gallery} />
        </>
    );
}