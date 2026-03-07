import { useTranslationSetup } from "@/app/hooks/useTranslationSetup";

export type Note = {
    title: string;
    nameInput: string;
    checked: boolean;
};

export type BookitConditionsProps = {
    notes: Note[];
    handleChange: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function BookitConditions({ notes, handleChange }: BookitConditionsProps) {
    const { t, mounted } = useTranslationSetup();

    return (
        <section className="mt-[57px]">
            <div className="container-payment-method">
                <div className="flex flex-col gap-[13px] md:gap-[49px]">
                    <h3 data-aos="fade-up" className="font-semibold text-[var(--strong-red)] text-xl md:text-3xl">{mounted ? t('title-notes') : '...'}</h3>
                    <ul className="flex flex-col gap-[18px] md:gap-[30px]">
                        {
                            notes.map((item, index) => {
                                return <li data-aos="fade-up" key={index} className="flex gap-[17px]">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            checked={item.checked}
                                            onChange={handleChange(index)}
                                            type="checkbox"
                                            className="peer sr-only"
                                        />
                                        <div>
                                            <div className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border-1 border-[var(--color-gray-three)] rounded-[4px] transition-all duration-200 relative">
                                                {
                                                    item.checked && <div className="absolute z-10 w-full h-full">
                                                        <img src="/assets/icons/checkbox-red.svg" alt="صج" width={20} height={20} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <span className="text-[8px] md:text-base text-[var(--alpha)]">{mounted ? t(item.title) : '...'}</span>
                                    </label>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}