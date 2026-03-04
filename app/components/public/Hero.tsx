"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonHero from "./ButtonHero";
import { nextAndBackPage } from "@/app/TypeScript/TypeScript";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useRouter } from "next/navigation";

export default function Hero({ title, image, isShowGallery, nextPage, isActiveButtonHero = true }: nextAndBackPage) {
    const { i18n, mounted } = useTranslationSetup();
    const router = useRouter();

    return (
        <section>
            <div className="mt-5 md:mt-0 container-mobile relative w-full h-[500px] md:h-[75vh]">
                <div className="realtive w-full h-full bg-[var(--alpha)] rounded-[30px] md:rounded-none">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full pb-25 text-center">
                        <div className="px-2 md:px-0 md:w-[1300px]">
                            <h2 className={`text-2xl md:text-[87px] ${mounted ? i18n.language === 'ar' && "font-ArefRuqaa" : ""} font-semibold text-white`}>{mounted ? title : '...'}</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className={`${mounted ? i18n.language === 'ar' && "rotate-180" : ""} absolute top-5 md:top-13 flex`}>
                            <button title="back" onClick={() => router.back()} className="md:hidden">
                                <Image src="/assets/icons/arraw-mobile.svg" alt="arraw" width={44} height={44} />
                            </button>
                            <button title="back" onClick={() => router.back()} className="hidden md:flex border border-2 border-white rounded-full py-[10px] px-[17px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.png" alt="arraw" width={14} height={30} className="rotate-180" />
                            </button>
                        </div>
                    </div>
                    <Image src={`/assets/icons/${image}`} alt="hero gallery" fill className="rounded-[30px] md:rounded-none object-cover z-[-1]" />
                </div>
                {
                    isShowGallery &&
                    <Link href="/gallery/1" title="gallery" className="absolute bottom-20 right-5 w-[80px] md:w-[130px] h-[80px] md:h-[130px] flex justify-center items-center text-white">
                        <Image src="/assets/icons/all-icons-gallery.png" alt="all gallery" fill className="object-cover opacity-[0.4]" />
                        <span className="relative text-sm md:text-[25px] font-medium">+20</span>
                    </Link>
                }
                {
                    isActiveButtonHero && <div>
                        <ButtonHero nextPage={nextPage} />
                    </div>
                }
            </div>
        </section>
    )
}