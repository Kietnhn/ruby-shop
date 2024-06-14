import { auth } from "@/app/auth";
import NotFound from "@/components/not-found";
import ProductDetails from "@/components/products/product-details";
import SectionCarouselProducts from "@/components/section/section-carousel-products";
// import SectionCarouselProducts from "@/components/section/section-carousel-products";
import {
    getProductDetails,
    getRecommendedProducts,
} from "@/lib/actions/product";
import { getUserByEmail } from "@/lib/actions/user";
import React from "react";
export default async function ProductDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await getProductDetails(params.id);
    const authData = await auth();
    if (!product) {
        return <NotFound href="/shop" title="product details" />;
    }
    // avoid throw error if don have email
    const user = await getUserByEmail(authData?.user?.email || "undefined");

    const recommendProducts = await getRecommendedProducts([product]);
    const recommendProductExceptSelf = recommendProducts.filter(
        (recommendProduct) => recommendProduct.id !== product.id
    );
    return (
        <main className="">
            <div className="max-w-[1200px] mx-auto">
                <ProductDetails product={product} userId={user?.id || ""} />
            </div>
            {/* remove current product */}
            <SectionCarouselProducts
                products={recommendProductExceptSelf}
                title="You Might Also Like"
            />
        </main>
    );
}
