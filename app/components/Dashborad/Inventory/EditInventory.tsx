"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";

interface typeData {
    isShowData: boolean
}

export default function EditInventory({ isShowData }: typeData) {
    const router = useRouter();
    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({
        nameAr: '',
        titleAr: '',
        idNumber: '',
        role: '',
        phone: '',
        email: '',
        id: "",
        stateAcunt: false
    });

    const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
    const [imageFile, setImageFile] = useState(null);
    const [typeAcunt, setTypeAcount] = useState("");

    const [amount, setamount] = useState(false);
    const [textAmount, setTextAmount] = useState("");

    const [lastAmount, setlastAmount] = useState(false);
    const [textlastAmount, setTextlastAmount] = useState("");

    const [removeRoles, setRemovRoles] = useState(false);

    useEffect(() => {
        const data = window.sessionStorage.getItem("dateAcuntModetor");
        if (data) {
            const parsed = JSON.parse(data);
            setInitialData(parsed);
            setFormData({
                nameAr: parsed.name || '',
                titleAr: parsed.title || '',
                idNumber: parsed.idNumber || '',
                role: parsed.nameGop || '',
                phone: parsed.numperPone || '',
                email: parsed.email || '',
                stateAcunt: parsed.acount || false,
                id: parsed.id
            });
            setImageSrc(parsed.img || '/img/trrruyeryer.svg');
            setTypeAcount(parsed.acount ? "نشط" : "حساب معطل");
        }
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (ev: any) => setImageSrc(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {

    };

    return (
        <section className=" w-[98%] m-[1%] bg-[#fff] rounded-[11px] p-[15px]">
            {removeRoles && (
                <RemoveRoles
                    text="هل أنت متأكد من أنك تريد اعادة ظبط هذه الكميه وحذف البيانات الحاليه ؟"
                    handleDelete={handleDelete}
                    onClose={() => setRemovRoles(false)} />
            )
            }
            <div className="w-[97%] mx-[1%] mt-[3%] flex flex-col p-[10px] bg-[#FEFEFE] rounded-[10px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
                <div className="w-[100%] flex justify-between items-center">
                    <p className={`${!isShowData && 'py-[18px]'} text-[#131313] font-semibold`}>{isShowData ? 'تعديل المنتج' : 'بدء الجرد اليومي '}</p>
                    {
                        isShowData && <button className="cursor-pointer py-[18px] px-[24px] text-[var(--color-dark-blue-gray)] bg-[#F3F5F7] text-xs font-medium">
                            اعادة ضبط الكميه من البدايه
                        </button>
                    }
                </div>
                <div className="grid grid-cols-[2.5fr_4.5fr_4.5fr] gap-[17px] my-[10px]">
                    <div className="relative bg-[var(--color-gray-seven)] rounded-[20px] justify-center items-center text-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="imageUpload"
                        />
                        {
                            isShowData && <div className="absolute top-0 right-0 p-5">
                                <label
                                    htmlFor="imageUpload"
                                    className="cursor-pointer bg-white border border-[var(--color-black-tow)] border-1 px-[16px] py-[4px] rounded-[8px] flex gap-[8px]"
                                >
                                    <Image src="/assets/icons/pincale.svg" alt="pincale" width={14} height={14} />
                                    <span>تعديل</span>
                                </label>
                            </div>
                        }
                        <div className="p-5 flex flex-col gap-[20px]">
                            <Image src="/assets/icons/upload-product.svg" alt="upload product" width={200} height={200} />
                            {
                                isShowData && <span className="text-[var(--color-gray-ate)] text-xs">يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1</span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <div className="flex flex-col gap-[18px] w-full">
                            <label htmlFor="nameAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المنتج</label>
                            <input
                                type="text"
                                name="nameAr"
                                value={formData.nameAr}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
                                placeholder="مانجا"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-[18px] w-full">
                            <div className="flex">
                                <div className="flex flex-col gap-[18px] w-[87%]">
                                    <label htmlFor="phone" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الكميه المتاحه</label>
                                    <input
                                        type="numer"
                                        name="phone"
                                        onChange={handleChange}
                                        className="rounded-r-lg bg-[var(--color-gray-nine)] text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                                        placeholder="أدخل رقم الجوال"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="w-[17%] relative flex flex-col gap-[10px]">
                                    <span className="opacity-0">s</span>
                                    <div onClick={() => setamount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:bg-[var(--alpha)] before:h-[80%] before:w-[1px] bg-[var(--color-gray-nine)] py-[11px] px-2 flex justify-between">
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
                        </div>
                        <div className="flex flex-col gap-[18px] w-full">
                            <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">تاريخ الاضافه</label>
                            <input
                                type="date"
                                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <div className="flex flex-col gap-[18px] w-full">
                            <label htmlFor="email" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">سعر الكيلو</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-[290px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
                                placeholder="150 جنيه مصري"
                                required
                            />
                        </div>
                        <div className="flex">
                            <div className="flex flex-col gap-[18px] w-[87%]">
                                <label htmlFor="phone" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الحد الادني الذي يوضح بأن الكميه قريبه من النفاذ</label>
                                <input
                                    type="numer"
                                    name="phone"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-r-lg text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                                    placeholder="10"
                                    required
                                />
                            </div>
                            <div className="w-[17%] relative flex flex-col gap-[9.6px]">
                                <span className="opacity-0">s</span>
                                <div onClick={() => setlastAmount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:h-[80%] before:w-[1px] border border-gray-300 py-[11px] px-2 flex justify-between">
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
                    </div>
                </div>
            </div>
            <div className="w-[94%] m-[3%] flex justify-between">
                <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
                    onClick={() => {
                        router.push("./ModeratorsFor/AllMoerators")
                    }}>
                    إلغاء
                </button>
                <button
                    onClick={() => setRemovRoles(true)}
                    style={{
                        background: "#183866"
                    }}
                    className=" text-[#fff] px-[15px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%]"
                >
                    {
                        isShowData ? 'حفظ' : 'تسجيل عملية الجرد'
                    }
                </button>
            </div>
        </section>
    );
}