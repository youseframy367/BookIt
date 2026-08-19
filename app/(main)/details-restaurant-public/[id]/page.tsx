import DetailsRestaurantPublicClient from "./DetailsRestaurantPublicClient";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <DetailsRestaurantPublicClient id={id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
    ];
}
