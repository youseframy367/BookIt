import { dataCards } from "@/app/TypeScript/TypeScript";
import AllCard from "./All-card";
import Link from "next/link";
import Like from "../like/like";

function Card({ item, toggleExpand, index }: dataCards) {
    return (
        <>
            <div
                className="hidden md:block relative w-full rounded-[15px] pb-0"
                onClick={() => toggleExpand(index)}
            >
                <AllCard item={item} index={index} toggleExpand={() => toggleExpand(index)} />
                <div className="flex items-center justify-center my-6 md:mx-2 gap-3">
                    <Link href={`/details-restaurant-public/${index + 1}`} className="px-8 py-4 rounded-[12px] bg-red-500 text-white text-[18px] md:text-[23px] font-medium font-Poppins truncate">
                        Restaurant Detail Page
                    </Link>
                    <Like />
                </div>
            </div>
            <Link href={`/details-restaurant-public/${index + 1}`}
                className="md:hidden relative w-full rounded-[15px]"
                onClick={() => toggleExpand(index)}
            >
                <AllCard item={item} index={index} toggleExpand={() => toggleExpand(index)} />
            </Link>
        </>
    )
}

export default Card;