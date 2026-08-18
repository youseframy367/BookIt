"use client";
import Hero from "../../components/public/Hero";
import TopRated from "../../components/LandingPage/TopRatedOrMostBooked";
import { useState } from "react";
import FilterTitle from "../../components/LocationRestaurant/FilterTitle";
import Products from "../../components/menu/Products";
/* ============================== المطاعم المفضلة — داتا حقيقية ==============================
   Tab Restaurant: GET /api/public/favorites → أقسام مفضلة العميل
   Tab Food: أطباق مفضلة (حالياً الداتا الوهمية، الباك لا يحفظ أطباقاً مفضلة)
   ============================================================================ */
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useFavoritesData } from "@/app/hooks/useFavoritesData";
import { useDataProducts } from "@/app/data/dataPopularDishes";

export default function LikedRestaurants() {
    const { t, mounted } = useTranslationSetup();

    /* يجلب المطاعم المفضلة الحقيقية — مع fallback على الداتا الوهمية */
    const likedDataRealited = useFavoritesData();
    const { likedProducts } = useDataProducts();

    const [tabs, setTabs] = useState([
        { key: "Restaurant", title: t("restaurant"), active: true },
        { key: "Food", title: t("food"), active: false },
    ]);

    const handleTabChange = (index: number) =>
        setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.key;

    return (
        <>
            <Hero image="webp/liked-restaurants.webp" title={mounted ? t("liked-restaurants") : '...'} isActiveButtonHero={false} />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Restaurant" && <TopRated dataRealtiedAndBooked={likedDataRealited} isShowTitle={true} />}
            {activeTab === "Food" && <Products products={likedProducts} marginTop="mt-15 md:mt-25" />}
        </>
    )
}