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
            <div className="flex-col md:flex-row flex items-center justify-between w-full gap-3 md:gap-0">
                <div className="flex gap-3 items-center">
                    <Link href="">
                        <Image src="/assets/icons/logo-company.svg" alt="logo company" width={87} height={87} className="object-cover" />
                    </Link>
                    <span className={`${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal text-sm`}>{mounted ? t('created') : '...'}</span>
                </div>
                <ul className="flex gap-7 flex-wrap justify-center">
                    {
                        links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} title={mounted ? item.title : '...'}>
                                    <span className={`hover:text-[var(--strong-red)] ${mounted ? i18n.language === 'ar' ? "font-cairo" : "font-rubik" : ""} font-normal text-lg`}>{mounted ? item.title : '...'}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}