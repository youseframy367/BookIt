"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function FooterMobile() {
    const pathname = usePathname();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        showSearch ? document.body.classList.add("search-active") : document.body.classList.remove("search-active");
        return () => document.body.classList.remove("search-active");
    }, [showSearch]);

    return (
        <>
            {
                showSearch &&
                <div className="md:hidden fixed top-10 z-1 w-full flex flex-col gap-10">
                    <div className="flex justify-center w-full">
                        <div className="w-[85%] opacity-[0.7] bg-[var(--color-search-mobile)] rounded-lg relative flex items-center">
                            <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} className='opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0 absolute start-5' />
                            <input value={search}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    setShowSearch(value.trim().length > 0);
                                }} type="text" className='text-sm p-3 text-white w-full h-full rounded-full ps-14' placeholder='Search restaurants or choose your area' />
                            <Image src="/assets/icons/map.svg" alt='map' width={24} height={24} className='hidden lg:flex absolute end-5 filter invert sepia saturate-500 hue-rotate-[200deg]' />
                        </div>
                    </div>
                    <ul className="bg-white rounded-b-[20px]">
                        <li className='p-3'>
                            <div className='flex items-center gap-5'>
                                <Image src="/assets/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                    <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                </div>
                            </div>
                        </li>
                        <li className='p-3'>
                            <div className='flex items-center gap-5'>
                                <Image src="/assets/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                    <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                </div>
                            </div>
                        </li>
                        <hr className='text-[var(--color-not-active)]' />
                        <div className='pb-1 text-center'>
                            <span className='opacity-[0.5] text-[8px] font-normal'>No other search results found .</span>
                        </div>
                    </ul>
                </div>
            }

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
                        <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
                    </li>
                </ul>
            </section>
        </>
    )
}

export default FooterMobile;