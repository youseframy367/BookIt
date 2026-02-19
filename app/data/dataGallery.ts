import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataGallery = () => {
    const { t } = useTranslationSetup();

    return [
        { title: t("pizza"), icon: "Pizza" },
        { title: t("pasta"), icon: "Pasta" },
        { title: t("lazania"), icon: "gallery-3" },
        { title: t("seafood"), icon: "hero-menu" },
        { title: t("beef"), icon: "gallery-5" },
        { title: t("desserts"), icon: "gallery-6" },
    ]
}