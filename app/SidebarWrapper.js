"use client";

import { useState } from "react";
import Sidebar from "./(dashboard)/partes/sidbar";
import ControlBag from "./(dashboard)/showDateOne/control/page";
import PopSeting from "./components/Dashborad/popSeting";
import TimeSupscribtion from "./(dashboard)/partes/time";
export default function MainLayout({ children }) {

  const dataHeader={
    name:"قصر الكبابجى",
    img :"/img/Ellipse 3255.svg",
    email:"youseframy367@gmail.com",
  }

  const [title, setTitle] = useState("لوحة التحكم الخاصة بإدارة BOOK IN");
  const [showSeting,setShowSeting]=useState(false)
const [smoleScreen, setSmoleScreen] = useState(false);

        return (
          <div className="flex w-full min-h-screen font-['Cairo']">
           
            <div className={smoleScreen ? "w-0 shrink-0" : "w-[20%] shrink-0 h-screen border border-gray-100 "}>
              <Sidebar setTitle={setTitle}  setSmoleScreen={setSmoleScreen}/>
            </div>
            <div className="flex-1 flex flex-col">
<header className={`fixed ${smoleScreen ? 'w-[100%]' : 'w-[80%]'} top-0 left-0 h-[70px] z-[999] bg-white flex items-center px-8 pt-7 pb-5 justify-between`}>           
       <h1 className={smoleScreen?" text-[#3D3D3D] font-bold mr-[50px]":"ml-[0px] text-[#3D3D3D] mt-[5px] text-[18px] "}>{title}</h1>
                <div className="flex gap-[16px] items-center">
                  <img src={dataHeader.img} className="w-[36px] h-[36px]"></img>
                  <div className="flex flex-col gap-[4px]">
                    <p className=" text-[10px]  font-[500] text-[#3D3D3D]">{dataHeader.name}</p>
                    <p className="text-[8px] font-[400] text-[rgba(61, 61, 61, 0.8)]"> {dataHeader.email} </p>
                  </div>
                  <div onClick={()=>{
                    setShowSeting(true)
                  }}>
                    <img src="/img/ChevronDown.svg" width='12px' height="12px" className={` transition-transform duration-300  cursor-pointer${showSeting ? "rotate-180" : ""}`}/>
                  </div>
                </div>
              </header>
               {showSeting &&(
              <PopSeting data={dataHeader}
              onClose={() => setShowSeting(false)}
              />
            )}
              <main className="flex-1 p-3 bg-[#f6f6f6] mt-[70px]">
                {children ?? <ControlBag />}
              </main>
            </div>
            {
              smoleScreen &&(
                <TimeSupscribtion typeScren={smoleScreen?"smool":"big"}/>
              )
            }
          </div>
        );
}