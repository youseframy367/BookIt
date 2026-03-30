"use client";

import Hero from "../components/LandingPage/Hero";
import OurBlog from "../components/LandingPage/OurBlog";
import HowBOOKwork from "../components/LandingPage/HowdoesBOOKITwork";
import RestaurantManagers from "../components/LandingPage/RestaurantManagersExperiences";
import SlideToBaner from "../components/LandingPage/style-slider-to-baner/sliderToBaner";
import TopRated from "../components/LandingPage/TopRatedOrMostBooked";
import { useDataRelatied } from "../data/dataRelatied";

export default function Home() {
    const { dataRealtied } = useDataRelatied();

    return (
        <>
            <Hero />
            <SlideToBaner />
            <TopRated dataRealtiedAndBooked={dataRealtied} />
            <OurBlog />
            <HowBOOKwork />
            <RestaurantManagers />
        </>
    )
}