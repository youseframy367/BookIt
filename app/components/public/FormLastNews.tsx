"use client";

import { usePathname } from 'next/navigation';
import LapScreen from "./FormLastNews/LapScreen";
import MobileScreen from "./FormLastNews/MobileScreen";

export default function FormLastNews() {
    const pathname = usePathname();

    return (
        <>
            <section className={`md:hidden ${pathname != '/about' ? 'mt-5 md:mt-45' : 'mt-20 md:mt-0'} relative z-2`}>
                <LapScreen />
            </section>
            <section className={`hidden md:block ${pathname != '/about' ? 'mt-5 md:mt-45' : 'mt-20 md:mt-0'} relative z-2`}>
                <MobileScreen />
            </section>
        </>
    )
}