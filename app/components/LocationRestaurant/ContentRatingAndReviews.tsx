import Image from "next/image";

function ContentRatingAndReviews() {
    const reviews = [100, 60, 40, 30, 10]

    return (
        <section>
            <div className="container-content">
                <div className="flex flex-col gap-10 mt-[96px] text-center">
                    <div data-aos="fade-up">
                        <h2 className="font-Roboto text-3xl font-normal opacity-[0.7]">What 273 people are saying</h2>
                    </div>
                    <div className="flex gap-5">
                        <ul className="w-full flex flex-col gap-1">
                            {
                                reviews.map((item, index) => {
                                    return <li key={index} className="flex items-center gap-3" data-aos="fade-up">
                                        <div className="flex justify-center w-2">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div style={{ '--before-width': `${item}%` } as React.CSSProperties} className="rounded-[2px] before:rounded-[2px] rating-bar w-full h-[7px] bg-[var(--color-line)] relative before:absolute before:left-0 before:content-[''] before:h-[7px] before:bg-[var(--color-red)]"></div>
                                    </li>
                                })
                            }
                        </ul>
                        <div className="flex flex-col justify-between" data-aos="fade-up">
                            <div className="flex flex-col items-start gap-[4px]">
                                <div className="flex gap-2">
                                    <span className="font-normal text-2xl">4.5</span>
                                    <Image src="/assets/icons/rating-star.svg" alt="rating star" width={16} height={16} />
                                </div>
                                <span className="text-nowrap text-md opacity-[0.5] font-normal">273 Reviews</span>
                            </div>
                            <div className="flex flex-col items-start gap-[4px]">
                                <span className="font-normal text-2xl">88%</span>
                                <span className="text-nowrap text-md opacity-[0.5] font-normal">Recommended</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentRatingAndReviews;