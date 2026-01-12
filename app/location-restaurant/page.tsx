"use client";
import { useState } from "react";
import ContentDetails from "../components/LocationRestaurant/ContentDetails";
import ContentRatingAndReviews from "../components/LocationRestaurant/ContentRatingAndReviews";
import FilterTitle from "../components/LocationRestaurant/FilterTitle";
import Hero from "../components/public/Hero";

function locationRestaurant() {
    const [tabs, setTabs] = useState([
        {
            title: "Menu",
            active: false
        },
        {
            title: "Details",
            active: true
        },
        {
            title: "Rating & Reviews",
            active: false
        }
    ])

    const handleTabChange = (index: number) => setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.title;

    return (
        <>
            <Hero nextPage="/location-restaurant" title="Pane Vino - InterContinental Cairo Semiramis" />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Details" && <ContentDetails />}
            {activeTab === "Rating & Reviews" && <ContentRatingAndReviews />}
        </>
    )
}

export default locationRestaurant;