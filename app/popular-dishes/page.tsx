import Products from "../components/menu/Products";
import Hero from "../components/public/Hero";

function PopularDishes() {
    const products = [
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
            active: false,
            icon: "egg-salad",
            title: "Egg Salad",
            subTitle: "Description of the item",
            amount: "23.00",
            rating: "4.5"
        },
        {
            active: true,
            icon: "fattoush-salad",
            title: "Fattoush salad",
            subTitle: "Description of the item",
            amount: "24.00",
            rating: "4.9"
        },
        {
            active: false,
            icon: "vegetable-salad",
            title: "Vegetable Salad",
            subTitle: "Description of the item",
            amount: "26.00",
            rating: "4.6"
        },
        {
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
            <Hero image="popular-dishes.png" title="Popular Dishes" backPage="/" />
            <Products products={products} marginTop="mt-25" />
        </>
    )
}

export default PopularDishes;