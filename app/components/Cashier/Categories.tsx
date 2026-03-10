"use client";

import Image from "next/image"
import { Category } from "@/app/TypeScript/TypeScript"
import { useRef, useEffect } from "react";

interface categoriesProps {
    activeCategory: Category | undefined;
    setProducts: React.Dispatch<React.SetStateAction<Category[]>>;
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
    searchCategory: string;
    setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
    setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
    isScrolled: boolean;
}

export default function Categories({ setIsScrolled, isScrolled, searchCategory, setSearchCategory, activeCategory, setProducts, setCart }: categoriesProps) {
    const listRef = useRef<HTMLDivElement>(null);

    const filteredItems = activeCategory?.items.filter(item =>
        item.name.toLowerCase().includes(searchCategory.toLowerCase())
    );

    const updateQuantity = (index: number, delta: number) => {
        if (!activeCategory) return;

        const updatedItems = [...activeCategory.items];
        const product = updatedItems[index];

        const newQuantity = product.quantity + delta;
        if (newQuantity < 0) return;

        product.quantity = newQuantity;

        setProducts(prev =>
            prev.map(cat =>
                cat.title === activeCategory.title
                    ? { ...cat, items: updatedItems }
                    : cat
            )
        );

        setCart(prev => {
            const existing = prev.find(p => p.title === product.name);

            if (newQuantity === 0) {
                return prev.filter(p => p.title !== product.name);
            }

            if (existing) {
                return prev.map(p =>
                    p.title === product.name
                        ? {
                            ...p,
                            amount: newQuantity,
                            price: newQuantity * product.price
                        }
                        : p
                );
            }

            return [
                ...prev,
                {
                    title: product.name,
                    singlePrice: product.price,
                    amount: newQuantity,
                    price: newQuantity * product.price
                }
            ];
        });
    };

    useEffect(() => {
        if (!isScrolled && listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [isScrolled]);

    return (
        <div className="h-full bg-[#fff] rounded-[11px] py-[23px] px-[35px]">
            <div className="flex flex-col gap-[25px]">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-base">{activeCategory?.title}</h2>
                    <div className="flex items-center gap-[10px] flex-1 justify-end">
                        <div className="relative w-full max-w-[333px]">
                            <div className="absolute top-[10px] mr-[10px]">
                                <img src="/img/MagnifyingGlass.svg" className="w-4 h-4" />
                            </div>
                            <input
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                type="search"
                                placeholder="البحث"
                                className="w-full h-[32px] pr-[30px] bg-[#F9FAFB] border border-[#E9EAF0] rounded-[8px] text-[#8C94A3] text-[12px] focus:outline-none focus:border-[var(--color-go-password)]"
                            />
                        </div>
                    </div>
                </div>

                <div
                    ref={listRef}
                    className="grid grid-cols-3 gap-[25px] h-[600px]  sticky top-[100px] overflow-scroll overflow-x-hidden"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} 
                    onScroll={(e) => {
                        const target = e.currentTarget;
                        setIsScrolled(target.scrollTop > 0);
                    }}
                >
                    {filteredItems?.map((item, index) => (
                        <div key={index}>
                            <div className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative flex flex-col gap-[14px] border border-1 py-[11px] px-[8px] rounded-[10px]">
                                <div className="overflow-hidden relative w-full h-[174px] rounded-[10px]">
                                    <Image
                                        src={`/assets/icons/${item.image}`}
                                        alt="categorie"
                                        fill
                                        className="transition-all duration-300 scale-100 group-hover:scale-110 object-cover rounded-[10px]"
                                    />
                                    <div className="items-center absolute top-0 left-0 z-1 text-white border border-1 border-black bg-[var(--color-rating-categories)] py-[4px] px-[8px] ps-[21px] flex gap-1 rounded-br-[20px]">
                                        <span className="text-[12px] font-semibold">{item.rating}</span>
                                        <Image src="/assets/icons/star.svg" alt="star" width={8} height={8} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs font-normal">
                                    <p className="text-[var(--color-label-input)]">{item.name}</p>
                                    <p className="text-[var(--color-go-password)]">{item.price} جنيه مصري</p>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => updateQuantity(index, 1)} className="cursor-pointer pb-1 text-center bg-[var(--color-go-password)] w-[41px] rounded-r-[4px]">
                                        <span className="text-white text-xl">+</span>
                                    </button>
                                    <div className="py-1 bg-[var(--color-numbers)] text-center flex-1">
                                        <span>{item.quantity}</span>
                                    </div>
                                    <button onClick={() => updateQuantity(index, -1)} className={`${item.quantity == 0 ? 'opacity-[0.5]' : 'cursor-pointer'} pb-1 text-center bg-[var(--color-go-password)] w-[41px] rounded-l-[4px]`}>
                                        <span className="text-white text-xl">-</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}