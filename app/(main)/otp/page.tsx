"use client";
import ContentDetailsCustomer from "../components/DetailsCustomer/Content";
import Hero from "../components/public/Hero";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
// import Submit from "../components/public/Submit";

function Otp() {
    const [otp, setOtp] = useState("");

    function handleotp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href = "/otp";
    }

    return (
        <>
            <Hero image="bg-otp" title="Verification Code" />
            <ContentDetailsCustomer>
                <form action="" onSubmit={handleotp} className="flex flex-col gap-7">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h2 className="font-Inter font-semibold text-3xl">Verification Code</h2>
                        <span className="text-base font-normal text-[var(--color-otp)]">You will receive a 6-digit verification code</span>
                        <div className="w-[70%]">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle={{ display: 'flex', justifyContent: "space-between" }}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="!w-12 h-12 text-center border border-gray-400 rounded-md focus:border-red-500 focus:outline-none"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </form>
            </ContentDetailsCustomer>
        </>
    )
}

export default Otp;