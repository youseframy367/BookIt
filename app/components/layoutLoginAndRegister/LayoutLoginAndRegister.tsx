import { layoutLoginOrRegister } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LayoutLoginAndRegister({ isActiveLogo = true, width = "w-full md:w-[781px]", onSubmit, bg, children }: layoutLoginOrRegister) {
    const router = useRouter();

    return (
        <div
            className="py-5 md:py-0 relative min-h-screen flex flex-col justify-center"
        >
            <div className="w-full h-full absolute bg-black opacity-[0.7]">
            </div>
            <div className="w-full h-full absolute">
                <Image src={`/assets/icons/${bg}`} alt="background image" fill className="-z-1 object-cover" />
            </div>
            <div className="container flex flex-col justify-center items-center">
                <form action=""
                    method=""
                    onSubmit={onSubmit}
                    className={`relative flex flex-col items-center ${width} ${isActiveLogo && 'h-full min-h-[550px]'} p-5 rounded-2xl bg-white shadow-md`}>
                    <div
                        className="mt-[6px] cursor-pointer absolute right-5 border-none outline-none"
                        onClick={() => router.back()}
                    >
                        <div className="w-[20px] h-[20px] relative">
                            <Image src="/assets/icons/close.png" alt="back" fill />
                        </div>
                    </div>
                    {
                        isActiveLogo && <img
                            src="/assets/icons/logo-navbar.png"
                            width={80}
                            height={70}
                            className="-mt-2"
                            alt="logo"
                        />
                    }
                    {children}
                </form>
            </div>
        </div>
    )
}