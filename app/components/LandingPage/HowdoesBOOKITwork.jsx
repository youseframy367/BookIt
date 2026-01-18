import Image from "next/image";
import Title from "./Title";

export default function HowBOOKwork() {
  const steps = [
    { img: "it-work-1", text: "Discover the perfect restaurant for any occasion" },
    { img: "it-work-2", text: "Easily manage your reservations" },
    { img: "it-work-3", text: "Full visibility into available reservations; timely notifications" },
    { img: "it-work-4", text: "Earn rewards for dining out" },
  ];

  return (
    <section>
      <div className="mt-30">
        <div className="container">
          <div className="flex flex-col gap-5">
            <Title title="How does BOOK IT work?" subTitle="Book your table in just a few simple steps and enjoy a seamless dining experience." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-8">
              {
                steps.map((item, index) => {
                  return <div key={index} className="flex flex-col gap-7 w-full items-center justify-between text-center">
                    <img src={`/assets/icons/${item.img}.png`}  alt="work" />
                    {/* <div className="w-full h-full relative">
                      <Image src={`/assets/icons/${item.img}.png`} alt="work" fill className="object-contain" />
                    </div> */}
                    <span className="text-xl text-[var(--color-text-footer)]">{item.text}</span>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
