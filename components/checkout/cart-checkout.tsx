"use client";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { CartCheckout as CartCheckoutType } from "@/lib/definitions";
import { useAppSelector } from "@/lib/store";
import { getPublicIdFromUrl, renderPrice } from "@/lib/utils";
import { Badge, Image } from "@nextui-org/react";

export default function CartCheckout({ carts }: { carts: CartCheckoutType[] }) {
    const { shippingMethod } = useAppSelector((store) => store.cartCheckout);
    const subTotal = carts.reduce(
        (total, cart) => total + cart.price * cart.quantity,
        0
    );

    return (
        <div className="absolute right-0 top-0 bottom-0 w-2/5 p-12  border-l-2">
            <div className="flex flex-col gap-4">
                {carts.map((cart) => (
                    <CartCheckoutItem key={cart.id} cart={cart} />
                ))}
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <div>
                    <div className="flex justify-between items-center">
                        <p>Sub Total</p>
                        <p className="font-semibold">{renderPrice(subTotal)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-small">Estimated Delivery & Handling</p>
                    <p className="text-small font-semibold">
                        {/* {subTotal > 500 ? "Free" : `$${SHIPIING_COST}`} */}
                        {shippingMethod
                            ? renderPrice(
                                  shippingMethod.value,
                                  shippingMethod.currency
                              )
                            : " Calculated at shipping method"}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Total</p>
                    <p className="text-xl font-semibold">
                        {/* $
                        {subTotal > 500
                            ? subTotal
                            : `${subTotal + SHIPIING_COST}`} */}
                        {shippingMethod
                            ? renderPrice(
                                  shippingMethod.value + subTotal,
                                  shippingMethod.currency
                              )
                            : "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function CartCheckoutItem({ cart }: { cart: CartCheckoutType }) {
    const { name, description, gallery } = cart.variation.product;
    const { color, size } = cart.variation;
    const currentGallery = gallery.find(
        (item) => item.color === cart.variation.color
    );
    return (
        <div className="flex justify-between items-center gap-4">
            <Badge content={cart.quantity}>
                <div className="">
                    <Image
                        className="w-16 aspect-square "
                        src={currentGallery?.image}
                        alt={getPublicIdFromUrl(
                            currentGallery?.image as string
                        )}
                    />
                </div>
            </Badge>
            <div className="flex-1 flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    {/* <p className="text-small ">{description}</p> */}
                    <p className="text-small ">
                        {color}/ {size}
                    </p>
                </div>
                <div suppressHydrationWarning>
                    {renderPrice(
                        cart.price * cart.quantity,
                        cart.priceCurrency
                    )}
                </div>
            </div>
        </div>
    );
}
