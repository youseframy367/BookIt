"use client";

import { useFootrerData } from '@/app/data/dataFooter';
import { useTranslationSetup } from '@/app/hooks/useTranslationSetup';
import Image from 'next/image';
import Link from 'next/link';
import SocailMedia from '../SocailMedia';
import FooterBottom from '../FooterBottom';

export default function MobileScreen() {
    const { t, i18n, mounted } = useTranslationSetup();

    const { Menu, Information, ContactInfo } = useFootrerData();

    return (
        <div className="container">
            <div className="pb-10 pt-45 flex flex-col gap-5">
                <div className="md:items-center flex flex-col gap-5">
                    <Image src="/assets/icons/logo-footer-1.svg" alt="logo" width={199} height={37} />
                    <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-sm font-normal text-[var(--color-black-five)]`}>{mounted ? t('search-for-restaurants') : '...'}</span>
                </div>
                <SocailMedia filter="p-[6px] filter brightness-0" isBorder="rounded-full border border-2 border-[var(--color-black-six)]" />
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-[16px]">
                        <h2 className={`uppercase text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('menu') : '...'}</h2>
                        <ul className="flex flex-col gap-3">
                            {
                                Menu.map((item, index) => (
                                    <li key={index}>
                                        <Link className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <h2 className={`uppercase text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('information') : '...'}</h2>
                        <ul className="flex flex-col gap-3 md:px-5">
                            {
                                Information.map((item, index) => (
                                    <li key={index}>
                                        <Link className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <h2 className={`uppercase text-2xl md:px-7 ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>{mounted ? t('contact-info') : '...'}</h2>
                        <ul className="flex flex-col gap-3 md:px-5">
                            {
                                ContactInfo.map((item, index) => (
                                    <li key={index}>
                                        <a className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-lg`} href={item.link}>{mounted ? item.title : '...'}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <FooterBottom />
        </div>
    )
}