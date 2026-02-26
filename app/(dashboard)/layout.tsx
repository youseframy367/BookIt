import "../assets/css/globals.css";
import MainLayout from "../SidebarWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MainLayout>{children}</MainLayout>
    );
}