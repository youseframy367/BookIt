"use client";
import Hero from "../../components/public/Hero";
import TopRated from "../../components/LandingPage/TopRatedOrMostBooked";
import { useState } from "react";
import FilterTitle from "../../components/LocationRestaurant/FilterTitle";
import Products from "../../components/menu/Products";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataRelatied } from "@/app/data/dataRelatied";
import { useDataProducts } from "@/app/data/dataPopularDishes";

export default function LikedRestaurants() {
    const { t, mounted } = useTranslationSetup();

    const { likedDataRealited } = useDataRelatied();
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
            <Hero image="liked-restaurants.svg" title={mounted ? t("liked-restaurants") : '...'} isActiveButtonHero={false} />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Restaurant" && <TopRated dataRealtiedAndBooked={likedDataRealited} isShowTitle={true} />}
            {activeTab === "Food" && <Products products={likedProducts} marginTop="mt-15 md:mt-25" />}
        </>
    )
}