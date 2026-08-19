import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Image from "next/image";
import Link from "next/link";

export default function FooterBottom() {
    const { t, i18n, mounted } = useTranslationSetup();

    const links = [
        {
            title: t('privacy-policy'),
            link: "/privacy-policy"
        },
        {
            title: t('terms'),
            link: "/terms-of-use"
        }
    ]

    return (
        <div className="w-full border-t-1 border-t-[var(--color-show-news)] pb-25 pt-6 md:py-6">
            <div className="flex items-center justify-between w-full gap-3 md:gap-0">
                <div className="flex gap-3 items-center">
                    <Link href="">
                        <div className="relative w-[26px] h-[25px] md:w-[87px] md:h-[87px]">
                            <Image src="/media/shared/icons/logo-company.svg" alt="logo company" fill className="hidden md:block object-cover" />
                            <Image src="/media/shared/icons/logo-company-mobile.svg" alt="logo company" fill className="md:hidden object-cover" />
                        </div>
                    </Link>
                    <span className={`hidden md:block ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal text-sm`}>{mounted ? t('created') : '...'}</span>
                    <span className={`text-[6px] md:hidden ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal text-sm`}><span className="text-[var(--color-green)]">{mounted ? t('created-1') : '...'}</span>{mounted ? t('created-2') : '...'}</span>
                </div>
                <ul className="flex gap-[14px] md:gap-7 justify-center">
                    {
                        links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} title={mounted ? item.title : '...'}>
                                    <span className={`hover:text-[var(--strong-red)] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal text-[8px] md:text-lg`}>{mounted ? item.title : '...'}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}