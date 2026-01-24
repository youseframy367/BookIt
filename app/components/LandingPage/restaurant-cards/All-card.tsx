import Image from "next/image";
import Link from "next/link";
import Like from "../like/like";
import { dataCards } from "@/app/TypeScript/TypeScript";

function AllCard({ item, index }: dataCards) {
    return (
        <>
            <div className="md:hidden absolute z-1 top-0 rounded-tl-[18px] rounded-br-[18px] bg-[var(--color-red)] p-3">
                <Image src={`/assets/icons/${item.like ? "full-heart" : "heart"}.svg`} alt="hert" width={24} height={24} />
            </div>

            <div className="w-full h-[200px] md:h-[300px] relative">
                <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-[15px] rounded-b-[3px]"
                />
            </div>

            <div className="mx-4 flex flex-col justify-between gap-5 my-5 md:my-0">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="font-Poppins text-[var(--color-footer)] text-[28px] font-normal">
                            {item.name}
                        </p>

                        <div className="flex items-center">
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
                    </div>
                    <div className="flex gap-3 opacity-[0.7]">
                        <Image src="/assets/icons/map.svg" alt="map" width={24} height={24} style={{ filter: "invert(47%) sepia(5%) saturate(200%) hue-rotate(180deg) brightness(95%) contrast(90%)" }} />
                        <span className="text-[var(--color-not-active)] text-base font-normal">Cairo, Egypt</span>
                    </div>
                </div>

                <div className="h-full min-h-[50px]">
                    <p className="mx-2 text-sm text-gray-700">
                        {item.des}
                    </p>
                </div>                
            </div>
        </>
    )
}

export default AllCard;