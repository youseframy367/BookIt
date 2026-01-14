import Image from "next/image";
import Link from "next/link";

function FooterBottom() {
    const links = [
        {
            title: "Privacy Policy",            
            link: ""
        },
        {
            title: "Terms of Use",            
            link: ""
        },
        {
            title: "Cookie Preferences",            
            link: ""
        },
        {
            title: "Accessibility Statement",            
            link: ""
        }
    ]

    return (
        <div className="w-full border-t-1 border-t-[var(--color-show-news)] py-6">
            <div className="flex-col md:flex-row flex items-center justify-between w-full gap-3 md:gap-0">
                <div className="flex gap-3 items-center">
                    <Link href="">
                        <Image src="/assets/icons/logo-company.svg" alt="logo company" width={87} height={87} className="object-cover" />
                    </Link>
                    <span className="font-rubik font-normal text-sm">Created in partnership with Dev Master</span>
                </div>
                <ul className="flex gap-7 flex-wrap justify-center">
                    {
                        links.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>
                                    <span className="hover:text-[var(--color-red)] font-rubik font-normal text-lg">{item.title}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default FooterBottom;