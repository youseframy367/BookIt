import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataSliders = () => {
    const { t } = useTranslationSetup();
    return [
        { img: "/assets/icons/meal-1.png", title: t('grills') },
        { img: "/assets/icons/meal-2.jpg", title: t('pizza') },
        { img: "/assets/icons/meal-3.png", title: t('burgers') },
        { img: "/assets/icons/meal-4.png", title: t('seafood') },
        { img: "/assets/icons/meal-5.png", title: t('desserts') },
        { img: "/assets/icons/meal-6.png", title: t('healthy') },
        { img: "/assets/icons/meal-7.png", title: t('drinks-and-coffee') },
    ]
}