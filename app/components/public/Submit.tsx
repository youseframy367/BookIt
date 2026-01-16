import { btn } from "@/app/TypeScript/TypeScript";

function Submit({title, width, onSubmit}: btn) {
    return <input onClick={onSubmit} value={title} type="submit" className={`${width} cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-2 py-5 rounded-xl`} />
}

export default Submit;