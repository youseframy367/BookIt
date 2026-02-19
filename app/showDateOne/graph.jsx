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
  Legend
} from "recharts";

const Data = [
  { name: "الأحد", الطلبات: 65, لم_يتجددوا: 95 },
  { name: "الإثنين", الطلبات: 80, لم_يتجددوا: 85 },
  { name: "الثلاثاء", الطلبات: 90, لم_يتجددوا: 75 },
  { name: "الأربعاء", الطلبات: 70, لم_يتجددوا: 82 },
  { name: "الخميس", الطلبات: 88, لم_يتجددوا: 90 },
  { name: "الجمعة", الطلبات: 55, لم_يتجددوا: 78 },
  { name: "السبت", الطلبات: 85, لم_يتجددوا: 70 },
];

const parseKValue = (str) => {
  if (typeof str === "number") return str;
  const num = parseFloat(str);
  if (str.toLowerCase().includes("k")) return num * 1000;
  if (str.toLowerCase().includes("m")) return num * 1000000;
  return num;
};

const Earnings = [
  { name: "الأحد", الأرباح: parseKValue(40000) },
  { name: "الإثنين", الأرباح: parseKValue("50K") },
  { name: "الثلاثاء", الأرباح: parseKValue("500K") },
  { name: "الأربعاء", الأرباح: parseKValue("300K") },
  { name: "الخميس", الأرباح: parseKValue("400K") },
  { name: "الجمعة", الأرباح: parseKValue("350K") },
  { name: "السبت", الأرباح: parseKValue("300K") },
];

const formatNumber = (num) => {
  return new Intl.NumberFormat("ar", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
};

// ✅ مكون مخصص للـ Legend
const CustomLegend = ({ payload }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "15px",
      direction: "rtl",
    }}
  >
    {payload.map((entry, index) => (
      <div
        key={`item-${index}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "#333",
        }}
      >
        {/* الأيقونة على اليمين */}
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: entry.color,
            borderRadius: entry.type === "line" ? "50%" : "2px",
          }}
        />
        {/* النص على اليسار */}
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function Graph() {
  return (
    <div className="flex justify-between w-[100%] m-0 p-0">
      {/*------------------------------------ Graph col ----------------------------------------- */}
      <div
        className="w-[49%] m-[1%] h-[420px] bg-white rounded-[12px] p-[15px] rtl"
        style={{ border: "solid 1px rgba(0,0,0,0.1)" }}
      >
        {/* Header Section */}
        <div className="w-full flex items-center px-[5px] py-[10px] justify-between">
          <p className="mb-[5px] text-[#1D2026] font-semibold text-base leading-[22px]">
            معدل الحجوزات
          </p>
          <h3 className="flex items-center gap-[10px] text-[#6E7485] text-[12px] font-normal cursor-pointer">
            هذا الشهر
            <img src="/img/ChevronDown.svg" alt="arrow" />
          </h3>
        </div>

        <hr
          style={{
            width: "107%",
            transform: "translateX(14px)",
            height: "1px",
            background: "#E9EAF0",
            border: "none",
          }}
        />

        {/* Graph */}
        <ResponsiveContainer width="110%" height={350}>
          <ComposedChart
            data={Data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#b9b7b7" />
            <XAxis dataKey="name" />
            <YAxis
              dx={-23}
              wrapperStyle={{
                fontWeight: "400",
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.7)",
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
            هذا الشهر <img src="/img/ChevronDown.svg" />
          </h3>
        </div>

        <hr className="w-[107%] h-[1px] bg-[#E9EAF0] border-0 translate-x-[14px]" />

        {/* Graph */}
        <ResponsiveContainer width="100%" height={300} style={{ direction: "ltr" }}>
          <AreaChart
            data={Earnings}
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
              tick={{ fill: "#888", fontSize: 12 }}
              orientation="right"
              wrapperStyle={{
                fontWeight: "400",
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            />
            <Tooltip
              formatter={(value) => formatNumber(value)}
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
