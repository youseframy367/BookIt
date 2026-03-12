"use client";

import { useFootrerData } from '@/app/data/dataFooter';
import { useTranslationSetup } from '@/app/hooks/useTranslationSetup';
import Image from 'next/image';
import Link from 'next/link';
import SocailMedia from '../SocailMedia';
import FooterBottom from '../FooterBottom';

export default function LabScreen() {
    const { t, i18n, mounted } = useTranslationSetup();

    const { Menu, Information, ContactInfo } = useFootrerData();

    return (
        <div className="container">
            <div className="pb-10 pt-50 grid grid-cols-2 xl:grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-5">
                <div className="items-center flex flex-col gap-5">
                    <div className="relative w-full md:w-[261px] h-[95px]">
                        <Image src="/assets/icons/logo-footer.svg" alt="logo" fill className="object-cover" />
                    </div>
                    <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs font-normal`}>{mounted ? t('copyright') : '...'}</span>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className={`text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('menu') : '...'}</h2>
                    <ul className="flex flex-col gap-3 md:px-5">
                        {
                            Menu.map((item, index) => (
                                <li className="flex" key={index}>
                                    <div className="flex md:items-center gap-2 group" title={mounted ? item.title : '...'}>
                                        <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                        <Link className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</Link>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className={`text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('information') : '...'}</h2>
                    <ul className="flex flex-col gap-3 md:px-5">
                        {
                            Information.map((item, index) => (
                                <li className="flex" key={index}>
                                    <div className="flex md:items-center gap-2 group" title={mounted ? item.title : '...'}>
                                        <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                        <Link className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</Link>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className={`text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('contact-info') : '...'}</h2>
                    <ul className="flex flex-col gap-3 md:px-5">
                        {
                            ContactInfo.map((item, index) => (
                                <li className="flex" key={index}>
                                    <div className="flex md:items-center gap-2 group" title={mounted ? item.title : '...'}>
                                        <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                        <a className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <h2 className={`px-4 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-2xl font-medium`}>{mounted ? t("follow") : '...'}</h2>
                    <SocailMedia filter="invert brightness-0" />
                </div>
            </div>
            <FooterBottom />
        </div>
    )
}