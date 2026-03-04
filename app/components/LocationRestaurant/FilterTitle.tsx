import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";
import { filterTitle } from "@/app/TypeScript/TypeScript";

export default function FilterTitle({ data, onChange }: filterTitle) {
    const { i18n, mounted } = useTranslationSetup();
    
    return (
        <section>
            <div className="container">
                <ul className="mt-20 flex justify-center gap-[20px] md:gap-[56px]">
                    {
                        data.map((item, index) => {
                            return <li key={index} title={mounted ? item.title : ""} className={`${mounted ? i18n.language === 'ar' ? "font-semibold font-cairo" : "font-medium" : ""} hover:text-white before:bg-[var(--strong-red)] before:bottom-0 before:rounded-t-[50%] relative rounded-full cursor-pointer overflow-hidden before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:z-1 before:bottom-0 before:transition-all before:duration-800 hover:before:h-[180%] ${item.active && 'active'} cursor-pointer border border-1 border-[var(--dark-gray)] px-3 md:px-10 py-3 md:py-4 rounded-[30px] text-sm md:text-xl`} onClick={() => onChange(index)}>
                                <span className="text-center relative z-1 transition-all duration-800">
                                    {mounted ? item.title : ""}
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </section>
    )
}