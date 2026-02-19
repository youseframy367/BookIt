"use client";

import { useEffect } from "react";

export default function DirSetter() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedDir = localStorage.getItem("dir");
        if (storedDir) {
            document.documentElement.dir = storedDir;
        } else {
            const i18nextLang = localStorage.getItem("i18nextLng") || "ar";
            const dir = i18nextLang === "ar" ? "rtl" : "ltr";
            document.documentElement.dir = dir;
            localStorage.setItem("dir", dir);
        }
    }, []);

    return null;
}
