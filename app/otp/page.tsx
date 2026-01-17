"use client";
import ContentDetailsCustomer from "../components/DetailsCustomer/Content";
import Hero from "../components/public/Hero";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Submit from "../components/public/Submit";

function Otp() {
    const [otp, setOtp] = useState("");

    function handleotp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href = "/otp";
    }

    return (
        <>
            <Hero image="bg-otp" title="Verification Code" />
            <ContentDetailsCustomer padding="p-5 md:p-30">
                <form action="" onSubmit={handleotp} className="flex flex-col gap-15">
                    <div className="flex flex-col md:justify-center md:items-center gap-5">
                        <h2 className="font-Inter font-semibold text-3xl">Verification Code</h2>
                        <span className="text-base font-normal text-[var(--color-otp)]">You will receive a 6-digit verification code</span>
                        <div className="w-full md:w-[70%]">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle={{ display: 'flex', justifyContent: "space-between" }}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="mx-1 md:mx-0 !w-10 h-10 md:!w-12 md:h-12 text-center border border-gray-400 rounded-md focus:border-red-500 focus:outline-none"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Submit title="Confirm" width="w-[712px]" />
                    </div>
                </form>
            </ContentDetailsCustomer>
        </>
    )
}

export default Otp;