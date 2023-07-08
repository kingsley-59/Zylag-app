'use client';
import { useRef } from 'react'
import TitleBlock from '../components/TitleBlock'
import SubTitle from '../components/SubTitle'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'

export default function ProductsSection({ products }: { products?: TAds[] }) {

    return (
        <>
            <div className="w-full flex flex-col gap-4 lg:gap-8">
                <TitleBlock title={'Our Products'} />
                <div className="between">
                    <SubTitle title={'Explore Our Products'} />
                </div>
                <div className="col-start gap-10">
                    {products?.length ? (
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 justify-between">
                            {products.map((ad, idx) => (
                                <ProductCard key={idx} v={ad} />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full center font-bold text-opacity-50">No products yet</div>
                    )}
                    <div className="w-full flex justify-center items-center">
                        <Link href={'#'}><button className='text-white px-5 py-3 bg-red-500 rounded'>View All products</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
