"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import HealthyCard from "../../components/About/HealthyCard";
import LittleInformation from "../../components/About/LittleInformation";
import Video from "../../components/About/Video";
import Hero from "../../components/public/HeroContent";

export default function About() {
    const { t, mounted } = useTranslationSetup();

    return (
        <>
            <Hero title={`${mounted ? t('we-love-what-can-happen') : '...'}`} backgroundImage="about" paddingMobile="py-12" />
            <HealthyCard />
            <Video />
            <LittleInformation />
        </>
    )
}