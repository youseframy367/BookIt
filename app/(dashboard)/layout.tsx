import "../assets/css/globals.css";
import MainLayout from "../SidebarWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <link rel="icon" type="image/svg+xml" href="/assets/icons/logo.svg" />
                <title>BOOK IT</title>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}