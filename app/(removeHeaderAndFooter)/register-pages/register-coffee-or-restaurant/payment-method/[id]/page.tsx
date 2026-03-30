import PaymentMethodClient from "./PaymentMethodClient";

export default function Page({ params }: { params: { id: string } }) {
    return <PaymentMethodClient id={params.id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}