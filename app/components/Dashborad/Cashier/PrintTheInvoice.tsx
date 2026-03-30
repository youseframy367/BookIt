"use client";

import { useReportData } from "@/app/data/dataReport";
import Image from "next/image";
// , { useRef }
import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
import { useInvoice } from "@/app/(dashboard)/context/InvoiceContext";

interface items {
    title: string;
    price: number;
    amount: number;
    singlePrice: number;
}

interface typeProducts {
    isCart: items[];
    totalWithVat: number;
    subtotal: number;
    deliveryFee: number;
    vat: number;
}

export default function PrintTheInvoice({ vat, deliveryFee, isCart, subtotal, totalWithVat }: typeProducts) {
    const reportData = useReportData();

    const {
        customerData,
    } = useInvoice();

    // const link = `https://www.restaurant-management-system-t...`;

    return (
        <div dir="rtl" className="flex flex-col gap-[14px] py-[19px] px-[9px]">
            <div className="font-semibold flex justify-between items-center border border-[var(--color-black-ate)] p-3 rounded-md">
                <ul className="flex flex-col gap-[12px]">
                    <li>اسم المتجر : <span className="opacity-30">قصر الكبابجي</span></li>
                    <li>العنوان الرئيسي : <span className="opacity-30">{customerData.address ? customerData.address : 'غير متوفر'}</span></li>
                    <li>رقم الهاتف : <span className="opacity-30">{customerData.phone ? customerData.phone : 'غير متوفر'}</span></li>
                    <li>السجل الضريبي: <span className="opacity-30">لم يتم الاضافه</span></li>
                </ul>
                <Image src="/assets/icons/invoice-logo.svg" alt="logo" width={123} height={123} />
                <ul className="flex flex-col gap-[12px]">
                    <li>تاريخ الطلب : <span className="opacity-30">22 / 5 / 2025</span></li>
                    <li>تنسيق الوقت : <span className="opacity-30"> 12 ساعه</span></li>
                    <li>الرقم الضريبي : <span className="opacity-30">21525</span></li>
                    <li>وقت الطلب : <span className="opacity-30">12 : 00 PM</span></li>
                </ul>
            </div>
            {
                reportData.map((item, index) => {
                    return (
                        <li key={index} className="border border-[var(--color-black-tow)] flex justify-between p-[13px] rounded-[8px]">
                            <span>{item.title}</span>
                            <span>{item.subTitle}</span>
                        </li>
                    )
                })
            }
            <div className="font-semibold border border-[var(--color-black-tow)] flex flex-col p-[13px] rounded-[8px]">
                <div className="grid grid-cols-[6fr_2fr_2fr_2fr] w-full text-center">
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        اسم المنتج
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        الكميه
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        سعر الوحده
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        الاجمالي
                    </div>
                </div>
                <div className="grid grid-cols-[6fr_2fr_2fr_2fr] w-full text-center">
                    {
                        isCart.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                        <span>{item.amount}</span>
                                    </div>
                                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                        <span>{item.price}</span>
                                    </div>
                                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                                        <span>{item.singlePrice}</span>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className="grid grid-cols-[10fr_2fr] w-full text-center">
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        اجمالي السعر بدون ضريبة القيمه المضافه
                    </div>
                    <div className="bg-black text-white text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                        {
                            subtotal.toFixed(2) === "0.00" ? '--------------' : subtotal.toFixed(2) + ' جنيه مصري'
                        }
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        ضريبة القيمه المضافه
                    </div>
                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                        {
                            vat.toFixed(2) === "0.00" ? '--------------' : vat.toFixed(2) + ' جنيه مصري'
                        }
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        ضريبة التوصيل
                    </div>
                    <div className="text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                        {
                            deliveryFee.toFixed(2) === "0.00" ? '--------------' : deliveryFee.toFixed(2) + ' جنيه مصري'
                        }
                    </div>
                    <div className="border border-[var(--color-gray-thirty)] py-[14px]">
                        الاجمالي
                    </div>
                    <div className="rounded-bl-lg bg-black text-white text-xs flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                        {
                            totalWithVat.toFixed(2) === "0.00" ? '--------------' : totalWithVat.toFixed(2) + ' جنيه مصري'
                        }
                    </div>
                </div>
            </div>
            {
                customerData.notes && <div className="rounded-xl bg-black text-white font-semibold flex items-center justify-center border border-[var(--color-gray-thirty)] py-[17px]">
                    {customerData.notes}
                </div>
            }
            {/*<div className="flex justify-center">
                    <QRCodeCanvas value={link} size={90} />
                </div>
                <span className="text-center font-semibold">يمكنك مشاهدة المنيو الالكتروني الخاص بنا والحجز في المطعم من خلال اسكان QR Code</span> */}
        </div>
    )
}