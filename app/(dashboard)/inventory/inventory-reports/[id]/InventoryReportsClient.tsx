export default function InventoryReportsClient({ id }: { id: string }) {
    return (
        <section className="flex flex-col gap-[16px] w-[98%] m-[1%] p-[16px]">
            <h2 className="text-[18px] font-semibold text-[#131313] whitespace-nowrap">
                تقرير المخزون رقم: {id}
            </h2>

            {/* TODO: أضف هنا تقرير الجرد الفعلي بناءً على id (جلب البيانات من الـ API) */}
            <div className="flex flex-col gap-[12px]">
                <p className="text-[14px] text-[rgba(29,29,29,0.7)]">
                    هذه الصفحة جاهزة لعرض تفاصيل تقرير الجرد. اربطها بالبيانات الفعلية من الـ API.
                </p>
            </div>
        </section>
    )
}