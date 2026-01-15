"use client";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import Image from "next/image";

function ChoiceLog() {
    const [active, setActive] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsActive(false);
            window.location.href = "/login/logInYourAcount";
        }, 4000);
    };

    return (
        <div className="w-full h-full pb-[4%] flex flex-col items-center justify-center text-center bg-[#F8F5F9] font-[Poppins] overflow-hidden">

            {/* Logo */}
            <Image
                src="/assets/icons/logo-navbar.png"
                alt="logo"
                className="mt-[-10px]"
                width={180}
                height={160}
            />

            {/* Title */}
            <div className="flex flex-col justify-center items-center gap-10">
                <p className="text-[var(--color-red)] text-6xl font-semibold mt-[-50px]">
                    Choose Login Method
                </p>

                {/* Description */}
                <p className="text-[22px] w-[70%] text-[rgba(85,85,85,0.38)] font-normal leading-normal">
                    Join our platform as a restaurant owner to manage all your operations
                    effortlessly, from tracking orders and updating your menu to managing
                    reservations and delivering the best experience to your customers
                </p>
            </div>

            {/* Cards */}
            <div className="flex gap-[90px] m-[30px] flex-wrap justify-center">

                {/* Customer */}
                <div
                    onClick={() => setActive(true)}
                    className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
          ${active ? "border-4 border-[var(--color-red)]" : "border border-[rgba(16,24,40,0.05)]"}`}
                >
                    <Image src="/assets/icons/iconUser.png" width={124} height={30} alt="icon user" />
                    <p className={`text-xl mt-4 mb-0 font-medium ${active ? "text-[var(--color-active-choose)]" : "text-black"}`}>
                        Are you a customer
                    </p>
                    <p className="text-[10px] font-medium text-center leading-none m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                        Log in to explore diverse menus, place orders effortlessly, track
                        your current orders, and enjoy a seamless and delightful dining
                        experience
                    </p>
                </div>

                {/* Business Owner */}
                <div
                    onClick={() => setActive(false)}
                    className={`w-[360px] h-[281px] rounded-[15px] flex flex-col items-center justify-center cursor-pointer
          ${active ? "border border-[rgba(72,72,72,0.5)]" : "border-4 border-[var(--color-red)]"}`}
                >
                    <img src="/assets/icons/onerIcon.png" className="w-[124px]" />
                    <p className={`text-xl mt-4 mb-0 font-medium ${active ? "text-black" : "text-[#BF360C]"}`}>
                        Are you a business owner
                    </p>
                    <p className="text-[10px] font-medium text-center leading-none m-[5%] w-[90%] text-[rgba(85,85,85,0.38)]">
                        Join our platform to efficiently manage your restaurant, from
                        tracking orders and updating menus to organizing reservations and
                        delivering an exceptional experience to your customers
                    </p>
                </div>

            </div>

            {/* Start Button */}
            <button disabled={isLoading}
                onClick={() => {
                    setIsActive(true);
                    handleStart();
                }} className={`w-[400px] cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-2 py-3 rounded-xl`}>Start Now</button>

            {/* Loader Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-[rgba(22,22,22,0.3)] flex items-end justify-center pb-[5%]">
                    <Oval height={60} width={60} color="#E22023" />
                </div>
            )}

        </div>
    );
}

export default ChoiceLog;

// import Hero from "./components/menu/Hero";
// import Products from "./components/menu/Products";

// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <Products />
//     </>
//   );
// }
