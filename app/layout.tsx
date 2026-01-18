"use client";
import { usePathname } from 'next/navigation';
import "./assets/css/globals.css";
import Header from "./components/public/Header";
import AOSWrapper from "./components/AOSWrapper";
import Footer from "./components/public/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    const hideLayoutPages = [
      '/login',
      '/login/logIn-your-account',
      '/login/forget-bassword',
      '/login/verification-code',
      '/login/creat-new-password',
      '/Register/new-account',
      '/Register/verification-new-account'
    ];
    setShowLayout(!hideLayoutPages.includes(pathname));
  }, [pathname]);

  return (
    <html lang="en">
      <link rel="icon" href="/assets/icons/logo.svg" />
      <body>
        <title>BOOK IT</title>
        <AOSWrapper />
        {showLayout && <Header />}
        {children}
        {showLayout && <Footer />}
      </body>
    </html>
  );
}
