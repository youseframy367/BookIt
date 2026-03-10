"use client";

import { fontWeight, width } from "@mui/system";
import dynamic from "next/dynamic";
import { useState } from "react";
import CalendarPicker from "./inputMonth";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CashierChart({ title, data }) {

    const options = {
        chart: {
            type: "line",
            height: 350,
            toolbar: { show: false },
            fontFamily: "Cairo, sans-serif",
        },
        stroke: {
            curve: "smooth",
            width: 3
        },
        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 1
        },
        colors: ["#448DF2", "rgba(219, 163, 98, 0.7)"],
        xaxis: {
            type: "datetime",
            tickAmount: 31,
            offsetY: 20,
            height: 5,
            axisTicks: {
                show: true,
                width: "1px",
                color: "rgba(0,0,0,0.5)"
            },
            axisBorder: {
                show: true,
                color: "#FFF"
            },
            labels: {
                style: {
                    colors: "#858D9D",
                    fontWeight: "400",
                    fontSize: "14px",
                },
                offsetY: -10,
                formatter: function (value, timestamp) {
                    const date = new Date(timestamp)
                    const months = [
                        "يناير", "فبراير", "مارس", "ابريل",
                        "مايو", "يونيو", "يوليو", "اغسطس",
                        "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"
                    ]
                    if (date.getDate() === 1) {
                        return months[date.getMonth()]
                    }
                    return ""
                }
            }
        },
        yaxis: {
            opposite: true,
            labels: {
                style: {
                    colors: "#858D9D",
                    fontSize: "14px"
                }
            },
            axisTicks: {
                show: true,
                color: "#1D4ED8",
            },
            axisBorder: {
                show: true,
                color: "#1D4ED8"
            }
        },
        tooltip: {
            enabled: true,
            shared: true,
            followCursor: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"];
                let html = `<div style="display:flex; flex-direction:column; justify-content: center; gap:6px; font-family:Cairo, sans-serif; background: white; border:1px solid #ddd; padding:10px; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`;

                for (let i = 0; i < series.length; i++) {
                    const value = series[i][dataPointIndex];
                    const timestamp = w.globals.seriesX[i][dataPointIndex];
                    const date = new Date(timestamp);
                    const formattedDate = date.getDate() + " " + months[date.getMonth()];
                    const color = w.config.colors[i];

                    html += `
                        <div style="display:flex; flex-direction:column; gap:2px; min-width:90px; border-radius: 4px; overflow:hidden;">
                            <div style="background:${color}; color:#fff; padding:5px 8px; font-weight:500; text-align:center;">
                                <div>${value ? value.toLocaleString() : 0}</div>
                                <div style="font-size:10px; opacity:0.9;">${formattedDate}</div>
                            </div>
                        </div>`;
                }
                html += `</div>`;
                return html;
            }
        },
        legend: {
            position: "bottom",
            offsetY: 10,
            labels: {
                colors: "#5D6679",
                fontSize: "12px",
                formatter: function (val) {
                    return "   " + val;
                }
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
            }
        },
        markers: {
            size: 5,
            strokeWidth: 2
        }
    };

    return (
        <div className="bg-white w-[98%] m-[1%] p-6 px-[15px] rounded-xl shadow" dir="rtl">
            <div className="flex justify-between p-2 px-2">
                <p className="text-[20px] font-[500] text-[#383E49]">
                    {title}
                </p>
                <CalendarPicker />
            </div>

            <Chart
                options={options}
                series={data || []}
                type="line"
                height={350}
            />
        </div>
    );
}