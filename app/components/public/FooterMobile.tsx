"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function FooterMobile() {
    const pathname = usePathname();

    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        showSearch ? document.body.classList.add("search-active") : document.body.classList.remove("search-active");
        return () => document.body.classList.remove("search-active");
    }, [showSearch]);

    return (
        <>
            {
                showSearch &&
                <div className="w-[90%] z-2 bg-[var(--color-search)] rounded-full fixed top-50 left-4 flex items-center">
                    <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} className='absolute start-5' />
                    <input type="text" className='p-5 w-full h-full rounded-full ps-14' placeholder='Search restaurants' />
                </div>
            }
            <section className="z-2 fixed md:hidden bottom-[-0.5px] w-full py-4 px-5 bg-[var(--color-footer-mobile)]">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/" className={`flex gap-2 rounded-full p-3 ${pathname === "/" ? "bg-[var(--color-active-footer)] text-[var(--color-red)]" : ""
                            }`}>
                            <Image src="/assets/icons/home.svg" alt="home" width={24} height={24} className={`${pathname === "/" && 'filter-[unset]'} opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0`} />
                            <span className={`${pathname === "/" ? 'block' : 'hidden'}`}>Home</span>
                        </Link>
                    </li>
                    <li onClick={() => setShowSearch(prev => !prev)}>
                        <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} className="opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
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
                        <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
                    </li>
                </ul>
            </section>
        </>
    )
}

export default FooterMobile;