"use client";

import { useState } from "react";
import Image from "next/image";
import { questionsAndAnswaer } from "@/app/TypeScript/TypeScript";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function Content({ items }: questionsAndAnswaer) {
    const { mounted } = useTranslationSetup();

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [tempIndex, setTempIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            if (openIndex !== null) {
                setTempIndex(index);
                setOpenIndex(null);
            } else {
                setOpenIndex(index);
            }
        }
    };

    const handleAfterLeave = () => {
        if (tempIndex !== null) {
            setOpenIndex(tempIndex);
            setTempIndex(null);
        }
    };

    return (
        <section className="mt-5 md:mt-20">
            <div className="container mx-auto">
                <div className="flex flex-col gap-3 md:gap-10">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={item.id}
                                className="rounded-xl overflow-hidden transition-all duration-500"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="bg-[var(--strong-red)] w-full flex items-center justify-between py-3 px-3 md:px-7"
                                >
                                    <span className="text-white text-[12px] md:text-xl font-medium font-medium">
                                        {mounted ? item.title : '...'}
                                    </span>

                                    <div className="hidden md:flex items-center gap-2">
                                        <Image src="/media/shared/icons/arraw.png" alt="arraw" width={10} height={13} className={`transition-all duration-300 ${isOpen ? "rotate-[-90deg]" : "rotate-90"}`} />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                                        }`}
                                    onTransitionEnd={handleAfterLeave}
                                >
                                    <div className="border-b-1 px-5 py-4 text-[12px] md:text-[18px] leading-relaxed">
                                        {mounted ? item.content : '...'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}