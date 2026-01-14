import Baner from "../components/LandingPage/Paner";
// import OurBlog from "./OurBlog"
// import HowBOOKwork from "./HowdoesBOOKITwork"
// import RestaurantManagers from "./RestaurantManagersExperiences"
import SlideToBaner from "../components/LandingPage/style-slider-to-baner/sliderToBaner";
import TopRated from "../components/LandingPage/TopRated";
// import MostBoked from "./MostBooked"

function Home() {
    return (
        <>
            <Baner />
            <SlideToBaner />        
            <TopRated />
            {/* <MostBoked />
            <OurBlog />
            <HowBOOKwork />
            <RestaurantManagers /> */}
        </>
    )
}

export default Home;