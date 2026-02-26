"use client";

import './ControlBag.css';
import Graph from "../../../components/Dashborad/ShowDateOne/graph";
import { useState } from 'react';
import CustomerInquiries from "../../../components/Dashborad/ShowDateOne/CustomerInquiries";
import { useEffect } from 'react';
import MostPersistentCustomers from "../../../components/Dashborad/ShowDateOne/MostPersistentCustomers";

export default function ControlBag() {
  const [statCartOne, setStateCatrtOne] = useState(true)
  const [statCartTwo, setStateCatrttwo] = useState(true)
  const [statCartThree, setStateCatrtthree] = useState(true)
  const [statCartFor, setStateCatrtFor] = useState(true)

  const date = {
    TotalCustomers: "123,575,456",
    NumberOfClientsThisMonth: "1452",
    HigherThanLastMonthOne: -92.8,
    TotalProfits: "123,575,456",
    TotalRevenueThisMonth: "1452",
    HigherThanLastMonthTwo: 92.8,

    TotalNumberOfRestaurantsAndCafes: "123,575,456",
    TotalActiveNumber: "1452",
    HigherThanLastMonthThree: -92.8,

    TotalNumberOfSubscriptions: "123,575,456",
    SubscriptionsNearingExpiry: "1452",
    HigherThanLastMonthFor: 92.8,
  };

  useEffect(() => {
    date.HigherThanLastMonthOne < 0 && setStateCatrttwo(false);
    date.HigherThanLastMonthTwo < 0 && setStateCatrtOne(false);
    date.HigherThanLastMonthThree < 0 && setStateCatrtthree(false);
    date.HigherThanLastMonthFor < 0 && setStateCatrtFor(false);
  }, [date.HigherThanLastMonthOne, date.HigherThanLastMonthTwo, date.HigherThanLastMonthThree, date.HigherThanLastMonthFor]);

  return (
    <div className="w-full overflow-x-hidden min-h-screen" dir='rtl'>
      <ul className="flex flex-row flex-nowrap justify-between w-full p-[0.4rem]">

        {/* كرت العملاء */}
        <li className="card">
          <div className="card-content">
            <p className="card-title">اجمالي مبيعات الكاشير هذا الشهر</p>
            <p className="card-total">{date.TotalCustomers} <span className='text-[700] text-[#1B8354]'> EGP</span></p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
              <p className="card-this-month">
                <span>{date.NumberOfClientsThisMonth}</span> <span className='tetx-[12px] text-[#1B8354] text-bold'>EGP</span> عدد المبيعات هذا اليوم
              </p>
              <p className="card-higher flex gap-[5px]">
                <img src={statCartOne ? "/img/ewerwft.svg" : "/img/gfgf.svg"}></img><span className={statCartOne ? "text-green-600" : "text-red-600"}>{date.HigherThanLastMonthOne}</span> أعلى من الشهر الماضي
              </p>
            </div>
          </div>
          <img src="/img/Frame 1686551849.svg" alt="icon" className="card-icon" />
        </li>

        {/* كرت الأرباح */}
        <li className="card">
          <div className="card-content">
            <p className="card-title">اجمالي الحجوزات الملغيه   </p>
            <p className="card-total">{date.TotalProfits}</p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
              <p className="card-this-month">
                <span>{date.TotalRevenueThisMonth}</span> اجمالي الحجوزات الملغيه هذا الشهر
              </p>
              <p className="card-higher flex gap-[5px]">
                <img src={statCartTwo ? "/img/ewerwft.svg" : "/img/gfgf.svg"}></img> <span className={statCartTwo ? "text-green-600" : "text-red-600"}>{date.HigherThanLastMonthTwo}</span>  أعلي من الشهر الماضي
              </p>
            </div>
          </div>
          <img src="/img/Frame 322.svg" alt="icon" className="card-icon " />
        </li>

        {/* كرت المطاعم والكافيهات */}
        <li className="card">
          <div className="card-content">
            <p className="card-title">اجمالي الحجوزات الناجحه</p>
            <p className="card-total">{date.TotalNumberOfRestaurantsAndCafes}</p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
              <p className="card-this-month">
                <span>{date.TotalActiveNumber}</span> اجمالي الحجوزات هذا الشهر
              </p>
              <p className="card-higher flex gap-[5px]">

                <img src={statCartThree ? "/img/ewerwft.svg" : "/img/gfgf.svg"}></img> <span className={statCartThree ? "text-green-600" : "text-red-600"}>{date.HigherThanLastMonthThree}</span>  أعلي من الشهر الماضي
              </p>
            </div>
          </div>
          <img src="/img/rerreer.svg" alt="icon" className="card-icon h-[48px] relative left-[10px] " />
        </li>

        {/* كرت الاشتراكات */}
        <li className="card">
          <div className="card-content">
            <p className="card-title">اجمالي الحجوزات</p>
            <p className="card-total">{date.TotalNumberOfSubscriptions}</p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
              <p className="card-this-month">
                <span>{date.SubscriptionsNearingExpiry}</span> عدد الحجوزات هذا الشهر
              </p>
              <p className="card-higher flex gap-[5px]">
                <img src={statCartFor ? "/img/ewerwft.svg" : "/img/gfgf.svg"}></img>   <span className={statCartFor ? "text-green-600" : "text-red-600"}>{date.HigherThanLastMonthFor}</span> أعلى من الشهر الماضي
              </p>
            </div>
          </div>
          <img src="/img/Frame 1686553822.svg" alt="icon" className="card-icon" />
        </li>
      </ul>

      <Graph />

      <div className='w-full flex gap-[10px] h-[300px]'>
        <MostPersistentCustomers />
        <CustomerInquiries />
      </div>
    </div>
  );
}
