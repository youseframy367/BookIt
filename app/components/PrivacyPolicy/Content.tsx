"use client";

import { usePrivacyPolicyData } from "@/app/data/dataPrivacyPolicy";
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export default function Content() {
    const { i18n, mounted } = useTranslationSetup();
    const itemsPrivacyPolicy = usePrivacyPolicyData();

    return (
        <section>
            <div className="container">
                <div className="mt-5 flex flex-col gap-10">
                    <h2 className={`
   text-[42px] font-normal
    bg-gradient-to-r    
    via-red-100
    via-red-200    
    bg-clip-text
    text-transparent
    ${mounted ? i18n.language === 'ar' ? "to-[var(--strong-red)] from-transparent" :"from-[var(--strong-red)] to-transparent" : ""}
    `}>
                        Privacy Policy
                    </h2>
                    <ul className="flex flex-col gap-10">
                        {
                            itemsPrivacyPolicy.map((item, index) => {
                                return <li key={index} className="flex flex-col gap-5 text-base font-normal">
                                    <h2>{item.title}</h2>
                                    <span className="opacity-[0.5] leading-[28px]">{item.text}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}