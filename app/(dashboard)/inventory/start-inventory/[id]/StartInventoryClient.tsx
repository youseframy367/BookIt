"use client";

import { useState } from "react";
import AddAndUploadData from "@/app/components/Dashborad/AddAndUploadData";
import Image from "next/image";

export default function UpdateStartInventory({ id }: { id: string }) {
    const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
    const [imageFile, setImageFile] = useState(null);

    const [amount, setamount] = useState(false);
    const [textAmount, setTextAmount] = useState("");

    const [lastAmount, setlastAmount] = useState(false);
    const [textlastAmount, setTextlastAmount] = useState("");

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (ev: any) => setImageSrc(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const [formData, setFormData] = useState({
        stateAcunt: true
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return (
        <AddAndUploadData title="بدء الجرد اليومي " isTureUpdateTitle="اعادة ضبط الكميه من البدايه" isFalseUpdateTitle="ايقاف الحساب">
            <div className="relative bg-[var(--color-gray-seven)] rounded-[20px] justify-center items-center text-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="imageUpload"
                />
                <div className="p-5 flex flex-col gap-[20px]">
                    <Image src="/assets/icons/upload-product.svg" alt="upload product" width={200} height={200} />
                </div>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-[17px]">
                    <div className="flex flex-col gap-[18px] w-full">
                        <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المنتج</label>
                        <input
                            type="text"
                            className="text-[#8C94A3] text-sm font-normal h-[42px] border border-gray-300 rounded-[8px] px-2"
                            placeholder="مانجا"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-[18px] w-full">
                        <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">سعر الكيلو</label>
                        <input
                            type="number"
                            className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
                            placeholder="150 جنيه مصري"
                            required
                        />
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-[18px] w-full">
                            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الكميه المتاحه</label>
                            <input
                                type="numer"
                                onChange={handleChange}
                                className="rounded-r-lg bg-[var(--color-gray-nine)] text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                                placeholder="أدخل رقم الجوال"
                                required
                                readOnly
                            />
                        </div>
                        <div className="relative flex flex-col gap-[10px]">
                            <span className="opacity-0">s</span>
                            <div onClick={() => setamount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:bg-[var(--alpha)] before:h-[80%] before:w-[1px] bg-[var(--color-gray-nine)] py-[11px] px-4 flex gap-2 justify-between">
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${amount && 'rotate-180'}`} />
                                <span className={`${amount ? 'text-[var(--color-dark-blue-gray)]' : 'text-[#8C94A3]'} text-sm font-normal opacity-[0.5]`}>كيلو</span>
                            </div>
                            {
                                amount && <ul className="-left-5 bg-white w-[200%] border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-20 p-[8px] flex flex-col gap-2">
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextAmount('طن')}>
                                        <span>طن</span>
                                        {textAmount == 'طن' && <span>✔</span>}
                                    </li>
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextAmount('كيلو')}>
                                        <span>كيلو</span>
                                        {textAmount == 'كيلو' && <span>✔</span>}
                                    </li>
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextAmount('جرام')}>
                                        <span>جرام</span>
                                        {textAmount == 'جرام' && <span>✔</span>}
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-[18px] w-full">
                            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حدد الكمية المستهلكه</label>
                            <input
                                type="numer"
                                onChange={handleChange}
                                className="border border-gray-300 rounded-r-lg text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                                placeholder="10"
                                required
                            />
                        </div>
                        <div className="relative flex flex-col gap-[9.5px]">
                            <span className="opacity-0">s</span>
                            <div onClick={() => setlastAmount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:h-[80%] before:w-[1px] border border-gray-300 py-[11px] px-4 flex justify-between">
                                <Image src="/assets/icons/arrow-details.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${lastAmount && 'rotate-180'}`} />
                                <span className={`${lastAmount ? 'text-[var(--color-dark-blue-gray)]' : 'text-[#8C94A3]'} text-sm font-normal opacity-[0.5]`}>كيلو</span>
                            </div>
                            {
                                lastAmount && <ul className="-left-5 bg-white w-[200%] border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-20 p-[8px] flex flex-col gap-2">
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextlastAmount('طن')}>
                                        <span>طن</span>
                                        {textlastAmount == 'طن' && <span>✔</span>}
                                    </li>
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextlastAmount('كيلو')}>
                                        <span>كيلو</span>
                                        {textlastAmount == 'كيلو' && <span>✔</span>}
                                    </li>
                                    <li className={`text-xs rounded-[6px] p-[8px] cursor-pointer flex justify-between`} onClick={() => setTextlastAmount('جرام')}>
                                        <span>جرام</span>
                                        {textlastAmount == 'جرام' && <span>✔</span>}
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-[18px] w-full">
                        <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حدد يوم عملية الجرد</label>
                        <input
                            type="date"
                            className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded-[8px] px-[5px] w-full"
                            required
                        />
                    </div>
                </div>
            </div>
        </AddAndUploadData>
    )
}