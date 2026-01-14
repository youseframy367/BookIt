import Rating from "./Rating";
import Reivews from "./Reivews";

function ContentRatingAndReviews() {
    return (
        <section>
            <div className="container-content">
                <div className="flex flex-col gap-10 mt-[96px]">
                    <div data-aos="fade-up" className="text-center">
                        <h2 className="font-Roboto text-3xl font-normal opacity-[0.7]">What 273 people are saying</h2>
                    </div>
                    <Rating />
                    <Reivews />
                </div>
            </div>
        </section>
    )
}

export default ContentRatingAndReviews;