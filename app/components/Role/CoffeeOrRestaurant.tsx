"use client";
import { useState } from "react";
import Image from "next/image";

export default function CoffeOrRestaurant() {
    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState<"Coffee" | "Restaurant">("Coffee");

    function handlePageLoginOrRegister() {
        window.location.href = "/register-pages/register-coffee-or-restaurant/register";
    }

    return (
        <section>
            <div className="py-10 md:py-0 w-full md:h-screen flex flex-col items-center justify-center text-center">
                <div className="container">

                    {/* Title */}
                    <div className="flex flex-col justify-center items-center gap-5 md:gap-10">
                        <p className="text-[var(--color-red)] text-3xl md:text-6xl font-semibold">
                            حدد نوع الخدمه التي تريدها
                            {/* {mounted ? t("choose-services") : '...'} */}
                            {/* "choose-services": "Select the type of service you want", */}
                            {/* "choose-services": "حدد نوع الخدمه التي تريدها", */}
                        </p>

                        {/* Description */}
                        <p className="text-[16px] md:text-[22px] w-full md:w-[70%] text-[rgba(85,85,85,0.38)] font-normal leading-normal">
                            من فضلك اختر النوع المناسب لك للمتابعة. يمكنك تحديد نوع الحساب أو الخدمة التي تناسب احتياجاتك، وسيتم توجيهك للقالب الخاص بالمجال الخاص بك وكل هذا مرتبط باختياراتك للخطوات التالية بناءً على اختيارك
                            {/* "text-choose-services": "Please choose the type that suits you to continue. You can select the type of account or service that meets your needs, and you will be directed to the template for your specific field, all of which is linked to your choices for the next steps based on your selection.", */}
                            {/* {mounted ? t("text-choose-services") : '...'} */}
                            {/* "text-choose-services": "من فضلك اختر النوع المناسب لك للمتابعة. يمكنك تحديد نوع الحساب أو الخدمة التي تناسب احتياجاتك، وسيتم توجيهك للقالب الخاص بالمجال الخاص بك وكل هذا مرتبط باختياراتك للخطوات التالية بناءً على اختيارك", */}
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="flex gap-[30px] md:gap-[90px] mt-[40px] flex-wrap justify-center">

                        {/* Coffee */}
                        <div onClick={() => setRole("Coffee")}
                            className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Coffee"
                                    ? "border-4 border-[var(--color-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <Image src="/assets/icons/coffee.svg" width={124} height={30} alt="icon coffee" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Coffee" ? "text-[var(--color-active-choose)]" : "text-black"}`}>
                                هل هذا الحساب خاص بكافيه
                                {/* {mounted ? t("coffee") : '...'} */}
                                {/* "coffee": "هل هذا الحساب خاص بكافيه", */}
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                احصل علي القالب الخاص بالكافيه من هنا يمكنك اضافة منتجات الكافيه الخاص بك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا
                                {/* {mounted ? t("log-up-coffee") : '...'} */}
                                {/* "log-up-coffee": "Get the cafe template from here. You can add your cafe products, manage your reservations, and add your address, menu, and customer reviews from here.", */}
                                {/* "log-up-coffee": "احصل علي القالب الخاص بالكافيه من هنا يمكنك اضافة منتجات الكافيه الخاص بك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا", */}
                            </p>
                        </div>

                        {/* Business Owner */}
                        <div onClick={() => setRole("Restaurant")}
                            className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
             ${role === "Restaurant"
                                    ? "border-4 border-[var(--color-red)]"
                                    : "border border-[rgba(72,72,72,0.5)]"}`}
                        >
                            <img src="/assets/icons/fill-our-blog.svg" className="w-[124px]" />
                            <p className={`text-xl mt-4 mb-0 font-medium ${role === "Restaurant" ? "text-[var(--color-active-choose)]" : "text-black"}`}>
                                هل هذا الحساب خاص بمطعم
                                {/* {mounted ? t("role-restaurant") : '...'} */}
                                {/* "role-restaurant": "Is this account for a restaurant?", */}
                                {/* "role-restaurant": "هل هذا الحساب خاص بمطعم", */}
                            </p>
                            <p className="text-[14px] font-medium text-center m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                                "احصل علي القالب الخاص بالمطعم من هنا يمكنك اضافة منتجات مطعمك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا"
                                {/* "log-up-role-restaurant": "Get the restaurant template from here. You can add your restaurant's products, manage your reservations, and add your address, menu, and customer reviews from here.", */}
                                {/* {mounted ? t("log-up-role-restaurant") : '...'} */}
                                {/* "log-up-role-restaurant": "احصل علي القالب الخاص بالمطعم من هنا يمكنك اضافة منتجات مطعمك وادارة حجوزاتك واضافه العنوان الخاص بك والمنيو واراء العملاء من هنا", */}
                            </p>
                        </div>
                    </div>

                    {/* Start Button */}
                    <button disabled={isLoading}
                        onClick={() => handlePageLoginOrRegister()} className="mt-[47px] w-full md:w-[400px] cursor-pointer text-white font-normal text-xl bg-[var(--color-red)] px-2 py-3 rounded-xl">ابدأ الآن</button>
                    {/* {mounted ? t("start-now") : '...'} */}
                </div>
            </div>
        </section>
    );
}