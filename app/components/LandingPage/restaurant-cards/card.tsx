import AllCard from "./All-card";
import Link from "next/link";
import Like from "../like/like";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { dataCards } from "@/app/TypeScript/TypeScript";

export default function Card({ item, toggleExpand, index }: dataCards) {
    const { t, i18n, mounted } = useTranslationSetup();

    return (
        <>
            <div
                className="relative w-full rounded-[15px] pb-3"
            >
                <Link href={`/details-restaurant-public/${index + 1}`}>
                    <AllCard item={item} index={index} toggleExpand={() => toggleExpand(index)} />
                </Link>
                <div className="hidden container-content md:flex justify-between items-center my-6 gap-3">
                    <Link href={`/details-restaurant-public/${index + 1}`} className={`${mounted ? i18n.language === 'ar' ? "px-15 font-cairo" : "px-8 font-Poppins" : ""} py-4 rounded-[12px] bg-red-500 text-white text-[18px] md:text-[23px] font-medium truncate`}>
                        {mounted ? t("restaurant-detail") : "..."}
                    </Link>
                    <Like like={item.like} />
                </div>
            </div>
        </>
    )
}