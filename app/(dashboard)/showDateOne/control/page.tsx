"use client";

import './ControlBag.css';
import Graph from "../../../components/Dashborad/ShowDateOne/graph";
import { useState } from 'react';
import CustomerInquiries from "../../../components/Dashborad/ShowDateOne/CustomerInquiries";
import { useEffect } from 'react';
import MostPersistentCustomers from "../../../components/Dashborad/ShowDateOne/MostPersistentCustomers";

import DateCart from "./dateCart"

export default function ControlBag() {

  return (
    <div className="w-full overflow-x-hidden min-h-screen" dir='rtl'>
      <DateCart/>

      <Graph />

      <div className='w-full flex gap-[10px] h-[300px]'>
        <MostPersistentCustomers />
        <CustomerInquiries />
      </div>
    </div>
  );
}
