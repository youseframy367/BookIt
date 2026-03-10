"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import TimeSupscribtion from "./time";
import Image from "next/image";
import Link from "next/link";

interface typeTitle {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({ setTitle }: typeTitle) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeListIndex, setActiveListIndex] = useState<number | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const navigat = [
    { name: "لوحه التحكم", navigate: '/showDateOne/control', title: "لوحة التحكم الخاصة بإدارة BOOK IN", icon: "/img/category-2.svg", iconActiv: "/img/qwqwwqq.svg" },
    { name: "طلبات الحجوزات", navigate: '/ReservationsRequestsTwo/Rejectedbookings', title: "طلبات الحجوزات", icon: "/img/trackkkk 1.svg", iconActiv: "/img/ffdrffd.svg" },
    { name: "الأدوار والصلاحيات", navigate: '/access-and-roles', title: "الأدوار والصلاحيات", icon: "/assets/icons/roles.svg", iconActiv: "/assets/icons/white-roles.svg" },
    { name: 'المشرفين', navigate: "/ModeratorsFor/AllMoerators", title: 'المشرفين', icon: "/img/modetorIcon.svg", iconActiv: "/img/modetorIconActiv.svg" },
    { name: "التقارير", navigate: "/Reports/AllReports", title: " التقارير ", icon: "/img/Vector-10888.svg", iconActiv: "/img/Vector-145455.svg" },
    {
      name: "المخزون",
      navigate: '/inventory',
      title: "المخزون",
      icon: "/assets/icons/inventory.svg",
      iconActiv: "/assets/icons/inventory-white.svg",
      list: [
        { title: "اضافة منتج جديد للمخزون", navigate: "/inventory/add-inventory" },
        { title: "الجرد اليوميي", navigate: "/inventory/daily-inventory" },
        { title: "تقارير المخزون", navigate: "/3" },
        { title: "الموردون", navigate: "/4" },
        { title: "تحويل المخزون بين الفروع", navigate: "/5" }
      ]
    },
    {
      name: "الكاشير",
      navigate: '/cashier',
      title: "الكاشير",
      icon: "/assets/icons/cashier.svg",
      iconActiv: "/assets/icons/cashier-active.svg",
      list: [
        { title: "عمليات الكاشير المسجله", navigate: "/cashier/products" },
        { title: "نقاط البيع", navigate: "/cashier/customers" },
        { title: "اعدادات الكاشير", navigate: "/cashier/sales" }
      ]
    }
  ];

  const getActiveIndex = () => {
    return navigat.findIndex(item => {
      if (pathname === item.navigate) return true;
      if (item.list) {
        return item.list.some(sub => pathname === sub.navigate || pathname.startsWith(sub.navigate));
      }
      return false;
    });
  };

  const activeIndex = getActiveIndex();

  const handleClick = (item: any, i: any) => {
    setTitle(item.title);

    if (item.list) {
      setOpenDropdown(openDropdown === i ? null : i);
      if (item.navigate) router.push(item.navigate);
    } else {
      setOpenDropdown(null);
      router.push(item.navigate);
    }
  };

  useEffect(() => {
    if (activeIndex !== -1) {
      const activeItem = navigat[activeIndex];
      if (activeItem.list) {
        setOpenDropdown(activeIndex);
        const subIndex = activeItem.list.findIndex(sub => pathname === sub.navigate);
        setActiveListIndex(subIndex !== -1 ? subIndex : null);
      } else {
        setOpenDropdown(null);
        setActiveListIndex(null);
      }
    } else {
      setOpenDropdown(null);
      setActiveListIndex(null);
    }
  }, [pathname]);

  return (
    <div className="pb-[35px] flex flex-col justify-between w-[20%] bg-[#fff] fixed h-full top-0 right-0 z-[99]">
      <div className="flex flex-col">
        <TimeSupscribtion />

        <div className="mt-[10px] w-[99%] ml-[1%] p-[5px]">
          {navigat.map((item, i) => {
            const isActive = activeIndex === i;
            const isOpen = openDropdown === i;

            return (
              <div key={i} className="elative">
                <div
                  onClick={() => handleClick(item, i)}
                  className={`transition-all duration-300 ${isActive ? 'text-[#fff]' : 'text-[#131313]'} ${isActive ? 'border border-[rgba(30,30,30,0.1)] bg-[#183866]' : 'border-0 bg-transparent'} flex items-center justify-start p-[10px] mx-[5px] cursor-pointer rounded-[8px]`}
                >
                  <img src={isActive ? item.iconActiv : item.icon} alt={item.name} className="ml-[14px] w-[20px] h-[22px]" />
                  <span className="text-[12px] font-normal text-nowrap">{item.name}</span>

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
                      className={`mr-[auto] ${isOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </div>

                {item.list && isOpen && (
                  <div className="mx-5">
                    <ul className="list-disc text-[11px] rounded-[6px] mx-[5px] flex flex-col gap-3 px-[5px] py-[10px] mt-2">
                      {item.list.map((sub, index) => {
                        const isActive = pathname === sub.navigate;

                        return <li
                          title={sub.title}
                          key={index}
                          className={`${isActive ? 'text-[var(--color-dark-blue-gray)]' : 'text-[var(--color-gray-medium-three)]'} cursor-pointer px-[5px] text-[10px] font-normal`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveListIndex(index);
                            setTitle(sub.title);
                            router.push(sub.navigate);
                          }}
                        >
                          {sub.title}
                        </li>
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[24px] mx-5">
        <Link href="/showDateOne/Portfolio" className="flex gap-[13px] items-center" title="الملف الشخصي">
          <Image src="/assets/icons/profile.svg" alt="profile" width={20} height={20} />
          <span className="font-normal text-xs text-[var(--color-dark-blue-gray)]">الملف الشخصي</span>
        </Link>
        <Link href="/" className="flex gap-[13px] items-center" title="تسجيل الخروج">
          <Image src="/assets/icons/sign-out.svg" alt="sign out" width={20} height={20} />
          <span className="font-normal text-xs text-[var(--color-red-bright-three)]">تسجيل الخروج</span>
        </Link>
      </div>
    </div>
  );
}