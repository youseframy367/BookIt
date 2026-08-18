"use client";
/* ============================== تفاصيل المطعم العامة — داتا حقيقية ==============================
   GET /api/public/businesses/:id → {name,address,location,phone,altPhone,email,description,logo,
      avgRating,reviewCount,workingHours,branches,minBookingDeposit}
   العنوان: اسم المحل الحقيقي، وبيانات التفاصيل/التقييمات تُمرَّر للمكونات
   عند فشل الاتصال: fallback على الأيقونات القديمة
   ============================================================================ */
import FilterTitle from "@/app/components/LocationRestaurant/FilterTitle";
import Content from "../../../components/DetailsRestaurant/Content";
import Hero from "../../../components/public/Hero";
import { useEffect, useState } from "react";
import ContentDetails from "@/app/components/LocationRestaurant/ContentDetails";
import ContentRatingAndReviews from "@/app/components/LocationRestaurant/ContentRatingAndReviews";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataGallery } from "@/app/data/dataGallery";
import { publicApi } from "@/utils/api";

export default function DetailsRestaurantPublicClient({ id }: { id: string }) {
    const { t, mounted } = useTranslationSetup();

    const [tabs, setTabs] = useState([
        { key: "Menu", title: t("menu-food"), active: true },
        { key: "Details", title: t("details"), active: false },
        { key: "Rating", title: t("rating"), active: false },
    ]);

    const handleTabChange = (index: number) =>
        setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.key;

    const gallery = useDataGallery();

    /* تحميل بيانات المحل الحقيقية من الباك إند */
    const [biz, setBiz] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await publicApi.business(id);
                if (data) setBiz(data);
            } catch (e) {
                console.error("فشل تحميل بيانات المحل — باستخدام القيم الافتراضية:", e);
            }
        })();
    }, [id]);

    useEffect(() => {
        setTabs(tabs => tabs.map(tab => ({
            ...tab,
            title: t(tab.key.toLowerCase().replace(/\s/g, "-"))
        })));
    }, [t]);

    return (
        <>
            <Hero
                image="webp/hero-gallery.webp"
                title={mounted ? (biz?.name || t('pane-vino')) : ""}
                isShowGallery={true}
            />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Menu" && <Content gallery={gallery} businessId={id} />}
            {activeTab === "Details" && <ContentDetails business={biz} />}
            {activeTab === "Rating" && <ContentRatingAndReviews businessId={id} />}
        </>
    );
}