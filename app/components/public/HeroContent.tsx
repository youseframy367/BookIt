"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { dataHero } from "@/app/TypeScript/TypeScript";
import Image from "next/image";

export default function Hero({ title, backgroundImage, paddingMobile }: dataHero) {
    const { mounted, i18n } = useTranslationSetup();

    return (
        <section>
            <div className="relative w-full md:h-[75vh]">
                <div className={`text-center ${paddingMobile} md:py-0 realtive w-full h-full bg-[var(--color-hero)]`}>
                    <div className="container flex items-center justify-center w-full h-full">
                        <h2 className={`${mounted ? i18n.language === 'ar' && "font-ArefRuqaa" : ""} text-white text-xl md:text-[89px] font-semibold`} dangerouslySetInnerHTML={{ __html: title || '' }}></h2>
                    </div>
                    <Image src={`/assets/icons/${backgroundImage}.svg`} alt={backgroundImage} fill className="object-cover z-[-1]" />
                </div>
            </div>
        </section>
    )
}