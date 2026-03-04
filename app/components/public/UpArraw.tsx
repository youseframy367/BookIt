"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UpArraw() {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const section3 = document.getElementById("section3")?.offsetTop || 0;
            scrollY >= section3 ? setShowArrow(true) : setShowArrow(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <a
            href="#paner"
            className={`z-2 fixed  ${showArrow ? "bottom-25 md:bottom-10" : "bottom-[-100px]"} right-10 transition-all duration-500`}
        >
            <div className="cursor-pointer bg-white rounded-full border-[var(--strong-red)] border-2 w-[50px] h-[50px] flex justify-center items-center shadow-lg">
                <Image
                    src="/assets/icons/arraw-select.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="rotate-180"
                />
            </div>
        </a>
    );
}