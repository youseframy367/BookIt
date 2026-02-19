"use client";

import Footer from "@/app/components/PaymentMethods/Footer";
import Images from "@/app/components/PaymentMethods/Images";
import Squares from "@/app/components/PaymentMethods/Squares";
import Submit from "@/app/components/public/SubmitChangeCoffeeOrRes";
import { useTemplatesData } from "@/app/data/dataTemplates";
import { useMenuSearch } from "@/app/hooks/useBodyClass";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreateTemplate() {
    const router = useRouter();
    const templates = useTemplatesData();
    const { show, setShow } = useMenuSearch();
    
    return (
        <section className="relative" dir="rtl">
            <div className="font-cairo pt-[80px] text-white">
                <Images />
                <div className="container">
                    <Squares />
                    <div className="flex flex-col gap-[40px]">
                        <div className="relative z-2 flex flex-col items-center text-center gap-[20px]">
                            <h2 className="text-3xl md:text-5xl font-normal text-white font-semibold">
                                اختيار قالب الويب سايت
                            </h2>
                            <div className="md:w-[940px] text-center">
                                <span className="text-sm md:text-lg font-normal text-[var(--color-text-create-template)]">من فضلك اختار الواجهه الرئيسيه التي ستظهر للمستخدمين يرجي العلم ان هذه الواجهه ستظل مستمره معك
                                    لذا احرص  ان تختار الواجهه المناسبه لك ( اضغط علي القالب وشاهده جيدا وبعد ذلك اضغط موافق للأستكمال ) </span>
                            </div>
                        </div>
                        <div className="relative container-content">
                            <div className="grid md:grid-cols-2 gap-[34px]">
                                {
                                    templates.map((item, index) => {
                                        return <div className="overflow-hidden cursor-pointer group w-full rounded-[24px] bg-gradient-to-br from-[var(--color-one-template)] to-[var(--color-tow-template)] pt-1 relative" key={index}>
                                            <div onClick={() => setShow(true)} >
                                                <div title="القالب" className={`group overflow-hidden ${!show && 'z-1'} flex justify-center items-center absolute top-7 right-5 bg-white/20 backdrop-blur-md rounded-full w-[40px] h-[40px] border border-2 border-white`}>
                                                    <Image src="/assets/icons/arraw.svg" alt="arraw" width={13} height={13} className="transition-all duration-300 group-hover:-top-2 group-hover:left-[30px] absolute left-[13px] top-3" />
                                                    <Image src="/assets/icons/arraw.svg" alt="arraw" width={13} height={13} className="transition-all duration-300 top-7 -left-2 absolute group-hover:left-[13px] group-hover:top-3" />
                                                </div>
                                                <div className="transition-all duration-300 relative w-full h-[170px] md:h-[230px] scale-100 group-hover:scale-110 rotate-0 group-hover:rotate-3">
                                                    <Image src={`/assets/icons/${item.imageOut}.svg`} alt="ui" fill />
                                                </div>
                                            </div>
                                            {
                                                show && <div className="relative z-2 flex justify-center">
                                                    <div className="fixed top-8 left-0 w-full">
                                                        <div className="flex flex-col items-center gap-[16px]">
                                                            <h2 className="font-semibold ms-7">مرر للأعلي وشاهد القالب بالكامل </h2>
                                                            <div className="overflow-scroll w-[35%] h-[500px]">
                                                                <img src={`/assets/icons/${item.imageInput}.svg`} alt="landing page" className="w-full object-cover" />
                                                            </div>
                                                            <div className="w-[30%]" onClick={() => router.push("/showDateOne/control")}>
                                                                <Submit title="نعم ؛ انا موافق علي هذا القالب وأريد الاستمرار به" width="w-full" />
                                                            </div>
                                                            <div className="w-[30%]" onClick={() => setShow(false)}>
                                                                <Submit isColor="bg-white text-[var(--color-go-password)]" title="لا ؛ لم يعجبني هذا القالب اريد ان اشاهد اخر" width="w-full" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    })
                                }
                            </div>
                            <div className="-z-1 top-0 absolute w-full h-full">
                                <div className="w-full h-full relative">
                                    <Image src="/assets/icons/squares-1.svg" alt="squares" fill />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </section>
    )
}