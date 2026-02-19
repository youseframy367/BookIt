"use client";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { isProducts } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import { useState } from "react";

export default function Products({ products, marginTop }: isProducts) {
    const { mounted, i18n, t } = useTranslationSetup();

    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <section>
            <div className={`container-content mt-10 md:mt-15 ${marginTop}`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
                    {
                        products.map((item, index) => {
                            return <div data-aos="fade-up" key={index} className="min-h-[200px] rounded-[25px] flex flex-col bg-white shadow-[0_0_12px_rgba(0,0,0,0.15)]">
                                <div className={`flex ${mounted ? i18n.language === 'en' && "justify-end" : ""}`}>
                                    <div className={`${mounted ? i18n.language === 'ar' ? "rounded-tl-[25px] rounded-br-[25px]" : "rounded-tr-[25px] rounded-bl-[25px]" : ""} bg-[var(--color-red)] p-3 cursor-pointer`} onClick={() => toggleFavorite(item.id)}>
                                        <div className="relative w-[15px] h-[15px] md:w-[24px] md:h-[24px]">
                                            <Image
                                                src={`/assets/icons/${item.active ? "full-heart" : "heart"}.svg`}
                                                alt="heart"
                                                fill
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-full flex flex-col md:gap-3">
                                    <div className="flex justify-center items-center">
                                        <div className="relative w-[105px] md:w-[250px] h-[95px] md:h-[250px]">
                                            <Image src={`/assets/icons/${item.icon}.svg`} alt="fattoush salad" fill className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="h-full p-5 flex flex-col justify-between gap-3">
                                        <h2 className="font-semibold text-lg md:text-3xl">{mounted ? item.title : '...'}</h2>
                                        <span className="text-[var(--color-text-products)] font-semibold text-xs md:text-[22px]">{mounted ? item.subTitle : '...'}</span>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-lg md:text-3xl"><span className={`${mounted ? i18n.language === 'ar' && "font-ArefRuqaa" : ""} text-2xl text-[var(--color-red)]`}>{mounted ? t("currency") : '...'}</span> {item.amount} </span>
                                            <div className="flex items-center gap-2">
                                                <Image src="/assets/icons/star.svg" alt="star" width={24} height={24} />
                                                <span className="font-semibold text-base md:text-[22px] text-[var(--color-text-star)]">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}