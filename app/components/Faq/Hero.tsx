import { isFilter } from "@/app/TypeScript/TypeScript";
import Image from "next/image";

function Hero({ search, setSearch }: isFilter) {
    return (
        <section>
            <div className="relative w-full py-10 md:py-0 md:h-[75vh]">
                <div className="realtive w-full h-full bg-[var(--color-hero)]">
                    <div className="container h-full">
                        <div className="w-full md:w-[850px] h-full flex flex-col gap-5 justify-center">
                            <h2 className="text-white text-[50px] font-semibold">Welcome to Diner Help</h2>
                            <span className="text-white text-[20px] font-semibold font-normal">From discovering great restaurants to booking your table at the perfect time, we help you enjoy a smooth and stress free dining experience with just a few clicks.</span>
                            <div className="text-white border border-2 border-white w-full lg:w-[700px] bg-white/5 backdrop-blur-md rounded-lg relative flex items-center">
                                <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} className='absolute start-5 filter brightness-0 invert' />
                                <input
                                    type="text"
                                    placeholder="Search for the most popular using keywords like : create an owner account"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='opacity-[0.5] py-4 w-full h-full ps-14 placeholder:text-white'
                                />
                            </div>
                        </div>
                    </div>
                    <Image src="/assets/icons/faq.png" alt="faq" fill className="object-cover z-[-1]" />
                </div>
            </div>
        </section>
    )
}

export default Hero;