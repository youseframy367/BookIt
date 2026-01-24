"use client";
import { nextAndBackPage } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs, { Dayjs } from "dayjs";

function ButtonHero({ nextPage }: nextAndBackPage) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [bookedDate, setBookedDate] = useState<Date | null>(new Date('2026-01-28'));

    const [value, setValue] = useState<Dayjs | null>(dayjs());

    const getDayClassName = (date: Date) => {
        if (bookedDate && date.toDateString() === bookedDate.toDateString()) {
            return "booked-day";
        }
        return "";
    };

    return (
        <div className="sm:absolute bottom-[-35px] w-full">
            <div className="container-content">
                <div className="grid md:grid-cols-[10.2fr_1fr] bg-white rounded-2xl shadow">
                    <div className="w-full py-6 px-8 grid md:grid-cols-3 gap-5">
                        <div className={`flex items-center ${nextPage && 'py-5'} relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]`}>
                            <Image
                                src="/assets/icons/calendar.svg"
                                alt="calendar"
                                width={30}
                                height={30}
                                className="absolute left-3 top-4"
                            />
                            {
                                !nextPage ?
                                    <DatePicker
                                        className="ps-18 py-5"
                                        selected={selectedDate}
                                        onChange={setSelectedDate}
                                        dayClassName={getDayClassName}
                                        renderCustomHeader={({
                                            date,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled
                                        }) => (
                                            <div className="flex justify-between items-center px-2">
                                                <span className="ml-2 font-semibold text-base">
                                                    {date.toLocaleString("default", { month: "long", year: "numeric" })}
                                                </span>
                                                <div className="flex gap-4">
                                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                        <Image src="/assets/icons/date-arraw.svg" alt="arraw" width={24} height={24} className="rotate-180" />
                                                    </button>
                                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        <Image src="/assets/icons/date-arraw.svg" alt="arraw" width={24} height={24} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    />
                                    : <div>
                                        <span className="pl-15 pr-5 w-full h-full text-[var(--color-red)]">Helo World</span>
                                    </div>
                            }
                        </div>
                        <div className={`flex items-center ${nextPage && 'py-5'} relative font-normal text-xl font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]`}>
                            <Image src="/assets/icons/clock.svg" alt="calendar" width={30} height={30} className="absolute left-3 top-4" />
                            {
                                !nextPage ?
                                    <>
                                        <MobileTimePicker
                                            label="Select time"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                            ampm={false}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                },
                                            }}
                                        />
                                        {/* <select name="" id="" className="px-15 py-5 text-[var(--color-red)] w-full h-full">
                                            <option value="">Please select a time</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                            <option value="">4</option>
                                        </select>
                                        <Image src="/assets/icons/arraw-select.svg" alt="calendar" width={30} height={30} className="absolute right-3 top-7" /> */}
                                    </>
                                    : <div>
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
                    <div className="w-full px-8 md:px-0 md:w-[unset] flex md:justify-center">
                        <Link title="Details Customer" href="/details-customer" className={`${nextPage ? 'bg-[var(--color-not-active)] cursor-default' : 'bg-[var(--color-red)]'} w-full md:w-[unset] border-arraw rounded-r-xl xl:px-[40px] flex justify-center items-center`}>
                            <div className="w-[28px] h-[60px] relative">
                                <Image src="/assets/icons/arraw.png" alt="arraw" className="object-cover rotate-90 md:rotate-0" fill />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonHero;