import "../assets/css/globals.css";
import MainLayout from "../SidebarWrapper";
import { InvoiceProvider } from "./context/InvoiceContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <InvoiceProvider>
            <MainLayout>{children}</MainLayout>
        </InvoiceProvider>
    );
}