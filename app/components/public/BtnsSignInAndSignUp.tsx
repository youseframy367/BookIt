import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Link from "next/link";

export default function BtnsSignInAndSignUp() {
    const { t, i18n, mounted } = useTranslationSetup();

    return (
        <>
            <Link href="/login/logIn-your-account" className="border-2 border-[var(--strong-red)] bg-[var(--strong-red)] px-7 py-3 text-white hover:text-[var(--strong-red)] before:bg-white before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign in">
                <span className={`flex justify-center items-center relative z-1 text-base font-medium transition-all duration-800 whitespace-nowrap ${mounted ? i18n.language === 'ar' && "font-cairo" : ""}`}                    >
                    {mounted ? t('sign-in') : "..."}
                </span>
            </Link>
            <Link href="/role" className="border-2 border-[var(--strong-red)] bg-white px-7 py-3 text-[var(--strong-red)] hover:text-white before:bg-[var(--strong-red)] before:bottom-0 before:rounded-t-[50%] relative group rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%]" title="sign up">
                <span className={`flex justify-center items-center relative z-1 text-base font-medium transition-all duration-800 whitespace-nowrap ${mounted ? i18n.language === 'ar' && "font-cairo" : ""}`}
                >
                    {mounted ? t('sign-up') : "..."}
                </span>
            </Link>
        </>
    )
}