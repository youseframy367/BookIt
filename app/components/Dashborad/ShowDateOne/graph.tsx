"use client";

/* ============================== الرسم البياني — داتا حقيقية ==============================
   المصدر: GET /api/reports/graph →
   { dailyRevenue: [{bucket,orderCount,revenue}], dailyReservations: [...], topItems, paymentBreakdown }
   ============================================================================ */
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useDaysData } from "@/app/data/dataDays";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LegendPayload
} from "recharts";

interface CustomLegendProps {
  payload?: LegendPayload[];
}

const { Data, Earnings } = useDaysData();

/* === داتا حقيقية من الباك إند (مع fallback على الداتا الوهمية إن فشل الاتصال) === */

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ar", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
};

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;

  return (
    <div className="flex justify-center gap-[30px] mt-[15px]" dir="rtl">
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          className="flex items-center gap-[8px] text-[12px] text-[#333]"
        >
          <div
            className="w-[12px] h-[12px]"
            style={{
              backgroundColor: entry.color,
              borderRadius: entry.type === "line" ? "50%" : "2px",
            }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Graph() {
  const [graph, setGraph] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    /* نجلب بيانات الرسم البياني (هذا الشهر) من الباك إند */
    (async () => {
      try {
        const { data } = await api.get("/reports/graph", { params: { group: "day" } });
        setGraph(data);
      } catch (e) {
        console.error("فشل تحميل بيانات الرسم البياني:", e);
        setError(true);
      }
    })();
  }, []);

  /* نحول dailyReservations إلى صيغة recharts: [{name, الطلبات, لم_يتجددوا}] */
  const reservationData =
    graph?.dailyReservations?.map((r: any) => ({
      name: new Date(r.bucket).toLocaleDateString("ar-EG", { day: "2-digit", month: "short" }),
      "الطلبات": r.reservationCount,
      "لم_يتجددوا": r.cancelledCount,
    })) ?? Data;

  /* نحول dailyRevenue إلى صيغة recharts: [{name, الأرباح}] */
  const earningsData =
    graph?.dailyRevenue?.map((r: any) => ({
      name: new Date(r.bucket).toLocaleDateString("ar-EG", { day: "2-digit", month: "short" }),
      "الأرباح": Math.round(r.revenue),
    })) ?? Earnings;

  return (
    <div className="flex justify-between w-[100%] m-0 p-0">
      {/*------------------------------------ Graph col ----------------------------------------- */}
      <div
        className="w-[49%] m-[1%] h-[420px] bg-white rounded-[12px] p-[15px] border border-1 border-[rgba(0,0,0,0.1)]" dir="rtl"
      >
        {/* Header Section */}
        <div className="w-full flex items-center px-[5px] py-[10px] justify-between">
          <p className="mb-[5px] text-[#1D2026] font-semibold text-base leading-[22px]">
            معدل الحجوزات
          </p>
          <h3 className="flex items-center gap-[10px] text-[#6E7485] text-[12px] font-normal cursor-pointer">
            هذا الشهر
            <img src="/media/shared/ui/chevron-down.svg" alt="arrow" />
          </h3>
        </div>

        <hr className="w-[107%] h-[1px] bg-[#E9EAF0] border-0 translate-x-[14px]" />

        {/* Graph */}
        <ResponsiveContainer width="110%" height={350}>
          <ComposedChart
            data={error ? Data : reservationData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#b9b7b7" />
            <XAxis dataKey="name" />
            <YAxis
              dx={-23}
              tick={{
                fill: "rgba(0,0,0,0.7)",
                fontWeight: 400,
                fontSize: 12
              }}
            />
            <Tooltip />
            <Legend content={<CustomLegend />} /> {/* ✅ تم التعديل هنا */}

            <Bar
              name="حجز مكتمل"
              dataKey="الطلبات"
              fill="#183866"
              barSize={10}
              radius={[0, 0, 0, 0]}
            />
            <Line
              name="حجز غير مكتمل"
              type="monotone"
              dataKey="لم_يتجددوا"
              stroke="#ff8c00"
              strokeWidth={1}
              dot={{ r: 4, fill: "#C2A363" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/*------------------------------------ Graph curve ----------------------------------*/}
      <div
        className="w-[49%] m-[1%] h-[420px] bg-white rounded-[12px] p-[15px] rtl"
        style={{ border: "solid 1px rgba(0,0,0,0.1)" }}
      >
        {/* Header */}
        <div className="w-full flex items-center px-[5px] py-[10px] justify-between">
          <p className="mb-[5px] text-[#1D2026] font-semibold text-base leading-[22px]">
            الأرباح
          </p>
          <h3 className="flex items-center gap-[10px] text-[#6E7485] text-[12px] cursor-pointer">
            هذا الشهر <img src="/media/shared/ui/chevron-down.svg" />
          </h3>
        </div>

        <hr className="w-[107%] h-[1px] bg-[#E9EAF0] border-0 translate-x-[14px]" />

        {/* Graph */}
        <ResponsiveContainer width="100%" height={300} style={{ direction: "ltr" }}>
          <AreaChart
            data={error ? Earnings : earningsData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#183866" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#183866" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
            />
            <YAxis
              type="number"
              domain={[0, "dataMax + 50000"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(0,0,0,0.7)",
                fontWeight: 400,
                fontSize: 12
              }}
              orientation="right"
            />
            <Tooltip
              formatter={(value) => (value !== undefined && typeof value === "number" ? formatNumber(value) : "")}
              contentStyle={{
                background: "#1D2026",
                borderRadius: "8px",
                color: "#fff",
                border: "none",
                width: "92px",
                height: "54px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              labelStyle={{
                color: "#aaa",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "-1%",
                lineHeight: "20px",
              }}
              itemStyle={{ color: "#fff", fontSize: "13px" }}
              cursor={{ stroke: "#82ca9d", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="الأرباح"
              stroke="#183866"
              fillOpacity={1}
              fill="url(#colorProfit)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
