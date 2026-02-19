"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
        en: { common: require('../language/en.json') },
        ar: { common: require('../language/ar.json') },
    },
    fallbackLng: 'ar',
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
    },
    react: { useSuspense: false },
});

i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
        const dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        localStorage.setItem('dir', dir);
    }
});
export default i18n;
