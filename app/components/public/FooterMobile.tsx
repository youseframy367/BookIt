import Image from "next/image";
import Link from "next/link";

function FooterMobile() {
    const listFooter = [
        {
            icon: "home",
            title: "Home",
            link: "/",
            active: true
        },
        {
            icon: "search",
            title: "Search",
            link: "/",
            active: false
        },
        {
            icon: "heart",
            title: "Heart",
            link: "/",
            active: false
        },
        {
            icon: "info",
            title: "Info",
            link: "/",
            active: false
        },
        {
            icon: "menu",
            title: "Menu",
            link: "/",
            active: false
        }
    ]

    return (
        <section className="z-2 fixed md:hidden bottom-[-0.5px] w-full py-4 px-5 bg-[var(--color-footer-mobile)]">
            <ul className="flex justify-between items-center">
                {
                    listFooter.map((item, index) => {
                        return <li key={index}>
                            <Link href={item.link} className={`${item.active && 'active-footer-mobile'} flex gap-2 rounded-full p-3`}>
                                <Image src={`/assets/icons/${item.icon}.svg`} alt={item.title} width={24} height={24} className="image-active opacity-[0.6] filter invert sepia saturate-100 hue-rotate-180 brightness-0" />
                                <span className="hidden">{item.title}</span>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </section>
    )
}

export default FooterMobile;