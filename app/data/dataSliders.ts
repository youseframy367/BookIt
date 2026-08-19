import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataSliders = () => {
    const { t } = useTranslationSetup();
    return [
        { img: "/media/shared/icons/meal-1.png", title: t('grills') },
        { img: "/media/shared/icons/meal-2.jpg", title: t('pizza') },
        { img: "/media/shared/icons/meal-3.png", title: t('burgers') },
        { img: "/media/shared/icons/meal-4.png", title: t('seafood') },
        { img: "/media/shared/icons/meal-5.png", title: t('desserts') },
        { img: "/media/shared/icons/meal-6.png", title: t('healthy') },
        { img: "/media/shared/icons/meal-7.png", title: t('drinks-and-coffee') },
    ]
}