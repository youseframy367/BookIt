import Baner from "./components/LandingPage/Paner";
import OurBlog from "./components/LandingPage/OurBlog";
import HowBOOKwork from "./components/LandingPage/HowdoesBOOKITwork";
import RestaurantManagers from "./components/LandingPage/RestaurantManagersExperiences";
import SlideToBaner from "./components/LandingPage/style-slider-to-baner/sliderToBaner";
import TopRated from "./components/LandingPage/TopRatedOrMostBooked";

function Home() {
    const dataRealtied = [
        {
            header: {
                title: "Top Rated",
                subTitle: "Check out the top-rated dining spots and enjoy a memorable experience.",
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: "Pane Vino",
                    Relative: 0.9,
                    des: "Experience Pane Vino, a charming restaurant offering a delightful journey through classic Italian flavors...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: "La Zisa",
                    Relative: 0.6,
                    des: "La Zisa is a premier dining destination in Cairo, renowned for its exceptional Italian cuisine...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-3.png",
                    name: "Stefanos",
                    Relative: 0.8,
                    des: "Stefanos is a distinguished restaurant offering a rich blend of Mediterranean and Italian flavors...",
                    lick: false,
                },
            ],
        },
        {
            header: {
                title: "Most Booked",
                subTitle: "Discover the most popular dining spots and reserve your table today.",
            },
            items: [
                {
                    img: "/assets/icons/top-rated-1.png",
                    name: "La Pergola",
                    Relative: 0.95,
                    des: "La Pergola offers an unforgettable Italian dining experience in Rome...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: "Osteria Francescana",
                    Relative: 0.9,
                    des: "Renowned in Modena, Osteria Francescana blends traditional and modern Italian cuisine...",
                    lick: false,
                },
                {
                    img: "/assets/icons/top-rated-2.png",
                    name: "Osteria Francescana",
                    Relative: 0.9,
                    des: "Renowned in Modena, Osteria Francescana blends traditional and modern Italian cuisine...",
                    lick: false,
                },
            ],
        }
    ];

    return (
        <>
            <Baner />
            <SlideToBaner />
            <TopRated dataRealtiedAndBooked={dataRealtied} />
            <OurBlog />
            <HowBOOKwork />
            <RestaurantManagers />
        </>
    )
}

export default Home;