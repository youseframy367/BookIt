import Hero from "../../../components/menu/Hero";
import Products from "../../../components/menu/Products";

// صفحة المنيو حسب الـ id
export default function MenuPage({ params }: { params: { id: string } }) {
    const products = [
        {
            id: 1,
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 2,
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 3,
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 4,
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 5,
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 6,
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            id: 7,
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            id: 8,
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            id: 9,
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        }
    ]

    return (
        <>
            <Hero />
            <Products products={products} />
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