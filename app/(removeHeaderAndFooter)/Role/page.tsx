import IsRole from "../../components/Role/Role";

export async function generateStaticParams() {
    return [
        { id: "sign-in" },
        { id: "sign-up" },
    ];
}

export default function Role() {
    return <IsRole />;
}