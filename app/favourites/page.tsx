import { PowerIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { auth } from "../auth";
import FavouriteProducts from "@/components/products/favourite-products";
import NotFound from "@/components/not-found";
import SectionCarouselProducts from "@/components/section/section-carousel-products";
import { getOwnFavouriteProducts } from "@/lib/actions/favourite";
import { logOut } from "@/lib/actions/user";
import { getRecommendedProducts } from "@/lib/actions/product";

export default async function FavouritePage() {
    const favouriteProducts = await getOwnFavouriteProducts();
    if (!favouriteProducts) {
        return <NotFound href="/shop" title="Favourite products" />;
    }
    const recommendProducts = await getRecommendedProducts(favouriteProducts);
    return (
        <main>
            <FavouriteProducts products={favouriteProducts} />
            <SectionCarouselProducts
                products={recommendProducts}
                title="Find Your Next Favourite"
            />
            {/* <form action={logOut}>
                <button
                    className={clsx(
                        "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    )}
                >
                    <PowerIcon className="w-6" />
                    <div className={`hidden md:block `}>Sign Out</div>
                </button>
            </form> */}
        </main>
    );
}
