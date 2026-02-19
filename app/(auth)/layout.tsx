"use client";

import "../assets/css/globals.css";
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { AuthFlowProvider } from "../(main)/context/AuthFlowContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthFlowProvider>
            <I18nextProvider i18n={i18n}>
                {children}
            </I18nextProvider>
        </AuthFlowProvider>
    );
}