



export default function FormContainer({ children }: { children: any }) {
    return (
        <div className="max-w-[400px] col-center gap-5 lg:gap-7 mx-auto">
            {children}
        </div>
    )
}