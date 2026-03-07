"use client";

import { useState } from "react";

export const useNotPaymentData = () => {
    const [notes, setNotes] = useState([
        {
            title: 'note-1',
            nameInput: "checkedOneNote",
            checked: false
        },
        {
            title: 'note-2',
            nameInput: "checkedTowNote",
            checked: false
        },
        {
            title: 'note-3',
            nameInput: "checkedThreeNote",
            checked: false
        },
        {
            title: 'note-4',
            nameInput: "checkedFourNote",
            checked: false
        }
    ]);

    return { notes, setNotes }
}