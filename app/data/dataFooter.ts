import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useFootrerData = () => {
    const { t } = useTranslationSetup();

    const Menu = [
        {
            title: t('home'),
            link: "/"
        },
        {
            title: t('most-booked-2'),
            link: "/most-booked-or-top-reatied"
        },
        {
            title: t('popular-dishes-1'),
            link: "/popular-dishes"
        },
        {
            title: t('liked'),
            link: "/liked-restaurants"
        }
    ];

    const Information = [
        {
            title: t('tech-support'),
            link: ""
        },
        {
            title: t('terms-to-use'),
            link: "/terms-of-use"
        },
    ]

    const ContactInfo = [
        {
            title: "+ 20 01055395693",
            link: "https://wa.me/2001055395693"
        },
        {
            title: "teamdevmaster930@gmail.com",
            link: "mailto:teamdevmaster930@gmail.com"
        },
        {
            title: "Egypt, Cairo",
            link: ""
        }
    ]

    return { Menu, Information, ContactInfo };
}