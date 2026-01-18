import { isProducts } from "@/app/TypeScript/TypeScript";
import Image from "next/image";

function Products({ products, marginTop }: isProducts) {
    return (
        <section>
            <div className={`container-content mt-15 ${marginTop}`}>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {
                        products.map((item, index) => {
                            return <div data-aos="fade-up" key={index} className="min-h-[200px] rounded-[25px] flex flex-col bg-white shadow-[0_0_12px_rgba(0,0,0,0.15)]">
                                <div className="flex justify-end">
                                    <div className="rounded-tr-[25px] rounded-bl-[25px] bg-[var(--color-red)] p-3">
                                        <Image src={`/assets/icons/${item.active ? "full-heart" : "heart"}.svg`} alt="hert" width={24} height={24} />
                                    </div>
                                </div>
                                <div className="h-full flex flex-col gap-3">
                                    <div className="flex justify-center items-center">
                                        <Image src={`/assets/icons/${item.icon}.svg`} alt="fattoush salad" width={250} height={250} className="object-cover" />
                                    </div>
                                    <div className="h-full p-5 flex flex-col justify-between gap-3">
                                        <h2 className="font-semibold text-3xl">{item.title}</h2>
                                        <span className="text-[var(--color-text-products)] font-semibold text-[22px]">{item.subTitle}</span>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-3xl"><span className="text-2xl text-[var(--color-red)]">$</span>{item.amount}</span>
                                            <div className="flex items-center gap-2">
                                                <Image src="/assets/icons/star.svg" alt="star" width={24} height={24} />
                                                <span className="font-semibold text-[22px] text-[var(--color-text-star)]">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Products;