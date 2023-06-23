

export default function TitleBlock({ title }: { title: String }) {
    return (
        <div className="w-full flex justify-start items-center gap-5">
            <div className="w-[20px] h-[40px] bg-red-500 rounded-md"></div>
            <div className="text-red-500 font-semibold text-sm">{title}</div>
        </div>
    )
}