"use client";

/* ============================== صفحة تقارير الكاشير — داتا حقيقية ==============================
   1. "تقارير الكاشير سنويا": GET /api/reports/graph?group=day (آخر 30 يوم)
      — يُبنى منه سلسلتان: إيراد كاش + إيراد فيزا من paymentBreakdown + dailyRevenue
   2. "اجمالى الحجوزات / الناجحة / الملغية": من dailyReservations
   3. عند فشل الاتصال: fallback على الداتا الوهمية القديمة
   ============================================================================ */
import CashierChart from "../graph";
import DateCart from "../../showDateOne/control/dateCart";
import { useState, useEffect } from "react";
import { reportsApi } from "@/utils/api";

/* ---------- داتا وهمية احتياطية (نفس القيم القديمة) ---------- */
const dummyRevenue = [
  {
    name: "دفع نقدي",
    data: [
      { x: "2024-01-01", y: 20000 }, { x: "2024-01-15", y: 32000 }, { x: "2024-01-30", y: 28000 },
      { x: "2024-02-05", y: 25000 }, { x: "2024-02-15", y: 35000 }, { x: "2024-02-28", y: 30000 },
      { x: "2024-03-05", y: 33000 }, { x: "2024-03-15", y: 45000 }, { x: "2024-03-31", y: 38000 },
      { x: "2024-04-10", y: 42000 }, { x: "2024-04-20", y: 50000 }, { x: "2024-04-30", y: 48000 },
      { x: "2024-05-05", y: 55000 }, { x: "2024-05-15", y: 62000 }, { x: "2024-05-31", y: 58000 },
      { x: "2024-06-10", y: 65000 }, { x: "2024-06-20", y: 75000 }, { x: "2024-06-30", y: 70000 },
      { x: "2024-07-05", y: 85000 }, { x: "2024-07-15", y: 95000 }, { x: "2024-07-31", y: 90000 },
      { x: "2024-08-05", y: 110000 }, { x: "2024-08-15", y: 125000 }, { x: "2024-08-31", y: 115000 },
      { x: "2024-09-10", y: 95000 }, { x: "2024-09-20", y: 85000 }, { x: "2024-09-30", y: 80000 },
      { x: "2024-10-10", y: 75000 }, { x: "2024-10-20", y: 70000 }, { x: "2024-10-31", y: 65000 },
      { x: "2024-11-05", y: 60000 }, { x: "2024-11-15", y: 68000 }, { x: "2024-11-30", y: 62000 },
      { x: "2024-12-05", y: 80000 }, { x: "2024-12-15", y: 95000 }, { x: "2024-12-31", y: 120000 }
    ]
  },
  {
    name: "بطاقة او محفظة",
    data: [
      { x: "2024-01-01", y: 15000 }, { x: "2024-01-15", y: 22000 }, { x: "2024-01-30", y: 20000 },
      { x: "2024-02-05", y: 18000 }, { x: "2024-02-15", y: 28000 }, { x: "2024-02-28", y: 24000 },
      { x: "2024-03-05", y: 21000 }, { x: "2024-03-15", y: 32000 }, { x: "2024-03-31", y: 28000 },
      { x: "2024-04-10", y: 35000 }, { x: "2024-04-20", y: 42000 }, { x: "2024-04-30", y: 40000 },
      { x: "2024-05-05", y: 48000 }, { x: "2024-05-15", y: 55000 }, { x: "2024-05-31", y: 52000 },
      { x: "2024-06-10", y: 58000 }, { x: "2024-06-20", y: 65000 }, { x: "2024-06-30", y: 62000 },
      { x: "2024-07-05", y: 70000 }, { x: "2024-07-15", y: 80000 }, { x: "2024-07-31", y: 78000 },
      { x: "2024-08-05", y: 90000 }, { x: "2024-08-15", y: 105000 }, { x: "2024-08-31", y: 100000 },
      { x: "2024-09-10", y: 85000 }, { x: "2024-09-20", y: 78000 }, { x: "2024-09-30", y: 75000 },
      { x: "2024-10-10", y: 65000 }, { x: "2024-10-20", y: 60000 }, { x: "2024-10-31", y: 55000 },
      { x: "2024-11-05", y: 52000 }, { x: "2024-11-15", y: 60000 }, { x: "2024-11-30", y: 58000 },
      { x: "2024-12-05", y: 70000 }, { x: "2024-12-15", y: 85000 }, { x: "2024-12-31", y: 100000 }
    ]
  }
];

const dummyBookings = [
  {
    name: "إجمالي الحجوزات",
    data: [
      { x: "2024-01-01", y: 20000 }, { x: "2024-01-10", y: 35000 }, { x: "2024-01-20", y: 28000 }, { x: "2024-01-30", y: 42000 },
      { x: "2024-02-05", y: 38000 }, { x: "2024-02-14", y: 55000 }, { x: "2024-02-22", y: 41000 }, { x: "2024-02-28", y: 33000 },
      { x: "2024-03-05", y: 31000 }, { x: "2024-03-15", y: 48000 }, { x: "2024-03-25", y: 39000 }, { x: "2024-03-31", y: 52000 },
      { x: "2024-04-05", y: 45000 }, { x: "2024-04-15", y: 62000 }, { x: "2024-04-25", y: 58000 }, { x: "2024-04-30", y: 70000 },
      { x: "2024-05-05", y: 65000 }, { x: "2024-05-15", y: 81000 }, { x: "2024-05-25", y: 72000 }, { x: "2024-05-31", y: 85000 },
      { x: "2024-06-05", y: 88000 }, { x: "2024-06-15", y: 105000 }, { x: "2024-06-25", y: 94000 }, { x: "2024-06-30", y: 110000 },
      { x: "2024-07-05", y: 115000 }, { x: "2024-07-15", y: 135000 }, { x: "2024-07-25", y: 122000 }, { x: "2024-07-31", y: 140000 },
      { x: "2024-08-05", y: 138000 }, { x: "2024-08-15", y: 152000 }, { x: "2024-08-25", y: 130000 }, { x: "2024-08-31", y: 125000 },
      { x: "2024-09-05", y: 105000 }, { x: "2024-09-15", y: 95000 }, { x: "2024-09-25", y: 88000 }, { x: "2024-09-30", y: 82000 },
      { x: "2024-10-10", y: 78000 }, { x: "2024-10-20", y: 72000 }, { x: "2024-10-31", y: 65000 },
      { x: "2024-12-31", y: 130000 }
    ]
  }
];

const dummyBookingsTrue = [
  {
    name: "الحجوزات الناجحة",
    data: [
      { x: "2024-01-01", y: 15000 }, { x: "2024-01-15", y: 22000 }, { x: "2024-01-30", y: 19000 },
      { x: "2024-04-01", y: 45000 }, { x: "2024-06-30", y: 79000 },
      { x: "2024-08-15", y: 125000 }, { x: "2024-09-30", y: 82000 },
      { x: "2024-12-31", y: 110000 }
    ]
  }
];

const dummyBookingsFalse = [
  {
    name: "الحجوزات الملغية",
    data: [
      { x: "2024-01-01", y: 12000 }, { x: "2024-03-31", y: 42000 },
      { x: "2024-06-30", y: 80000 }, { x: "2024-09-30", y: 30000 },
      { x: "2024-12-31", y: 15000 }
    ]
  }
];

/* ---------- دوال تحويل من صيغة الباك إند إلى صيغة ApexCharts ---------- */
const toTs = (bucket) => new Date(bucket).getTime();

/* إيراد يومي حسب طريقة الدفع: cash → دفع نقدي، visa → بطاقة أو محفظة */
function buildRevenueSeries(dailyRevenue, paymentBreakdown) {
  if (!Array.isArray(dailyRevenue) || dailyRevenue.length === 0) return null;
  /* نسبة طرق الدفع من paymentBreakdown لتقسيم الإيراد اليومي */
  let cashRatio = 0.5;
  if (Array.isArray(paymentBreakdown) && paymentBreakdown.length > 0) {
    const total = paymentBreakdown.reduce((s, p) => s + Number(p.count || 0), 0);
    const cash = paymentBreakdown.find(p => p.paymentMethod === "cash");
    if (total > 0 && cash) cashRatio = Number(cash.count || 0) / total;
  }
  return [
    {
      name: "دفع نقدي",
      data: dailyRevenue.map(r => ({ x: r.bucket, y: Math.round(Number(r.revenue) * cashRatio) })),
    },
    {
      name: "بطاقة او محفظة",
      data: dailyRevenue.map(r => ({ x: r.bucket, y: Math.round(Number(r.revenue) * (1 - cashRatio)) })),
    },
  ];
}

/* سلاسل الحجوزات: إجمالي / مؤكدة / ملغاة */
function buildReservationSeries(dailyReservations) {
  if (!Array.isArray(dailyReservations) || dailyReservations.length === 0) return { total: null, confirmed: null, cancelled: null };
  return {
    total: [{
      name: "إجمالي الحجوزات",
      data: dailyReservations.map(r => ({ x: r.bucket, y: Number(r.reservationCount) })),
    }],
    confirmed: [{
      name: "الحجوزات الناجحة",
      data: dailyReservations.map(r => ({ x: r.bucket, y: Number(r.confirmedCount) })),
    }],
    cancelled: [{
      name: "الحجوزات الملغية",
      data: dailyReservations.map(r => ({ x: r.bucket, y: Number(r.cancelledCount) })),
    }],
  };
}

export default function Dashboard() {
  /* --- بيانات حقيقية من GET /reports/graph (group=day)، مع fallback للداتا الوهمية --- */
  const [revenueSeries, setRevenueSeries] = useState(null);   // تقارير الكاشير سنويا
  const [resSeries, setResSeries] = useState(null);           // إجمالي الحجوزات
  const [resConfirmed, setResConfirmed] = useState(null);     // الحجوزات الناجحة
  const [resCancelled, setResCancelled] = useState(null);     // الحجوزات الملغية

  useEffect(() => {
    (async () => {
      try {
        const { data } = await reportsApi.graph("day");
        if (data) {
          const rev = buildRevenueSeries(data.dailyRevenue, data.paymentBreakdown);
          if (rev) setRevenueSeries(rev);
          const res = buildReservationSeries(data.dailyReservations);
          if (res.total) setResSeries(res.total);
          if (res.confirmed) setResConfirmed(res.confirmed);
          if (res.cancelled) setResCancelled(res.cancelled);
        }
      } catch (e) {
        console.error("فشل تحميل تقارير الكاشير — باستخدام الداتا الوهمية:", e);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <DateCart />

      <div className="grid grid-cols-1 gap-2 px-0">
        <CashierChart title="تقارير الكاشير سنويا" data={revenueSeries || dummyRevenue} />
        <CashierChart title="اجمالى الحجوزات" data={resSeries || dummyBookings} />
        <CashierChart title="اجمالى الحجوزات الناجحه" data={resConfirmed || dummyBookingsTrue} />
        <CashierChart title="اجمالى الحجوزات الملغيه" data={resCancelled || dummyBookingsFalse} />
      </div>
    </div>
  );
}
