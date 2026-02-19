import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

type LinkItem = {
    name: string;
    href: string;
    activeOnlyForType?: string;
};

export const useNavigationData = () => {
    const { t } = useTranslationSetup();

    const navigation: LinkItem[] = [
        { name: t("about-us"), href: "/about" },
        { name: t("contact"), href: "/contact" },
        { name: t("questions"), href: "/faq" },
    ];

    const links: LinkItem[] = [
        { name: t("home"), href: "/" },
        { name: t("most-booked"), href: "/most-booked-or-top-reatied?type=most-booked", activeOnlyForType: "most-booked" },
        { name: t("popular-dishes"), href: "/popular-dishes" },
        { name: t("liked-restaurants"), href: "/liked-restaurants" },
    ];

    return { navigation, links };
};
