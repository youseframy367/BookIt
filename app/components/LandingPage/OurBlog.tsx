import Image from "next/image";
import Title from "./Title";

export default function OurBlog() {
  const text = `In today’s fast-paced dining industry, managing reservations the traditional way is no longer enough. With increasing customer expectations and growing competition, smart reservation systems have become an essential tool for restaurants aiming to deliver a smooth and professional experience.
Digital reservation systems help restaurants organize bookings accurately, eliminate long waiting times, and reduce human errors. Instead of relying on phone calls or manual logs, customers can now reserve a table in just a few seconds, choosing the time that suits them best with complete ease.
From a management perspective, these systems provide a clear overview of daily reservations. Floor supervisors and operations managers can monitor peak hours,these systems provide a clear overview of daily reservations. Floor supervisors and operations managers can monitor peak hours, track available tables`;

  return (
    <section>
      <div className="container">
        <div className="mt-10 md:mt-30" data-aos="fade-up">
          {/* Header */}
          <Title title="Our Blog" subTitle="Discover the latest news, tips, and stories from the world of dining." />

          {/* Content */}
          <div className="grid md:grid-cols-[5fr_8.3fr] gap-10 md:gap-34 mt-12">
            <div className="h-[500px] md:h-[400px] md:h-auto w-full relative">
              <Image src="/assets/icons/our-blog.png" alt="our blog" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[#172432] text-xl md:text-[50px] font-[400] font-serif md:leading-[70px]">
                How Smart Reservations Improve the Dining Experience ?
              </p>
              <p className="text-base md:text-lg font-[200] md:leading-[50px] font-sans text-[var(--color-footer)]">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
