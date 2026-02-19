import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Rating from "./Rating";
import Reivews from "./Reivews";

export default function ContentRatingAndReviews() {
    const { t, i18n, mounted } = useTranslationSetup();
    
    return (
        <section>
            <div className="container-content">
                <div className="flex flex-col gap-10 mt-[96px]">
                    <div data-aos="fade-up" className="text-center">
                        <h2 className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-Roboto" : ""} text-3xl font-normal opacity-[0.7]`}>{mounted ? t("what-people-say") : ""}</h2>
                    </div>
                    <Rating />
                    <Reivews />
                </div>
            </div>
        </section>
    )
}