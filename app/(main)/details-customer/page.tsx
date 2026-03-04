"use client";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import ContentDetailsCustomer from "../../components/DetailsCustomer/Content";
import Hero from "../../components/public/Hero";
import Submit from "../../components/public/Submit";

export default function DetailsCustomer() {
    const { i18n, t, mounted } = useTranslationSetup();

    function handleInformation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href = "/otp";
    }

    return (
        <>
            <Hero image="customer-content.svg" title={`${mounted ? t('custom-contact') : '...'}`} nextPage={true} />
            <ContentDetailsCustomer padding="p-10">
                <form action="" onSubmit={handleInformation} className="flex flex-col gap-7">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-10 text-center md:text-start">
                            <h2 className={`text-[var(--slate-gray)] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-md md:text-xl`}>{mounted ? t('custom-information') : '...'}</h2>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                <div className="w-full relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-xl font-medium">{mounted ? t('enter-name') : '...'}</span>
                                    </label>
                                    <input type="text" required className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('enter-name') : '...'} />
                                </div>
                                <div className="w-full relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-xl font-medium">{mounted ? t('enter-number') : '...'}</span>
                                    </label>
                                    <input type="number" required className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('enter-number') : '...'} />
                                </div>
                            </div>
                            <div className="flex gap-[20px]">
                                <div className="w-full md:w-[50%] relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-xl font-medium">{mounted ? t('enter-email') : '...'}</span>
                                    </label>
                                    <input type="email" required className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('enter-email') : '...'} />
                                </div>
                            </div>
                        </div>
                        <hr className="text-[var(--color-gray-medium-transparent)]" />
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-10 text-center md:text-start">
                            <h2 className={`text-[var(--slate-gray)] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} text-xs md:text-xl`}>{mounted ? t('reservation-preferences') : '...'}</h2>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                <div className="w-full relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-base font-medium">{mounted ? t('seating-preference') : '...'}</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('seating-preference') : '...'} />
                                </div>
                                <div className="w-full relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-base font-medium">{mounted ? t('special-occasion') : '...'}</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('special-occasion') : '...'} />
                                </div>
                            </div>
                            <div className="flex gap-[20px]">
                                <div className="w-full md:w-[50%] relative">
                                    <label className={`absolute bg-white px-2 top-[-14px] ${mounted ? i18n.language === 'ar' ? "font-cairo right-5" : "left-5" : ""}`}>
                                        <span className="text-[8px] md:text-[10px] md:text-base font-medium">{mounted ? t('special-notes') : '...'}</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-gray-medium-transparent)] rounded-[10px] p-3 md:p-5" placeholder={mounted ? t('special-notes') : '...'} />
                                </div>
                            </div>
                        </div>
                        <hr className="text-[var(--color-gray-medium-transparent)]" />
                        <div className="flex justify-center">
                            <Submit title={mounted ? t('continue-to-otp') : '...'} width="w-[712px]" />
                        </div>
                    </div>
                </form>
            </ContentDetailsCustomer>
        </>
    )
}