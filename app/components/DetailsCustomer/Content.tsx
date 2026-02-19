import { ChildRegister } from "@/app/TypeScript/TypeScript";

export default function ContentDetailsCustomer({ children, padding }: ChildRegister) {
    return (
        <div className="container-content">
            <div className={`${padding} mt-10 md:mt-25 md:border md:border-2 border-[var(--color-not-active)] rounded-2xl shadow-lg`}>
                {children}
            </div>
        </div>
    )
}