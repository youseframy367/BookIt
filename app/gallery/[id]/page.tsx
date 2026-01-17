"use client";
import Content from "../../components/DetailsRestaurant/Content";
import Hero from "../../components/public/Hero";
import { useParams } from "next/navigation";

function DetailsRestaurant() {
    const { id } = useParams();

    const gallery = ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"];

    return (
        <>
            <Hero image="hero-gallery" title="Gallery" backPage={`/details-restaurant-public/${id}`} />
            <Content gallery={gallery} />
        </>
    )
}

export default DetailsRestaurant;