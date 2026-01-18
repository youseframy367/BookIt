import Hero from "../../components/menu/Hero";
import Products from "../../components/menu/Products";

// صفحة المنيو حسب الـ id
export default function MenuPage({ params }: { params: { id: string } }) {
    return (
        <>
            <Hero />
            <Products />
        </>
    );
}

// هنا تضيف generateStaticParams
export async function generateStaticParams() {
    // لو عندك IDs ثابتة
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
    ];
}

// import Hero from "../../components/menu/Hero";
// import Products from "../../components/menu/Products";

// export default function Home() {
//     return (
//         <>
//             <Hero />
//             <Products />
//         </>
//     );
// }