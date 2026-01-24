"use client";

import CardsReviews from "./CardsReviews";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

function Reivews() {
    const reviews = [
        {
            title: "“I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience. The system has greatly reduced stress for our staff and enhanced overall efficiency, allowing us to focus on delivering exceptional service and memorable moments.",
            rating: 5,
            name: "Mohammed omar",
            job: "Restaurant Manager- Bella Cucina"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 2,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
        {
            title: "“The booking system has transformed the way we operate daily. Managing reservations is now effortless, staff coordination is smoother, and customers enjoy a faster, more reliable service. It has truly elevated the overall dining experience and allowed us to maintain high standards without extra stress.”",
            rating: 4,
            name: "Khalead abdelrahman",
            job: "Little Italy-Floor Supervisor"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 5,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
        {
            title: "“I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience. The system has greatly reduced stress for our staff and enhanced overall efficiency, allowing us to focus on delivering exceptional service and memorable moments.",
            rating: 5,
            name: "Mohammed omar",
            job: "Restaurant Manager- Bella Cucina"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 4,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
    ]

    return (
        <div className="mt-[96px] flex flex-col gap-5 md:gap-[73px]">
            <div data-aos="fade-up" className="text-center">
                <h2 className="font-Roboto text-3xl font-normal opacity-[0.7]">Customer Reviews</h2>
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

export default Reivews;