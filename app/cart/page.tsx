import { getCart } from "@/lib/actions/cart";
import ListCart from "@/components/list-cart";
import NotFound from "@/components/not-found";
import SectionCarouselProducts from "@/components/section/section-carousel-products";
import { auth } from "../auth";
import Navbar from "@/components/navbar/navbar";
import { Suspense } from "react";
import Footer from "@/components/footer";
import { getUserByEmail } from "@/lib/actions/user";
import { getRecommendedProducts } from "@/lib/actions/product";

export default async function CartPage() {
    const authData = await auth();

    const isAuthenticated = !!authData?.user;
    const user = await getUserByEmail(authData?.user?.email || "undefined");

    const carts = await getCart();
    if (!carts) {
        return <NotFound href="/shop" title="cart" />;
    }
    const products = carts.map((cart) => cart.variation.product);
    const recommendProducts = await getRecommendedProducts(products);
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <div className="p-12 flex-1">
                <main>
                    <div className="max-w-[1200px] mx-auto">
                        <ListCart carts={carts} />
                    </div>
                    <SectionCarouselProducts
                        products={recommendProducts}
                        title="You Might Also Like"
                    />
                </main>
            </div>
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    );
}
