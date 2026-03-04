"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Hero() {
    const { id } = useParams();

    return (
        <section>
            <div className="container-mobile mt-5 relative w-full h-[500px] md:h-[82.3vh]">
                <div className="realtive w-full h-full bg-[var(--alpha)] rounded-[30px] md:rounded-none">
                    <div data-aos="fade-up" className="flex justify-center items-center w-full h-full">
                        <h2 className="font-qwigley text-[100px] md:text-[350px] font-normal text-white">Seafood</h2>
                    </div>
                    <div className="container">
                        <div className="absolute top-5 md:top-13">
                            <Link title="back" href={`/details-restaurant-public/${id}`} className="hidden md:flex border border-2 border-white rounded-full py-[10px] px-[17px] bg-[var(--color-arraw-back)]">
                                <Image src="/assets/icons/arraw.png" alt="arraw" width={14} height={30} className="rotate-180" />
                            </Link>
                            <Link title="back" href={`/details-restaurant-public/${id}`} className="md:hidden">
                                <Image src="/assets/icons/arraw-mobile.svg" alt="arraw" width={44} height={44} />
                            </Link>
                        </div>
                    </div>
                    <Image src="/assets/icons/hero-menu.svg" alt="hero menu" fill className="object-cover z-[-1] rounded-[30px] md:rounded-none" />
                </div>
            </div>
        </section>
    )
}