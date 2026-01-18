"use client";
import Hero from "../components/public/Hero";
import TopRated from "../components/LandingPage/TopRatedOrMostBooked";
import { useState } from "react";
import FilterTitle from "../components/LocationRestaurant/FilterTitle";
import Products from "../components/menu/Products";

function LikedRestaurants() {
    const dataRealtied = [
        {
            header: {
                title: "Top Rated",
                subTitle: "Check out the top-rated dining spots and enjoy a memorable experience.",
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: "Pane Vino",
                    Relative: 0.9,
                    des: "Experience Pane Vino, a charming restaurant offering a delightful journey through classic Italian flavors...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: "La Zisa",
                    Relative: 0.6,
                    des: "La Zisa is a premier dining destination in Cairo, renowned for its exceptional Italian cuisine...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-3.png",
                    name: "Stefanos",
                    Relative: 0.8,
                    des: "Stefanos is a distinguished restaurant offering a rich blend of Mediterranean and Italian flavors...",
                    lick: false,
                },
            ],
        }
    ];

    const products = [
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        }
    ]

    const [tabs, setTabs] = useState([
        { title: "Restaurant", active: true },
        { title: "Food", active: false },
    ]);

    const handleTabChange = (index: number) =>
        setTabs(tabs.map((tab, i) => ({ ...tab, active: i === index })));

    const activeTab = tabs.find(tab => tab.active)?.title;

    return (
        <>
            <Hero image="liked-restaurants.svg" title="Liked restaurants" backPage="/" />
            <FilterTitle data={tabs} onChange={handleTabChange} />
            {activeTab === "Restaurant" && <TopRated dataRealtiedAndBooked={dataRealtied} isShowTitle={true} />}
            {activeTab === "Food" && <Products products={products} marginTop="mt-25" />}
        </>
    )
}

export default LikedRestaurants;