"use client";

import FormLastNews from "./FormLastNews";
import LabScreen from "./Footer/LabScreen";
import { usePathname } from "next/navigation";
import MobileScreen from "./Footer/MobileScreen";

export default function Footer() {
    const pathname = usePathname();

    return (
        <>
            <FormLastNews />
            <footer className={`hidden md:block text-white ${pathname != '/about' ? 'mt-20 md:mt-70' : 'mt-30 md:mt-0'} bg-[var(--color-dark-blue)] relative z-1`}>
                <LabScreen />
            </footer>
            <footer className={`md:hidden ${pathname != '/about' ? 'mt-40 md:mt-70' : 'mt-30 md:mt-0'} border border-2 border-[var(--color-black-tow)] md:bg-[var(--color-dark-blue)] relative z-1`}>
                <MobileScreen />
            </footer>
        </>
    )
}