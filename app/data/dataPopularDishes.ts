import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataProducts = () => {
    const { t } = useTranslationSetup();

    const products = [
        {
            id: 1,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 2,
            active: false,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 3,
            active: false,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 4,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 5,
            active: false,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 6,
            active: false,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 7,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 8,
            active: false,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 9,
            active: false,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        }
    ]

    const likedProducts = [
        {
            id: 1,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 2,
            active: true,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 3,
            active: true,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 4,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 5,
            active: true,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 6,
            active: true,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 7,
            active: true,
            icon: "fattoush-salad",
            title: t('fattoush-salad'),
            subTitle: t('description'),
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 8,
            active: true,
            icon: "vegetable-salad",
            title: t('vegetable-salad'),
            subTitle: t('description'),
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 9,
            active: true,
            icon: "egg-salad",
            title: t('egg-salad'),
            subTitle: t('description'),
            amount: "23.00",
            rating: "4.5"
        }
    ]

    return { likedProducts, products }
}