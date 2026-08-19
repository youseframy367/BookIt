"use client";
import { useState } from "react";
import Image from "next/image";

export default function CoffeOrRestaurant() {
    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState<"Coffee" | "Restaurant">("Coffee");

    function handlePageLoginOrRegister() {
        /* نحفظ نوع الحساب المختار (Coffee/Restaurant) ليرسله الفرونت للباك كـ businessType */
        localStorage.setItem("businessRole", role);
        window.location.href = "/register-pages/register-coffee-or-restaurant/register";
    }

    return (
        <section>
            <div className="py-10 md:py-0 w-full md:h-screen flex flex-col items-center justify-center text-center">
                <div className="container">

                    <div className="flex flex-col justify-center items-center gap-5 md:gap-10">
                        <p className="text-[var(--strong-red)] text-3xl md:text-6xl font-semibold">
                            حدد نوع الخدمه التي تريدها
                        </p>

                        <p className="text-[16px] md:text-[22px] w-full md:w-[70%] text-[rgba(85,85,85,0.38)] font-normal leading-normal">
                            من فضلك اختر النوع المناسب لك للمتابعة. يمكنك تحديد نوع الحساب أو الخدمة التي تناسب احتياجاتك، وسيتم توجيهك للقالب الخاص بالمجال الخاص بك وكل هذا مرتبط باختياراتك للخطوات التالية بناءً على اختيارك
                        </p>
                    </div>

                    <div className="flex gap-[30px] md:gap-[90px] mt-[40px] flex-wrap justify-center">

                        <div onClick={() => setRole("Coffee")}
                            className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Coffee"
                                    ? "border-4 border-[var(--strong-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <Image src="/media/shared/icons/coffee.svg" width={124} height={30} alt="icon coffee" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Coffee" ? "text-[var(--color-red-dark)]" : "text-black"}`}>
                                هل هذا الحساب خاص بكافيه
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                احصل علي القالب الخاص بالكافيه من هنا يمكنك اضافة منتجات الكافيه الخاص بك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا
                            </p>
                        </div>

                        <div onClick={() => setRole("Restaurant")}
                            className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Restaurant"
                                    ? "border-4 border-[var(--strong-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <img src="/media/shared/icons/fill-our-blog.svg" className="w-[124px]" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Restaurant" ? "text-[var(--color-red-dark)]" : "text-black"}`}>
                                هل هذا الحساب خاص بمطعم
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                "احصل علي القالب الخاص بالمطعم من هنا يمكنك اضافة منتجات مطعمك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا"
                            </p>
                        </div>
                    </div>

                    <button disabled={isLoading}
                        onClick={() => handlePageLoginOrRegister()} className="mt-[47px] w-full md:w-[400px] cursor-pointer text-white font-normal text-xl bg-[var(--color-red-bold)] px-2 py-2 rounded-xl">ابدأ الآن</button>

                    <div className="flex justify-center items-center mt-[40px]">
                        <div className="flex flex-row-reverse -space-x-3 [&>*]:relative [&>*]:z-10 [&>*]:-ml-3">
                            {[
                                "/media/shared/icons/user-1.svg",
                                "/media/shared/icons/avatar-1.svg",
                                "/media/shared/icons/avatar-2.svg",
                                "/media/shared/icons/avatar-3.svg",
                                "/media/shared/icons/avatar-4.svg",
                            ].map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt="users"
                                    width={32}
                                    height={32}
                                    className={`animate-slide-up-fade`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                />
                            ))}

                            <div
                                className="text-[10px] w-[32px] h-[32px] rounded-full bg-gray-200 flex items-center justify-center border-4 border-white text-gray-700 font-semibold animate-slide-up-fade"
                                style={{ animationDelay: `${5 * 0.1}s` }}
                            >
                                +30K
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}