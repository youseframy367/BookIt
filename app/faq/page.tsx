"use client";
import { useState } from "react";
import Content from "../components/Faq/Content";
import Hero from "../components/Faq/Hero";

function FAQ() {
    const items = [
        {
            id: 1,
            title: "How to modify a reservation?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 2,
            title: "How to find a restaurant?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 3,
            title: "How to create an account?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 4,
            title: "How to book a table?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 5,
            title: "How to find a restaurant?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 6,
            title: "How to create an account?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
        {
            id: 7,
            title: "How to book a table?",
            content: "To modify a reservation, you need to contact the restaurant directly.",
        },
    ];

    const [search, setSearch] = useState("");

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Hero search={search} setSearch={setSearch} />
            <Content items={filteredItems} />
        </>
    )
}

export default FAQ;