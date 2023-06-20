

export default function BreadCrumb({ paths }: { paths: string[] }) {
    return (
        <div className="w-full start gap-3 px-5 md:px-10 lg:px-20 py-5">
            {paths.map((path, idx) => (
                <>
                    <span className={`${((idx + 1) === paths.length) ? 'text-gray-600' : 'text-gray-400'}`}>{path}</span>
                    {((idx + 1) !== paths.length) && <span className="text-gray-400">/</span>}
                </>
            ))}
        </div>
    )
}