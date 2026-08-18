"use client";
/* ============================== منتجات المنيو — زر القلب (المفضلة) حقيقي ==============================
   GET /public/favorites → قائمة المفضلة → القلب الممتلئ للأصناف المفضلة
   POST/DELETE /public/favorites/:businessId → إضافة/إزالة المفضل (يتطلب توكن عميل)
   بدون توكن: يبقى السلوك المحلي فقط (قلب ملون) مع رسالة تحذيرية
   ============================================================================ */
import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { isProducts } from "@/app/TypeScript/TypeScript";
import { publicApi } from "@/utils/api";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Products({ products, marginTop }: isProducts) {
    const { mounted, i18n, t } = useTranslationSetup();

    /* أصناف مفضلة محلية (fallback) + مفضلة حقيقية من الباك إند */
    const [favorites, setFavorites] = useState<number[]>([]);
    const [serverFavorites, setServerFavorites] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await publicApi.favorites();
                if (Array.isArray(data)) {
                    setServerFavorites(
                        data.map((f: any) => String((f.business || f)?.id || f.id))
                    );
                }
            } catch (e) {
                /* لا يوجد توكن أو فشل الاتصال — يبقى القلب محلي فقط */
            }
        })();
    }, []);

    /* حالة القلب: ممتلئ لو كان في المفضلة الحقيقية أو المحلية */
    const isFavorite = (id: number) => serverFavorites.includes(String(id)) || favorites.includes(id);

    const toggleFavorite = (id: number) => {
        const idStr = String(id);
        if (serverFavorites.length > 0 || favorites.length > 0) {
            /* يوجد مفضلة حقيقية من الباك إند → حدّث عبر الـ API */
            const removing = isFavorite(id);
            setServerFavorites(prev => (removing ? prev.filter(i => i !== idStr) : [...prev, idStr]));
            publicApi[removing ? "removeFavorite" : "addFavorite"](idStr)
                .catch((e: any) => {
                    console.error(e);
                    toast.error(mounted ? "فشل تحديث المفضلة — يرجى تسجيل الدخول" : "Please sign in to save favorites");
                });
        } else {
            /* بدون توكن: تحديث محلي فقط */
            setFavorites(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
        }
    };

    return (
        <section>
            <div className={`container-content mt-10 md:mt-15 ${marginTop}`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
                    {
                        products.map((item, index) => {
                            return <div data-aos="fade-up" key={index} className="min-h-[200px] rounded-[25px] flex flex-col bg-white shadow-[0_0_12px_rgba(0,0,0,0.15)]">
                                <div className={`flex ${mounted ? i18n.language === 'en' && "justify-end" : ""}`}>
                                    <div className={`${mounted ? i18n.language === 'ar' ? "rounded-tl-[25px] rounded-br-[25px]" : "rounded-tr-[25px] rounded-bl-[25px]" : ""} bg-[var(--strong-red)] p-3 cursor-pointer`} onClick={() => toggleFavorite(item.id)}>
                                        <div className="relative w-[15px] h-[15px] md:w-[24px] md:h-[24px]">
                                            <Image
                                                src={`/assets/icons/${isFavorite(item.id) ? "full-heart" : "heart"}.svg`}
                                                alt="heart"
                                                fill
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-full flex flex-col md:gap-3">
                                    <div className="flex justify-center items-center">
                                        <div className="relative w-[105px] md:w-[250px] h-[95px] md:h-[250px]">
                                            <Image src={`/assets/icons/${item.icon}.svg`} alt="fattoush salad" fill className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="h-full p-5 flex flex-col justify-between gap-3">
                                        <h2 className="font-semibold text-lg md:text-3xl">{mounted ? item.title : '...'}</h2>
                                        <span className="text-[var(--dark-gray)] font-semibold text-xs md:text-[22px]">{mounted ? item.subTitle : '...'}</span>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-lg md:text-3xl"><span className={`${mounted ? i18n.language === 'ar' && "font-ArefRuqaa" : ""} text-2xl text-[var(--strong-red)]`}>{mounted ? t("currency") : '...'}</span> {item.amount} </span>
                                            <div className="flex items-center gap-2">
                                                <Image src="/assets/icons/star.svg" alt="star" width={24} height={24} />
                                                <span className="font-semibold text-base md:text-[22px] text-[var(--dark-charcoal)]">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}