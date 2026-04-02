"use client";

const cardsData = [
  {
    title: "اجمالي مبيعات الكاشير هذا الشهر",
    total: "123,575,456",
    totalSuffix: "EGP",
    subLabel: "عدد المبيعات هذا اليوم",
    subValue: "1452",
    subSuffix: "EGP",
    changeValue: -92.8,
    icon: "/img/Frame 1686551849.svg",
    iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات الملغيه",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "اجمالي الحجوزات الملغيه هذا الشهر",
    subValue: "142",
    subSuffix: null,
    changeValue: 92.8,
    icon: "/img/Frame 322.svg",
    iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات الناجحه",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "اجمالي الحجوزات هذا الشهر",
    subValue: "1452",
    subSuffix: null,
    changeValue: -92.8,
    icon: "/img/rerreer.svg",
    iconClass: "w-[52px] h-[48px] absolute top-[10px] left-[10px] z-10",
  },
  {
    title: "اجمالي الحجوزات",
    total: "123,575,456",
    totalSuffix: null,
    subLabel: "عدد الحجوزات هذا الشهر",
    subValue: "1452",
    subSuffix: null,
    changeValue: 92.8,
    icon: "/img/Frame 1686553822.svg",
    iconClass: "w-[52px] h-[52px] absolute top-[10px] left-[10px] z-10",
  },
];

export default function DateCart() {
  return (
    <div className="w-full overflow-x-hidden font-['Cairo',sans-serif]" dir="rtl">
      <ul className="flex flex-row flex-nowrap justify-between w-full p-[0.4rem]">

        {cardsData.map((card, index) => {
          const isPositive = card.changeValue >= 0;
          return (
            <li
              key={index}
              className="flex justify-between border border-black/10 px-[10px] py-[12px] rounded-[8px] bg-white w-[24.3%] h-[142px] relative"
            >

              <div className="flex flex-col gap-[6px]">

                <p className="text-[10px] font-normal text-[#504f4fcc]">
                  {card.title}
                </p>

                <p className="font-bold text-[#131313] my-[7px] text-[16px]">
                  {card.total}
                  {card.totalSuffix && (
                    <span className="font-bold text-[#1B8354]"> {card.totalSuffix}</span>
                  )}
                </p>

                <div className="flex flex-col gap-[10px] mt-[10px]">

                  <p className="text-[12px] font-semibold text-[#3D3D3D] whitespace-nowrap" dir="rtl">
                    <span>{card.subValue}</span>
                    {card.subSuffix && (
                      <span className="text-[12px] text-[#1B8354] font-bold"> {card.subSuffix}</span>
                    )}
                    {" "}{card.subLabel}
                  </p>

                  <p className="flex gap-[5px] items-center text-[8px] font-normal text-[#3D3D3D]">
                    <img
                      src={isPositive ? "/img/ewerwft.svg" : "/img/gfgf.svg"}
                      alt="trend"
                    />
                    <span className={isPositive ? "text-green-600" : "text-red-600"}>
                      {card.changeValue}
                    </span>
                    أعلى من الشهر الماضي
                  </p>

                </div>
              </div>

              <img
                src={card.icon}
                alt="icon"
                className={card.iconClass}
              />

            </li>
          );
        })}

      </ul>
    </div>
  );
}