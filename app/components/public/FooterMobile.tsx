"use client";

import Image from "next/image";
import Link from "next/link";
//  useEffect, useRef,
import { useState } from "react";
import { usePathname } from "next/navigation";
import SearchMobile from "./SearchMobile";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import BtnsSignInAndSignUp from "./BtnsSignInAndSignUp";
import { useMenuSearch } from "@/app/hooks/useBodyClass";
import { useBooking } from "@/app/(main)/context/BookingContext";
import { useToggleLanguage } from "@/app/hooks/useToggleLanguage";

export default function FooterMobile() {
    const { i18n, t, mounted } = useTranslationSetup();

    const pathname = usePathname();

    const { activeUser } = useBooking();

    const {
        show,
        setShow,
        searchRef,
        setOpenMenu,
        openMenu,
        buttonRef,
        menuRef
    } = useMenuSearch();

    const [search, setSearch] = useState("");

    const lastMenu = [
        {
            link: "/most-booked-or-top-reatied",
            title: t('most-booked'),
            icon: "most-booked-menu"
        },
        {
            link: "/",
            title: t('top-rated'),
            icon: "top-rated-menu"
        },
        {
            link: "/popular-dishes",
            title: t('popular-dishes'),
            icon: "like-menu"
        },
        {
            link: "/faq",
            title: t('questions'),
            icon: "faq-menu"
        },
        {
            link: "/privacy-policy",
            title: t('privacy-policy'),
            icon: "privacy-policy-menu"
        },
        {
            link: "/contact",
            title: t('contact'),
            icon: "contact-menu"
        },
        {
            link: "/terms-of-use",
            title: t('terms'),
            icon: "terms-of-use-menu"
        },
        ...(activeUser
            ? [{
                link: "/terms-of-use",
                title: t('my-bookings'),
                icon: "my-bookit"
            },]
            : []),
    ]

    const toggleSearch = () => {
        setShow(prev => !prev);
        setOpenMenu(false);
    }

    const toggleMenu = () => {
        setOpenMenu(prev => !prev);
        setShow(false);
    }

    const isActive = (path: string) => pathname === path && !show && !openMenu;

    const { toggleLanguage } = useToggleLanguage();

    return (
        <>
            <div ref={searchRef}>
                <SearchMobile search={search} setSearch={setSearch} setShowSearch={setShow} showSearch={show} />
            </div>

            <section className="w-full z-2 fixed md:hidden bottom-0 w-full py-4 px-5 bg-[var(--color-dark-bg)]">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/" className={`overflow-hidden relative flex gap-3 rounded-full p-3 transition-all duration-300 ${isActive("/") && !show ? "w-full bg-[var(--color-red-overlay)] text-[var(--strong-red)]" : "w-[49px]"
                            }`}>
                            <Image src="/media/shared/icons/home.svg" alt="home" width={24} height={24} className={`${isActive("/") && !show && 'filter-[unset]'} opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0`} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li onClick={toggleSearch} className={`overflow-hidden relative flex gap-2 rounded-full p-3 transition-all duration-300 ${show ? "w-[33%] bg-[var(--color-red-overlay)] text-[var(--strong-red)]" : "w-[49px]"
                        }`}>
                        <Image src={`/media/shared/icons/${show ? 'active-search' : 'search'}.svg`} alt="search" width={24} height={24} className={`${show && 'filter-[unset]'} opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0`} />
                        <span className="ms-2">Search</span>
                    </li>
                    <li>
                        <Link href="/liked-restaurants" className={`overflow-hidden relative flex gap-2 rounded-full p-3 transition-all duration-300 ${isActive("/liked-restaurants") ? "w-full bg-[var(--color-red-overlay)] text-[var(--strong-red)]" : "w-[49px]"
                            }`}>
                            <Image src={`/media/shared/icons/${isActive("/liked-restaurants") ? "heart.png" : "heart-footer-bottom.svg"}`} alt="heart" width={24} height={24} />
                            <span className="ms-2">Like</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={`overflow-hidden relative flex gap-2 rounded-full p-3 transition-all duration-300 ${isActive("/about") ? "w-full bg-[var(--color-red-overlay)] text-[var(--strong-red)]" : "w-[49px]"
                            }`}>
                            <Image src={`/media/shared/icons/${isActive("/about") ? "active-about" : "info"}.svg`} alt="info" width={24} height={24} />
                            <span className="ms-2">About</span>
                        </Link>
                    </li>
                    <li>
                        <button type="button" ref={buttonRef} onClick={toggleMenu}>
                            <Image src="/media/shared/icons/menu.svg" alt="menu" width={24} height={24} className="opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
                        </button>
                    </li>
                </ul>

                <div ref={menuRef} className={`p-[20px] flex flex-col gap-5 rounded-r-[20px] fixed top-0 overflow-scroll h-[91.1vh] transition-all duration-300 ${openMenu ? 'opacity-[1] left-0' : 'opacity-[0] left-[-70%]'} w-[70%] bg-gradient-to-br from-[var(--dark-charcoal)]/40 to-[var(--dark-charcoal)]/70 backdrop-blur-2xl text-white`}>
                    <div className="flex flex-col gap-[17px]">
                        <div className="flex justify-center">
                            <Image src="/media/shared/icons/logo-mobile.svg" alt="logo" width={151} height={58} />
                        </div>
                        <ul className="flex flex-col gap-[17px]">
                            {
                                lastMenu.map((item, index) => {
                                    return <li className={`${pathname == item.link && 'bg-gradient-to-r from-[var(--color-red-light-overlay)] to-[var(--color-red-light-overlay)]/10'} py-3 px-4`} key={index}>
                                        <Link href={item.link} onClick={() => setOpenMenu(false)} className="flex gap-5">
                                            <div className="flex justify-start w-[25px]">
                                                <img src={`/media/shared/icons/${item.icon}.svg`} alt={item.icon} />
                                            </div>
                                            <span className="font-normal text-base">{mounted ? item.title : '...'}</span>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                        <hr />
                        {
                            !activeUser &&
                            <div className="text-center flex flex-col gap-[17px]">
                                <BtnsSignInAndSignUp />
                            </div>
                        }
                        <div dir="ltr" onClick={toggleLanguage} className="bg-[var(--is-gray-seven)] cursor-pointer border border-[var(--strong-red)] rounded-[50px] p-[13px] flex justify-between items-center">
                            <Image src="/media/shared/icons/change-language.svg" alt='language' width={20} height={20} className={`transition-all duration-300 ${i18n.language == 'ar' ? 'rotate-180' : 'rotate-0'}`} />
                            <div className="flex gap-[8px]">
                                <span className="text-md">{i18n.language == 'ar' ? 'English' : 'العربيه'}</span>
                                <Image src={`/media/shared/icons/${i18n.language == 'ar' ? 'en' : 'ar'}.svg`} alt='lang' width={30} height={30} onClick={toggleLanguage} className="object-cover rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}