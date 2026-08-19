"use client";
import Image from "next/image";
import { passSearchData } from "@/app/TypeScript/TypeScript";

export default function SearchMobile({ showSearch, setSearch, setShowSearch, search }: passSearchData) {
    return (
        <>
            {
                showSearch &&
                <div className="md:hidden fixed top-10 z-1 w-full flex flex-col gap-10">
                    <div className="flex justify-center w-full">
                        <div className="w-[85%] opacity-[0.7] bg-[var(--color-black-opacity)] rounded-lg relative flex items-center">
                            <Image src="/media/shared/icons/search.svg" alt='search' width={20} height={20} className='opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0 absolute start-5' />
                            <input value={search}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    setShowSearch(value.trim().length > 0);
                                }} type="text" className='text-sm p-3 text-white w-full h-full rounded-full ps-14' placeholder='Search restaurants or choose your area' />
                            <Image src="/media/shared/icons/map.svg" alt='map' width={24} height={24} className='hidden lg:flex absolute end-5 filter invert sepia saturate-500 hue-rotate-[200deg]' />
                        </div>
                    </div>
                    <ul className="bg-white rounded-b-[20px]">
                        <li className='p-3'>
                            <div className='flex items-center gap-5'>
                                <Image src="/media/shared/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                    <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                </div>
                            </div>
                        </li>
                        <li className='p-3'>
                            <div className='flex items-center gap-5'>
                                <Image src="/media/shared/icons/icon-resturans.svg" alt='resturans' width={40} height={40} className='object-cover' />
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-base font-normal'>Qasr elkbabgi</h2>
                                    <span className='opacity-[0.5] text-[10px] font-normal'>Next to Jumia Building & BLOM Bank, 90th Street, New Cairo, Cairo Governorate, Egypt.</span>
                                </div>
                            </div>
                        </li>
                        <hr className='text-[var(--color-gray-medium-transparent)]' />
                        <div className='pb-1 text-center'>
                            <span className='opacity-[0.5] text-[8px] font-normal'>No other search results found .</span>
                        </div>
                    </ul>
                </div>
            }
        </>
    )
}