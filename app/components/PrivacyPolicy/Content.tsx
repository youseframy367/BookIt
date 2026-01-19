function Content() {
    const itemsPrivacyPolicy = [
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the"
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the "
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the"
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the"
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the"
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the"
        },
        {
            title: "Privacy Policy",
            text: "This text can be replaced with an alternative text that expresses the meaning This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the meaning.This text can be replaced with an alternative text that expresses the "
        },
    ]

    return (
        <section>
            <div className="container">
                <div className="mt-5 flex flex-col gap-10">
                    <h2 className="
   text-[42px] font-normal
    bg-gradient-to-r
    from-[var(--color-red)]
    via-red-100
    via-red-200
    to-transparent
    bg-clip-text text-transparent
">
                        Privacy Policy
                    </h2>
                    <ul className="flex flex-col gap-10">
                        {
                            itemsPrivacyPolicy.map((item, index) => {
                                return <li key={index} className="flex flex-col gap-5 text-base font-normal">
                                    <h2>{item.title}</h2>
                                    <span className="opacity-[0.5] leading-[28px]">{item.text}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Content;