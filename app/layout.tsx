"use client";
import { usePathname } from 'next/navigation';
import "./assets/css/globals.css";
import Header from "./components/public/Header";
import AOSWrapper from "./components/AOSWrapper";
import Footer from "./components/public/Footer";
import FooterMobile from './components/public/FooterMobile';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const hideLayoutPrefixes = [
    '/login',
    '/register'
  ];

  const showLayout = !hideLayoutPrefixes.some(prefix =>
    pathname.startsWith(prefix)
  );

  return (
    <html lang="en">
      <body>
        <link rel="icon" type="image/svg+xml" href="/assets/icons/logo.svg" />
        <title>BOOK IT</title>
        <AOSWrapper />
        {showLayout && <Header />}
        {children}
        {showLayout && <><Footer /> <FooterMobile /></>}
      </body>
    </html>
  );
}