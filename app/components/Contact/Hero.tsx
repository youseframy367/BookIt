import Image from "next/image";

function Hero() {
    return (
        <section>
            <div className="relative w-full md:h-[75vh]">
                <div className="py-10 md:py-0 realtive w-full h-full bg-[var(--color-hero)]">
                    <div className="container flex items-center justify-center w-full h-full">
                        <h2 className="text-white text-[89px] font-semibold"><span className="text-[var(--color-red)]">Connect</span> With Us</h2>
                    </div>
                    <Image src="/assets/icons/contact.svg" alt="faq" fill className="object-cover z-[-1]" />
                </div>
            </div>
        </section>
    )
}

export default Hero;