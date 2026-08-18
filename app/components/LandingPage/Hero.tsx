"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import Link from "next/link";
import SocailMedia from "../public/SocailMedia";

export default function Hero() {
    const { t, i18n, mounted } = useTranslationSetup();

    return (
        <main id="paner" className="relative">
            <div className="py-10 md:py-0 md:h-[800px] bg-[url('/assets/webp/bg.webp')]
    bg-cover
    bg-center
    bg-no-repeat">
                <div className="container flex flex-col items-center justify-center gap-[22px] md:gap-[42px] w-full h-full">
                    <SocailMedia />
                    <div className="flex flex-col items-center justify-center text-center gap-[12px] md:gap-[32px]">
                        <h2 className={`${mounted ? i18n.language === 'ar' ? "font-ArefRuqaa xl:leading-[115px]" : "font-PlayfairDisplay xl:leading-[76px]" : ""} font-normal md:w-[700px] text-[25px] xl:text-[100px] text-[var(--color-dark-olive)]`}>
                            {mounted ? t('best-food') : "..."}
                        </h2>

                        <p className="md:w-[500px] font-normal text-[var(--color-dark-olive)] text-[14px] md:text-[18px] leading-[32px]">
                            {mounted ? t('discover-kitchens') : "..."}
                        </p>

                        <Link href="/role-restaurant-or-coffee" title="join as restaurant owner"
                            className={`cursor-pointer flex items-center gap-3 px-5 py-3 rounded-full
          bg-[var(--strong-red)] text-white font-semibold text-[12px] md:text-[16px] transition-transform duration-200 hover:-translate-y-1`}
                        >
                            {mounted ? t('join-owner') : "..."}
                            <img src="/assets/icons/uil_arrow-up(4).png" alt="arrow" className={`${mounted ? i18n.language === 'ar' && "-rotate-80" : ""}`} />
                        </Link>
                    </div>

                    <div className="hidden md:block relative w-[150px] h-[150px]">
                        <a href="#down">
                            <Image src="/assets/icons/down.png" alt="center" width={16} height={24} className="absolute top-15 left-17" />
                        </a>
                        <svg
                            viewBox="0 0 200 200"

                            style={{ fontSize: "16.12px", display: "grid", gap: "10,8px" }}
                        >

                            <defs>
                                <path
                                    id="circlePath"
                                    d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
                                />
                            </defs>

                            <text
                                fill="#E22023"
                                fontSize="16.12px"
                                letterSpacing="2px"
                                fontFamily="Inter"
                                fontWeight="400"
                                style={{
                                    transformOrigin: "100px 100px",
                                    animation: "rotateText 20s linear infinite",
                                    direction: "ltr",
                                }}
                            >
                                <textPath href="#circlePath" lengthAdjust="spacingAndGlyphs">
                                    {("scroll down for work together • ").repeat(20)}
                                </textPath>
                            </text>

                            <style>
                                {`
        @keyframes rotateText {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
                            </style>
                        </svg>
                    </div>
                </div>
            </div>
        </main>
    );
}