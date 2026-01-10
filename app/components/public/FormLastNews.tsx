function FormLastNews() {
    return (
        <section className="mt-20 relative z-2">
            <div className="absolute w-full">
                <div className="container-content">
                    <div className="bg-white border border-[var(--color-navbar)] border-1 rounded-3xl px-5 md:px-25 py-5 md:py-15">
                        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
                            <h2 className="text-[var(--color-text-footer)] font-PlayfairDisplay font-normal lg:text-[64px]">Our Newsletter</h2>
                            <form action="">
                                <label htmlFor="" className="flex flex-col gap-2">
                                    <span>Email</span>
                                    <div className="flex flex-wrap gap-4">
                                        <input type="email" placeholder="Enter your Email" className="font-normal text-xl font-rubik placeholder:text-[var(--color-red)] bg-[var(--color-input-email)] px-7 py-5 rounded-xl lg:w-[372px]" />
                                        <input value="Subscript" type="submit" className="cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-7 py-5 rounded-xl" />
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FormLastNews;