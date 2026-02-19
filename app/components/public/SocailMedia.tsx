import { myFilter } from "@/app/TypeScript/TypeScript";
import Image from "next/image";

export default function SocailMedia({ filter }: myFilter) {
    const socailMedia = [
        {
            link: "https://wa.me/201055395693",
            icon: "hero-linkedin",
            title: "linkedin",
            width: "w-[30px]",
            height: "h-[30px]"
        },
        {
            link: "",
            icon: "hero-twiter",
            title: "twiter",
            width: "w-[32px]",
            height: "h-[32px]"
        },
        {
            link: "https://www.instagram.com/hvshim10?igsh=c3o2aTA5eGM3ejF6",
            icon: "hero-instagram",
            title: "instagram",
            width: "w-[32px]",
            height: "h-[32px]"
        },
        {
            link: "https://wa.me/201055395693",
            icon: "hero-whatsApp",
            title: "whatsApp",
            width: "w-[30px]",
            height: "h-[30px]"
        }
    ];

    return (
        <ul className="flex gap-5 items-center">
            {socailMedia.map((item, index) => (
                <li key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <div className={`relative ${item.width} ${item.height}`}>
                            <Image
                                src={`/assets/icons/${item.icon}.svg`}
                                alt={item.title}
                                fill
                                className={`${filter}`} />
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    )
}