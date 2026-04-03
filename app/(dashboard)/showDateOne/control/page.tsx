"use client";

import Graph from "../../../components/Dashborad/ShowDateOne/graph";
import CustomerInquiries from "../../../components/Dashborad/ShowDateOne/CustomerInquiries";
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
