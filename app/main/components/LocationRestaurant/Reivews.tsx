function Reivews() {
    const totalStars = 5;

    const reviews = [
        {
            title: "“I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience. The system has greatly reduced stress for our staff and enhanced overall efficiency, allowing us to focus on delivering exceptional service and memorable moments.",
            rating: 5,
            name: "Mohammed omar",
            job: "Restaurant Manager- Bella Cucina"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 2,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
        {
            title: "“The booking system has transformed the way we operate daily. Managing reservations is now effortless, staff coordination is smoother, and customers enjoy a faster, more reliable service. It has truly elevated the overall dining experience and allowed us to maintain high standards without extra stress.”",
            rating: 4,
            name: "Khalead abdelrahman",
            job: "Little Italy-Floor Supervisor"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 5,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
        {
            title: "“I have streamlined the reservation process for our team, making it easier to manage bookings, track customer preferences, and ensure every guest enjoys a seamless dining experience. The system has greatly reduced stress for our staff and enhanced overall efficiency, allowing us to focus on delivering exceptional service and memorable moments.",
            rating: 5,
            name: "Mohammed omar",
            job: "Restaurant Manager- Bella Cucina"
        },
        {
            title: "“With this platform, organizing tables and keeping track of special requests has become incredibly simple. It saves us time, reduces errors, and ensures every guest receives prompt attention. This solution has empowered our team to focus on what truly matters: creating memorable dining experiences.”",
            rating: 4,
            name: "Salma Nabil",
            job: "Operations Manager-Crave"
        },
    ]

    return (
        <div className="mt-[96px] flex flex-col gap-[73px]">
            <div data-aos="fade-up" className="text-center">
                <h2 className="font-Roboto text-3xl font-normal opacity-[0.7]">Customer Reviews</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    reviews.map((item, index) => {
                        return <div key={index} data-aos="fade-up" className="flex flex-col items-start gap-5 bg-[var(--color-reviews)] rounded-[12px] py-10 px-10">
                            <span className="font-rubik text-lg font-normal text-[var(--color-text-footer)]">{item.title}</span>
                            <div className="flex gap-1">
                                {[...Array(totalStars)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <span
                                            key={starValue}
                                            className={`text-3xl ${starValue <= item.rating ? "text-yellow-400" : "text-gray-500"}`}>
                                            ★
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-PlayfairDisplay text-2xl text-[var(--color-text-footer)]">{item.name}</span>
                                <span className="font-rubik text-lg text-[var(--color-text-footer)]">{item.job}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Reivews;