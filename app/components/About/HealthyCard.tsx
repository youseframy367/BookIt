import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";

export default function HealthyCard() {
    const { t, mounted, i18n } = useTranslationSetup();

    return (
        <section>
            <div className="remove-container container">
                <div className="md:mt-30 flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-50 md:gap-20">
                    <div className="container flex flex-col gap-2 md:gap-5" data-aos="fade-up">
                        <div className="md:w-[550px]">
                            <h2 className={`md:leading-[60px] font-medium text-[22px] md:text-[55px] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-PlayfairDisplay" : ""} text-[var(--color-dark-olive)]`}>{mounted ? t('we-provide') : '...'}</h2>
                        </div>
                        <div className="flex flex-col gap-2 text-xs md:text-base">
                            <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-DMSans_24pt" : ""} leading-[25px] font-normal text-[var(--color-gray-dark)]`}>{mounted ? t('we-love') : '...'}</span>
                            <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-DMSans_24pt" : ""} leading-[25px] font-normal text-[var(--color-gray-dark)]`}>{mounted ? t('now-we-growing') : '...'}</span>
                        </div>
                        <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-DMSans_24pt" : ""} leading-[25px] font-normal text-[var(--color-gray-dark)]`}>{mounted ? t('with-our') : '...'}</span>
                    </div>
                    <div className="w-full flex flex-col gap-5" data-aos="fade-up">
                        <div className="relative w-full h-[400px] md:h-[566px]">
                            <Image src="/assets/icons/healthy.svg" alt="healthy" fill className="object-cover md:rounded-[12px]" />
                            <div className={`flex flex-col gap-10 rounded-[12px] p-10 md:p-15 bg-[var(--color-dark-overlay)] absolute bottom-[-180px] md:bottom-[-100px] w-[90%] md:w-[unset] ${mounted ? i18n.language === 'ar' ? "right-[20px] md:right-[-40px]" : "left-[20px] md:left-[-40px]" : ""} text-white`}>
                                <h2 className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-DMSans_24pt" : ""} text-2xl font-bold`}>{mounted ? t('come-and-visit') : '...'}</h2>
                                <ul className="flex flex-col gap-8">
                                    <li className="flex">
                                        <a href="tel:+201055395693" className="flex gap-4 items-center">
                                            <div className="filter invert">
                                                <Image src="/assets/icons/phone.svg" alt="phone" width={20} height={20} />
                                            </div>
                                            <span className="text-base">+20 01055395693</span>
                                        </a>
                                    </li>
                                    <li className="flex">
                                        <a href="mailto:teamdevmaster930@gmail.com" className="flex gap-4 items-center">
                                            <Image src="/assets/icons/mail.svg" alt="mail" width={20} height={20} />
                                            <span className="text-base">teamdevmaster930@gmail.com</span>
                                        </a>
                                    </li>
                                    <li className="flex gap-4 items-center">
                                        <a href="" className="flex gap-4 items-center">
                                            <Image src="/assets/icons/location-marker.svg" alt="location-marker" width={20} height={20} />
                                            <span className="text-base">Cairo, Egypt</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}