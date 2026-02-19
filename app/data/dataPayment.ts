export const usePaymentData = () => {
    return [
        {
            id: 1,
            title: "Starter",
            subTitle: "مناسبة للمطاعم الصغيرة والكافيهات",
            currens: "EGB",
            prices: {
                "شهري": 150,
                "ربع سنويه": 400,
                "سنوي": 1600
            },
            titleMenu: "ماهو الذي ستحصل عليه في هذه الباقه ؟",
            features: ["صفحة مطعم على المنصة", "عرض المنيو ( حتى 40 منتج )", "استقبال حجوزات أونلاين", "لوحة تحكم أساسية", "دعم فني", "أداء (حتى 2x)", "اضافة صور المطعم ", "يمكنك اضافة فرع واحد في هذه الباقه"],
            link: "/register-pages/register-coffee-or-restaurant/payment-method/1"
        },
        {
            id: 2,
            title: "Business",
            subTitle: "مناسبة للمطاعم المتوسطه والكافيهات",
            titleTow: "( الأكثر شيوعا )",
            currens: "EGB",
            prices: {
                "شهري": 350,
                "ربع سنويه": 950,
                "سنوي": 4000
            },
            titleMenu: "تشمل كل ما في Starter +",
            features: ["صفحة مطعم على المنصة", "عرض المنيو ( حتى 40 منتج )", "استقبال حجوزات أونلاين", "لوحة تحكم أساسية", "دعم فني", "أداء (حتى 5x)", "اضافة صور المطعم ", "يمكنك اضافة عدد 3 فروع في هذه الباقه"],
            link: "/register-pages/register-coffee-or-restaurant/payment-method/2"
        },
        {
            id: 3,
            title: "Premium",
            subTitle: "مناسبة للمطاعم الكبيرة والبراندات",
            currens: "EGB",
            prices: {
                "شهري": 550,
                "ربع سنويه": 1400,
                "سنوي": 5800
            },
            titleMenu: "تشمل كل ما في Business +",
            features: ["أولوية الظهور في المنصة", "عرض المنيو ( حتى 40 منتج )", "استقبال حجوزات أونلاين", "لوحة تحكم أساسية", "دعم فني", "أداء (حتى 10x)", "اضافة صور المطعم ", "يمكنك اضافة عدد 5 فروع في هذه الباقه"],
            link: "/register-pages/register-coffee-or-restaurant/payment-method/3"
        }
    ]
}