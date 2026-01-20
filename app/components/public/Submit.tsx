import { btn } from "@/app/TypeScript/TypeScript";

function Submit({title, width, onSubmit, loading}: btn) {
    return <input onClick={onSubmit} disabled={loading} value={title} type="submit" className={`disabled:opacity-[0.5] disabled:cursor-not-allowed ${width} cursor-pointer text-white font-normal text-xl font-rubik bg-[var(--color-red)] px-2 py-5 rounded-xl`} />
}

export default Submit;