import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataInformation = () => {
    const { t } = useTranslationSetup();

    return [
        { number: 500000, title: t('book-online') },
        { number: 20000, title: t('our-restaurant') },
        { number: 300000, title: t('a-daily') },
        { number: 33000, title: t('our-cafe') }
    ]
}