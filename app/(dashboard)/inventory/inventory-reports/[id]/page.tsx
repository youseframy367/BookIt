import UpdateStartInventory from "./InventoryReportsClient";

export default function Page({ params }: { params: { id: string } }) {
    return <UpdateStartInventory id={params.id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}