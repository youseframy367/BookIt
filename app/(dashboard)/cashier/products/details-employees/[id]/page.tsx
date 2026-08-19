import EmployeeDetailsClientShell from "./EmployeeDetailsClientShell";

export default async function DetailsEmployees({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // يحتفظ المسار بمعرّف الموظف، بينما يُحمَّل المحتوى التفاعلي على المتصفح فقط.
    return <EmployeeDetailsClientShell id={id} />;
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
        { id: "7" },
        { id: "8" },
        { id: "9" },
        { id: "10" },
        { id: "11" },
        { id: "12" },
        { id: "13" },
        { id: "14" },
        { id: "15" },
        { id: "16" },
        { id: "17" },
        { id: "18" },
        { id: "19" },
        { id: "20" }
    ];
}
