"use client";
import ContentDetailsCustomer from "../components/DetailsCustomer/Content";
import Hero from "../components/public/Hero";
import Submit from "../components/public/Submit";

function DetailsCustomer() {
    function handleInformation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href = "/otp";
    }

    return (
        <>
            <Hero image="customer-content.svg" title="Customer Contact Information" nextPage={true} backPage="/" />
            <ContentDetailsCustomer padding="p-10">
                <form action="" onSubmit={handleInformation} className="flex flex-col gap-7">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-10 text-center md:text-start">
                            <h2 className="text-[var(--color-text-footer)] font-rubik text-xl">Customer Information</h2>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                <div className="w-full relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-xl font-medium">Pleas enter your Name</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                                <div className="w-full relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-xl font-medium">Pleas enter your Phone</span>
                                    </label>
                                    <input type="number" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                            </div>
                            <div className="flex gap-[20px]">
                                <div className="w-full md:w-[50%] relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-xl font-medium">Pleas enter your Email</span>
                                    </label>
                                    <input type="email" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                            </div>
                        </div>
                        <hr className="text-[var(--color-not-active)]" />
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-10 text-center md:text-start">
                            <h2 className="text-[var(--color-text-footer)] font-rubik text-xl">Reservation Preferences  ( Optional but recommended )</h2>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                <div className="w-full relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-base font-medium">Seating Preference (Indoor / Outdoor / Window)</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                                <div className="w-full relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-base font-medium">Special Occasion (Birthday – Anniversary – None)</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                            </div>
                            <div className="flex gap-[20px]">
                                <div className="w-full md:w-[50%] relative">
                                    <label className="absolute bg-white px-2 top-[-14px] left-9">
                                        <span className="text-[10px] md:text-base font-medium">Special Notes (High Chair – Decoration – Food Allergies)</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] p-5" />
                                </div>
                            </div>
                        </div>
                        <hr className="text-[var(--color-not-active)]" />
                        <div className="flex justify-center">
                            <Submit title="Continue to OTP" width="w-[712px]" />
                        </div>
                    </div>
                </form>
            </ContentDetailsCustomer>
        </>
    )
}

export default DetailsCustomer;