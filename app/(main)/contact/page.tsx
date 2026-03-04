"use client";

import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import Content from "../../components/Contact/Content";
import Hero from "../../components/public/HeroContent";

export default function Contact() {
    const { t, mounted } = useTranslationSetup();

    return (
        <>
            <Hero title={`<span class='text-[var(--strong-red)]'>${mounted ? t('Connect') : '...'}</span> ${mounted ? t('with-us') : '...'}`} backgroundImage="contact" paddingMobile="py-22" />
            <Content />
        </>
    )
}