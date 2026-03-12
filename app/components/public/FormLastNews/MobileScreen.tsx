"use client";

import { usePathname } from 'next/navigation';
import { useTranslationSetup } from '@/app/hooks/useTranslationSetup';
import Submit from '../Submit';

export default function MobileScreen() {
    const { t, i18n, mounted } = useTranslationSetup();

    const pathname = usePathname();

    return (
        <div className={`absolute w-full ${pathname == '/about' && 'top-[-80px]'}`}>
            <div className="container-content">
                <div className="bg-white border border-[var(--gray)] border-1 rounded-3xl px-5 md:px-15 py-5 md:py-15">
                    <div className="flex justify-between gap-5 md:gap-0 items-center">
                        <h2 className={`text-nowrap text-[var(--slate-gray)] font-normal text-xs ${mounted ? i18n.language === 'en' && "font-PlayfairDisplay" : ""} lg:text-[64px]`}>{mounted ? t('our-news') : '...'}</h2>
                        <form action="">
                            <label htmlFor="" className="flex flex-col gap-2">
                                <span className={`text-xs md:text-xl text-[var(--slate-gray)] ${mounted ? i18n.language === 'en' && "font-rubik" : ""}`}>{mounted ? t('email') : '...'}</span>
                                <div className="flex flex-wrap gap-4">
                                    <input type="email" placeholder={mounted ? t('enter-email') : '...'} className={`input-email font-normal text-xs md:text-xl ${mounted ? i18n.language === 'en' && "font-rubik" : ""} placeholder:text-[var(--strong-red)] bg-[var(--color-danger-light)] px-7 py-5 rounded-xl w-full lg:w-[372px]`} />
                                    <Submit title={`${mounted ? t('sub-script') : '...'}`} width="w-full md:w-[136px]" />
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}