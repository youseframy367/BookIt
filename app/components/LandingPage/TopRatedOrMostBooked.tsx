"use client";
import { useState } from "react";
import Image from "next/image";
import Like from "./like/like";
import { Props } from "@/app/TypeScript/TypeScript";
import Link from "next/link";

function TopRatedOrMostBooked({ dataRealtiedAndBooked }: Props) {

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
      <div data-aos="fade-up" className="mt-10">
        {
          dataRealtiedAndBooked.map((item, index) => {
            return <div key={index}>
              <div className="container mt-15">
                {/* العنوان */}
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="font-Poppins text-4xl font-semibold text-[var(--color-red)] py-5">
                    {item.header.title}
                  </p>
                  <p className="text-lg font-normal text-[rgba(44,47,36,0.7)] -mt-7 leading-8">
                    {item.header.subTitle}
                  </p>
                </div>

                {/* الكروت */}
                <div className="grid md:grid-cols-3 mt-10 gap-10">
                  {item.items.map((item, index) => {
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
                            <Link href={`/details-restaurant-public/${index + 1}`} className="px-8 py-4 rounded-[12px] bg-red-500 text-white text-[23px] font-medium font-Poppins truncate">
                              Restaurant Detail Page
                            </Link>
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
          })
        }
      </div>
    </section>
  );
}

export default TopRatedOrMostBooked;