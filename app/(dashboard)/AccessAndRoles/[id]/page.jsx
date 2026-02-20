import Image from "next/image"
import Link from "next/link"

export default function UpdateAccessAndRoles() {
    return (
        <div className="flex w-[98%] m-[1%] h-[86vh] bg-[#fff] rounded-[11px] flex-col overflow-hidden px-[25px] ">
            <div className="flex flex-col gap-[23px]">
                <div className="pt-[23px] flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-[#1D1D1D] font-semibold text-base whitespace-nowrap">عرض الدور</h2>
                    <div className="text-[var(--color-red-table)] text-xs font-semibold bg-[var(--color-red-again)] rounded-[10px] px-[15px] py-[10px]">
                        <span>اعاده التفعيل</span>
                    </div>
                </div>
                <div className="border border-1 border-[var(--color-navbar)] rounded-[16px] py-[16px] px-[25px]">
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-base">عرض تفاصيل الدور ( AR )</span>
                            <Link href="" className="border border-1 border-[var(--color-navbar)] flex gap-[8px] rounded-[8px] py-[11px] px-[16px]">
                                <Image src="/assets/icons/update.svg" alt="update" width={14} height={14} />
                                <span className="font-semibold text-[var(--color-btn-update)]">تعديل</span>
                            </Link>
                        </div>
                        <hr className="text-[var(--color-line-update)]" />
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex md:gap-[312px]">
                                <span className="text-[var(--color-name)] text-sm font-normal">الاسم : <span className="text-[var(--color-btn-update)]">مشرف</span></span>
                                <span className="text-[var(--color-name)] text-sm font-normal">الحالة : <span className="text-[var(--color-red-table)]">معلق</span></span>
                            </div>
                            <span className="text-[var(--color-access)] text-sm font-normal">الصلاحيات : <span className="text-[var(--color-btn-update)]">يمكن لهذا الدور  اضافه كل مايلي ( اضافة فواتيبر للعملاء - اضافة فواتير للعملاء )</span></span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link href="/AccessAndRoles" className="border border-1 border-[var(--color-navbar)] flex gap-[8px] rounded-[8px] py-[7px] px-[23px]">
                        <span className="font-semibold text-[var(--color-btn-update)]">الغاء</span>
                    </Link>
                    <button className="border-[1px] bprder-[#183866] bg-[#183866] text-[#fff] text-sm px-[23px] py-[7px] rounded-[12px] font-medium">
                        حفظ
                    </button>
                </div>
            </div>
        </div>
    )
}