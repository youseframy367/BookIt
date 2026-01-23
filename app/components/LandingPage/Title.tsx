import { Header } from "../../TypeScript/TypeScript";

function Title({ title, subTitle }: Header) {
    return (
        <div>
            <p className="text-[var(--color-footer)] text-3xl md:text-[64px] font-[400] font-serif mb-2">
                {title}
            </p>
            <hr className="w-[150px] h-[3px] bg-[#E22023] rounded-sm my-2" data-aos="fade-right" />
            <p className="text-[var(--color-text-footer)] text-[18px] md:text-[24px] font-normal font-sans mt-0 mb-5">
                {subTitle}
            </p>
        </div>
    )
}

export default Title;