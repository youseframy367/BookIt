"use client";

import { usePathname } from 'next/navigation';
import Image from "next/image";
import { useTranslationSetup } from '@/app/hooks/useTranslationSetup';

export default function LapScreen() {
    const { t, i18n, mounted } = useTranslationSetup();

    const pathname = usePathname();

    return (
        <div className={`absolute w-full ${pathname == '/about' && 'top-[-80px]'}`}>
            <div className="container-content">
                <div className="flex flex-col gap-[32px] bg-black rounded-[20px] px-5 md:px-15 py-5 md:py-15">
                    <h2 className="text-white leading-10 font-Fontspring font-bold text-[32px]">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
                    <form action="">
                        <label htmlFor="" className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex gap-[13px] bg-white w-full rounded-full relative items-center">
                                    <Image src="/media/shared/icons/mail.svg" alt="الأيميل" width={16} height={13} className="top-[32.5%] left-2 absolute filter brightness-0 opacity-[0.4]" />
                                    <input type="email" placeholder={mounted ? t('enter-email') : '...'} className={`w-full px-8 py-4 rounded-full font-normal text-xs ${mounted ? i18n.language === 'en' && "font-rubik" : ""} placeholder:text-[var(--color-gray-four)]`} />
                                </div>
                                <input value={mounted ? t('subscribe-news-letter') : '...'} type="submit" className={`disabled:opacity-[0.5] disabled:cursor-not-allowed w-full font-normal text-sm ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} bg-white px-2 py-3 rounded-full`} />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}