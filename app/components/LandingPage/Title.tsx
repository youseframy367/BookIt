import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { Header } from "../../TypeScript/TypeScript";

export default function Title({ title, subTitle }: Header) {
    const { i18n, mounted } = useTranslationSetup();

    return (
        <div className="flex flex-col gap-[25px]">
            <div className="flex">
                <div className="pb-4 relative before:content-[''] before:absolute before:w-[70%] before:md:w-[150px] before:bottom-0 before:h-[3px] before:rounded-sm before:bg-[var(--color-red)]">
                    <span className={`text-[var(--color-footer)] text-3xl md:text-[64px] font-[400] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-serif" : ""} mb-2`}>
                        {title}
                    </span>
                </div>
            </div>
            <p className={`leading-[36px] text-[var(--color-text-footer)] text-[18px] md:text-[24px] font-normal ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-sans" : ""} mt-0 mb-5`}>
                {subTitle}
            </p>
        </div>
    )
}