"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSWrapper() {
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: false,
            mirror: true,
            offset: 120,
            delay: 0,
            easing: "ease-in-out",
        });

        AOS.refresh();
    }, []);

    return null;
}
