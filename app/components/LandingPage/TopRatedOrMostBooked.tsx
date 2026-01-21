"use client";
import { useState } from "react";
import Image from "next/image";
import Like from "./like/like";
import { Props } from "@/app/TypeScript/TypeScript";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from "./restaurant-cards/card";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

function TopRatedOrMostBooked({ dataRealtiedAndBooked, isShowTitle }: Props) {

  const [Rated] = useState(dataRealtiedAndBooked);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const previewLength = 250;

  const toggleExpand = (index: any) => {
    setExpandedIndexes((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: any) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section>
      <div data-aos="fade-up" className="flex flex-col gap-10 md:mt-10">
        {
          dataRealtiedAndBooked.map((item, index) => {
            return <div key={index}>
              <div className="container mt-15">
                {/* العنوان */}
                {
                  !isShowTitle &&
                  <div className="flex flex-row md:flex-col justify-between items-center md:text-center gap-10">
                    <p className="font-Poppins text-4xl font-semibold text-[var(--color-red)]">
                      {item.header.title}
                    </p>
                    <Link href="/most-booked" className="text-[var(--color-see-all)] md:hidden text-2xl font-normal font-Poppins">
                      See All
                    </Link>
                    <p className="hidden md:block text-lg font-normal text-[rgba(44,47,36,0.7)] -mt-7 leading-8">
                      {item.header.subTitle}
                    </p>
                  </div>
                }

                {/* الكروت */}
                <div className="grid md:grid-cols-3 mt-10 gap-13">
                  {item.items.map((item, index) => {
                    const isExpanded = expandedIndexes.includes(index);

                    return (
                      <div key={index}
                        className="relative z-10 bg-[rgba(255,119,87,0.1)] rounded-[15px]"
                      >
                        <Card item={item} isExpanded={isExpanded} previewLength={previewLength} index={index} toggleExpand={() => toggleExpand(index)} />
                      </div>
                    );
                  })}
                </div>

                {/* زر See All */}
                {
                  !isShowTitle &&
                  <div className="hidden w-full md:flex justify-center items-center mt-8">
                    <Link href="/most-booked" className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[var(--color-red)] text-white text-2xl font-normal font-Poppins">
                      See All
                      <Image
                        src="/assets/icons/arraw.png" alt="arrow"
                        width={10}
                        height={10}
                        className="object-cover rounded-t-[15px] rounded-b-[3px]"
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

export default TopRatedOrMostBooked;