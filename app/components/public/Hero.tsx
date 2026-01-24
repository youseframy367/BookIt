"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonHero from "./ButtonHero";
import { nextAndBackPage } from "@/app/TypeScript/TypeScript";

function Hero({ title, image, isShowGallery, nextPage, backPage }: nextAndBackPage) {
    return (
        <section>
            <div className="container-mobile mt-5 relative w-full h-[500px] md:h-[75vh]">
                <div className="realtive w-full h-full bg-[var(--color-hero)] rounded-[30px] md:rounded-none">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full pb-25 text-center">
                        <div className="px-2 md:px-0 md:w-[1300px]">
                            <h2 className="text-2xl md:text-[87px] font-semibold text-white">{title}</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="absolute top-5 md:top-13 flex">
                            <Link title="back" href={backPage || ''} className="md:hidden">
                                <Image src="/assets/icons/arraw-mobile.svg" alt="arraw" width={44} height={44} />
                            </Link>
                            <Link title="back" href={backPage || ''} className="hidden md:flex border border-2 border-white rounded-full py-[10px] px-[17px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.png" alt="arraw" width={14} height={30} className="rotate-180" />
                            </Link>
                        </div>
                    </div>
                    <Image src={`/assets/icons/${image}`} alt="hero gallery" fill className="rounded-[30px] md:rounded-none object-cover z-[-1]" />
                </div>
                {
                    isShowGallery &&
                    <Link href="/gallery/1" title="gallery" className="absolute bottom-5 md:bottom-18 right-5 w-[80px] md:w-[130px] h-[80px] md:h-[130px] flex justify-center items-center text-white">
                        <Image src="/assets/icons/all-icons-gallery.png" alt="all gallery" fill className="object-cover opacity-[0.4]" />
                        <span className="relative text-sm md:text-[25px] font-medium">+20</span>
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