"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function ButtonHero() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="mt-10 sm:mt-0 sm:absolute bottom-[-35px] w-full">
            <div className="container-content">
                <div className="flex justify-center bg-white rounded-2xl shadow">
                    <div className="w-full p-8 flex flex-col sm:flex-row justify-between gap-5">
                        <div className="relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]">
                            <Image
                                onClick={() => inputRef.current?.showPicker()}
                                src="/assets/icons/calendar.svg"
                                alt="calendar"
                                width={30}
                                height={30}
                                className="absolute left-3 top-4"
                            />
                            <input
                                type="date" ref={inputRef}
                                className="pl-15 pr-5 py-5 w-full h-full bg-transparent"
                            />
                        </div>
                        <div className="relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]">
                            <Image src="/assets/icons/clock.svg" alt="calendar" width={30} height={30} className="absolute left-3 top-4" />
                            <select name="" id="" className="px-15 py-5 text-[var(--color-red)] w-full h-full">
                                <option value="">Please select a time</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                            <Image src="/assets/icons/arraw-select.svg" alt="calendar" width={30} height={30} className="absolute right-3 top-7" />
                        </div>
                        <div className="relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]">
                            <Image src="/assets/icons/user.svg" alt="user" width={30} height={30} className="absolute left-3 top-4" />
                            <select name="" id="" className="px-15 py-5 text-[var(--color-red)] w-full h-full">
                                <option value="">Select number of people</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                            <Image src="/assets/icons/arraw-select.svg" alt="calendar" width={30} height={30} className="absolute right-3 top-7" />
                        </div>
                    </div>
                    <Link title="back" href="/" className="rounded-r-xl px-[40px] bg-[var(--color-red)] flex items-center">
                        <div className="w-[28px] h-[60px] relative">
                            <Image src="/assets/icons/arraw.svg" alt="arraw" className="object-cover rotate-[180deg]" fill />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ButtonHero;