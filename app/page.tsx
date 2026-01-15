import Baner from "./components/LandingPage/Paner";
// import OurBlog from "./OurBlog"
// import HowBOOKwork from "./HowdoesBOOKITwork"
// import RestaurantManagers from "./RestaurantManagersExperiences"
import SlideToBaner from "./components/LandingPage/style-slider-to-baner/sliderToBaner";
import TopRated from "./components/LandingPage/TopRatedOrMostBooked";

function Home() {
    const dataRelated = [
        {
            
        }
    ]

    return (
        <>
            <Baner />
            <SlideToBaner />
            <TopRated />
            <TopRated />
            {/*   <OurBlog />
            <HowBOOKwork />
            <RestaurantManagers /> */}
        </>
    )
}

export default Home;