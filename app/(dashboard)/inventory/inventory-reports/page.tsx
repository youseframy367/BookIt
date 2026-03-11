"use client";

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

const ApexChart = () => {
    const [date, setDate] = useState("2026-03-15");

    const series = [
        {
            name: "التضخم",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        },
    ];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "13%",
                borderRadius: 3,
                borderRadiusApplication: "end",
                dataLabels: {
                    position: "top",
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#6D3AFF"],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
            },
            colors: ["#183866"],
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => val + " كيلو",
            offsetY: -20,
            style: { fontSize: "12px", colors: ["#304758"] },
        },
        xaxis: {
            categories: [
                "لحمه", "فراخ", "بابريكا", "ليمون", "فلفل", "طماطم",
                "جزر", "مانجا", "لبن", "ملح", "سكر", "دقيق",
            ],
            position: "bottom",
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (val: number) => val + " كيلو",
            },
        },
    };

    return (
        <section className="p-5 flex w-[98%] bg-[#fff] rounded-[11px] flex-col overflow-hidden m-[1%]">
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-[10px] text-xl">
                        <h2 className="font-normal text-[var(--color-gray-ten)]">تقارير مخزونك</h2>
                        <span className="font-bold">الأكثر سحبا من المخزون في هذا الشهر</span>
                    </div>
                    <div className="flex items-center gap-[8px] py-[8px] px-[16px] rounded-[4px] border border-[var(--color-gray-eleven)]">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min="2026-03-01"
                            max="2026-03-31"
                        />
                    </div>
                </div>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </section>
    );
};

export default ApexChart;