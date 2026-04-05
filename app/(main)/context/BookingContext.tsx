"use client";
import { createContext, useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type BookingContextType = {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTime: Dayjs | null;
    setSelectedTime: (time: Dayjs | null) => void;
    selectedUser: string | null;
    setSelectedUser: (user: string | null) => void;
    activeUser: boolean;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [activeUser, setActiveUser] = useState<boolean>(true);

    return (
        <BookingContext.Provider value={{ activeUser, selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedUser, setSelectedUser }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be inside BookingProvider");
    return context;
}
