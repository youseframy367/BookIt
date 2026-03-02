import ClientUpdateAndRoles from "./ClientUpdateAndRoles";

export default function Page({ params }: { params: { id: string } }) {
    return <ClientUpdateAndRoles id={params.id} />;
}

export async function generateStaticParams() {
    return [
        { id: "233034" },
        { id: "233035" },
        { id: "233036" },
        { id: "233037" },
        { id: "233038" },
        { id: "233039" },
        { id: "233040" },
        { id: "233041" },
    ];
}
