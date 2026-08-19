import UpdateStartInventory from "./StartInventoryClient";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <UpdateStartInventory id={id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}
