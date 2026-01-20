import Image from "next/image";

function Content() {
    return (
        <section>
            <div className="mt-10">
                <div className="container">
                    <div className="flex flex-col gap-5">
                        <h2 className="font-semibold text-[44px]"><span className="text-[var(--color-red)]">Didn't find</span> an answer to your query?</h2>
                        <span className="text-[var(--color-not-active)] text-3xl font-normal">Fill out your information and we will respond to you as soon as possible</span>
                    </div>
                    <div className="p-10 mt-15 border border-6 border-[var(--color-reviews)] rounded-2xl shadow-lg">
                        <form action="" className="flex flex-col gap-7">
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                Name
                                            </label>
                                            <input type="text" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] px-5 py-7" placeholder="Please enter your name" />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                Email
                                            </label>
                                            <input type="email" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] px-5 py-7" placeholder="Please enter your email" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                Phone Number
                                            </label>
                                            <input type="number" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] px-5 py-7" placeholder="Please enter your Number" />
                                        </div>
                                        <div className="w-full relative flex flex-col gap-3">
                                            <label className="text-[var(--color-text-footer)] text-base font-medium">
                                                Phone Number 2 ( Optional )
                                            </label>
                                            <input type="number" className="w-full border border-1 border-[var(--color-not-active)] rounded-[10px] px-5 py-7" placeholder="Please enter your Number 2" />
                                        </div>
                                    </div>
                                    <div className="w-full relative flex flex-col gap-3">
                                        <label className="text-[var(--color-text-footer)] text-base font-medium">
                                            Subject
                                        </label>
                                        <textarea className="resize-none w-full border border-1 border-[var(--color-not-active)] rounded-[10px] px-5 py-7 h-[300px]" placeholder="Please enter the subject keywords"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="relative flex gap-5 rounded-full border border-1 border-[var(--color-not-active)] rounded-[10px]">
                                    <input value="Send" type="submit" className="text-[var(--color-text-footer)] ps-5 pe-13 py-3 cursor-pointer" />
                                    <Image src="/assets/icons/arrow-up.svg" alt="arraw up" width={20} height={20} className="absolute right-6 top-[13px]" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Content;