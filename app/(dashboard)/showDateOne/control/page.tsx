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

      <div className='w-full flex flex-col md:flex-row gap-[10px] h-auto md:h-[300px]'>
        <MostPersistentCustomers />
        <CustomerInquiries />
      </div>
    </div>
  );
}
