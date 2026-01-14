import { btn } from "@/app/main/TypeScript/TypeScript";

function Submit({title, width}: btn) {
    return <input value={title} type="submit" className={`${width} cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-2 py-5 rounded-xl`} />
}

export default Submit;