"use client";
import FilterTitle from "@/app/components/LocationRestaurant/FilterTitle";
import Content from "../../components/DetailsRestaurant/Content";
import Hero from "../../components/public/Hero";
import { useState } from "react";
import ContentDetails from "@/app/components/LocationRestaurant/ContentDetails";
import ContentRatingAndReviews from "@/app/components/LocationRestaurant/ContentRatingAndReviews";

function detailsRestaruantPublic() {
    const [tabs, setTabs] = useState([
        {
            title: "Menu",
            active: true
        },
        {
            title: "Details",
            active: false
        },
        {
            title: "Rating & Reviews",
            active: false
        }
    ])

    const handleTabChange = (index: number) => setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.title;

    const gallery = [
        {
            title: "Pizza",
            icon: "Pizza",
            link: "/"
        },
        {
            title: "Pasta",
            icon: "Pasta",
            link: "/"
        },
        {
            title: "Lazania",
            icon: "gallery-3",
            link: "/"
        },
        {
            title: "Seafood",
            icon: "hero-menu",
            link: "/"
        },
        {
            title: "Beef",
            icon: "gallery-5",
            link: "/"
        },
        {
            title: "Desserts",
            icon: "gallery-6",
            link: "/"
        }
    ];

    return (
        <>
            <Hero image="hero-gallery" nextPage="/location-restaurant" title="Pane Vino - InterContinental Cairo Semiramis" isShowGallery={true} />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Menu" && <Content gallery={gallery} />}
            {activeTab === "Details" && <ContentDetails />}
            {activeTab === "Rating & Reviews" && <ContentRatingAndReviews />}
        </>
    )
}

export default detailsRestaruantPublic;