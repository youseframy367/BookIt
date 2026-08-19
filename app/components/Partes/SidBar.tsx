import { dataSidBar } from "@/app/TypeScript/TypeScript";
import { useState } from "react";

export default function Sidebar({ title, setTitle, setActiveComponent }: dataSidBar) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [activeListIndex, setActiveListIndex] = useState(null);
    // const navigate = useNavigate();

    const navigat = [
        { component: "control", name: "لوحه التحكم", navigat: "/dashbord", title: "لوحة التحكم الخاصة بإدارة BOOK IN", icon: "/media/dashboard/overview/grid.svg", iconActiv: "/media/dashboard/overview/grid-white.svg" },
        { component: "customers", name: "اجمالي عدد الاشتراكات والعملاء", navigat: "/dashbord/AllCustumer", title: "اجمالي عدد الاشتراكات والعملاء", icon: "/media/dashboard/overview/checklist.svg", iconActiv: "/media/dashboard/overview/filter-active.svg" },
        { component: "AllMoerators", name: "المشرفين", navigat: "/dashbord/AllMoerators", title: "المشرفين", icon: "/media/dashboard/team/moderators.svg", iconActiv: "/media/dashboard/team/moderators-white.svg" },
        { component: "Inquiries", name: "استفسارات العملاء", navigat: "/dashbord/Inquiries", title: "استفسارات العملاء", icon: "/media/shared/chat/message.svg", iconActiv: "/media/dashboard/reservations/search-document-white.svg" },
        {
            name: "اعدادات الموقع الالكتروني",
            title: "اعدادات الموقع الالكتروني",
            icon: "/media/shared/icons/site.svg",
            listIcon: "/media/shared/ui/chevron-down.svg",
            iconActiv: "/media/shared/icons/mapDashbord.svg",
            sliderIcon: "/media/shared/icons/ChevronDown.svg",
            list: [
                { title: "الصفحه الرئيسيه", navigat: "/HomeBage" },
                { title: "تعليقات العملاء", navigat: "/AllComent" },
                { title: "المدونه", navigat: "/AllBlog" },
                { title: "اكثر الحجوزات", navigat: "" },
                { title: "اللايكات", navigat: "" },
                { title: "الاسئله الشائعه", navigat: "" },
                { title: "شروط الاستخدام", navigat: "" },
                { title: "الفوتر", navigat: "" },
            ],
        },
        { name: "تسجيل الخروج", navigat: "/LogOut", title: "تسجيل الخروج", icon: "/media/shared/icons/SignOut.svg" },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                direction: "rtl",
                width: "20%",
                padding: "5px",
                backgroundColor: "#fff",
                position: "fixed",
                height: "100vh",
                top: 0,
                right: 0,
                fontFamily: "'Cairo', sans-serif",
                boxSizing: "border-box",
                zIndex: 9999,
            }}
        >
            {/* الشعار */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src="/media/shared/icons/logo.png" width="139" height="54" alt="Logo" />
            </div>

            <div style={{ border: "1px solid rgba(153, 150, 150, 0.1)", width: "100%", margin: "10px 0 50px" }}></div>

            {/* القوائم */}
            <div style={{ marginTop: "-40px", width: "99%", marginLeft: "1%", padding: 0 }}>
                {navigat.map((item, i) => {
                    const isActive = activeIndex === i;
                    const isOpen = openDropdown === i;

                    const handleClick = () => {
                        setActiveIndex(i);
                        setTitle(item.title);
                        setActiveComponent(item.component as "control" | "customers");

                        if (item.list) {
                            // لو عنده قائمة فرعية، افتح أو اقفل القائمة
                            setOpenDropdown(isOpen ? null : i);
                        } else {
                            // لو مش عنده قائمة فرعية، روح للصفحة
                            // navigate(item.navigat);
                            setOpenDropdown(null);
                        }
                    };

                    return (
                        <div key={i} style={{ position: "relative" }}>
                            <div
                                onClick={handleClick}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    padding: "10px",
                                    margin: "5px 0",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    backgroundColor: isActive ? "#183866" : "transparent",
                                    color: isActive ? "#fff" : "#131313",
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
                                <span style={{ fontSize: "12px", fontWeight: "500", whiteSpace: "nowrap" }}>{item.name}</span>
                                {item.listIcon && (
                                    <img
                                        src={isActive ? item.sliderIcon : item.listIcon}
                                        alt=""
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            margin: "5px 22%",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s",
                                        }}
                                    />
                                )}
                            </div>

                            {/* القائمة الفرعية المنسدلة */}
                            {item.list && (
                                <div
                                    style={{
                                        maxHeight: isOpen ? "300px" : "0px",
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
                                                    // navigate(sub.navigat);
                                                    // setActiveListIndex(index)
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
