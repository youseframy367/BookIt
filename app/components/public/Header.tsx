"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import BtnsSignInAndSignUp from './BtnsSignInAndSignUp';
import { useTranslationSetup } from '@/app/hooks/useTranslationSetup';
import { useNavigationData } from '@/app/data/dataHeader';
import { useMenuSearch } from '@/app/hooks/useBodyClass';
import { useBooking } from '@/app/(main)/context/BookingContext';
import { useToggleLanguage } from '@/app/hooks/useToggleLanguage';

export default function Header() {
    const { navigation, links } = useNavigationData();
    const { t, i18n, mounted } = useTranslationSetup();
    const [activeDropdown, setActiveDropdown] = useState<null | string>(null);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const dropdownRefs = useRef<Map<string, HTMLElement>>(new Map());
    const [currentType, setCurrentType] = useState<string | null>(null);

    const { activeUser } = useBooking();

    const [selectedLogOut, setSelectedLogOut] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setCurrentType(params.get("type"));
    }, []);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        setIsScrollingDown(currentScroll > lastScrollTop);
        setScrollY(currentScroll);

        if (currentScroll > lastScrollTop) {
            setActiveDropdown(null);
        }

        setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    const pathname = usePathname();

    const [search, setSearch] = useState("");

    const {
        show,
        setShow,
        searchRef,
    } = useMenuSearch();

    const handleClickOutside = (event: MouseEvent) => {
        if (!activeDropdown) return;

        const el = dropdownRefs.current.get(activeDropdown);
        if (el && !el.contains(event.target as Node)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [activeDropdown, lastScrollTop]);

    const { toggleLanguage } = useToggleLanguage();

    return (
        <Disclosure
            as="nav"
            className={`w-full hidden md:block md:sticky top-0 z-3 md:bg-white md:shadow-lg transition duration-300 ${isScrollingDown
                ? "-translate-y-full"
                : "translate-y-0"
                }`}
        >
            <div className="flex flex-col">
                <div className="bg-[var(--gray)]">
                    <div className="container">
                        <div className="flex py-3 items-center justify-between">
                            <div className="absolute right-0 flex items-center lg:hidden">
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                </DisclosureButton>
                            </div>
                            <div className='flex w-full justify-between'>
                                {activeUser &&
                                    <div className='relative flex items-center gap-[8px]'>
                                        <div className='whitespace-nowrap flex items-center gap-[8px] w-full' onClick={() => setSelectedLogOut(prev => !prev)}>
                                            <Image src="/media/shared/icons/user.svg" alt='user' width={14} height={14} />
                                            <span className='text-[var(--color-red-1)] font-normal text-xs'>Hello, Hesham abdelhamid</span>
                                            <Image src="/media/shared/icons/arraw-select.svg" alt='arraw-select' width={10} height={10} className={`transition-all duration-400 ${selectedLogOut ? '-rotate-0' : '-rotate-180'}`} />
                                        </div>
                                        <Link href="" className={`${selectedLogOut ? 'opacity-100' : 'opacity-0'} gap-[12px] flex justify-center rounded-[10px] py-[13px] px-[30px] shadow-[0_0px_2px_var(--color-black-tow)] absolute -bottom-17 w-full bg-white ${selectedLogOut ? 'z-2' : 'z-0'}`}>
                                            <Image src="/media/shared/icons/sign-out.svg" alt={mounted ? t("sign-out") : "..."} width={24} height={24} />
                                            <span className='text-nowrap text-[var(--color-red-2)]'>{mounted ? t("sign-out") : "..."}</span>
                                        </Link>
                                    </div>
                                }
                                <div className="w-full flex items-center justify-end">
                                    <div className="hidden lg:block">
                                        <div className="flex items-center space-x-8">
                                            <>
                                                {
                                                    navigation.map((item, index) => {
                                                        const isActive = pathname === item.href;

                                                        return <Link
                                                            title={mounted ? item.name : '...'}
                                                            key={index}
                                                            href={item.href}
                                                            className={`${isActive && 'text-[var(--strong-red)]'} ${mounted ? i18n.language === 'ar' && "font-cairo" : ""} hover:text-[var(--strong-red)] text-lg font-normal`}
                                                        >
                                                            {mounted ? item.name : '...'}
                                                        </Link>
                                                    })
                                                }
                                                {
                                                    mounted && <div className="cursor-pointer">
                                                        <Image src={`/media/shared/icons/${i18n.language == 'ar' ? 'en' : 'ar'}.svg`} alt='lang' width={30} height={30} onClick={toggleLanguage} />
                                                    </div>
                                                }
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container relative">
                    <div className="flex py-2 items-center justify-between">
                        <div className={`w-full ${mounted ? i18n.language === 'ar' ? "md:w-[43%] ml-3 " : "lg:w-[730px]" : ""} flex items-center gap-2`}>
                            <Link href="/" title='BOOK IT'>
                                <Image src="/media/shared/icons/logo.svg" alt='logo' width={139} height={54} />
                            </Link>
                            <div className="w-[75%] bg-[var(--very-light-gray)] rounded-full relative flex items-center">
                                <Image src="/media/shared/icons/search.svg" alt='search' width={20} height={20} className='absolute start-5' />
                                <input value={search}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearch(value);
                                        setShow(value.trim().length > 0);
                                    }} type="text" className={`py-2 my-1 ${mounted ? i18n.language === 'ar' && "font-cairo" : ""} font-normal w-[100%] h-full rounded-full ps-14`} placeholder={mounted ? t('search') : '...'} />
                                <Image src="/media/shared/icons/map.svg" alt='map' width={24} height={24} className='hidden lg:flex absolute end-5 filter invert sepia saturate-500 hue-rotate-[200deg]' />
                            </div>
                        </div>
                        <div className='gap-3 items-center hidden lg:flex'>
                            <ul className='flex gap-5'>
                                {
                                    links.map((item, index) => {
                                        let isActive = false;

                                        item.activeOnlyForType ? isActive = currentType === item.activeOnlyForType && pathname === item.href.split("?")[0] : isActive = pathname === item.href;

                                        return (
                                            <li
                                                key={index}
                                                className={`whitespace-nowrap ${isActive ? "before:w-full text-[var(--strong-red)]" : ""
                                                    } hover:text-[var(--strong-red)] pb-1 relative transition-all before:duration-400 before:content-[''] before:absolute before:bottom-0 before:bg-[var(--strong-red)] hover:before:w-full before:w-[0] before:h-[2px]`}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`${mounted ? (i18n.language === "ar" ? "font-cairo" : "") : ""
                                                        } font-normal text-[15px]`}
                                                >
                                                    {mounted ? item.name : "..."}
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            {!activeUser && <BtnsSignInAndSignUp />}
                        </div>
                    </div>
                    {
                        show &&
                        <div ref={searchRef}>
                            <ul className={`z-1 rounded-b-xl border-t-2 border-[var(--color-gray-light-transparent)] border-top absolute bg-white w-full lg:w-[550px] ${mounted ? i18n.language === 'ar' ? "lg:right-34" : "lg:left-34" : ""}`}>
                                <li className='flex justify-between items-center p-3'>
                                    <div className='flex items-center gap-5'>
                                        <Image src="/media/shared/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                            <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                        </div>
                                    </div>
                                    <Link href="" title='resturant' className='text-nowrap rounded-[8px] text-white p-2 text-[10px] font-normal bg-[var(--strong-red)] transition-all duration-400 shadow hover:shadow-[0_8px_20px_rgba(239,68,68,0.55)]'>Enter the restaurant</Link>
                                </li>
                                <li className='flex justify-between items-center p-3'>
                                    <div className='flex items-center gap-5'>
                                        <Image src="/media/shared/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                            <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                        </div>
                                    </div>
                                    <Link href="" title='resturant' className='text-nowrap rounded-[8px] text-white p-2 text-[10px] font-normal bg-[var(--strong-red)] transition-all duration-400 shadow hover:shadow-[0_8px_20px_rgba(239,68,68,0.55)]'>Enter the restaurant</Link>
                                </li>
                                <hr className='text-[var(--color-gray-medium-transparent)]' />
                                <div className='pb-1 text-center'>
                                    <span className='opacity-[0.5] text-[8px] font-normal'>No other search results found .</span>
                                </div>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </Disclosure >
    )
}