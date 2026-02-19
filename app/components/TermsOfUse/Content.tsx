export default function Content() {
    const itemsPrivacyPolicy = [
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the ",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the",
        "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the ",
    ]

    return (
        <section>
            <div className="container">
                <div className="mt-5 flex flex-col gap-5">
                    <h2 className="
   text-[42px] font-normal
    bg-gradient-to-r
    from-[var(--color-red)]
    via-red-100
    via-red-200
    to-transparent
    bg-clip-text text-transparent
">
                        Terms of Use
                    </h2>
                    <ul className="flex flex-col gap-2">
                        {
                            itemsPrivacyPolicy.map((item, index) => {
                                return <li key={index} className="flex flex-col text-xs md:text-base font-normal">
                                    <span className="opacity-[0.5] leading-[28px]">{item}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}