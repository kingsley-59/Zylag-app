


export default function SaveButton({ text, onClick }: { text?: string, onClick?: (e?: any) => any }) {
    return (
        <button type="submit" className="w-full text-white bg-red-700 py-4 rounded-md">{text || 'Save'}</button>
    )
}