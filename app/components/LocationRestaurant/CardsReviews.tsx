import { reivews } from "@/app/TypeScript/TypeScript";

function CardsReviews({ item }: reivews) {
    const totalStars = 5;

    return (
        <>
            <span className="font-rubik text-sm md:text-lg font-normal text-[var(--color-text-footer)]">{item.title}</span>
            <div className="flex gap-1">
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={starValue}
                            className={`text-3xl ${starValue <= item.rating ? "text-yellow-400" : "text-gray-500"}`}>
                            ★
                        </span>
                    );
                })}
            </div>
            <div className="flex flex-col">
                <span className="font-PlayfairDisplay text-sm md:text-2xl text-[var(--color-text-footer)]">{item.name}</span>
                <span className="font-rubik text-sm md:text-lg text-[var(--color-text-footer)]">{item.job}</span>
            </div>
        </>
    )
}

export default CardsReviews;