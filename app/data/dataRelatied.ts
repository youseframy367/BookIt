import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export const useDataRelatied = () => {
    const { t } = useTranslationSetup();
    const dataRealtied = [
        {
            header: {
                title: t('top-rated'),
                subTitle: t('check-best-restaruant'),
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: t('name-restaruant-1'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-2'),
                    rating: 0.6,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-3.png",
                    name: t('name-restaruant-3'),
                    rating: 0.8,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
            ],
            href: "/most-booked-or-top-reatied?type=top-ratied"
        },
        {
            header: {
                title: t('most-booked'),
                subTitle: t('check-best-restaruant-1'),
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: t('name-restaruant-1'),
                    rating: 0.95,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-2'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-3'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: false,
                    area: t('area-1')
                },
            ],
            href: "/most-booked-or-top-reatied?type=most-booked"
        }
    ]

    const likedDataRealited = [
        {
            header: {
                title: t('top-rated'),
                subTitle: t('check-best-restaruant'),
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: t('name-restaruant-1'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-2'),
                    rating: 0.6,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-3.png",
                    name: t('name-restaruant-3'),
                    rating: 0.8,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
            ],
            href: "/most-booked-or-top-reatied?type=top-ratied"
        },
        {
            header: {
                title: t('most-booked'),
                subTitle: t('check-best-restaruant-1'),
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: t('name-restaruant-1'),
                    rating: 0.95,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-2'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: t('name-restaruant-3'),
                    rating: 0.9,
                    des: t('text-restaruant-1'),
                    like: true,
                    area: t('area-1')
                },
            ],
            href: "/most-booked-or-top-reatied?type=most-booked"
        }
    ]

    return { dataRealtied, likedDataRealited }
}