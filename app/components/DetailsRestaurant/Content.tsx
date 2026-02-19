"use client";

import Image from "next/image";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";
import { GalleryItem, GalleryProps } from "@/app/TypeScript/TypeScript";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function Content({ gallery }: GalleryProps) {
    const { mounted, i18n } = useTranslationSetup();

    useEffect(() => {
        Fancybox.bind('[data-fancybox="gallery"]', {});
        return () => Fancybox.destroy();
    }, []);

    return (
        <section>
            <div className="container">
                <div className="mt-15 md:mt-25 grid grid-cols-2 gap-[34px] md:gap-10">
                    {
                        Array.isArray(gallery) && typeof gallery[0] === "string" ? (
                            gallery.map((item, index) => {
                                return <a data-fancybox="gallery" href={`/assets/icons/${item}.svg`} key={index} data-aos="fade-up" className="rounded-xl relative w-full h-[211px] md:h-[500px] overflow-hidden group">
                                    <div className="rounded-xl absolute bg-[var(--color-hero)] w-full h-full"></div>
                                    <Image src={`/assets/icons/${item}.svg`} alt="gallery" fill className="rounded-xl z-[-1] object-cover transition-all duration-300 group-hover:scale-[1.1] group-hover:rotate-[2deg]" />
                                </a>
                            })
                        ) : (
                            (gallery as GalleryItem[]).map((item, index) => (
                                <Link href={`/menu/${index + 1}`} key={index} data-aos="fade-up" className="rounded-xl relative w-full h-[170px] md:h-[600px] overflow-hidden group">
                                    <div className="flex justify-center items-center rounded-xl absolute bg-[var(--color-hero)] w-full h-full">
                                        <h2 className={`text-white font-normal ${mounted ? i18n.language === 'ar' ? "font-ArefRuqaa text-[30px] md:text-[100px]" : "font-qwigley text-[80px] md:text-[300px]": ""}`}>{mounted ? item.title : ""}</h2>
                                    </div>
                                    <Image src={`/assets/icons/${item.icon}.svg`} alt="gallery" fill className="rounded-xl z-[-1] object-cover transition-all duration-300 group-hover:scale-[1.1] group-hover:rotate-[2deg]" />
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}