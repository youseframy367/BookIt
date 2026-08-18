"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Products from "../../components/menu/Products";
import Hero from "../../components/public/Hero";
import { useDataProducts } from "@/app/data/dataPopularDishes";

export default function PopularDishes() {
    const { t, mounted } = useTranslationSetup();
    const { products } = useDataProducts();

    return (
        <>
            <Hero image="webp/popular-dishes.webp" title={mounted ? t("popular-dishes") : '...'} isActiveButtonHero={false} />
            <Products products={products} marginTop="mt-25" />
        </>
    )
}