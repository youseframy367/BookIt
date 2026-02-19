"use client";

import FilterTitle from "@/app/components/LocationRestaurant/FilterTitle";
import Content from "../../../components/DetailsRestaurant/Content";
import Hero from "../../../components/public/Hero";
import { useEffect, useState } from "react";
import ContentDetails from "@/app/components/LocationRestaurant/ContentDetails";
import ContentRatingAndReviews from "@/app/components/LocationRestaurant/ContentRatingAndReviews";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataGallery } from "@/app/data/dataGallery";

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

    useEffect(() => {
        setTabs(tabs => tabs.map(tab => ({
            ...tab,
            title: t(tab.key.toLowerCase().replace(/\s/g, "-"))
        })));
    }, [t]);

    return (
        <>
            <Hero
                image="hero-gallery.svg"
                title={mounted ? t('pane-vino') : ""}
                isShowGallery={true}
            />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Menu" && <Content gallery={gallery} />}
            {activeTab === "Details" && <ContentDetails />}
            {activeTab === "Rating" && <ContentRatingAndReviews />}
        </>
    );
}