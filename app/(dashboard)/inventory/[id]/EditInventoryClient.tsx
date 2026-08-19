"use client";

/* ============================== تعديل منتج المخزون — داتا حقيقية ==============================
   تحميل: GET /api/inventory/:id → ملء الحقول
   الحفظ: PATCH /api/inventory/:id (صحة المنتج + الكمية + السعر + الحد الأدنى)
   الـ id الحقيقي يأتي من /inventory/[id] وليس hardcoded
   ============================================================================ */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddAndUploadData from "@/app/components/Dashborad/AddAndUploadData";
import Image from "next/image";
import { inventoryApi, uploadsApi } from "@/utils/api";

export default function UpdateModerators({ id }: { id: string }) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('/media/shared/ui/image-placeholder.svg');
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [amount, setamount] = useState(false);
  const [textAmount, setTextAmount] = useState("");

  const [lastAmount, setlastAmount] = useState(false);
  const [textlastAmount, setTextlastAmount] = useState("");

  /* حقول قابلة للتعديل مربوطة بالداتا الحقيقية */
  const [formData, setFormData] = useState({
    nameAr: "",
    titleAr: "",
    quantity: "",
    minQuantity: "",
    price: "",
    stateAcunt: true,
  });

  /* تحميل بيانات المنتج الحقيقية عند فتح الصفحة */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await inventoryApi.one(id);
        if (data) {
          setFormData({
            nameAr: data.nameAr || "",
            titleAr: data.titleAr || "",
            quantity: String(data.quantity ?? ""),
            minQuantity: String(data.minQuantity ?? ""),
            price: "",
            stateAcunt: data.status !== "suspended",
          });
          if (data.image) setImageSrc(data.image);
        }
      } catch (e) {
        console.error("فشل تحميل بيانات المنتج:", e);
        toast.warn("تعذر تحميل بيانات المنتج من الخادم");
      }
    })();
  }, [id]);

  /* حفظ التعديلات في الباك إند */
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
      await inventoryApi.update(id, {
        nameAr: formData.nameAr || undefined,
        titleAr: formData.titleAr || undefined,
        quantity: Number(formData.quantity) || undefined,
        minQuantity: Number(formData.minQuantity) || undefined,
        status: formData.stateAcunt ? "active" : "suspended",
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      toast.success("تم تحديث المنتج بنجاح ✅");
      router.push("/inventory");
    } catch (e: any) {
      console.error("فشل تحديث المنتج:", e);
      const msg = e?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg.join("، ") : (msg || "حدث خطأ أثناء الحفظ ❌"));
    } finally {
      setSaving(false);
    }
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
    <AddAndUploadData title="تعديل المنتج" isTureUpdateTitle="اعادة ضبط الكميه من البدايه" isFalseUpdateTitle="ايقاف الحساب" isShowUpdate
      /* تمرير زر حفظ متصل بالـ API */
      isSaveLoading={saving}
      onSave={handleSave}
      onToggleStatus={() => setFormData(prev => ({ ...prev, stateAcunt: !prev.stateAcunt }))}>
      <div className="relative bg-[var(--color-gray-seven)] rounded-[20px] justify-center items-center text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="imageUpload"
        />
        <div className="absolute top-0 right-0 p-5">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-white border border-[var(--color-black-tow)] border-1 px-[16px] py-[4px] rounded-[8px] flex gap-[8px]"
          >
            <Image src="/media/dashboard/actions/edit-outline.svg" alt="تعديل صورة المنتج" width={14} height={14} />
            <span>تعديل</span>
          </label>
        </div>
        <div className="p-5 flex flex-col gap-[20px]">
          <Image src="/media/shared/icons/upload-product.svg" alt="upload product" width={200} height={200} />
          <span className="text-[var(--color-gray-ate)] text-xs">يجب أن يكون حجم الصورة أقل من 1 ميجا بايت ويجب أن تكون نسبة الصورة 1:1</span>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-[17px]">
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">اسم المنتج</label>
            <input
              type="text"
              name="nameAr"
              value={formData.nameAr}
              onChange={handleChange}
              className="text-[#8C94A3] text-sm font-normal h-[42px] border border-gray-300 rounded-[8px] px-2"
              placeholder="مانجا"
              required
            />
          </div>
          <div className="flex flex-col gap-[18px] w-full">
            <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">سعر الكيلو</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="text-[#8C94A3] text-[12px] font-normal rounded-[8px] h-[42px] border border-gray-300 rounded px-[5px] w-full"
              placeholder="150 جنيه مصري"
              required
            />
          </div>
          <div className="flex">
            <div className="flex flex-col gap-[18px] w-full">
              <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الكميه المتاحه</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="rounded-r-lg bg-[var(--color-gray-nine)] text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                placeholder="أدخل رقم الجوال"
                required
              />
            </div>
            <div className="relative flex flex-col gap-[10px]">
              <span className="opacity-0">s</span>
              <div onClick={() => setamount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:bg-[var(--alpha)] before:h-[80%] before:w-[1px] bg-[var(--color-gray-nine)] py-[11px] px-4 flex gap-2 justify-between">
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
          <div className="flex">
            <div className="flex flex-col gap-[18px]">
              <label className="text-[#1D2026] tracking-[-1%] font-normal text-xs">الحد الادني الذي يوضح بأن الكميه قريبه من النفاذ</label>
              <input
                type="number"
                name="minQuantity"
                value={formData.minQuantity}
                onChange={handleChange}
                className="border border-gray-300 rounded-r-lg text-[#8C94A3] text-[12px] font-normal w-[290px] h-[42px] px-[5px] w-full"
                placeholder="10"
                required
              />
            </div>
            <div className="relative flex flex-col gap-[25.3px]">
              <span className="opacity-0">s</span>
              <div onClick={() => setlastAmount(prev => !prev)} className="rounded-l-lg relative before:content-[''] before:absolute before:top-[10%] before:right-0 before:h-[80%] before:w-[1px] border border-gray-300 py-[11px] px-2 flex justify-between">
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
          <div className="flex flex-col gap-[34px] w-full">
            <label htmlFor="idNumber" className="text-[#1D2026] tracking-[-1%] font-normal text-xs">تاريخ الاضافه</label>
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
