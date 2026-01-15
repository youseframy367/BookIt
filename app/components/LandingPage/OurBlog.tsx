import Image from "next/image";
import Title from "./Title";

export default function OurBlog() {
  const text = `In today’s fast-paced dining industry, managing reservations the traditional way is no longer enough. With increasing customer expectations and growing competition, smart reservation systems have become an essential tool for restaurants aiming to deliver a smooth and professional experience.
Digital reservation systems help restaurants organize bookings accurately, eliminate long waiting times, and reduce human errors. Instead of relying on phone calls or manual logs, customers can now reserve a table in just a few seconds, choosing the time that suits them best with complete ease.
From a management perspective, these systems provide a clear overview of daily reservations. Floor supervisors and operations managers can monitor peak hours,these systems provide a clear overview of daily reservations. Floor supervisors and operations managers can monitor peak hours, track available tables`;

  return (
    <section>
      <div className="container md:mx-auto md:px-5 mt-16" data-aos="fade-up">
        {/* Header */}
        <Title title="Our Blog" subTitle="Discover the latest news, tips, and stories from the world of dining." />

        {/* Content */}
        <div className="flex flex-wrap md:gap-14 mt-12">
          <div className="w-full h-[400px] md:h-auto md:w-[400px] relative">
            <Image src="/assets/icons/our-blog.png" alt="our blog" fill className="object-cover" />
          </div>
          <div className="md:w-7/12 mt-24 mr-2">
            <p className="text-[#172432] text-[50px] font-[400] font-serif leading-[70px] mb-5">
              How Smart Reservations Improve the Dining Experience ?
            </p>
            <p className="text-[18px] font-[200] leading-[50px] font-sans text-[#172432]/50">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
