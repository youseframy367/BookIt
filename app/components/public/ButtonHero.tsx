"use client";
import { nextAndBackPage } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function ButtonHero({ nextPage }: nextAndBackPage) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="mt-10 sm:mt-0 sm:absolute bottom-[-35px] w-full">
            <div className="container-content">
                <div className="flex justify-center bg-white rounded-2xl shadow">
                    <div className="w-full py-6 px-8 flex flex-col sm:flex-row justify-between gap-5">
                        <div className="flex items-center relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]">
                            <Image
                                onClick={() => inputRef.current?.showPicker()}
                                src="/assets/icons/calendar.svg"
                                alt="calendar"
                                width={30}
                                height={30}
                                className="absolute left-3 top-4"
                            />
                            {
                                !nextPage ? <input
                                    type="date" ref={inputRef}
                                    className="pl-15 pr-5 w-full h-full bg-transparent"
                                /> : <div>
                                    <span className="pl-15 pr-5 w-full h-full text-[var(--color-red)]">Helo World</span>
                                </div>
                            }
                        </div>
                        <div className="flex items-center relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]">
                            <Image src="/assets/icons/clock.svg" alt="calendar" width={30} height={30} className="absolute left-3 top-4" />
                            {
                                !nextPage ?
                                    <>
                                        <select name="" id="" className="px-15 py-5 text-[var(--color-red)] w-full h-full">
                                            <option value="">Please select a time</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                            <option value="">4</option>
                                        </select>
                                        <Image src="/assets/icons/arraw-select.svg" alt="calendar" width={30} height={30} className="absolute right-3 top-7" />
                                    </> : <div>
                                        <span className="pl-15 pr-5 w-full h-full text-[var(--color-red)]">Helo World</span>
                                    </div>
                            }
                        </div>
                        <div className={`flex items-center ${nextPage && 'py-5'} relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]`}>
                            <Image src="/assets/icons/user.svg" alt="user" width={30} height={30} className="absolute left-3 top-4" />
                            {
                                !nextPage ?
                                    <>
                                        <select name="" id="" className="px-15 py-5 text-[var(--color-red)] w-full h-full">
                                            <option value="">Select number of people</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                            <option value="">4</option>
                                        </select>
                                        <Image src="/assets/icons/arraw-select.svg" alt="calendar" width={30} height={30} className="absolute right-3 top-7" />
                                    </> : <div>
                                        <span className="pl-15 pr-5 w-full h-full text-[var(--color-red)]">Helo World</span>
                                    </div>
                            }
                        </div>
                    </div>
                    <Link title="" href="/details-customer" className={`${nextPage ? 'bg-[var(--color-not-active)] cursor-default' : 'bg-[var(--color-red)]'} rounded-r-xl px-[40px] flex items-center`}>
                        <div className="w-[28px] h-[60px] relative">
                            <Image src="/assets/icons/arraw.png" alt="arraw" className="object-cover" fill />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ButtonHero;