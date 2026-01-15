"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Title from "./Title";

export default function RestaurantManagers() {
  const [translat, setTranslat] = useState(0);

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
      className="w-full mt-5 px-5"
    >
      {/* ===== العنوان ===== */}
      <Title title="Restaurant Managers’ Experiences" subTitle="Here’s some awesome feedback from restaurant managers." />

      {/* ===== السلايدر ===== */}
      <div className="overflow-hidden mt-16">
        <motion.div
          className="flex gap-3"
          animate={{ x: -translat * 680 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {Experiences.map((item, i) => (
            <div
              key={i}
              className="w-[640px] h-[359px] p-[40px] pt-[60px] bg-[#F5F6F7]"
            >
              <p className="text-[18px] text-[#767E86] leading-[23px] font-rubik">
                {item.details}
              </p>

              {/* النجوم */}
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

                <span className="ml-2 text-sm text-gray-500 font-rubik">
                  {(item.Relative * 5).toFixed(1)}
                </span>
              </div>

              <p className="mt-3 text-[24px] text-[#767E86] font-playfair">
                {item.name}
              </p>
              <p className="text-[18px] text-[#767E86] font-rubik">
                {item.jops}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===== الأزرار ===== */}
      <div className="flex justify-end w-[90%] mx-auto mt-6 gap-5">
        <button
          className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[#E22023]"
          onClick={() =>
            translat < Experiences.length - 1 &&
            setTranslat(translat + 1)
          }
        >
          <img src="/assets/icons/arraw.svg" alt="right" />          
        </button>

        <button
          className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-[#E22023]"
          onClick={() =>
            translat > 0 && setTranslat(translat - 1)
          }
        >
          <img src="/assets/icons/arraw.png" alt="left" />
        </button>
      </div>
    </section>
  );
}
