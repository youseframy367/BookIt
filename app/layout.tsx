"use client";
import { usePathname } from 'next/navigation';
import "./assets/css/globals.css";
import Header from "./components/public/Header";
import AOSWrapper from "./components/AOSWrapper";
import Footer from "./components/public/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideLayoutPages = ['/login'];
  const showHeaderFooter = !hideLayoutPages.includes(pathname);

  return (
    <html lang="en">
      <link rel="icon" href="/assets/icons/logo.svg" />
      <body>
        <AOSWrapper />
        {showHeaderFooter && <Header />}
        {children}
        {showHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
