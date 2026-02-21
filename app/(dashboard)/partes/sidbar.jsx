"use client";

//import { navigate } from "next/dist/client/components/segment-cache/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TimeSupscribtion from "./time";
//import LogOut from "../logOut";
export default function Sidebar({ setTitle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeListIndex, setActiveListIndex] = useState(null);
  const [logOut, setLogOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    activeIndex === 0 && router.push("/showDateOne/control");
  }, [activeIndex, router]);

  const navigat = [
    { name: "لوحه التحكم", navigate: '/showDateOne/control', title: "لوحة التحكم الخاصة بإدارة BOOK IN", icon: "/img/category-2.svg", iconActiv: "/img/qwqwwqq.svg" },
    { name: "طلبات الحجوزات", navigate: '/ReservationsRequestsTwo/AllReservations', title: "طلبات الحجوزات", icon: "/img/trackkkk 1.svg", iconActiv: "/img/ffdrffd.svg" },
    { name: "الأدوار والصلاحيات", navigate: '/access-and-roles', title: "الأدوار والصلاحيات", icon: "/assets/icons/roles.svg", iconActiv: "/assets/icons/white-roles.svg" }
  ]

  const handleClick = (item, i) => {
    if (item.name === "تسجيل الخروج") {
      setLogOut(true);
      return;
    }

    setActiveIndex(i);
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
      style={{
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        width: "20%",
        backgroundColor: "#fff",
        position: "fixed",
        height: "100vh",
        top: 0,
        right: 0,
        fontFamily: "'Cairo', sans-serif",
        boxSizing: "border-box",
        zIndex: 99,
      }}
    >
      {logOut && <LogOut onClose={() => setLogOut(false)} />}

      <TimeSupscribtion />


      {/* القوائم */}
      <div style={{ marginTop: "10px", width: "99%", marginLeft: "1%", padding: "5px" }}>
        {navigat.map((item, i) => {
          const isLogout = item.name === "تسجيل الخروج";
          const isActive = !isLogout && activeIndex === i;
          const isOpen = openDropdown === i;

          return (
            <div key={i} style={{ position: "relative" }}>
              {/* العنصر الرئيسي */}
              <div
                onClick={() => handleClick(item, i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "10px",
                  margin: "5px 0",
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#183866" : "transparent",
                  color: isLogout ? "#183866" : isActive ? "#fff" : "#131313",
                  border: isActive ? "1px solid rgba(30,30,30,0.1)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                <img
                  src={isActive ? item.iconActiv : item.icon}
                  alt={item.name}
                  width="20"
                  height="20"
                  style={{ marginLeft: "10px" }}
                />
                <span style={{ fontSize: "12px", fontWeight: "500", whiteSpace: "nowrap" }}>
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
                    style={{
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", // ✅ يلف السهم عند الفتح
                      marginRight: "auto", // يدفعه لأقصى اليسار في الـ RTL
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}




              </div>

              {/* القائمة الفرعية */}
              {item.list && (
                <div
                  style={{
                    maxHeight: isOpen ? "360px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <ul
                    style={{
                      margin: "5px 20px",
                      padding: "5px 10px",
                      listStyleType: "disc",
                      fontSize: "11px",
                      borderRadius: "6px",
                    }}
                  >
                    {item.list.map((sub, index) => (
                      <li
                        key={index}
                        style={{
                          cursor: "pointer",
                          padding: "5px 0",
                          color: activeListIndex === index ? "#183866" : "#333",
                        }}
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
