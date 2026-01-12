"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonHero from "./ButtonHero";
import { nextPage } from "@/app/TypeScript/TypeScript";

function Hero({ nextPage, title }: nextPage) {
    return (
        <section>
            <div className="relative w-full h-[400px] md:h-[82.3vh]">
                <div className="realtive w-full h-full bg-[var(--color-hero)]">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full text-center">
                        <h2 className="text-[40px] md:text-[87px] font-semibold text-white">{title}</h2>
                    </div>
                    <div className="container">
                        <div className="absolute top-5 md:top-13 flex">
                            <Link title="back" href="/" className="border border-2 border-white rounded-full py-[10px] px-[17px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.svg" alt="arraw" width={14} height={30} />
                            </Link>
                        </div>
                    </div>
                    <Image src="/assets/icons/hero-gallery.svg" alt="hero gallery" fill className="object-cover z-[-1]" />
                </div>
                <div className="hidden sm:block">
                    <ButtonHero nextPage={nextPage} />
                </div>
            </div>
            <div className="sm:hidden">
                <ButtonHero nextPage={nextPage} />
            </div>
        </section>
    )
}

export default Hero;