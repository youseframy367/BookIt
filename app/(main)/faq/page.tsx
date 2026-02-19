"use client";

import { useState } from "react";
import Content from "../../components/Faq/Content";
import Hero from "../../components/Faq/Hero";
import { useDataQuestions } from "@/app/data/dataQuestions";

export default function FAQ() {
    const items = useDataQuestions();

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