"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Content from "../../../components/DetailsRestaurant/Content";
import Hero from "../../../components/public/Hero";
import { useDataImageGallery } from "@/app/data/dataImageCallery";

export default function ClientDetailsRestaurant({ id }: { id: string }) {
    const { t, mounted } = useTranslationSetup();
    
    const gallery = useDataImageGallery();

    return (
        <>
            <Hero image="webp/hero-gallery.webp" title={mounted ? t("gallery") : '...'} />
            <Content gallery={gallery} />
        </>
    );
}