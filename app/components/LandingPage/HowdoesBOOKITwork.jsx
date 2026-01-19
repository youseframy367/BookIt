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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-8 gap-5 md:gap-0">
              {
                steps.map((item, index) => {
                  return <div key={index} className="flex flex-col gap-13 w-full items-center text-center">
                    <img src={`/assets/icons/${item.img}.png`} alt="work" className="h-[150px] object-cover" />
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
