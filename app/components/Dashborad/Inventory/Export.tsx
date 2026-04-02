"use client";

import Image from "next/image";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { toPng } from "html-to-image";
import { useMenuSearch } from "@/app/hooks/useBodyClass";

interface Customer {
    id: string
    name: string
    kPrice: string
    idNumber: string
}

interface passData {
    displayedCustomers: Customer[]
    tableRef: React.RefObject<HTMLDivElement>
}

export default function Export({ tableRef, displayedCustomers }: passData) {
    const { openMenu, menuRef, setOpenMenu, buttonRef, setShow } = useMenuSearch();

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(displayedCustomers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Customers");
        XLSX.writeFile(wb, "customers.xlsx");
    };

    const exportPDF = async () => {
        if (!tableRef.current) return;

        const dataUrl = await toPng(tableRef.current, {
            cacheBust: true,
            pixelRatio: 2
        });
        const pdf = new jsPDF("p", "pt", "a4");

        const img = new window.Image();
        img.src = dataUrl;

        img.onload = () => {
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (img.height * pdfWidth) / img.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("customers.pdf");
        };
    };

    const toggleMenu = () => {
        setOpenMenu(prev => !prev);
        setShow(false);
    }

    return (
        <div className={` relative ${openMenu && 'z-1 ' }`}>
            <button ref={buttonRef} onClick={toggleMenu} className="cursor-pointer text-center border-[1px] border-[#183866] bg-[#183866] text-[#fff] text-[500] px-1 py-2 rounded-lg text-[10px] font-medium h-[32px] w-[80px] whitespace-nowrap">
                تصدير
            </button>

            <div ref={menuRef} className={`${openMenu ? 'opacity-[1] z-1' : 'opacity-[0] -z-1'} w-[190%] rounded-[12px] py-[20px] px-[24px] absolute left-0 bg-white top-11 flex flex-col gap-[22px]`}>
                <div onClick={exportExcel} className="flex items-center gap-[8px] cursor-pointer" title="تصدير Excel">
                    <Image src="/assets/icons/excel.svg" alt="excel" width={20} height={18} />
                    <span>تصدير Excel</span>
                </div>
                <div onClick={exportPDF} className="flex items-center gap-[8px] cursor-pointer" title="تصدير PDF">
                    <Image src="/assets/icons/pdf.svg" alt="pdf" width={20} height={18} />
                    <span>تصدير PDF</span>
                </div>
            </div>
            </div>
    )
}