"use client";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";

function Content() {
    const gallery = ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"];

    useEffect(() => {
        Fancybox.bind('[data-fancybox="gallery"]', {});
        return () => Fancybox.destroy();        
    }, []);

    return (
        <section>
            <div className="container">
                <div className="mt-25 grid md:grid-cols-2 gap-5 md:gap-10">
                    {
                        gallery.map((item, index) => {
                            return <a data-fancybox="gallery" href={`/assets/icons/${item}.svg`} key={index} data-aos="fade-up" className="rounded-xl relative w-full h-[300px] md:h-[500px] overflow-hidden group">
                                <div className="rounded-xl absolute bg-[var(--color-hero)] w-full h-full"></div>
                                <Image src={`/assets/icons/${item}.svg`} alt="gallery" fill className="rounded-xl z-[-1] object-cover transition-all duration-300 group-hover:scale-[1.1] group-hover:rotate-[2deg]" />
                            </a>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Content;