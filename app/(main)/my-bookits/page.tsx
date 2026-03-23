"use client";

import { useBookitsData } from "@/app/data/dataBookits";
import { useState } from "react";
import Image from "next/image";

export default function MyBookits() {
    const bookits = useBookitsData();

    const [removeRoles, setRemovRoles] = useState(false)

    return (
        <section>
            <div className="shadow-[0_1px_6px_var(--color-black-tow)] fixed top-0 p-[15px] bg-white z-1 flex items-center w-full">
                <div className="flex flex-1">
                    <Image src="/assets/icons/close.svg" alt="close" width={24} height={24} />
                </div>
                <div className="flex flex-[1.7]">
                    <h2 className="text-[var(--strong-red)] text-lg font-medium">My Bookings</h2>
                </div>
            </div>
            <div className="container">
                {removeRoles && (
                    <div className="fixed top-[70px] left-0 w-full h-full bg-[rgba(29,29,29,0.25)] flex justify-center items-center z-[99]">
                        <div className="w-[684px] h-[178px] rounded-[12px] bg-white p-[20px]">
                            <div>
                                <div className="w-full flex flex-col gap-[12px]">
                                    <p className="text-[#131313] font-semibold text-[20px]">
                                        Action Confirm
                                    </p>

                                    <p className="text-[rgba(19,19,19,0.5)] text-[18px] font-normal">
                                        Are you sure you want to delete this reservation?
                                    </p>
                                </div>
                                <div className="flex gap-[16px] justify-end mt-[20px]">
                                    <button
                                        className="bg-[var(--color-danger-light)] text-[var(--strong-red)] text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[40px] flex justify-center items-center"
                                        onClick={() => {
                                            setRemovRoles(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-[var(--strong-red)] border border-[rgba(12,10,52,0.2)] text-white text-[14px] font-medium py-[13px] px-[31px] rounded-[8px] w-[90px] h-[40px] flex justify-center items-center"
                                        onClick={() => {
                                            setRemovRoles(false)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                <ul className="mt-[73px] md:mt-[43] flex flex-col md:gap-[24px]">
                    {
                        bookits.map((item, index) => {
                            return (
                                <li key={index} data-aos="fade-up" className="w-full overflow-auto">
                                    <div className="w-[1000px] md:w-[unset] overflow-scroll shadow-[0_1px_6px_#E5E9F2] md:py-[8px] px-[17px] flex flex-col md:gap-[18px] rounded-[16px]">
                                        <div className="rounded-[4px] text-xs font-normal flex">
                                            <div className="flex flex-col gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px] ps-[15px]">
                                                    <span>Customer Name</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)] ps-[15px]">{item.name}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>Number of People</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.numberOfPepole}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>Reservation Time</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.reservationTime}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>Reservation Date</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.reservationDate}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>Branch Location</span>
                                                </div>
                                                <span className="text-[var(--color-dark-blue-gray)]">{item.branchLocation}</span>
                                            </div>
                                            <div className="flex flex-col text-center gap-[18px] w-full">
                                                <div className="w-full bg-[var(--color-light-gray)] py-[12px]">
                                                    <span>Action</span>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div onClick={() => {
                                                        item.action == 'Cancel Booking' && setRemovRoles(true)
                                                    }} className={`relative bottom-[6px] rounded-[4px] ${item.action == 'Cancel Booking' ? 'cursor-pointer text-[var(--strong-red)] bg-[var(--color-danger-light)]' : 'text-[var(--color-green-1)] bg-[var(--color-black-seven)]'} p-[7.5px]`}>
                                                        <span>{item.action}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}