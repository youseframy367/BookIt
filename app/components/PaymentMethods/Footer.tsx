import { useFootrerPaymentData } from "@/app/data/dataFooterPayment";
import Link from "next/link"

export default function Footer() {
    const links = useFootrerPaymentData();

    return <ul className="flex gap-3">
        {
            links.map((item, index) => {
                return <li key={index} className="text-white" title={item.title}>
                    <Link href={item.link}>
                        {item.title}
                    </Link>
                </li>
            })
        }
    </ul>
}