import Content from "../components/LocationRestaurant/Content";
import FilterTitle from "../components/LocationRestaurant/FilterTitle";
import Hero from "../components/public/Hero";

function locationRestaurant() {
    return (
        <>
            <Hero nextPage="/location-restaurant" title="Pane Vino - InterContinental Cairo Semiramis" />
            <FilterTitle />
            <Content />
        </>
    )
}

export default locationRestaurant;