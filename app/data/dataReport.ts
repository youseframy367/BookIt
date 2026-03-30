import { useInvoice } from "../(dashboard)/context/InvoiceContext";

export const useReportData = () => {
    const {
        customerData,
        takeawayOrSala
    } = useInvoice();

    return [
        {
            title: "رقم الطلب",
            subTitle: customerData.code,
        },
        {
            title: "نوع الأوردر",
            subTitle: takeawayOrSala === 0 ? "صاله" : "تيك أواي",
        },
        {
            title: "اسم صاحب الطلب",
            subTitle: customerData.name ? customerData.name : "غير متوفر",
        },
        {
            title: "العنوان",
            subTitle: customerData.address ? customerData.address : "غير متوفر",
        },
        {
            title: "رقم الهاتف",
            subTitle: customerData.phone ? customerData.phone : "غير متوفر",
        },
        {
            title: "رقم هاتف اخر",
            subTitle: customerData.phone2 ? customerData.phone2 : "غير متوفر",
        },
    ];
};