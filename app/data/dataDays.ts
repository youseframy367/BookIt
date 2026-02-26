export const useDaysData = () => {
    const parseKValue = (str: string | number): number => {
        if (typeof str === "number") return str;
        const num = parseFloat(str);
        if (str.toLowerCase().includes("k")) return num * 1000;
        if (str.toLowerCase().includes("m")) return num * 1000000;
        return num;
    };

    const Data = [
        { name: "الأحد", الطلبات: 65, لم_يتجددوا: 95 },
        { name: "الإثنين", الطلبات: 80, لم_يتجددوا: 85 },
        { name: "الثلاثاء", الطلبات: 90, لم_يتجددوا: 75 },
        { name: "الأربعاء", الطلبات: 70, لم_يتجددوا: 82 },
        { name: "الخميس", الطلبات: 88, لم_يتجددوا: 90 },
        { name: "الجمعة", الطلبات: 55, لم_يتجددوا: 78 },
        { name: "السبت", الطلبات: 85, لم_يتجددوا: 70 },
    ];

    const Earnings = [
        { name: "الأحد", الأرباح: parseKValue(40000) },
        { name: "الإثنين", الأرباح: parseKValue("50K") },
        { name: "الثلاثاء", الأرباح: parseKValue("500K") },
        { name: "الأربعاء", الأرباح: parseKValue("300K") },
        { name: "الخميس", الأرباح: parseKValue("400K") },
        { name: "الجمعة", الأرباح: parseKValue("350K") },
        { name: "السبت", الأرباح: parseKValue("300K") },
    ]

    return { Data, Earnings };
}