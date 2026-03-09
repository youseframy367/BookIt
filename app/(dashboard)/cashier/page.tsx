"use client"

import { useState } from "react"
import Products from "../../components/Dashborad/Cashier/Products"
import Categories from "../../components/Dashborad/Cashier/Categories"
import SideBar from "../../components/Dashborad/Cashier/SideBar"
import { useProductsData } from "@/app/data/dataProducts"

export default function Cashire() {
    const [products, setProducts] = useState(useProductsData);
    const [cart, setCart] = useState<any[]>([]);

    const [search, setSearch] = useState("")
    const [searchCategory, setSearchCategory] = useState("");

    const [isScrolled, setIsScrolled] = useState(false);

    const activeCategory = products.find(category => category.active);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section>
            <div className="grid md:grid-cols-[8.7fr_3fr] gap-[30px]">
                <div className="flex flex-col gap-5">
                    <Products search={search} setSearch={setSearch} filteredProducts={filteredProducts} setProducts={setProducts} isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
                    <Categories searchCategory={searchCategory} setSearchCategory={setSearchCategory} activeCategory={activeCategory} setProducts={setProducts} setCart={setCart} isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
                </div>
                <SideBar isProducts={cart} setCart={setCart} setProducts={setProducts} />
            </div>
        </section>
    )
}