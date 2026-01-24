"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SearchMobile from "./SearchMobile";

function FooterMobile() {
    const pathname = usePathname();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const [openMenu, setOpenMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        showSearch || openMenu ? document.body.classList.add("search-active") : document.body.classList.remove("search-active");
        return () => document.body.classList.remove("search-active");
    }, [showSearch, openMenu]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const lastMenu = [
        {
            link: "/most-booked",
            title: "Most Booked",
            icon: "most-booked-menu"
        },
        {
            link: "/",
            title: "Top Rated",
            icon: "top-rated-menu"
        },
        {
            link: "/faq",
            title: "FAQ",
            icon: "faq-menu"
        },
        {
            link: "/privacy-policy",
            title: "Privacy Policy",
            icon: "privacy-policy-menu"
        },
        {
            link: "/contact",
            title: "Contact",
            icon: "contact-menu"
        },
        {
            link: "/terms-of-use",
            title: "Terms of Use",
            icon: "terms-of-use-menu"
        }
    ]

    return (
        <>
            <SearchMobile search={search} setSearch={setSearch} setShowSearch={setShowSearch} showSearch={showSearch} />

            <section className="z-2 fixed md:hidden bottom-[-0.5px] w-full py-4 px-5 bg-[var(--color-footer-mobile)]">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/" className={`flex gap-2 rounded-full p-3 ${pathname === "/" && !showSearch ? "bg-[var(--color-active-footer)] text-[var(--color-red)]" : ""
                            }`}>
                            <Image src="/assets/icons/home.svg" alt="home" width={24} height={24} className={`${pathname === "/" && !showSearch && 'filter-[unset]'} opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0`} />
                            <span className={`${pathname === "/" && !showSearch ? 'block' : 'hidden'}`}>Home</span>
                        </Link>
                    </li>
                    <li onClick={() => setShowSearch(prev => !prev)} className={`flex gap-2 rounded-full p-3 ${showSearch ? "bg-[var(--color-active-footer)] text-[var(--color-red)]" : ""
                        }`}>
                        <Image src={`/assets/icons/${showSearch ? 'active-search' : 'search'}.svg`} alt="search" width={24} height={24} className={`${showSearch && 'filter-[unset]'} opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0`} />
                        <span className={`${showSearch ? 'block' : 'hidden'}`}>Search</span>
                    </li>
                    <li>
                        <Link href="/liked-restaurants" className={`flex gap-2 rounded-full p-3 ${pathname === "/liked-restaurants" ? "bg-[var(--color-active-footer)] text-[var(--color-red)]" : ""
                            }`}>
                            <Image src={`/assets/icons/${pathname === "/liked-restaurants" ? "heart.png" : "heart-footer-bottom.svg"}`} alt="heart" width={24} height={24} />
                            <span className={`${pathname === "/liked-restaurants" ? 'block' : 'hidden'}`}>Heart</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={`flex gap-2 rounded-full p-3 ${pathname === "/about" ? "bg-[var(--color-active-footer)] text-[var(--color-red)]" : ""
                            }`}>
                            <Image src="/assets/icons/info.svg" alt="info" width={24} height={24} />
                            <span className={`${pathname === "/about" ? 'block' : 'hidden'}`}>About</span>
                        </Link>
                    </li>
                    <li>
                        <button type="button" ref={buttonRef} onClick={() => setOpenMenu(prev => !prev)}>
                            <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
                        </button>
                    </li>
                </ul>

                <div ref={menuRef} className={`flex flex-col gap-5 rounded-r-[20px] fixed top-0 h-[91.5vh] transition-all duration-300 ${openMenu ? 'opacity-[1] left-0' : 'opacity-[0] left-[-10%]'} w-[70%] bg-gradient-to-br from-[var(--color-text-star)]/40 to-[var(--color-text-star)]/70 backdrop-blur-2xl text-white`}>
                    <ul className="p-[20px] pt-[100px]">
                        {
                            lastMenu.map((item, index) => {
                                return <li className={`${pathname == item.link && 'border-l-3 border-[var(--color-red)] bg-gradient-to-r from-[var(--color-active-menu)] to-[var(--color-active-menu)]/10'} p-4`} key={index}>
                                    <Link href={item.link} onClick={() => setOpenMenu(false)} className="flex gap-5">
                                        <Image src={`/assets/icons/${item.icon}.svg`} alt={item.icon} width={20} height={20} />
                                        <span className="font-normal text-base">{item.title}</span>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                    <div className="px-[20px] flex flex-col gap-5">
                        <hr />
                        <Link href="/login" onClick={() => setOpenMenu(false)} className="text-center bg-[var(--color-red)] px-8 py-3 text-white hover:text-[var(--color-red)] before:bg-white before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign in">
                            <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                sign in
                            </span>
                        </Link>
                        <Link href="/register/new-account" onClick={() => setOpenMenu(false)} className="text-center bg-white px-8 py-3 text-[var(--color-red)] hover:text-white before:bg-[var(--color-red)] before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign up">
                            <span className="text-center relative z-1 text-base font-medium transition-all duration-800">
                                sign up
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FooterMobile;