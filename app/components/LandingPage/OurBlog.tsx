import Image from "next/image";
import Title from "./Title";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function OurBlog() {
  const { t, mounted, i18n } = useTranslationSetup();

  return (
    <section>
      <div className="container">
        <div className="mt-10 md:mt-30" data-aos="fade-up">
          <Title title={mounted ? t("our-blog") : "..."} subTitle={mounted ? t("text-our-blog") : "..."} />
          <div className="grid md:grid-cols-[5fr_8.3fr] gap-10 md:gap-34 mt-12">
            <div className="h-[500px] md:h-[400px] md:h-auto w-full relative">
              <Image src="/assets/icons/our-blog.png" alt="our blog" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-[10px] md:gap-[37px] text-[var(--color-footer)]">
              <p className={`text-xl md:text-[40px] md:leading-[70px] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-PlayfairDisplay" : ""} font-normal`}>
                {mounted ? t("question-our-blog") : "..."}
              </p>
              <p className={`opacity-[0.5] text-sm md:text-xl leading-[36px] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal`}>
                {mounted ? t("text-question-our-blog") : "..."}                
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
