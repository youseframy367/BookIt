// app/details-restaurant-public/[id]/page.tsx
import ClientDetailsRestaurant from "./ClientDetailsRestaurant";

export default function Page({ params }: { params: { id: string } }) {
    return <ClientDetailsRestaurant id={params.id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}


// "use client";
// import Content from "../../components/DetailsRestaurant/Content";
// import Hero from "../../components/public/Hero";
// import { useParams } from "next/navigation";

// function DetailsRestaurant() {
//     const { id } = useParams();

//     const gallery = ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"];

//     return (
//         <>
//             <Hero image="webp/hero-gallery.webp" title="Gallery" />
//             <Content gallery={gallery} />
//         </>
//     )
// }

// export default DetailsRestaurant;