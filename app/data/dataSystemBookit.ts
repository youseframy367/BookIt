import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataSystemBookIt = () => {
    const { t } = useTranslationSetup();

    return [
        { img: "it-work-1", text: t('item-book-it-1') },
        { img: "it-work-2", text: t('item-book-it-2') },
        { img: "it-work-3", text: t('item-book-it-3') },
        { img: "it-work-4", text: t('item-book-it-4') },
    ]
}