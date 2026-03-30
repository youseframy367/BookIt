import Image from "next/image";

export default function SucessBookit() {
    return (
        <section>
            <div className="w-full h-screen">
                <Image src="/assets/icons/bg-sucess-bookit.svg" alt="bookit" fill className="object-cover" />
                <div className="container h-full flex justify-center items-center">
                    <div className="w-[85%] xl:w-[40%] h-[80%] md:h-[750px] relative">
                        <Image src="/assets/icons/paper.svg" alt="paper" fill className="sm:object-cover" />
                        <div className="h-full overflow-auto relative px-12 md:px-19 ms-5 font-normal font-Amiri text-[var(--color-rosewood)] rotate-7 flex flex-col md:pt-25 items-center justify-center md:justify-start gap-[15px]">
                            <h2 className="text-xl md:text-[45px]">تأكيد حجز</h2>
                            <p className="text-[8px] md:text-sm">نود تذكيرك بأن هذا الحجز قابل للاسترداد حتى قبل الموعد المحدد بساعتين فقط. بعد ذلك تصبح المنصة غير مسؤولة عن الحجز، وتؤول قيمة الحجز بالكامل إلى المتجر الذي قمت بالحجز لديه. كما نرجو الالتزام بالموعد المحدد للحجز، حيث قد يقوم المتجر بإلغاء الحجز في حال التأخر عن الموعد المحدد وفقًا لسياسة المتجر. كما نحيطكم علمًا بأن مدة الجلوس داخل المتجر لا تتجاوز ساعتين كحد أقصى، وذلك لإتاحة الفرصة للعملاء الآخرين الذين لديهم حجوزات لاحقة.
                                وسيتم إرسال رسالة تأكيد قبل موعد الحجز بساعتين، ويجب عليك الموافقة أو الرفض. في حال الرفض سيتم استرداد المبلغ المدفوع، أما في حال الموافقة فسيتم اعتبار الحجز مؤكدًا، وسيتم خصم قيمة الحجز من إجمالي الفاتورة التي سيقوم الكاشير بحسابها داخل المتجر. وفي حال عدم الرد على رسالة التأكيد خلال المدة المحددة، يصبح الحجز مؤكدًا تلقائيًا وتؤول قيمة الحجز إلى المتجر. </p>
                            <ul className="mt-5 flex flex-col items-center gap-[8px]">
                                <li>الوقت المحدد : 06:00 PM </li>
                                <li>التاريخ المحدد : 05/11/2026</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}