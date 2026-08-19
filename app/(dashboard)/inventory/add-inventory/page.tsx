"use client";

/* ============================== إضافة منتج مخزون — داتا حقيقية ==============================
   المصدر: رفع الصورة عبر POST /uploads/image → POST /api/inventory
   الحقول: {nameAr, titleAr, quantity, price(عبر email), minQuantity, image, status}
   ============================================================================ */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { inventoryApi, uploadsApi } from "@/utils/api";
import RemoveRoles from "@/app/components/Dashborad/AccessAndRoles/RemoveRoles";

export default function AddInventory() {
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
        price: '',
        stateAcunt: false
    });

    const [imageSrc, setImageSrc] = useState('/media/shared/ui/image-placeholder.svg');
    const [imageFile, setImageFile] = useState(null);
    const [typeAcunt, setTypeAcount] = useState("");

    const [amount, setamount] = useState(false);
    const [textAmount, setTextAmount] = useState("");

    const [lastAmount, setlastAmount] = useState(false);
    const [textlastAmount, setTextlastAmount] = useState("");

    const [removeRoles, setRemovRoles] = useState(false);
    const [saving, setSaving] = useState(false);

    /* حفظ المنتج الجديد في الباك إند */
    const handleSave = async () => {
        setSaving(true);
        try {
            let imageUrl: string | undefined;
            if (imageFile) {
                try {
                    const { data: uploaded } = await uploadsApi.image(imageFile);
                    imageUrl = uploaded?.url || uploaded?.path;
                } catch (upErr) {
                    console.error("فشل رفع صورة المنتج:", upErr);
                }
            }
            /* الباك إند يقبل: nameAr, titleAr, quantity, minQuantity, image, menuItemId (بدون price) */
            await inventoryApi.create({
                nameAr: formData.nameAr,
                titleAr: formData.titleAr || undefined,
                quantity: Number(formData.idNumber) || 0,
                minQuantity: Number(formData.phone) || 0,
                ...(imageUrl ? { image: imageUrl } : {}),
            });
            toast.success("تم إضافة المنتج إلى المخزون بنجاح ✅");
            router.push("/inventory");
        } catch (e: any) {
            console.error("فشل إضافة المنتج:", e);
            const msg = e?.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg.join("، ") : (msg || "حدث خطأ أثناء الإضافة ❌"));
        } finally {
            setSaving(false);
            setRemovRoles(false);
        }
    };

    useEffect(() => {
        const data = window.sessionStorage.getItem("dateAcuntModetor");
        if (data) {
            const parsed = JSON.parse(data);
            setInitialData(parsed);
            setFormData({
                nameAr: parsed.name || '',
                titleAr: parsed.title || '',
                idNumber: parsed.idNumber || '',
                price: '',
                role: parsed.nameGop || '',
                phone: parsed.numperPone || '',
                email: parsed.email || '',
                stateAcunt: parsed.acount || false,
                id: parsed.id
            });
            setImageSrc(parsed.img || '/media/shared/ui/image-placeholder.svg');
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

    return (
        <section>
            <div className="w-[97%] mx-[1%] mt-[3%] flex flex-col p-[10px] bg-[#FEFEFE] rounded-[10px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
                <div className="py-5">
                    <p className="text-[#131313] font-semibold">تعديل المنتج</p>
                </div>
                <div className="grid grid-cols-[2.5fr_4.5fr_4.5fr] gap-[17px] my-[10px]">
                    <div className="rounded-[20px] ml-2 flex justify-center items-center flex-col bg-[var(--color-gray-seven)]">
                        <div className="relative w-[163px]">
                            <img src={imageSrc} width="163px" height="164px" alt="معاينة الصورة" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="flex justify-center items-center bg-[rgba(19,19,19,0.5)] text-white text-xs font-medium gap-2.5 w-[163px] h-8 rounded-lg -mt-7.5 relative z-[99] cursor-pointer"
                            >
                                <img src="/media/shared/ui/upload-white.svg" alt="أيقونة تحميل" />
                                تحميل الصورة
                            </label>
                        </div>
                        <p className="text-[#6E7485] font-normal text-xs w-[178px] text-center mt-5">
                            يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1
                        </p>
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
                                placeholder="أدخل الاسم"
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
                                        className="rounded-r-lg border border-gray-300 text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                                        placeholder="حدد الكميه"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="w-[17%] relative flex flex-col gap-[10px]">
                                    <span className="opacity-0">s</span>
                                    <div onClick={() => setamount(prev => !prev)} className="rounded-l-lg relative border border-gray-300 py-[10.3px] px-2 flex justify-between">
                                        <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${amount && 'rotate-180'}`} />
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
                                placeholder="حدد السعر"
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
                                    className="border border-gray-300 rounded-r-lg text-[var(--color-blue-tow)] text-base font-normal w-[290px] h-[42px] px-[5px] w-full"
                                    placeholder="حدد الحد الأدني"
                                    required
                                />
                            </div>
                            <div className="w-[17%] relative flex flex-col gap-[9.6px]">
                                <span className="opacity-0">s</span>
                                <div onClick={() => setlastAmount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:h-[80%] before:w-[1px] border border-gray-300 py-[10.5px] px-2 flex justify-between">
                                    <Image src="/media/shared/icons/arrow-details.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${lastAmount && 'rotate-180'}`} />
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
                <div className="w-[94%] m-[3%] flex justify-between">
                    <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
                        onClick={() => {
                            router.push("./ModeratorsFor/AllMoerators")
                        }}>
                        إلغاء
                    </button>
                                        <button
                        disabled={saving}
                        onClick={() => setRemovRoles(true)}
                        style={{
                            background: "#183866"
                        }}

                        className=" text-[#fff] w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%] disabled:opacity-50"
                    >
                        {saving ? "جارٍ..." : "حفظ"}
                    </button>
                </div>
            </div>

            {removeRoles && (
                /* تأكيد وحفظ المنتج الجديد في الباك إند */
                <RemoveRoles
                    text="هل أنت متأكد أنك تريد إضافة هذا المنتج إلى المخزون ؟"
                    handleDelete={handleSave}
                    onClose={() => setRemovRoles(false)}
                />
            )}
        </section>
    )
}