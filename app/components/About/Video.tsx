export default function Video() {
    return (
        <section>
            <div className="overflow-hidden relative w-full h-[197px] md:h-[690px] mt-10 md:mt-35">
                <div className="w-full h-full absolute bg-[var(--color-dark-overlay-light)]">
                </div>
                <video
                    className="w-full h-full md:h-full -z-1 object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/media/platform/about/overview-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    )
}