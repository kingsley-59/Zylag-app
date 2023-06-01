import Image from 'next/image'
import { useMemo } from 'react'

export default function Home() {
  const mainCategories = useMemo(() => [
    "Women's Fashion", "Men's Fashion", 'Electronics', 'Home & Lifestyle', 'Medicine',
    'Sports & Outdoor', "Baby's & Toys", "Groceries & Pets", 'Health & Beauty'    
  ], []);


  return (
    <div className='w-full px-3 md:px-5 lg:px-10 text-sm'>
      <div className="w-full flex items-start">
        <div className="basis-1/4 border-r-[1px] border-r-neutral-200">
          <div className="flex flex-col items-start">
            {mainCategories.map((val, idx) => (
              <span key={idx}>{val}</span>
            ))}
          </div>
        </div>
        <div className='flex-grow p-5'></div>
      </div>
    </div>
  )
}
