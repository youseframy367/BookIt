import Image from "next/image";

function Banner() {
    const socailMedia = [
        {
            link: "https://www.instagram.com/hvshim10?igsh=c3o2aTA5eGM3ejF6",
            icon: "hero-instagram",
            title: "instagram",
        },
        {
            link: "https://wa.me/201055395693",
            icon: "hero-whatsApp",
            title: "whatsApp",
        },
        {
            link: "https://wa.me/201055395693",
            icon: "hero-linkedin",
            title: "linkedin",
        },
        {
            link: "",
            icon: "hero-twiter",
            title: "twiter",
        },
    ];

    return (
        <main
            style={{ backgroundImage: "url('/assets/icons/bg.png')" }}
        >
            <div className="container pt-10 flex flex-col items-center justify-center gap-5 h-[83vh] w-full bg-cover bg-center">
                {/* Social Media Icons */}
                <ul className="flex gap-5">
                    {socailMedia.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={`/assets/icons/${item.icon}.svg`}
                                        alt={item.title}
                                        fill
                                        className="object-contain" />
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Text Content */}
                <div className="flex flex-col items-center justify-center text-center gap-3">
                    <p className="md:w-[600px] font-['Playfair_Display'] text-xl xl:text-[100px] xl:leading-[76px] font-normal text-[#2C2F24]">
                        Best food for your taste
                    </p>

                    <p className="md:text-[18px] leading-[32px] font-normal text-[#2C2F24] font-[Poppins]">
                        Discover delectable cuisine and unforgettable <br />
                        moments in our welcoming, culinary haven.
                    </p>

                    <button
                        className="mt-5 cursor-pointer flex items-center gap-3 px-8 py-5 rounded-full
          bg-[#E22023] text-white font-semibold text-[16px]
          font-[Poppins] transition-transform duration-200 hover:-translate-y-1"
                    >
                        Join as Restaurant Owner
                        <img src="/assets/icons/uil_arrow-up(4).png" alt="arrow" />
                    </button>
                </div>

                {/* Circular Text */}
                <div className="mt-5 relative w-[150px] h-[150px]">
                    <Image src="/assets/icons/down.png" alt="center" width={16} height={24} className="absolute top-15 left-17" />
                    <svg
                        viewBox="0 0 200 200"

                        style={{ fontSize: "16.12px", display: "grid", gap: "10,8px" }}
                    >

                        <defs>
                            <path
                                id="circlePath"
                                d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
                            />
                        </defs>

                        <text
                            fill="#E22023"
                            fontSize="16,12px"
                            letterSpacing="2px"
                            fontFamily="Inter"
                            fontWeight="400"
                            style={{
                                transformOrigin: "100px 100px",
                                animation: "rotateText 20s linear infinite",
                            }}
                        >
                            <textPath href="#circlePath" lengthAdjust="spacingAndGlyphs">
                                {("scroll down for work together • ").repeat(20)}
                            </textPath>
                        </text>

                        <style>
                            {`
        @keyframes rotateText {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
                        </style>
                    </svg>
                </div>
            </div>
        </main>
    );
}

export default Banner;
