import { useTranslationSetup } from "./useTranslationSetup";

export function useToggleLanguage() {
    const { i18n } = useTranslationSetup();

    const toggleLanguage: () => void = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return { toggleLanguage };
}