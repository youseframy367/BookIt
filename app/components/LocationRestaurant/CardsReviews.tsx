import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { reivews } from "@/app/TypeScript/TypeScript";

export default function CardsReviews({ item }: reivews) {
    const { i18n, mounted } = useTranslationSetup();

    const totalStars = 5;

    return (
        <>
            <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-sm md:text-lg font-normal text-[var(--color-text-footer)]`}>{mounted ? item.title : '...'}</span>
            <div className="flex gap-1">
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={starValue}
                            className={`text-3xl ${starValue <= item.rating ? "text-yellow-400" : "text-gray-500"}`}>
                            ★
                        </span>
                    );
                })}
            </div>
            <div className="flex flex-col">
                <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-PlayfairDisplay" : ""} text-sm md:text-2xl text-[var(--color-text-footer)]`}>{mounted ? item.name : '...'}</span>
                <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-sm md:text-lg text-[var(--color-text-footer)]`}>{mounted ? item.job : '...'}</span>
            </div>
        </>
    )
}