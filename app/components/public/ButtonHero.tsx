"use client";

import { nextAndBackPage } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useBooking } from "@/app/(main)/context/BookingContext";

export default function ButtonHero({ nextPage }: nextAndBackPage) {
    const { t, i18n, mounted } = useTranslationSetup();
    const { selectedUser, setSelectedUser, selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useBooking();

    const [bookedDate, setBookedDate] = useState<Date | null>(new Date('2026-02-28'));

    const bookedHours = [10, 13, 16];
    const bookedMinutes = [0, 30];

    const getDayClassName = (date: Date) => {
        if (bookedDate && date.toDateString() === bookedDate.toDateString()) return "booked-day"
        return "";
    };

    return (
        <div className="absolute bottom-[-35px] w-full">
            <div className="container-content">
                <div className="grid md:grid-cols-[10.2fr_1fr] bg-white rounded-t-2xl md:rounded-2xl shadow">
                    <div className="w-full py-3 md:py-6 px-3 md:px-8 grid grid-cols-3 gap-2 md:gap-5" dir="ltr">
                        <div className={`flex items-center ${nextPage && 'py-5'
                            } relative font-normal text-[8px] md:text-xl font-rubik bg-[var(--color-input-email)] rounded-xl lg:w-[315px]`}>
                            <div className={`absolute ${mounted ? i18n.language === 'ar' ? "right-5" : "left-3" : ""} md:top-4`}>
                                <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                    <Image
                                        src="/assets/icons/calendar.svg"
                                        alt="calendar"
                                        fill
                                    />
                                </div>
                            </div>
                            {
                                !nextPage ?
                                    <DatePicker
                                        className={`${mounted ? i18n.language === 'ar' ? "md:text-end" : "ps-8 md:ps-15" : ""} px-3 py-3 md:py-5`}
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
                                        <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--color-red)]">
                                            {selectedDate ? selectedDate.toLocaleDateString() : ""}
                                        </span>
                                    </div>

                            }
                        </div>
                        <div className={`flex items-center ${nextPage && 'md:py-5'} relative font-normal font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]`}>
                            {
                                !nextPage ?
                                    <>
                                        <MobileTimePicker
                                            value={selectedTime}
                                            onChange={(newValue) => setSelectedTime(newValue)}
                                            shouldDisableTime={(timeValue, view) => {
                                                const time = dayjs(timeValue);

                                                if (view === "hours") return bookedHours.includes(time.hour());

                                                if (view === "minutes") return bookedMinutes.includes(time.minute());

                                                return false;
                                            }}
                                            slotProps={{
                                                textField: { fullWidth: true },
                                            }}
                                        />
                                    </>
                                    : <div>
                                        <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--color-red)]">
                                            {selectedTime ? selectedTime.format("hh:mm A") : ""}
                                        </span>
                                    </div>
                            }
                        </div>
                        <div className={`flex items-center ${nextPage && 'md:py-5'} relative font-normal font-rubik bg-[var(--color-input-email)] rounded-xl w-full lg:w-[315px]`}>
                            {
                                !nextPage ?
                                    <>
                                        <div className={`absolute ${mounted ? i18n.language === 'ar' ? "right-3" : "left-3" : ""} top-4`}>
                                            <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                                <Image
                                                    src="/assets/icons/user.svg"
                                                    alt="user"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <select
                                            dir="rtl"
                                            value={selectedUser || ""}
                                            onChange={(e) => setSelectedUser(e.target.value)}
                                            className="text-[8px] md:text-xl px-8 md:px-15 md:py-5 text-[var(--color-red)] w-full h-full"
                                        >
                                            <option value="">{mounted ? t('select') : ""}</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <div className={`absolute ${mounted ? i18n.language === 'ar' ? "left-3" : "right-3" : ""} top-5`}>
                                            <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                                <Image
                                                    src="/assets/icons/arraw-select.svg"
                                                    alt="arraw-select"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                    </> : <>
                                        <div className="absolute left-3 top-6">
                                            <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                                <Image
                                                    src="/assets/icons/user.svg"
                                                    alt="user"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--color-red)]">{selectedUser || "—"}</span>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={`${mounted ? i18n.language === 'ar' && "rotate-180" : ""} w-full px-8 md:px-0 md:w-[unset] hidden md:flex md:justify-center`}>
                        <Link title="Details Customer" href="/details-customer" className={`${nextPage ? 'bg-[var(--color-not-active)] cursor-default' : 'bg-[var(--color-red)]'} w-full md:w-[unset] border- arraw rounded-r-xl xl:px-[40px] flex justify-center items-center`}>
                            <div className="w-[28px] h-[60px] relative">
                                <Image src="/assets/icons/arraw.png" alt="arraw" className="object-cover" fill />
                            </div>
                        </Link>
                    </div>
                </div>
                <Link href="/details-customer" className="relative z-2 text-white w-full flex md:hidden justify-center bg-[var(--color-red)] py-2 rounded-b-2xl">
                    <div className="keyframes-book items-center flex gap-3">
                        <span className="text-sm font-normal">{mounted ? t('book-table') : ""}</span>
                        <Image src="/assets/icons/bookit.svg" alt="bookit" width={15} height={15} />
                    </div>
                </Link>
            </div>
        </div>
    )
}