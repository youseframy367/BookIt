import Link from "next/link"
import Image from "next/image"
import { Category } from "@/app/TypeScript/TypeScript"

interface ProductsProps {
    products: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function Products({ products, setProducts }: ProductsProps) {
    return (
        < div className="flex flex-col gap-[20px] bg-[#fff] rounded-[11px] py-[23px] px-[35px]" >
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-base">أقسام المنتجات</h2>
                <div className="flex items-center gap-[10px] flex-1 justify-end">
                    <div className="relative w-full max-w-[333px]">
                        <div className="absolute top-[10px] mr-[10px]">
                            <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                        </div>
                        <input
                            type="search"
                            placeholder="البحث"
                            className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[var(--color-go-password)]"
                        />
                    </div>
                </div>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px]">
                {
                    products.map((item, index) => {
                        return <li key={index} title={item.title} onClick={() => {
                            setProducts(prev =>
                                prev.map((product, i) => ({
                                    ...product,
                                    active: i === index
                                }))
                            )
                        }} className={`transition-all duration-300 ${item.active ? 'bg-[var(--color-go-password)] text-white shadow-[10px_10px_36px_13px_rgba(24,56,102,0.2)] -translate-y-1' : 'translate-y-0'} hover:-translate-y-1 hover:bg-[var(--color-go-password)] hover:text-white hover:shadow-[10px_10px_36px_13px_rgba(24,56,102,0.2)] text-[var(--color-go-password)] cursor-pointer px-1 py-2 border border-1 border-[var(--color-go-password)] rounded-[10px] flex justify-center items-center`}>
                            <div className="flex-1 text-center">
                                <span className="ms-2 font-semibold text-[11px]">{item.title}</span>
                            </div>
                            <Image src={`/assets/icons/${item.icon}`} alt="products" width={30} height={30} />
                        </li>
                    })
                }
            </ul>
        </div>
    )
}