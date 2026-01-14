import { ChildRegister } from "@/app/main/TypeScript/TypeScript";

function ContentDetailsCustomer({ children }: ChildRegister) {
    return (
        <div className="container-content">
            <div className="p-10 mt-25 border border-2 border-[var(--color-not-active)] rounded-2xl shadow-lg">
                {children}
            </div>
        </div>
    )
}

export default ContentDetailsCustomer;