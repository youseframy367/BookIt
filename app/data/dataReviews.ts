import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataReviews = () => {
    const { t } = useTranslationSetup();

    return [
        {
            title: t('text-reviews-1'),
            rating: 5,
            name: t('name-user'),
            job: t('jobs')
        },
        {
            title: t('text-reviews-1'),
            rating: 2,
            name: t('name-user'),
            job: t('jobs')
        },
        {
            title: t('text-reviews-1'),
            rating: 4,
            name: t('name-user'),
            job: t('jobs')
        },
        {
            title: t('text-reviews-1'),
            rating: 5,
            name: t('name-user'),
            job: t('jobs')
        },
        {
            title: t('text-reviews-1'),
            rating: 5,
            name: t('name-user'),
            job: t('jobs')
        },
        {
            title: t('text-reviews-1'),
            rating: 4,
            name: t('name-user'),
            job: t('jobs')
        },
    ]
}