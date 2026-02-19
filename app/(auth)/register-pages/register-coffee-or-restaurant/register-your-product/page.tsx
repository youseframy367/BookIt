"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutLoginAndRegister from "@/app/components/layoutLoginAndRegister/LayoutLoginAndRegister";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";

export default function RegisterYourProduct() {
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            router.push("/PaymentMethod");
        } catch (err: any) {
            toast.error(err.response.data.data);
        } finally {
            setLoading(false);
        }
    }

    const [imageSrc, setImageSrc] = useState('/assets/icons/upload-image.svg');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            typeof reader.result === "string" && setImageSrc(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <section dir="rtl">
            <LayoutLoginAndRegister isActiveLogo={false} width="md:w-[1132px]" onSubmit={handleLogin} bg='bg-login.png'>
                <div className="font-cairo w-full flex flex-col gap-[20px]">
                    <p className="text-xl font-semibold ms-8">أدخل البيانات الخاصه بمكانك التجاري</p>
                    <div className="flex flex-col md:flex-row gap-[20px] shadow-[0_0px_2px_rgba(0,0,0,0.25)] p-[16px] bg-[#FEFEFE] rounded-[16px]">
                        <div className="m-[35px] bg-[rgba(42,80,187,0.05)] md:w-[210px] h-[256px] rounded-[20px] flex flex-col justify-center items-center">
                            <div className="relative w-[163px]">
                                <img src={imageSrc} width="163px" height="164px" alt="معاينة الصورة" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex justify-center items-center bg-[rgba(19,19,19,0.5)] text-[#fff] text-xs font-medium gap-[10px] w-[163px] h-[34px] rounded-[10px] mt-[-34px] relative z-[99] cursor-pointer"
                                >
                                    <img src="/assets/icons/uplod.svg" alt="أيقونة تحميل" />
                                    تحميل الصورة
                                </label>
                            </div>
                            <p className="text-[#6E7485] text-[400] leading-[16px] text-[8px] w-[178px] text-center mt-[15px]">
                                يجب العلم ان هذه الصوره ماهي الا صوره شخصيه لك فقط لن تظهر لأي شخص الا لمالك اللوحه            </p>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-col md:flex-row gap-[20px] md:w-[260px]">
                                <div className="w-full flex flex-col gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor="Email"
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="أدخل بريدك الإلكتروني"
                                        required
                                        id="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-col w-full gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >
                                        ادخل اسم المكان التجاري
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ادخل اسم المكان الخاص بك"
                                        required
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-col w-full gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >
                                        رقم الجوال
                                    </label>
                                    <input
                                        type="numbrt"
                                        placeholder="أدخل رقم الهاتف"
                                        required
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-[20px] flex-col md:flex-row w-[260px]">

                                <div className="flex flex-col w-full gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >
                                        رقم جوال اخر  ( اختياري )
                                    </label>
                                    <input
                                        type="numbrt"
                                        placeholder="أدخل رقم الهاتف"
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-col w-full gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >

                                        ادخل موقع المكان التجارى
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="مثال ( كافيه - مطعم )"
                                        required
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>

                                <div className="flex flex-col w-full gap-2 mb-2 mt-2">
                                    <label
                                        htmlFor=""
                                        className="text-[var(--color-label-input)] text-sm font-medium"
                                    >
                                        نوع التجاره الخاصه بك
                                    </label>
                                    <input
                                        type="numbrt"
                                        placeholder="أدخل رقم الهاتف"
                                        className="text-[var(--color-input)] px-3 py-3 border border-1 border-[var(--color-navbar)] rounded-lg"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col gap-[20px]">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        required
                                        checked={checkedOne}
                                        onChange={() => setCheckedOne(!checkedOne)}
                                    />

                                    <div
                                        className={`w-[20px] h-[20px] border-1 border-[#E9EAF0] rounded-[4px] 
                                            
                                                transition-all duration-200 relative
                                                `}
                                    >
                                        {checkedOne && (
                                            <div className="absolute z-10 w-full h-full">
                                                <img
                                                    src="/assets/icons/Checkbox.svg"
                                                    alt="صج"
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <span className={`text-[#8C94A3] text-[8px] text-[700] leading-[18px]`}>
                                        يقرّ صاحب المنشأة بأنه المسؤول الكامل عن جميع البيانات والمحتوى المعروض على الموقع (الأسعار، الصور، العروض، أوقات العمل، سياسات الحجز)، ويتحمّل أي تبعات قانونية أو شكاوى ناتجة عن معلومات غير دقيقة أو مضللة.      </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        required
                                        checked={checkedTwo}
                                        onChange={() => setCheckedTwo(!checkedTwo)}
                                    />

                                    <div
                                        className={`w-[20px] h-[20px] border-1 border-[#E9EAF0] rounded-[4px] 
                                            
                                                transition-all duration-200 relative
                                                `}
                                    >
                                        {checkedTwo && (
                                            <div className="absolute z-10 w-full h-full">
                                                <img
                                                    src="/assets/icons/Checkbox.svg"
                                                    alt="صج"
                                                    width={20}
                                                    height={20}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <span className={`text-[#8C94A3] text-[8px] text-[700] leading-[18px]`}>
                                        يلتزم صاحب المنشأة باستخدام لوحة التحكم لأغراض إدارة نشاطه فقط، وعدم إساءة استخدام النظام أو محاولة التلاعب بالبيانات أو الإضرار بالمنصة، ويحق للإدارة إيقاف الحساب في حال ثبوت أي مخالفة دون استرداد الاشتراك.

                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center my-4 text-[14px] text-[#fff]">
                        <Submit title="انتقل الي الخطوه التاليه" width="w-[330px]" loading={loading} />
                    </div>
                </div>
                <ToastContainer />
            </LayoutLoginAndRegister>
        </section>
    );
}