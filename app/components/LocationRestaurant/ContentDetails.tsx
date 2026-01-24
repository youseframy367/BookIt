import Image from "next/image";

function ContentDetails() {
    return (
        <section>
            <div className="mt-[35px]">
                <div className="container">
                    <div className="flex flex-col gap-[62px]">
                        <div className="w-full h-[400px] md:h-[600px] relative">
                            <iframe
                                className="w-full h-full border-0"
                                loading="lazy"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.1955982579795!2d31.325432275294703!3d30.057651374917983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fb09156c789%3A0x8a8b8a1e0f98e5e9!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                            ></iframe>
                        </div>
                        <div className="w-full md:w-[50%] flex flex-col gap-[30px] md:gap-[60px]">
                            <div className="w-full relative">
                                <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                    <Image src="/assets/icons/location.svg" alt="location" width={20} height={20} />
                                    <span className="text-[10px] md:text-xl font-medium">Location</span>
                                </label>
                                <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                    <span className="opacity-[0.5]">Nile Corniche, Qasr Ad Dobarah, Qasr El Nil, Cairo Governorate 11511, Egypt</span>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/phone.svg" alt="phone" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Phone 1</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">01055395693</span>
                                    </div>
                                </div>
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/phone.svg" alt="phone" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Phone 2</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">01055395693</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/Cuisines.svg" alt="Cuisines" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Cuisines</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">Italian, International</span>
                                    </div>
                                </div>
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/clock-2.svg" alt="Hours of operation" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Hours of operation</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">Daily 12:30 pm–1:00 am</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-[20px] md:gap-[70px]">
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/neighborhood.svg" alt="Neighborhood" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Neighborhood</span>
                                    </label>
                                    <input type="text" className="w-full border border-1 rounded-[30px] p-5" placeholder="Cairo, Egypt" />
                                </div>
                                <div className="w-full relative">
                                    <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                        <Image src="/assets/icons/code.svg" alt="Dress code" width={20} height={20} />
                                        <span className="text-[10px] md:text-xl font-medium">Dress code</span>
                                    </label>
                                    <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                        <span className="opacity-[0.5]">Business Casual</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative">
                                <label className="flex gap-2 items-center absolute bg-white px-2 top-[-14px] left-9">
                                    <Image src="/assets/icons/site.svg" alt="External Link" width={20} height={20} />
                                    <span className="text-[10px] md:text-xl font-medium">External Link</span>
                                </label>
                                <div className="w-full border border-1 rounded-[30px] p-5 text-[10px] md:text-[unset]">
                                    <span className="opacity-[0.5]">https://www.example-website-for-demo-purposes.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentDetails;