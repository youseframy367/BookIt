"use client";

/* ============================== إعدادات الكاشير — داتا حقيقية ==============================
   المصدر: GET /api/cashier/settings → إعدادات الفاتورة المحفوظة
   + PATCH /api/cashier/settings → حفظ الإعدادات
   ============================================================================ */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useInvoice } from "../../context/InvoiceContext";
import { cashierApi, uploadsApi } from "@/utils/api";

export default function Sales() {
    const router = useRouter()
    const [imageSrc, setImageSrc] = useState('/img/trrruyeryer.svg');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { showQr, setShowQr } = useInvoice();

    const [showSizePaper, setShowSizePaper] = useState(false);
    const [textSizePaper, setTextSizePaper] = useState("");

    const [date, setdate] = useState(false);
    const [textdate, setTextdate] = useState("");

    const [formData, setFormData] = useState({
        nameAr: '',
        titleAr: '',
        idNumber: '',
        confirmPassword: '',
        nameEn: '',
        titleEn: '',
        role: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();

            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                    setImageSrc(result);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const [loading, setLoading] = useState(false);

    /* تحميل إعدادات الكاشير المحفوظة من الباك إند */
    useEffect(() => {
        (async () => {
            try {
                const { data } = await cashierApi.settings();
                if (data) {
                    setFormData((prev) => ({
                        ...prev,
                        nameAr: data.storeName || data.nameAr || "",
                        titleAr: data.supportPhone || data.titleAr || "",
                        idNumber: data.vatRate != null ? String(data.vatRate) : "",
                        titleEn: data.taxRecord || data.titleEn || "",
                        email: data.taxNumber != null ? String(data.taxNumber) : "",
                    }));
                    setTextSizePaper(data.paperSize || "");
                    setTextdate(data.timeFormat || "");
                    if (data.qrEnabled != null) setShowQr(Boolean(data.qrEnabled));
                    if (data.deliveryFee != null) setFormData((p) => ({ ...p, password: String(data.deliveryFee) }));
                    if (data.logo) setImageSrc(data.logo);
                }
            } catch (e) {
                console.error("فشل تحميل إعدادات الكاشير:", e);
            }
        })();
    }, []);

    const handleSubmit = async (e: any) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            /* إن رُفعت صورة جديدة نرفعها أولاً */
            let logoUrl: string | undefined;
            if (imageFile) {
                try {
                    const { data: uploaded } = await uploadsApi.image(imageFile);
                    logoUrl = uploaded?.url || uploaded?.path;
                } catch (upErr) {
                    console.error("فشل رفع اللوجو:", upErr);
                }
            }
            await cashierApi.updateSettings({
                storeName: formData.nameAr,
                supportPhone: formData.titleAr,
                vatRate: formData.idNumber ? Number(formData.idNumber) : 0,
                taxRecord: formData.titleEn,
                taxNumber: formData.email ? Number(formData.email) : undefined,
                paperSize: textSizePaper,
                timeFormat: textdate,
                qrEnabled: showQr,
                deliveryFee: formData.password ? Number(formData.password) : 0,
                ...(logoUrl ? { logo: logoUrl } : {}),
            });
            toast.success("تم حفظ إعدادات الكاشير ✅");
        } catch (error: any) {
            console.error("Failed to save:", error);
            const msg = error?.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg.join("، ") : (msg || "حدث خطأ أثناء الحفظ ❌"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-2 bg-white rounded-2xl p-5 h-[85vh]">
            <p className="m-1 text-[#3D3D3D] font-semibold">اعدادات سيستيم الكاشير</p>
            <div className="w-[98%] mx-[1%] mt-[3%] flex flex-col py-4 bg-[#FEFEFE] rounded-2xl shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
                <div className="flex flex-col gap-[24px]">
                    <div className="px-4 w-full flex justify-between">
                        <p className="text-[#131313] font-semibold">بيانات الكاشير ( معلومات الفاتوره )</p>
                        <img src="/img/ewewewew.svg" width="16" height="16" alt="icon" />
                    </div>
                    <hr className="text-[var(--color-black-05)]" />
                </div>
                <div className="px-4 grid grid-cols-[3fr_3fr_3fr_3fr] my-5 gap-[16px]">
                    <div className="flex flex-col items-center mt-10">
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
                                <img src="/img/UploadSimple.svg" alt="أيقونة تحميل" />
                                تحميل الصورة
                            </label>
                        </div>
                        <p className="text-[#6E7485] font-normal text-[10px] w-[178px] text-center mt-5">
                            من فضلك حدد لوجو المطعم او الكافيه الخاص بك يرجي العلم ان هذا اللوجو سيظهر في الفاتوره
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="nameAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المتجر</label>
                            <input
                                type="text"
                                name="nameAr"
                                value={formData.nameAr}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="أدخل اسم المتجر"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="titleAr" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">رقم هاتف خدمة العملاء</label>
                            <input
                                type="number"
                                name="titleAr"
                                value={formData.titleAr}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="ادخل رقم الهاتف"
                                required
                            />
                        </div>
                        <div className="relative flex flex-col gap-4.5">
                            <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">نسبة الضريبه</label>
                            <input
                                type="number"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-5"
                                required
                            />
                            <span className="opacity-[0.5] top-[56%] right-2 absolute">%</span>
                        </div>
                        <div className="relative flex gap-2.5">
                            <input type="checkbox" id="qr" checked={showQr}
                                onChange={(e) => setShowQr(e.target.checked)} />
                            <label htmlFor="qr" className="text-xs">إضافة Qr Code الخص بالويب سايت في الفاتوره</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col gap-4.5">
                            <span className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حجم ورقة الطباعه</span>
                            <div className="relative flex flex-col gap-[5px]">
                                <div onClick={() => setShowSizePaper(prev => !prev)} className={`${showSizePaper && 'bg-gray-300'} border border-gray-300 py-[12px] px-2 rounded-[10px] flex justify-between`}>
                                    <span className={`${showSizePaper ? 'text-[var(--color-dark-blue-gray)]' : 'text-[#8C94A3]'} text-sm font-normal opacity-[0.5]`}>حدد حجم الورقه</span>
                                    <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${showSizePaper && 'rotate-180'}`} />
                                </div>
                                {
                                    showSizePaper && <ul className="bg-white w-full border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-13 p-[8px] flex flex-col gap-2">
                                        <li className={`${textSizePaper == '80' && 'text-white bg-[var(--color-dark-blue-gray)]'} text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-black-three)] flex justify-between`} onClick={() => setTextSizePaper('80')}>
                                            <span>طباعة 80mm</span>
                                            {textSizePaper == '80' && <span>✔</span>}
                                        </li>
                                        <li className={`${textSizePaper == '58' && 'text-white bg-[var(--color-dark-blue-gray)]'} text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-black-three)] flex justify-between`} onClick={() => setTextSizePaper('58')}>
                                            <span>طباعة 58mm</span>
                                            {textSizePaper == '58' && <span>✔</span>}
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="titleEn" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">السجل الضريبي ( اختياري )</label>
                            <input
                                type="text"
                                name="titleEn"
                                value={formData.titleEn}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="أدخل السجل ان وجد"
                            />
                        </div>
                        <div className="flex flex-col gap-4.5">
                            <span className="text-[#1D2026] tracking-[-1%] font-normal text-xs">تنسيق الوقت</span>
                            <div className="relative flex flex-col gap-[5px]">
                                <div onClick={() => setdate(prev => !prev)} className={`${date && 'bg-gray-300'} border border-gray-300 py-[12px] px-2 rounded-[10px] flex justify-between`}>
                                    <span className={`${date ? 'text-[var(--color-dark-blue-gray)]' : 'text-[#8C94A3]'} text-sm font-normal opacity-[0.5]`}>حدد تنسيق الوقت</span>
                                    <Image src="/assets/icons/arraw-down.svg" alt="arraw" width={12} height={12} className={`transition-all duration-300 ${date && 'rotate-180'}`} />
                                </div>
                                {
                                    date && <ul className="bg-white w-full border border-1 border-[var(--color-gray-four)] rounded-lg absolute top-13 p-[8px] flex flex-col gap-2">
                                        <li className={`${textdate == '12' && 'text-white bg-[var(--color-dark-blue-gray)]'} text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-black-three)] flex justify-between`} onClick={() => setTextdate('12')}>
                                            <span>12 ساعة (AM/PM) → الساعة بصيغة 1:00 PM</span>
                                            {textdate == '12' && <span>✔</span>}
                                        </li>
                                        <li className={`${textdate == '24' && 'text-white bg-[var(--color-dark-blue-gray)]'} text-xs rounded-[6px] p-[8px] cursor-pointer text-[var(--color-black-three)] flex justify-between`} onClick={() => setTextdate('24')}>
                                            <span>24 ساعة → الساعة بصيغة 13:00</span>
                                            {textdate == '24' && <span>✔</span>}
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="phone" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حدد العمله</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-[var(--color-gray-five)] text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="جنيه مصري"
                                required
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="number" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الرقم الضريبي ( اختياري )</label>
                            <input
                                type="number"
                                name="number"
                                value={formData.email}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="أدخل الرقم ان وجد"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-4.5">
                            <label htmlFor="number" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">حدد سعر توصيل الطلبات</label>
                            <input
                                type="number"
                                name="number"
                                value={formData.email}
                                onChange={handleChange}
                                className="text-[#8C94A3] text-sm font-normal w-full py-3 border border-gray-300 rounded-[10px] px-2"
                                placeholder="جنيه مصري"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[94%] m-[3%] flex justify-between">
                <button className="text-[#6E7485] text-base font-semibold tracking-[-1%] bg-white border border-[#E9EAF0] w-[81px] h-12 rounded-xl flex justify-center items-center"
                    onClick={() => {
                        router.push("/ModeratorsFor/AllMoerators")
                    }}>
                    إلغاء
                </button>
                <button
                    onClick={handleSubmit}
                    style={{
                        background: "#183866"
                    }}

                    className="text-white w-[100px] h-12 rounded-xl flex justify-center items-center text-base font-medium tracking-[-1%]"
                >
                    {loading ? "جارٍ..." : "حفظ"}
                </button>
            </div>
        </div>
    );
}