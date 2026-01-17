import { ChildRegister } from "@/app/TypeScript/TypeScript";

function ContentDetailsCustomer({ children, padding }: ChildRegister) {
    return (
        <div className="container-content">
            <div className={`${padding} mt-25 border border-2 border-[var(--color-not-active)] rounded-2xl shadow-lg`}>
                {children}
            </div>
        </div>
    )
}

export default ContentDetailsCustomer;