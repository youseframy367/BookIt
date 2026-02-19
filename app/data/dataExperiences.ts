import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataExperiences = () => {
    const { t } = useTranslationSetup();

    return [
        {
            details: t('details-managers'),
            rating: 0.6,
            name: t('name-user'),
            jobs: t('jobs'),
        },
        {
            details: t('details-managers'),
            rating: 0.6,
            name: t('name-user'),
            jobs: t('jobs'),
        },
        {
            details: t('details-managers'),
            rating: 0.6,
            name: t('name-user'),
            jobs: t('jobs'),
        },
        {
            details: t('details-managers'),
            rating: 0.6,
            name: t('name-user'),
            jobs: t('jobs'),
        },
    ]
}