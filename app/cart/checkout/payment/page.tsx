import CartCheckout from "@/components/checkout/cart-checkout";
import CheckoutBreadcrumds from "@/components/checkout/checkout-breadcrumbs";
import ShippingPaymentForm from "@/components/checkout/shipping-payment-form";
import Logo from "@/components/logo";
import NotFound from "@/components/not-found";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCartCheckout } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function CheckoutPaymentPage() {
    const carts = await getCartCheckout();

    if (!carts) {
        return <NotFound href="/shop" title="checkout" />;
    }
    if (carts.length === 0) {
        redirect("/cart");
    }
    return (
        <div className="flex relative h-screen overflow-hidden p-12 pb-0">
            <ScrollArea className="w-3/5 px-12 pb-12 overflow-hidden">
                <div className="w-full flex flex-col gap-4 ">
                    <div>
                        <div>
                            <Logo />
                        </div>
                        <p className="font-bold text-inherit ml-2">Ruby</p>
                    </div>
                    <CheckoutBreadcrumds />

                    <ShippingPaymentForm />
                </div>
            </ScrollArea>
            <CartCheckout carts={carts} />
        </div>
    );
}
