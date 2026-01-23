"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import Title from "./Title";

export default function RestaurantManagers() {
  const Experiences = [
    {
      details:
        "I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience.",
      Relative: 0.6,
      name: "Mohammed Omar",
      jops: "Restaurant Manager - Bella Cucina",
    },
    {
      details:
        "I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience.",
      Relative: 0.6,
      name: "Mohammed Omar",
      jops: "Restaurant Manager - Bella Cucina",
    },
    {
      details:
        "I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience.",
      Relative: 0.6,
      name: "Mohammed Omar",
      jops: "Restaurant Manager - Bella Cucina",
    },
    {
      details:
        "I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience.",
      Relative: 0.6,
      name: "Mohammed Omar",
      jops: "Restaurant Manager - Bella Cucina",
    },
  ];

  return (
    <section
      data-aos="fade-up"
      className="relative w-full mt-10 md:mt-20 px-5 h-full"
    >
      <Title title="Restaurant Managers’ Experiences" subTitle="Here’s some awesome feedback from restaurant managers." />

      <div className="right-12 pb-20 container absolute w-full h-full hidden md:flex justify-end items-end">
        <div className="w-[20px]">
          <button
            className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[#E22023] swiper-button-prev"
          >
            <img src="/assets/icons/arraw.png" alt="right" className='rotate-180' />
          </button>

          <button
            className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[#E22023] swiper-button-next"
          >
            <img src="/assets/icons/arraw.png" alt="left" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
        }}
        slidesPerView={2.5}
        spaceBetween={30}
        className="mySwiper md:mt-20"
      >
        {
          Experiences.map((item, index) => {
            return <SwiperSlide key={index}>
              <div
                className="p-[20px] md:p-[40px] md:pt-[60px] bg-[#F5F6F7]"
              >
                <p className="text-sm md:text-lg text-[#767E86] md:leading-[23px] font-rubik">
                  {item.details}
                </p>

                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 mr-[2px]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{
                        color:
                          item.Relative * 5 >= star
                            ? "#FACC15"
                            : "#D1D5DB",
                      }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.375 2.454a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.375-2.454a1 1 0 00-1.176 0l-3.375 2.454c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.038 9.393c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.951-.69l1.285-3.966z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-3 text-sm md:text-[24px] text-[#767E86] font-playfair">
                  {item.name}
                </p>
                <p className="text-sm md:text-lg text-[#767E86] font-rubik">
                  {item.jops}
                </p>
              </div>
            </SwiperSlide>
          })
        }
      </Swiper>
    </section>
  );
}
