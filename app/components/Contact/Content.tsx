import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";

export default function Content() {
    const { i18n, t, mounted } = useTranslationSetup();

    return (
        <section>
            <div className="mt-10">
                <div className="container">
                    <div className="flex flex-col gap-2 md:gap-5">
                        <h2 className="font-semibold text-2xl md:text-[44px]"><span className="text-[var(--color-red)]">{mounted ? t('Connect') : '...'}</span> {mounted ? t('with-us') : '...'}</h2>
                        <span className="text-[var(--color-not-active)] text-md md:text-3xl font-normal">{mounted ? t('fill-out') : '...'}</span>
                    </div>
                    <div className="p-5 md:p-10 mt-5 md:mt-15 border border-6 border-[var(--color-reviews)] rounded-2xl shadow-lg">
                        <form action="" className="flex flex-col gap-7">
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                {mounted ? t('name') : '...'}
                                            </label>
                                            <input type="text" required className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-name') : '...'} />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                {mounted ? t('email') : '...'}
                                            </label>
                                            <input type="email" required className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-email') : '...'} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                {mounted ? t('phone-number') : '...'}
                                            </label>
                                            <input type="number" required className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('enter-number') : '...'} />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                {mounted ? t('enter-number-2') : '...'}
                                            </label>
                                            <input type="number" required className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-3 md:px-5 md:py-7" placeholder={mounted ? t('please-enter-number-2') : '...'} />
                                        </div>
                                    </div>
                                    <div className="w-full relative flex flex-col gap-3">
                                        <label className="text-[var(--color-text-footer)] text-base font-medium">
                                            {mounted ? t('subject') : '...'}
                                        </label>
                                        <textarea className="resize-none w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-3 md:px-5 md:py-7 h-[300px]" placeholder={mounted ? t('enter-subject') : '...'}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="relative flex gap-5 rounded-full border border-1 border-[var(--color-not-active)] rounded-[10px]">
                                    <input value={mounted ? t('Send') : '...'} type="submit" className="text-[var(--color-text-footer)] ps-5 pe-13 py-3 cursor-pointer" />
                                    <Image src="/assets/icons/arrow-up.svg" alt="arraw up" width={20} height={20} className={`absolute ${mounted ? i18n.language === 'ar' ? "left-6 rotate-[-75deg]" : "right-6" : ""} top-[13px]`} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}