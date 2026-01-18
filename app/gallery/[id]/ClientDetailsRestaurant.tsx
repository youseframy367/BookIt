// app/details-restaurant-public/[id]/ClientDetailsRestaurant.tsx
"use client";
import Content from "../../components/DetailsRestaurant/Content";
import Hero from "../../components/public/Hero";

export default function ClientDetailsRestaurant({ id }: { id: string }) {
    const gallery = ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"];

    return (
        <>
            <Hero image="hero-gallery.svg" title="Gallery" backPage={`/details-restaurant-public/${id}`} />
            <Content gallery={gallery} />
        </>
    );
}