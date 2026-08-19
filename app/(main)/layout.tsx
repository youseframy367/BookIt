"use client";

import "../assets/css/globals.css";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import FooterMobile from '../components/public/FooterMobile';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomCursor from '../components/public/CustomCursor';
import UpArraw from '../components/public/UpArraw';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { BookingProvider } from './context/BookingContext';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <BookingProvider>
            <I18nextProvider i18n={i18n}>
                <CustomCursor />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Header />
                    {children}
                    <Footer />
                    <UpArraw />
                    <FooterMobile />
                </LocalizationProvider>
            </I18nextProvider>
        </BookingProvider>
    );
}
