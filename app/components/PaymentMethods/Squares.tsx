import Image from "next/image"

export default function Squares() {
    return (
        <div className="top-0 -z-1 absolute w-full h-full">
            <div className="w-full h-full relative">
                <Image src="/media/shared/icons/squares.svg" alt="squares" fill />
            </div>
        </div>
    )
}