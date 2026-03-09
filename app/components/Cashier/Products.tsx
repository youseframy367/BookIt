"use client";

import Image from "next/image"
import { Category } from "@/app/TypeScript/TypeScript"

interface ProductsProps {
    filteredProducts: Category[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setProducts: React.Dispatch<React.SetStateAction<Category[]>>;
    isScrolled: boolean;
    setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Products({ isScrolled, setIsScrolled, filteredProducts, setProducts, search, setSearch }: ProductsProps) {
    return (
        <div title={`${isScrolled && 'العوده الي الأصناف'}`} className={` w-[100%] transition-all duration-300 flex flex-col gap-[20px] bg-[#fff] rounded-[11px] ${isScrolled ? 'cursor-pointer py-0 group hover:bg-[var(--color-go-password)]' : 'py-[23px]'} px-[35px]`}>
            <div onClick={() => setIsScrolled(false)} className={`${isScrolled ? 'mt-4' : 'mt-0'} transition-all duration-300 flex items-center justify-between`}>
                <h2 className={`font-semibold text-base ${isScrolled && 'text-[var(--color-go-password)] group-hover:text-white'}`}>{isScrolled ? 'العوده الي الأصناف' : 'أقسام المنتجات'}</h2>
                {
                    isScrolled && <div className="transition-all duration-300 rotate-0 group-hover:-rotate-90 bg-white border border-[var(--color-go-password)] p-2 rounded-full">
                        <Image src="/assets/icons/forward.svg" alt="forward" width={19} height={19} />
                    </div>
                }
                <div className={`${isScrolled ? 'hidden' : 'flex'} items-center gap-[10px] flex-1 justify-end`}>
                    <div className="relative w-full max-w-[333px]">
                        <div className="absolute top-[10px] mr-[10px]">
                            <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="البحث"
                            className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[var(--color-go-password)]"
                        />
                    </div>
                </div>
            </div>
            <ul className={`${isScrolled ? '-z-1 opacity-0 max-h-0' : 'opacity-100 max-h-[2000px]'} transition-all duration-300 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px]`}>
                {
                    filteredProducts.map((item, index) => {
                        return <li key={index} title={item.title} onClick={() => {
                            setProducts(prev =>
                                prev.map((product, i) => ({
                                    ...product,
                                    active: i === index
                                }))
                            )
                        }} className={`transition-all duration-300 min-w-[40px] ${item.active ? 'bg-[var(--color-go-password)] text-white shadow-[10px_10px_36px_13px_rgba(24,56,102,0.2)] -translate-y-1' : 'translate-y-0'} hover:-translate-y-1 hover:bg-[var(--color-go-password)] hover:text-white hover:shadow-[10px_10px_36px_13px_rgba(24,56,102,0.2)] text-[var(--color-go-password)] cursor-pointer px-1 py-2 border border-1 border-[var(--color-go-password)] rounded-[10px] flex justify-center items-center`}>
                            <div className="flex-1 text-center">
                                <span className="font-semibold text-[11px] whitespace-nowrap">{item.title}</span>
                            </div>
                            <Image src={`/assets/icons/${item.icon}`} alt="products" width={30} height={30} />
                        </li>
                    })
                }
            </ul>
        </div>
    )
}