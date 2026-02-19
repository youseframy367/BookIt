"use client";

import { useState, useEffect } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";

export function useTranslationSetup(ns: string = "common") {
    const { t, i18n } = useI18nTranslation(ns);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return { t, i18n, mounted };
}
