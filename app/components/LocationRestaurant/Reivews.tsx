"use client";

import CardsReviews from "./CardsReviews";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataReviews } from "@/app/data/dataReviews";

export default function Reivews() {
    const { i18n, t, mounted } = useTranslationSetup();
    const reviews = useDataReviews();

    return (
        <div className="mt-[66px] md:mt-[96px] flex flex-col gap-5 md:gap-[73px]">
            <div data-aos="fade-up" className="text-center">
                <h2 className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Roboto" : ""} text-3xl font-normal opacity-[0.7]`}>{mounted ? t("customer-reviews") : '...'}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    reviews.map((item, index) => {
                        return <div key={index} data-aos="fade-up" className="hidden md:flex flex-col items-start gap-5 bg-[var(--color-reviews)] rounded-[12px] py-10 px-10">
                            <CardsReviews item={item} />
                        </div>
                    })
                }
            </div>
            <div className="md:hidden">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={1.1}
                    spaceBetween={30}
                    className="mySwiper"
                >
                    {
                        reviews.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <div className="flex flex-col items-start gap-5 bg-[var(--color-reviews)] rounded-[12px] p-[20px] md:py-10 md:px-10">
                                    <CardsReviews item={item} />
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}