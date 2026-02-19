"use client";

import { createContext, useContext, useState } from "react";

type FromPage = "register" | "signIn" | "forgot" | null;

interface AuthFlowContextType {
    fromPage: FromPage;
    setFromPage: (page: FromPage) => void;
}

const AuthFlowContext = createContext<AuthFlowContextType | null>(null);

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
    const [fromPage, setFromPage] = useState<FromPage>(null);

    return (
        <AuthFlowContext.Provider value={{ fromPage, setFromPage }}>
            {children}
        </AuthFlowContext.Provider>
    );
}

export const useAuthFlow = () => {
    const ctx = useContext(AuthFlowContext);
    if (!ctx) throw new Error("useAuthFlow must be used inside AuthFlowProvider");
    return ctx;
};
