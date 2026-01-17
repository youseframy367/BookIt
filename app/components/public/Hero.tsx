"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonHero from "./ButtonHero";
import { nextAndBackPage } from "@/app/TypeScript/TypeScript";

function Hero({ title, image, isShowGallery, nextPage, backPage }: nextAndBackPage) {
    return (
        <section>
            <div className="relative w-full h-[400px] md:h-[75vh]">
                <div className="realtive w-full h-full bg-[var(--color-hero)]">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full pb-25 text-center">
                        <div className="w-[1300px]">
                            <h2 className="text-[40px] md:text-[87px] font-semibold text-white">{title}</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="absolute top-5 md:top-13 flex">
                            <Link title="back" href={backPage || ''} className="border border-2 border-white rounded-full py-[10px] px-[17px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.svg" alt="arraw" width={14} height={30} />
                            </Link>
                        </div>
                    </div>
                    <Image src={`/assets/icons/${image}.svg`} alt="hero gallery" fill className="object-cover z-[-1]" />
                </div>
                {
                    isShowGallery &&
                    <Link href="/gallery/1" title="gallery" className="absolute bottom-18 right-5 w-[130px] h-[130px] flex justify-center items-center text-white">
                        <Image src="/assets/icons/all-icons-gallery.svg" alt="all gallery" fill className="object-cover opacity-[0.4]" />
                        <span className="relative text-[25px] font-medium">+20</span>
                    </Link>
                }
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