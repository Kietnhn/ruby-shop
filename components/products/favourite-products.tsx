"use client";
import { Button, Card, Image, Link } from "@nextui-org/react";
import React from "react";
import {
    Carousel,
    CarouselContentScrollAble,
    CarouselItem,
} from "../ui/carousel";
import { getPublicIdFromUrl } from "@/lib/utils";
import { ProductCategoryVariations } from "@/lib/definitions";

const FavouriteProducts = ({
    products,
}: {
    products: ProductCategoryVariations[];
}) => {
    return (
        <section>
            <div className="flex justify-between items-center">
                <h2 className="text-foreground text-xl font-semibold">
                    Favourite
                </h2>
                <Button variant="bordered">Edit</Button>
            </div>
            {products.length === 0 ? (
                <div className="m-6 p-6 mt-8 flex-center">
                    <p>Items added to your Favourites will be saved here.</p>
                </div>
            ) : (
                <div className="pt-8">
                    <Carousel>
                        <CarouselContentScrollAble>
                            {products.map((product) => (
                                <FavouriteProductItem
                                    product={product}
                                    key={product.id}
                                />
                            ))}
                        </CarouselContentScrollAble>
                    </Carousel>
                </div>
            )}
        </section>
    );
};
function FavouriteProductItem({
    product,
}: {
    product: ProductCategoryVariations;
}) {
    return (
        <CarouselItem className="md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
                <Card
                    isPressable
                    className="shadow-none"
                    as={Link}
                    href={`/products/${product.id}`}
                >
                    <div className="rounded-medium border bg-card p-0">
                        <Image
                            classNames={{
                                wrapper: "aspect-square rounded-medium",
                            }}
                            className="w-full h-full object-cover rounded-medium"
                            src={product.gallery[0].image}
                            alt={getPublicIdFromUrl(product.gallery[0].image)}
                        />
                    </div>
                    <div className="mt-2 w-full flex items-center justify-between">
                        <div>
                            <strong className="line-clamp-1">
                                {product.name}
                            </strong>
                            <p className="line-clamp-1 text-default">
                                {product.description}
                            </p>
                        </div>

                        <p className="font-semibold">${product.price}</p>
                    </div>
                </Card>
            </div>
        </CarouselItem>
    );
}
export default FavouriteProducts;
