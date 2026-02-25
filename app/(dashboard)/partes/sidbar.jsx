"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import TimeSupscribtion from "./time";
// import LogOut from "../logOut";
export default function Sidebar({ setTitle }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeListIndex, setActiveListIndex] = useState(null);
  const [logOut, setLogOut] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const navigat = [
    { name: "لوحه التحكم", navigate: '/showDateOne/control', title: "لوحة التحكم الخاصة بإدارة BOOK IN", icon: "/img/category-2.svg", iconActiv: "/img/qwqwwqq.svg" },
    { name: "طلبات الحجوزات", navigate: '/ReservationsRequestsTwo/AllReservations', title: "طلبات الحجوزات", icon: "/img/trackkkk 1.svg", iconActiv: "/img/ffdrffd.svg" },
    { name: "الأدوار والصلاحيات", navigate: '/access-and-roles', title: "الأدوار والصلاحيات", icon: "/assets/icons/roles.svg", iconActiv: "/assets/icons/white-roles.svg" },
    { name: "الكاشير", navigate: '/cashier', title: "الكاشير", icon: "/assets/icons/cashier.svg", iconActiv: "/assets/icons/cashier-active.svg" }
  ]

  const getActiveIndex = () => {
    return navigat.findIndex(item => pathname.startsWith(item.navigate));
  };

  const activeIndex = getActiveIndex();

  const handleClick = (item, i) => {
    if (item.name === "تسجيل الخروج") {
      setLogOut(true);
      return;
    }

    setTitle(item.title);

    if (item.list) {
      setOpenDropdown(openDropdown === i ? null : i);
    } else {
      setOpenDropdown(null);
      router.push(item.navigate);
    }
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col w-[20%] bg-[#fff] fixed h-full top-0 right-0 z-[99]"
    >
      {/* {logOut && <LogOut onClose={() => setLogOut(false)} />} */}

      <TimeSupscribtion />


      {/* القوائم */}
      <div className="mt-[10px] w-[99%] ml-[1%] p-[5px]">
        {navigat.map((item, i) => {
          const isLogout = item.name === "تسجيل الخروج";
          const isActive = !isLogout && activeIndex === i;
          const isOpen = openDropdown === i;

          return (
            <div key={i} className="relative">
              {/* العنصر الرئيسي */}
              <div
                onClick={() => handleClick(item, i)}
                className={`transition-all duration-300 ${isLogout ? 'text-[#183866]' : isActive ? 'text-[#fff]' : 'text-[#131313]'} ${isActive ? 'brder border-1 border-[rgba(30,30,30,0.1)] bg-[#183866]' : 'border-0 bg-transparent'} flex items-center justify-start p-[10px] mx-[5px] cursor-pointer rounded-[8px]`}
              >
                <img
                  src={isActive ? item.iconActiv : item.icon}
                  alt={item.name}
                  className="ml-[14px] w-[20px] h-[22px]"
                />
                <span className="text-[12px] font-normal text-nowrap">
                  {item.name}
                </span>




                {item.list && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`mr-[auto] ${isOpen ? "rotate(180deg)" : "rotate(0deg)"} transition-all duration-300`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}




              </div>

              {/* القائمة الفرعية */}
              {item.list && (
                <div
                  className={`overflow-hidden ${isOpen ? 'max-h-[360px]' : 'max-h-0'}`}
                >
                  {/* style={{
                    transition: "max-height 0.4s ease",
                  }} */}
                  
                      {/* listStyleType: "disc", */}
                  <ul
                  className="text-[11px] rounded-[6px] mx-[5px] my-[20px] px-[5px] py-[10px]"
                  >
                    {item.list.map((sub, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer px-[5px] ${activeListIndex === index ? 'text-[#183866]' : 'text-[#333]'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveListIndex(index);
                          setTitle(sub.title);
                          router.push(sub.navigate);
                        }}
                      >
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
