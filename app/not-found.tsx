import Footer from "./components/public/Footer";
import FooterMobile from "./components/public/FooterMobile";
import Header from "./components/public/Header";

export default function NotFound() {
    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="mt-10">
                        <video
                            className="w-full h-[573px]"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src="/assets/videos/error.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>
            <Footer />
            <FooterMobile />
        </>
    );
}