import Link from "next/link";
import FormLastNews from "./FormLastNews";
import FooterBottom from "./FooterBottom";
import Image from "next/image";

function Footer() {
    const Menu = [
        {
            title: "Home",
            link: ""
        },
        {
            title: "Most Booked",
            link: ""
        },
        {
            title: "Popular Dishes",
            link: ""
        },
        {
            title: "Liked Restaurants",
            link: ""
        }
    ]

    const Information = [
        {
            title: "Supports",
            link: ""
        },
        {
            title: "Terms & Conditions",
            link: ""
        },
    ]

    const ContactInfo = [
        {
            title: "+ 20 01055395693",
            link: ""
        },
        {
            title: "teamdevmaster930@gmail.com",
            link: ""
        },
        {
            title: "Egypt, Cairo",
            link: ""
        }
    ]

    const socailMedia = [
        {
            title: "meta",
            link: "",
        },
        {
            title: "whatsApp",
            link: ""
        },
        {
            title: "instagram",
            link: ""
        },
        {
            title: "twitter",
            link: ""
        },
    ]

    return (
        <>
            <FormLastNews />
            <footer className="text-white mt-70 bg-[var(--color-footer)] relative z-1">
                <div className="container">
                    <div className="pb-10 pt-50 grid sm:grid-cols-2 xl:grid-cols-[3fr_2fr_2fr_2fr_2fr] gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="relative w-full md:w-[261px] h-[95px]">
                                <Image src="/assets/icons/logo-footer.svg" alt="logo" fill className="object-cover" />
                            </div>
                            <span className="font-rubik text-sm font-normal">Copyright © Book table 2025 All rights reserved</span>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl md:px-7 font-rubik font-normal">Menu</h2>
                            <ul className="flex flex-col gap-3 md:px-5">
                                {
                                    Menu.map((item, index) => (
                                        <li className="flex" key={index}>
                                            <div className="flex md:items-center gap-2 group" title={item.title}>
                                                <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                                <Link className="font-rubik md:text-lg" href={item.link}>{item.title}</Link>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl md:px-7 font-rubik font-normal">Information</h2>
                            <ul className="flex flex-col gap-3 md:px-5">
                                {
                                    Information.map((item, index) => (
                                        <li className="flex" key={index}>
                                            <div className="flex md:items-center gap-2 group" title={item.title}>
                                                <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                                <Link className="font-rubik md:text-lg" href={item.link}>{item.title}</Link>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl md:px-7 font-rubik font-normal">Contact Info</h2>
                            <ul className="flex flex-col gap-3 md:px-5">
                                {
                                    ContactInfo.map((item, index) => (
                                        <li className="flex" key={index}>
                                            <div className="flex md:items-center gap-2 group" title={item.title}>
                                                <div className="group-hover:w-[20px] transition-all duration-300 w-0 h-[3px]"></div>
                                                <Link className="font-rubik md:text-lg" href={item.link}>{item.title}</Link>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="px-4 font-rubik text-2xl font-medium">Follow us on</h2>
                            <ul className="flex gap-4">
                                {
                                    socailMedia.map((item, index) => {
                                        return <li key={index}>
                                            <Link href={item.title} title={item.title}>
                                                <div className="relative w-[32px] h-[32px]">
                                                    <Image src={`/assets/icons/${item.title}.svg`} alt={item.title} fill className="object-cover" />
                                                </div>
                                            </Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <FooterBottom />
                </div>
            </footer>
        </>
    )
}

export default Footer;