import { layoutLoginOrRegister } from "@/app/TypeScript/TypeScript";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LayoutLoginAndRegister({ onSubmit, bg, children }: layoutLoginOrRegister) {
    const router = useRouter();

    return (
        <div
            className="fixed inset-0 flex flex-col justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/icons/${bg}')` }}
        >
            <div className="container flex flex-col justify-center items-center">
                <form action=""
                    method=""
                    onSubmit={onSubmit}
                    className="relative flex flex-col items-center md:w-[781px] h-[659px] p-5 rounded-lg bg-white shadow-md">
                    <button
                        className="absolute right-5 border-none outline-none"
                        onClick={() => router.back()}
                    >
                        <div className="w-[20px] h-[20px] relative">
                            <Image src="/assets/icons/close.png" alt="back" fill />
                        </div>
                    </button>
                    <img
                        src="/assets/icons/logo-navbar.png"
                        width={80}
                        height={70}
                        className="-mt-2"
                        alt="logo"
                    />
                    {children}
                </form>
            </div>
        </div>
    )
}

export default LayoutLoginAndRegister;