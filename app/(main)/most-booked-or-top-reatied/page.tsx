"use client";

import Hero from "../../components/public/Hero";
import TopRated from "../../components/LandingPage/TopRatedOrMostBooked";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataRelatied } from "@/app/data/dataRelatied";
import { useEffect, useState } from "react";

export default function MostBooked() {
    const { t, mounted } = useTranslationSetup();
    const { dataRealtied } = useDataRelatied();
    const [currentType, setCurrentType] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setCurrentType(params.get("type"));
    }, []);

    return (
        <>
            <Hero image="customer-content.svg" title={currentType == 'most-booked' ? mounted ? t("most-booked") : '...' : mounted ? t("top-rated") : '...'} />
            <TopRated dataRealtiedAndBooked={dataRealtied} isShowTitle={true} />
        </>
    )
}