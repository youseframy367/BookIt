"use client"

import { useState } from "react"
import Products from "../../components/Dashborad/Cashier/Products"
import Categories from "../../components/Dashborad/Cashier/Categories"
import SideBar from "../../components/Dashborad/Cashier/SideBar"
import { InvoiceProvider } from "../context/InvoiceContext"

export default function Cashire() {
    const [cart, setCart] = useState<any[]>([]);    
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <InvoiceProvider>
            <section>
                <div className="grid md:grid-cols-[8.7fr_3fr] gap-[30px]">
                    <div className="flex flex-col gap-5">
                        <Products isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
                        <Categories isScrolled={isScrolled} setIsScrolled={setIsScrolled} setCart={setCart} />
                    </div>
                    <SideBar isCart={cart} setCart={setCart} />
                </div>
            </section>
        </InvoiceProvider>
    )
}