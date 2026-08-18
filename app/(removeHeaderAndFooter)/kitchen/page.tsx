"use client";

import { useState } from "react";
import Image from "next/image";
import Images from "@/app/components/PaymentMethods/Images";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useKitchenData } from "@/app/data/dataKitchen";

type Period = "تيك اوي" | "صاله";

export default function Kitchen() {
    const [period, setPeriod] = useState<Period>("صاله");
    const kitchenData = useKitchenData();

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [statusByIndex, setStatusByIndex] = useState<{ [key: number]: string }>({});

    return (
        <section className="font-cairo relative" dir="rtl">
            <div className="flex justify-center pt-[80px]">
                <ul className={`before:transition-all before:duration-200 relative before:content-[''] ${period == 'صاله' ? 'before:translate-x-0' : 'before:translate-x-[-100%]'} before:w-[78px] before:h-[35px] before:absolute before:rounded-[8px] before:bg-gradient-to-br before:from-[var(--color-cyan-bright)] before:to-[var(--color-teal-dark)] py-[5] px-[18px] gap-[35px] rounded-[12px] flex bg-[var(--color-white-overlay)] border border-2 border-[var(--color-white-faint)]`}>
                    <li onClick={() => setPeriod("صاله")} className={`${period == 'صاله' && '!text-black'} text-white relative text-sm font-medium cursor-pointer ms-2 p-[8px]`} title="صاله">صاله</li>
                    <li onClick={() => setPeriod("تيك اوي")} className={`${period == 'تيك اوي' && '!text-black'} text-white relative text-sm font-medium cursor-pointer ms-2 p-[8px]`} title="تيك اوي">تيك اوي</li>
                </ul>
            </div>
            <Images />
            <div className="container mt-10 h-full relative">
                <div className="w-full h-full flex items-center justify-between absolute inset-x-0">
                    <button title="right"
                        className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[var(--color-black-nine)] swiper-button-prev"
                    >
                        <img src="/assets/icons/arraw.png" alt="right" />
                    </button>

                    <button title="left"
                        className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[var(--color-black-nine)] swiper-button-next"
                    >
                        <img src="/assets/icons/arraw.png" alt="left" className='rotate-180' />
                    </button>
                </div>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="container-content text-white mySwiper"
                >
                    {
                        kitchenData.map((item, index) => {
                            return <SwiperSlide key={index} className={`${openIndex === index && 'pb-50'}`}>
                                <div
                                    className={`${statusByIndex[index] == 'يتم تنفيذ الطلب' && 'bg-gradient-to-b from-[var(--color-teal-light)] to-[var(--color-cyan-light)]'} border border-[var(--color-cyan-light)] relative flex flex-col gap-[20px] py-[15px] md:py-[55px] px-[31px] rounded-[32px] text-white`}
                                >
                                    <div className={`transition-all duration-300 absolute -top-1 left-[30%] h-[15px] ${statusByIndex[index] == 'يتم تنفيذ الطلب' ? 'w-[136px]' : 'w-0'}`}>
                                        <Image src="/assets/icons/line.svg" alt="line" fill />
                                    </div>
                                    <div className="w-full flex flex-col gap-[10px] md:gap-[20px]">
                                        <div className={`${statusByIndex[index] == 'يتم تنفيذ الطلب' ? 'bg-gradient-to-b from-[var(--color-cyan-bright)] to-[var(--color-teal-dark-tow)]' : 'border border-[var(--color-white-light)] bg-[var(--color-white-overlay)]'} text-sm font-medium rounded-[12px] p-[14px] flex justify-between items-center`}>
                                            <span> رقم الطلب</span>
                                            <span>{item.code}</span>
                                        </div>
                                        <ul>
                                            {item.products.map((product, index) => (
                                                <li
                                                    key={index}
                                                    className="text-center grid grid-cols-[7fr_5fr] w-full"
                                                >
                                                    <span className="text-xs p-[7px] w-full border-[var(--color-white-light-translucent)] border">
                                                        {product.name}
                                                    </span>
                                                    <span className="text-xs p-[7px] w-full border-[var(--color-white-light-translucent)] border">
                                                        {product.quantity}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className={`${statusByIndex[index] == 'يتم تنفيذ الطلب' ? 'bg-gradient-to-br from-[var(--color-cyan-bright)] to-[var(--color-teal-dark-tow)]' : 'bg-[var(--color-white-overlay)]'} p-[10px] rounded-[12px] flex flex-col gap-[7px]`}>
                                            {item.notes.map((note, index) => (
                                                <li key={index}
                                                >
                                                    <span className="text-[var(--color-white-light-gray)] text-sm font-medium">
                                                        {note}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative flex justify-center" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                        <div title={item.textBtn}
                                            className={`${statusByIndex[index] == 'يتم تنفيذ الطلب' ? 'bg-gradient-to-b from-[var(--color-cyan-bright)] to-[var(--color-teal-dark-tow)]' : 'bg-gradient-to-br from-[var(--color-white-overlay)] to-[var(--color-transparent)] border border-2 border-[var(--color-white-light)]'} font-bold text-xs md:text-base flex items-center gap-2 flex-row-reverse justify-center px-4 py-[7px] md:px-8 md:py-[11px] w-full rounded-[12px] relative cursor-pointer transition-all duration-300`}
                                        >
                                            <Image src={`/assets/icons/${item.icon}`} alt="image" width={22} height={22} />
                                            <span className="text-xs">{statusByIndex[index] || item.textBtn}</span>
                                        </div>
                                        {
                                            openIndex === index &&
                                            <ul className="w-full border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-15 bg-[var(--color-white-overlay)] flex flex-col justify-center gap-5 p-4">
                                                <li className="text-xs rounded-[6px] cursor-pointer flex justify-center" onClick={() => {
                                                    setStatusByIndex(prev => ({ ...prev, [index]: "لم يتم التحديد بعد اضفط لتحديد الطلب" }));
                                                    setOpenIndex(null);
                                                }}>
                                                    <span className="flex-1 text-center">لم يتم التحديد بعد اضفط لتحديد الطلب</span>
                                                    <Image src="/assets/icons/carcal.svg" alt="image" width={20} height={20} />
                                                </li>
                                                <li className="text-xs rounded-[6px] cursor-pointer flex justify-center" onClick={() => {
                                                    setStatusByIndex(prev => ({ ...prev, [index]: "يتم تنفيذ الطلب" }));
                                                    setOpenIndex(null);
                                                }}>
                                                    <span className="flex-1 text-center">يتم تنفيذ الطلب</span>
                                                    <Image src="/assets/icons/kitchen.svg" alt="image" width={20} height={20} />
                                                </li>
                                                <li className="text-xs rounded-[6px] cursor-pointer flex justify-center" onClick={() => {
                                                    setStatusByIndex(prev => ({ ...prev, [index]: "تم الانتهاء من تنفيذ الطلب" }));
                                                    setOpenIndex(null);
                                                }}>
                                                    <span className="flex-1 text-center">تم الانتهاء من تنفيذ الطلب</span>
                                                    <Image src="/assets/icons/finshed.svg" alt="image" width={20} height={20} />
                                                </li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </section >
    )
}