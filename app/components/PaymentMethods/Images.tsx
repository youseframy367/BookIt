"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Images() {
    useEffect(() => {
        document.body.classList.add("payment-page-body");
        return () => {
            document.body.classList.remove("payment-page-body");
        };
    }, []);

    return (
        <>
            <div className="absolute right-0 top-0">
                <Image src="/assets/icons/rectangle-1.svg" alt="rectangle" width={497} height={878} className="object-cover" />
            </div>
            <div className="absolute left-9 -top-2 md:rotate-5">
                <Image src="/assets/icons/rectangle-1.svg" alt="rectangle" width={497} height={878} className="object-cover" />
            </div>
        </>
    )
}