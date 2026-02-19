"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { isFilter } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero({ search, setSearch }: isFilter) {
    const { t, mounted } = useTranslationSetup();

    const router = useRouter();

    return (
        <section>
            <div className="relative w-full md:h-[75vh]">
                <div className="py-10 md:py-0 realtive w-full h-full bg-[var(--color-hero)]">
                    <div className="container h-full">
                        <button
                            title="back"
                            onClick={() => router.back()}
                            className="md:hidden"
                        >
                            <Image
                                src="/assets/icons/arraw-mobile.svg"
                                alt="arraw"
                                width={34}
                                height={34}
                            />
                        </button>
                        <div className="mt-5 md:mt-0 w-full md:w-[850px] h-full flex flex-col gap-2 md:gap-5 justify-center">
                            <h2 className="text-white text-xl md:text-[50px] font-semibold">{mounted ? t("welcome-to-diner") : '...'}</h2>
                            <span className="leading-[20px] md:leading-[unset] text-white text-[10px] md:text-[20px] font-semibold font-normal opacity-[0.5]">{mounted ? t("text-welcome-to-diner") : '...'}</span>
                            <div className="mt-2 md:mt-0 text-white border border-1 border-white lg:w-[700px] bg-white/5 backdrop-blur-md rounded-lg relative flex items-center">
                                <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} className='absolute start-2 md:start-5 filter brightness-0 invert' />
                                <input
                                    type="text"
                                    placeholder={mounted ? t("search-faq") : '...'}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="opacity-[0.5] py-3 md:py-4 w-full h-full ps-10 md:ps-14 text-[8px] md:text-[16px] placeholder:text-white"
                                />
                            </div>
                        </div>
                    </div>
                    <Image src="/assets/icons/faq.png" alt="faq" fill className="object-cover z-[-1]" />
                </div>
            </div>
        </section>
    )
}