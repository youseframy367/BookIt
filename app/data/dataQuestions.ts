import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataQuestions = () => {
    const { t } = useTranslationSetup();

    return [
        {
            id: 1,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 2,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 3,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 4,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 5,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 6,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
        {
            id: 7,
            title: t('how-to-modify'),
            content: t("text-how-to-modify"),
        },
    ]
}