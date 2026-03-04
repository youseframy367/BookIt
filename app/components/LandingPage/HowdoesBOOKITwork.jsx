import Title from "./Title";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { useDataSystemBookIt } from "../../data/dataSystemBookit";

export default function HowBOOKwork() {
  const { t, mounted, i18n } = useTranslationSetup();
  const dataSystem = useDataSystemBookIt();

  return (
    <section>
      <div className="mt-10 md:mt-30">
        <div className="container">
          <div className="flex flex-col gap-5">
            <Title title={mounted ? t("how-does-work") : "..."} subTitle={mounted ? t("book-it") : "..."} />
            <div className="grid grid-cols-4 mt-8 gap-5 md:gap-0">
              {
                dataSystem.map((item, index) => {
                  return <div key={index} className="flex flex-col gap-5 md:gap-13 w-full items-center text-center">
                    <img src={`/assets/icons/${item.img}.png`} alt="work" className="h-[50px] md:h-[150px] object-cover" />
                    <span className={`leading-[20px] text-xs md:text-lg ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-[var(--slate-gray)]`}>{mounted ? item.text : "..."}</span>
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
