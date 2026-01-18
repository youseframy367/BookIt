import Hero from "../components/public/Hero";
import TopRated from "../components/LandingPage/TopRatedOrMostBooked";

function MostBooked() {
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
        }
    ];

    return (
        <>
            <Hero image="customer-content.svg" title="Most Booked" backPage="/" />
            <TopRated dataRealtiedAndBooked={dataRealtied} isShowTitle={true} />
        </>
    )
}

export default MostBooked;