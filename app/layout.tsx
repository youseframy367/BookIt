import { BookingProvider } from "./(main)/context/BookingContext";
import "./assets/css/globals.css";
import AOSWrapper from "./components/AOSWrapper";
import DirSetter from "./components/DirSetter";
import MainLayout from "./SidebarWrapper";

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
        <DirSetter />
        <AOSWrapper />
        <BookingProvider>
          <MainLayout>{children}</MainLayout>
          {/* {children} */}
        </BookingProvider>
      </body>
    </html>
  );
}