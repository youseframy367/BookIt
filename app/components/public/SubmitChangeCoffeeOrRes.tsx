import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { btn } from "@/app/TypeScript/TypeScript";

export default function Submit({ isColor = "bg-[var(--color-dark-blue-gray)] text-white", title, width, onSubmit, loading }: btn) {
    const { i18n, mounted } = useTranslationSetup();
    return <input onClick={onSubmit} disabled={loading} value={title} type="submit" className={`disabled:opacity-[0.5] disabled:cursor-not-allowed ${width} cursor-pointer ${isColor} font-normal text-sm md:text-lg ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} px-2 py-3 rounded-2xl`} />
}