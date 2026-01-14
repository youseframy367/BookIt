"use client";
import { useState } from "react";
import Image from "next/image";
import Like from "./like/like";

function TopRated() {
  const initialRated = [
    {
      img: "/assets/icons/top-rated-1.png",
      name: "Pane Vino",
      Relative: 0.9,
      des: "Experience Pane Vino, a charming restaurant offering a delightful journey through classic Italian flavors. Enjoy freshly baked breads, signature pastas, and exquisite wines in a cozy, elegant setting. Perfect for both casual meals and special occasions, Pane Vino has captured the hearts of locals and visitors alike.",
      lick: false,
    },
    {
      img: "/assets/icons/top-rated-2.png",
      name: "La Zisa",
      Relative: 0.6,
      des: "La Zisa is a premier dining destination in Cairo, renowned for its exceptional Italian cuisine and sophisticated ambiance. Guests can indulge in a wide selection of freshly prepared pastas, wood-fired pizzas, and signature desserts, all crafted with the finest ingredients.",
      lick: false,
    },
    {
      img: "/assets/icons/top-rated-3.png",
      name: "Stefanos",
      Relative: 0.8,
      des: "Stefanos is a distinguished restaurant offering a rich blend of Mediterranean and Italian flavors in a warm and inviting atmosphere.",
      lick: false,
    },
  ];

  const [Rated] = useState(initialRated);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const previewLength = 250;

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section>
      <div data-aos="fade-up" className="mt-9">
        <div className="container">
          {/* العنوان */}
          <div className="flex flex-col items-center text-center gap-2">
            <p className="font-Poppins text-4xl font-semibold text-[var(--color-red)] py-5">
              Top Rated
            </p>
            <p className="text-lg font-normal text-[rgba(44,47,36,0.7)] -mt-7 leading-8">
              Check out the top-rated dining spots and enjoy a memorable experience.
            </p>
          </div>

          {/* الكروت */}
          <div className="grid md:grid-cols-3 mt-10 gap-10">
            {Rated.map((item, index) => {
              const isExpanded = expandedIndexes.includes(index);

              return (
                <div
                  key={index}
                  className="w=-relative z-10 bg-[rgba(255,119,87,0.1)] rounded-[15px]"
                >
                  <div
                    className="w-full cursor-pointer rounded-[15px]"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="w-full h-[300px] relative">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover rounded-t-[15px] rounded-b-[3px]"
                      />
                    </div>

                    <p className="mt-2 mx-2 font-Poppins text-[#172432] text-[28px] font-normal">
                      {item.name}
                    </p>
                    
                    <div className="flex items-center ml-2 mt-1">
                      {[1, 2, 3, 4, 5].map((star, idx) => (
                        <svg
                          key={idx}
                          className={`w-4 h-4 ${item.Relative * 5 >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.375 2.454a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.375-2.454a1 1 0 00-1.176 0l-3.375 2.454c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.038 9.393c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.951-.69l1.285-3.966z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {item.Relative}
                      </span>
                    </div>

                    <p className="mt-2 mx-2 text-sm text-gray-700">
                      {isExpanded
                        ? item.des
                        : `${item.des.slice(0, previewLength)}...`}
                    </p>
                    <div className="flex items-center justify-center flex-wrap mt-4 mx-2 gap-3">
                      <button className="px-8 py-4 rounded-[12px] bg-red-500 text-white text-[23px] font-medium font-Poppins truncate">
                        Restaurant Detail Page
                      </button>
                      <Like />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* زر See All */}
          <div className="w-full flex justify-center items-center mt-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[var(--color-red)] text-white text-2xl font-normal font-Poppins">
              See All
              <Image
                src="/assets/icons/arraw.png" alt="arrow"
                width={10}
                height={10}
                className="object-cover rounded-t-[15px] rounded-b-[3px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopRated;