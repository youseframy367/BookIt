import Content from "../components/DetailsRestaurant/Content";
import Hero from "../components/public/Hero";

function DetailsRestaurant() {
    return (
        <>
            <Hero image="hero-gallery" nextPage="/location-restaurant" title="Gallery" />
            <Content />
        </>
    )
}

export default DetailsRestaurant;