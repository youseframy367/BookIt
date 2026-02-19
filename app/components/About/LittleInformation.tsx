"use client";

import { useDataInformation } from "@/app/data/information";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import CountUp from "react-countup";

export default function LittleInformation() {
    const { t, mounted, i18n } = useTranslationSetup();
    const numbers = useDataInformation();

    return (
        <section className="bg-[var(--color-little-formation)]">
            <div className="remove-container container">
                <div className="w-full md:py-30 flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-8 md:gap-20">
                    <div className="container">
                        <div className="flex flex-col gap-5" data-aos="fade-up">
                            <div className="md:w-[550px]">
                                <h2 className={`md:leading-[60px] font-medium text-[29px] md:text-[55px] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-PlayfairDisplay" : ""} text-[var(--color-span-paner)]`}>{mounted ? t("little-information") : '...'}</h2>
                            </div>
                            <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-DMSans_24pt" : ""} leading-[25px] font-normal text-[var(--color-text-about)]`}>{mounted ? t("at-book-it") : '...'}</span>
                            <div className="w-full items-center justify-center">
                                <div className="justify-center items-center flex flex-col gap-5" data-aos="fade-up">
                                    <ul className="grid md:grid-cols-2 gap-6">
                                        {
                                            numbers.map((item, index) => {
                                                return <li key={index} className="rounded-[8px] bg-white p-5 border border-2 border-[var(--color-line)] flex flex-col items-center justify-center gap-3">
                                                    <h2 className="text-[55px]">
                                                        <CountUp
                                                            start={0}
                                                            end={item.number}
                                                            duration={3}
                                                            enableScrollSpy
                                                            separator=","
                                                        >
                                                            {({ countUpRef }) => (
                                                                <span ref={countUpRef} />
                                                            )}
                                                        </CountUp>
                                                    </h2>
                                                    <span className="font-medium text-lg">{mounted ? item.title : '...'}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-[469px] md:h-full" data-aos="fade-up">
                        <Image src="/assets/icons/little-infromation.svg" alt="little-infromation" fill className="object-cover md:rounded-[12px]" />
                    </div>
                </div>
            </div>
        </section>
    )
}