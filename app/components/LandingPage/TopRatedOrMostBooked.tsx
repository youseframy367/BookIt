"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "./restaurant-cards/card";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { RestaurantItem } from "@/app/TypeScript/TypeScript";

import { Swiper, SwiperSlide } from 'swiper/react';

interface HeaderItem {
  title: string;
  subTitle: string;
}

interface DataObject {
  header: HeaderItem;
  items: RestaurantItem[];
  href: string;
}

type useDataRelatied = DataObject[];

interface Props {
  dataRealtiedAndBooked: useDataRelatied;
  isShowTitle?: boolean;
}

export default function TopRatedOrMostBooked({ dataRealtiedAndBooked, isShowTitle }: Props) {
  const { t, i18n, mounted } = useTranslationSetup();

  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const toggleExpand = (index: any) => {
    setExpandedIndexes((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: any) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="section3">
      <div data-aos="fade-up" className="relative flex flex-col gap-10 mt-[45px] md:mt-[40px]">
        {
          dataRealtiedAndBooked.map((item, index) => {
            return <div key={index}>
              <div className="container">
                {
                  !isShowTitle &&
                  <div className="flex flex-row md:flex-col justify-between items-center md:text-center gap-10">
                    <p className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Poppins" : ""} text-xl md:text-4xl font-semibold text-[var(--strong-red)]`}>
                      {mounted ? item.header.title : '...'}
                    </p>
                    <span className="text-[var(--color-alert-red)] md:hidden text-md font-normal font-Poppins">
                      {mounted ? t("see-all") : "..."}
                    </span>
                    <p className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Poppins" : ""} hidden md:block text-lg font-normal text-[rgba(44,47,36,0.7)] -mt-7 leading-8`}>
                      {mounted ? item.header.subTitle : '...'}
                    </p>
                  </div>
                }

                <div className="hidden md:grid md:grid-cols-3 mt-10 gap-5 md:gap-13">
                  {item.items.map((item, index) => {
                    return (
                      <div key={index}
                        className="transition-all duration-300 hover:scale-[1.03] relative z-10 bg-[rgba(255,119,87,0.1)] rounded-[15px]"
                      >
                        <Card item={item} index={index} toggleExpand={() => toggleExpand(index)} />
                      </div>
                    );
                  })}
                </div>

                <div className="md:hidden">
                  <Swiper
                    key={mounted ? i18n.dir() : ''}
                    dir={mounted ? i18n.dir() : ''}
                    slidesPerView={1.3}
                    spaceBetween={30}
                    className="mySwiper mt-5"
                  >
                    {item.items.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div key={index}
                            className="transition-all duration-300 hover:scale-[1.03] relative z-10 bg-[rgba(255,119,87,0.1)] rounded-[15px]"
                          >
                            <div className={`absolute z-1 top-0 ${mounted ? i18n.language === 'ar' ? "rounded-tr-[14px] rounded-bl-[14px]" : "rounded-tl-[14px] rounded-br-[14px]" : ""} bg-[var(--strong-red)] p-2 md:p-8`}>
                              <Image src={`/assets/icons/${item.like ? "full-heart" : "heart"}.svg`} alt="hert" width={24} height={24} />
                            </div>
                            <Card item={item} index={index} toggleExpand={() => toggleExpand(index)} />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                {
                  !isShowTitle &&
                  <div className="hidden w-full md:flex justify-center items-center mt-8">
                    <Link href={item.href} className={`flex items-center gap-2 px-4 py-3 rounded-[10px] bg-[var(--strong-red)] text-white text-xl md:text-2xl font-normal ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Poppins" : ""}`}>
                      {mounted ? t("see-all") : "..."}
                      <Image
                        src="/assets/icons/arraw.png" alt="arrow"
                        width={10}
                        height={10}
                        className={`${mounted ? i18n.language === 'ar' && "rotate-180" : ""} object-cover rounded-t-[15px] rounded-b-[3px]`}
                      />
                    </Link>
                  </div>
                }
              </div>
            </div>
          })
        }
      </div>
    </section>
  );
}