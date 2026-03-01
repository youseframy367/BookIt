"use client"

import { useState } from "react"
import Products from "../../components/Cashier/Products"
import Categories from "../../components/Cashier/Categories"
import SideBar from "../../components/Cashier/SideBar"
import { useProductsData } from "../../data/dataProducts"

export default function Cashire() {
    const [products, setProducts] = useState(useProductsData);

    const activeCategory = products.find(category => category.active);

    return (
        <section>
            <div className="grid md:grid-cols-[8.7fr_3fr] gap-[30px]">
                <div className="flex flex-col gap-5">
                    <Products products={products} setProducts={setProducts} />
                    <Categories activeCategory={activeCategory} setProducts={setProducts} />
                </div>
                <SideBar />
            </div>
        </section>
    )
}