"use client";

import IsSelectPaymentMethod from "@/app/components/SelectPaymentMethod/IsSelectPaymentMethod";
import Hero from "../../components/public/Hero";
import BookitConditions from "@/app/components/SelectPaymentMethod/BookitConditions";
import { useNotPaymentData } from "@/app/data/dataNotePayment";

export default function SelectPaymentMethod() {
    const { notes, setNotes } = useNotPaymentData();

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes((prevNotes) =>
            prevNotes.map((note, i) =>
                i === index ? { ...note, checked: e.target.checked } : note
            )
        );
    };

    const allChecked = notes.every(note => note.checked === true);

    return (
        <>
            <Hero image="customer-content.svg" nextPage={true} isActiveButtonHero={false} />
            <IsSelectPaymentMethod allChecked={allChecked} />
            <BookitConditions notes={notes} handleChange={handleChange} />
        </>
    )
}