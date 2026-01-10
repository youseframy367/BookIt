import Image from "next/image";
import Link from "next/link";

function Hero() {
    return (
        <section>
            <div className="relative w-full h-[400px] md:h-[82.3vh]">
                <div className="realtive w-full h-full bg-[var(--color-hero)]">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full">
                        <span className="font-qwigley text-[100px] md:text-[350px] font-normal text-white">Seafood</span>
                    </div>
                    <div className="container">
                        <div className="absolute top-5 md:top-13 flex">
                            <Link title="back" href="/" className="border border-2 border-white rounded-full py-[10px] px-[18px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.svg" alt="arraw" width={14} height={30} />
                            </Link>
                        </div>
                    </div>
                    <Image src="/assets/icons/hero-menu.svg" alt="hero menu" fill className="object-cover z-[-1]" />
                </div>
            </div>
        </section>
    )
}

export default Hero;