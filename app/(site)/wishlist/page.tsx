import ProductCard, { Product } from "@/app/components/ProductCard"


async function getWishlist(): Promise<Product[]> {
    const wishlist = [...Array(8)].map(() => {
        return {
            name: "Gucci duffle bag",
            image: "/gucci-bag.png",
            price: 960,
            originalprice: 1160,
            isNew: false,
        }
    })

    return wishlist
}

export default async function page() {
    const wishlist = await getWishlist()

    return (
        <div className="w-full p-5 md:p-10 lg:p-20">
            <div className="w-full col-start gap-10">
                <div className="start font-semibold">Favourite ({wishlist.length})</div>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 justify-between">
                    {wishlist.map((wish, idx) => (
                        <ProductCard key={idx} v={wish} />
                    ))}
                </div>
            </div>
        </div>
    )
}
