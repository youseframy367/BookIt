"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div
            className="bg-white fixed top-0 left-0 w-[30px] h-[30px] border border-3 border-[var(--color-gray-light-transparent)] rounded-full pointer-events-none z-50 flex justify-center items-center"
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -60%) rotate(-8deg)`,
            }}
        >
            <span className="cursor-dot w-[9px] h-[9px] rounded-full bg-[var(--strong-red)]" />
        </div>
    );
}
