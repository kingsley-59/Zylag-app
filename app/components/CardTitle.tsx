


export default function CardTitle({ title, isSaved }: { title: string, isSaved: boolean }) {
    return (
        <>
            <div className="w-full rounded-t-xl px-3 py-4 between">
                <div>{title}</div>
                <div className="rounded-xl px-3 py-1 bg-red-100 text-red-600">{isSaved ? 'Saved' : 'Save'}</div>
            </div>
            <hr className="border-t border-dashed border-[#ececec]" />
        </>
    )
}