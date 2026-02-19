"use client";

import Image from "next/image";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function ChangeLanguage() {
    const { i18n, mounted } = useTranslationSetup();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            {
                mounted && <div className="cursor-pointer">
                    <Image src={`/assets/icons/${i18n.language == 'ar' ? 'en' : 'ar'}.svg`} alt='lang' width={30} height={30} onClick={toggleLanguage} />
                </div>
            }
        </>
    )
}