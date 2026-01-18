"use client";
import FilterTitle from "@/app/components/LocationRestaurant/FilterTitle";
import Content from "../../components/DetailsRestaurant/Content";
import Hero from "../../components/public/Hero";
import { useState } from "react";
import ContentDetails from "@/app/components/LocationRestaurant/ContentDetails";
import ContentRatingAndReviews from "@/app/components/LocationRestaurant/ContentRatingAndReviews";

export default function DetailsRestaurantPublicClient({ id }: { id: string }) {
    const [tabs, setTabs] = useState([
        { title: "Menu", active: true },
        { title: "Details", active: false },
        { title: "Rating & Reviews", active: false },
    ]);

    const handleTabChange = (index: number) =>
        setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.title;

    const gallery = [
        { title: "Pizza", icon: "Pizza" },
        { title: "Pasta", icon: "Pasta" },
        { title: "Lazania", icon: "gallery-3" },
        { title: "Seafood", icon: "hero-menu" },
        { title: "Beef", icon: "gallery-5" },
        { title: "Desserts", icon: "gallery-6" },
    ];

    return (
        <>
            <Hero
                image="hero-gallery.svg"
                title="Pane Vino - InterContinental Cairo Semiramis"
                isShowGallery={true}
                backPage="/"
            />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Menu" && <Content gallery={gallery} />}
            {activeTab === "Details" && <ContentDetails />}
            {activeTab === "Rating & Reviews" && <ContentRatingAndReviews />}
        </>
    );
}