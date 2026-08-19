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

    const [showError, isShowError] = useState(false);
    
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
                    <div className={`w-full py-3 ${showError && 'md:pt-6 md:pb-11'} md:py-6 px-3 md:px-8 grid grid-cols-3 gap-2 md:gap-5`} dir="ltr">
                        <div className={`flex items-center ${nextPage && 'py-5'
                            } relative font-normal text-[8px] md:text-xl font-rubik bg-[var(--color-danger-light)] rounded-xl lg:w-[315px]`}>
                            <div className={`absolute ${mounted ? i18n.language === 'ar' ? "right-3" : "left-3" : ""} md:top-4`}>
                                <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                    <Image
                                        src="/media/shared/icons/calendar.svg"
                                        alt="calendar"
                                        fill
                                    />
                                </div>
                            </div>
                            {
                                !nextPage ?
                                    <DatePicker
                                        className={`${mounted ? i18n.language === 'ar' ? "md:text-end pe-8 md:pe-15" : "ps-8 md:ps-15" : ""} rounded-lg input-email px-3 py-3 md:py-5`}
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
                                                        <Image src="/media/shared/icons/date-arraw.svg" alt="arraw" width={24} height={24} className="rotate-180" />
                                                    </button>
                                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        <Image src="/media/shared/icons/date-arraw.svg" alt="arraw" width={24} height={24} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    />
                                    : <div>
                                        <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--strong-red)]">
                                            {selectedDate ? selectedDate.toLocaleDateString() : ""}
                                        </span>
                                    </div>

                            }
                        </div>
                        <div className={`flex items-center ${nextPage && 'md:py-5'} relative font-normal font-rubik bg-[var(--color-danger-light)] rounded-xl w-full lg:w-[315px]`}>
                            {
                                !nextPage ?
                                    <>
                                        <MobileTimePicker
                                            value={selectedTime}
                                            onChange={(newValue) => setSelectedTime(newValue ? dayjs(newValue) : null)}
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
                                        <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--strong-red)]">
                                            {selectedTime ? selectedTime.format("hh:mm A") : ""}
                                        </span>
                                    </div>
                            }
                        </div>
                        <div className={`flex justify-center items-center ${nextPage && 'md:py-5'} relative font-normal font-rubik bg-[var(--color-danger-light)] rounded-xl w-full lg:w-[315px]`}>
                            {
                                !nextPage ?
                                    <>
                                        <div className={`absolute ${mounted ? i18n.language === 'ar' ? "right-3" : "left-3" : ""} top-4`}>
                                            <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                                <Image
                                                    src="/media/shared/icons/user.svg"
                                                    alt="user"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <input type="number" className={`text-center w-full h-full ${mounted ? i18n.language === 'ar' ? "px-5" : "px-12" : ""} text-[var(--strong-red)] input-email rounded-lg`} placeholder={mounted ? t('number-of-people') : ""}
                                            onChange={(e: any) => {
                                                e.target.value > 20 ? isShowError(true) : e.target.value < 21 ? isShowError(false) : null;
                                            }} />
                                    </> : <>
                                        <div className="absolute left-3 top-6">
                                            <div className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]">
                                                <Image
                                                    src="/media/shared/icons/user.svg"
                                                    alt="user"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[8px] md:text-lg pl-10 md:pl-15 pr-5 w-full h-full text-[var(--strong-red)]">{selectedUser || "—"}</span>
                                        </div>
                                    </>
                            }
                            {
                                showError && <div className="flex items-center gap-2 absolute -bottom-8 text-[var(--strong-red)]">
                                    <Image src="/media/shared/icons/warning.svg" alt="warning" width={12} height={11} className="red-icon" />
                                    <span className="mt-[2.4px] text-[10px]">The maximum number are 20 of people</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${mounted ? i18n.language === 'ar' && "rotate-180" : ""} w-full px-8 md:px-0 md:w-[unset] hidden md:flex md:justify-center`}>
                        <Link title="Details Customer" href={nextPage || showError ? "" : "/details-customer"} className={`${nextPage || showError ? 'bg-[var(--color-gray-medium-transparent)] cursor-default' : 'bg-[var(--strong-red)]'} w-full md:w-[unset] border- arraw rounded-r-xl xl:px-[40px] flex justify-center items-center`}>
                            <div className="w-[28px] h-[60px] relative">
                                <Image src="/media/shared/icons/arraw.png" alt="arraw" className="object-cover" fill />
                            </div>
                        </Link>
                    </div>
                </div>
                <Link href="/details-customer" className="relative z-2 text-white w-full flex md:hidden justify-center bg-[var(--strong-red)] py-2 rounded-b-2xl">
                    <div className="keyframes-book items-center flex gap-3">
                        <span className="text-sm font-normal">{mounted ? t('book-table') : ""}</span>
                        <Image src="/media/shared/icons/bookit.svg" alt="bookit" width={15} height={15} />
                    </div>
                </Link>
            </div>
        </div>
    )
}
