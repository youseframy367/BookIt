"use client";

import { Category, useProductsData } from "@/app/data/dataProducts";
import { createContext, useContext, useState, ReactNode } from "react";

type CustomerData = {
    name: string;
    address: string;
    code: string;
    phone: string;
    phone2: string;
    notes: string;
};

type InvoiceDetails = {
    totalItems: number;
    subtotal: number;
    deliveryFee: number;
    vat: number;
    totalWithVat: number;
};

type InvoiceContextType = {
    products: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Category[]>>;

    takeawayOrSala: number;
    setTakeawayOrSala: React.Dispatch<React.SetStateAction<number>>;

    customerData: CustomerData;
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;

    invoiceDetails: InvoiceDetails;
    setInvoiceDetails: React.Dispatch<React.SetStateAction<InvoiceDetails>>;

    showQr: boolean;
    setShowQr: React.Dispatch<React.SetStateAction<boolean>>;
};

const InvoiceContext = createContext<InvoiceContextType | null>(null);

type Props = {
    children: ReactNode;
};

export const InvoiceProvider = ({ children }: Props) => {
    const { data, setData } = useProductsData();
    const [takeawayOrSala, setTakeawayOrSala] = useState<number>(0);
    const [showQr, setShowQr] = useState(false);

    const [customerData, setCustomerData] = useState<CustomerData>({
        name: "مؤمن الزبده",
        code: "#785",
        address: "",
        phone: "",
        phone2: "",
        notes: ""
    });

    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        totalItems: 0,
        subtotal: 0,
        deliveryFee: 0,
        vat: 0,
        totalWithVat: 0,
    });

    return (
        <InvoiceContext.Provider
            value={{
                products: data,
                setProducts: setData,
                takeawayOrSala,
                setTakeawayOrSala,
                customerData,
                setCustomerData,
                invoiceDetails,
                setInvoiceDetails,
                showQr,
                setShowQr
            }
            }
        >
            {children}
        </InvoiceContext.Provider>
    );
};

export const useInvoice = () => {
    const context = useContext(InvoiceContext);

    if (!context) {
        throw new Error("useInvoice must be used inside InvoiceProvider");
    }

    return context;
};