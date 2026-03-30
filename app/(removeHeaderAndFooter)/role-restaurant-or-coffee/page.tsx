import CoffeOrRestaurant from "../../components/Role/CoffeeOrRestaurant";

export async function RoleRestaurantOrCoffee() {
    return [
        { id: "coffee" },
        { id: "resturant" },
    ];
}

export default function Role() {
    return <CoffeOrRestaurant />;
}