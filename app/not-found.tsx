function NotFound() {
    return (
        <section>
            <div className="container">
                <div className="mt-10">
                    <video
                        className="w-full h-full md:h-[573px]"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/assets/error.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}

export default NotFound;