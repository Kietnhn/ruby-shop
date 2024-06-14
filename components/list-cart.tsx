"use client";

import { deleteCart, updateCart, updateQuantityCart } from "@/lib/actions/cart";
import { CartData, CartVariationProduct, IUpdateCart } from "@/lib/definitions";
import { getPublicIdFromUrl, renderPrice } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Image,
    Link,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { DeleteButton, FavouriteProductButton } from "./buttons";
import { ChangeEvent, useMemo } from "react";
const ListCart = ({ carts }: { carts: CartVariationProduct[] }) => {
    if (carts.length === 0) return <div>There are no items in your bag.</div>;
    const subTotal = carts.reduce(
        (total, cart) => total + cart.price * cart.quantity,
        0
    );

    return (
        <Card>
            <CardBody className="flex flex-row gap-4">
                <div className="w-2/3">
                    <CardHeader className="font-semibold text-2xl">
                        Bag
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col gap-4">
                            {carts.map((cart) => (
                                <CartItem cart={cart} key={cart.id} />
                            ))}
                        </div>
                    </CardBody>
                </div>
                <div className="w-1/3">
                    <CardHeader className="font-semibold text-2xl">
                        Summary
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-small font-semibold">
                                    Taxes
                                </p>
                                <p className="text-small">
                                    Calculated at checkout
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-small font-semibold">
                                    Estimated Delivery & Handling
                                </p>
                                <p className="text-small">
                                    Calculated at checkout
                                </p>
                            </div>
                        </div>
                        <Divider />
                        <div className="flex justify-between items-center">
                            <p>Sub Total</p>
                            <p className="text-medium font-semibold">
                                {renderPrice(subTotal)}
                            </p>
                        </div>
                        <Divider />
                        <div>
                            <Link href="/cart/checkout" className="w-full">
                                <Button
                                    className="w-full capitalize"
                                    color="primary"
                                >
                                    Proceed to checkout
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </div>
            </CardBody>
        </Card>
    );
};
function CartItem({ cart }: { cart: CartVariationProduct }) {
    const { name, description, variations, gallery, favoriteOfIds, id } =
        cart.variation.product;
    const isFavourited = favoriteOfIds.includes(cart.userId as string);
    const availableSizes = variations
        .filter(
            (variation) =>
                variation.color === cart.variation.color && variation.stock > 0
        )
        .map((varr) => varr.size);
    const currentGallery = gallery.find(
        (item) => item.color === cart.variation.color
    );
    const quantityList: number[] = useMemo(() => {
        const availableQuantity = Math.min(cart.variation.stock, 10);
        return Array.from(
            { length: availableQuantity },
            (_, index) => index + 1
        );
    }, []);
    const deleteCartWithId = deleteCart.bind(null, cart.id);
    const handleUpdateCart = async (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const newCart: CartData = {
            color: cart.variation.color,
            product: cart.variation.product,
            size: value,
        };
        console.log("update caart ", newCart);

        await updateCart({ cartId: cart.id, newCart: newCart });
    };
    const handleUpdateQuantityCart = async (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        const quantity = +event.target.value;

        if (isNaN(quantity)) {
            return;
        }
        console.log("update quantity ", quantity);

        await updateQuantityCart({ cartId: cart.id, quantity: quantity });
    };
    return (
        <div className="flex gap-4">
            <div className="w-36 aspect-square">
                <Image
                    className="w-full h-full object-cover"
                    src={currentGallery?.image}
                    alt={getPublicIdFromUrl(currentGallery?.image as string)}
                />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
                <div className="">
                    <div className="flex justify-between items-center">
                        <h3 className="text-medium font-semibold">{name}</h3>
                        <h3
                            className="text-medium font-semibold"
                            suppressHydrationWarning
                        >
                            {renderPrice(
                                cart.price * cart.quantity,
                                cart.priceCurrency
                            )}
                        </h3>
                    </div>
                    <p className="font-semibold text-foreground-500 capitalize">
                        {description}
                    </p>
                    <p className=" text-foreground-500 capitalize">
                        {cart.variation.color}
                    </p>
                </div>
                <div className="flex">
                    <div className="w-1/2 flex gap-4">
                        <div className="w-1/2">
                            <Select
                                size="sm"
                                variant="underlined"
                                label="Size"
                                defaultSelectedKeys={[cart.variation.size]}
                                onChange={handleUpdateCart}
                            >
                                {availableSizes.map((availableSize) => (
                                    <SelectItem key={`${availableSize}`}>
                                        {availableSize}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="w-1/2">
                            <Select
                                size="sm"
                                variant="underlined"
                                label="Quantity"
                                defaultSelectedKeys={[cart.quantity.toString()]}
                                onChange={handleUpdateQuantityCart}
                            >
                                {quantityList.map((quantity) => (
                                    <SelectItem
                                        key={quantity}
                                        textValue={quantity.toString()}
                                    >
                                        {quantity}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <FavouriteProductButton
                        productId={id}
                        isFavourited={isFavourited}
                        variant="light"
                    />

                    <DeleteButton action={deleteCartWithId} />
                </div>
            </div>
        </div>
    );
}
export default ListCart;
