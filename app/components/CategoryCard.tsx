import Camera from "../icons/Camera"
import CellPhone from "../icons/CellPhone"
import Computer from "../icons/Computer"
import Gamepad from "../icons/Gamepad"
import Headphone from "../icons/Headphone"
import SmartWatch from "../icons/SmartWatch"


export const CategoryIconMap: { [key: string]: any } = {
    "phones": <CellPhone />,
    "computers": <Computer />,
    "smartwatch": <SmartWatch />,
    "camera": <Camera />,
    "headphones": <Headphone />,
    "gaming": <Gamepad />
}

export default function CategoryCard({ v }: { v: string }) {
    return (
        <div className="px-2">
            <div className="flex flex-col gap-3 p-4 justify-center items-center border rounded-md hover:bg-red-500 hover:text-white">
                {/* <span>{CategoryIconMap[v?.toLocaleLowerCase()] ?? <></>}</span> */}
                <span>{v}</span>
            </div>
        </div>
    )
}