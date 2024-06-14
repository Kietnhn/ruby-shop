import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { getPublicIdFromUrl, renderPrice } from "@/lib/utils";
import Link from "next/link";
import { getProductsBrand } from "@/lib/actions/product";

export default async function SectionBrands() {
    const productsBrand = await getProductsBrand();

    if (!productsBrand) return <p>Not found</p>;
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="mb-2 text-2xl font-semibold capitalize">
                    Shop by brand
                </h3>
            </div>
            <Carousel>
                <CarouselContent>
                    {productsBrand.map((product, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/3"
                        >
                            <Card
                                isPressable
                                as={Link}
                                shadow="sm"
                                className="m-1 "
                                href={`/products/${product.id}`}
                            >
                                <CardHeader className="flex gap-2 items-center">
                                    <Avatar
                                        src={product.brand?.logo}
                                        alt={getPublicIdFromUrl(
                                            product.brand?.logo
                                        )}
                                        showFallback
                                        name={product.brand?.name}
                                        classNames={{
                                            base: "shadow-medium bg-transparent",
                                            img: "object-contain",
                                        }}
                                    />
                                    <h3>{product.brand?.name}</h3>
                                </CardHeader>
                                <Image
                                    classNames={{
                                        wrapper: "aspect-square rounded-none",
                                    }}
                                    className="w-full h-full object-cover rounded-none"
                                    src={product.gallery[0].image}
                                    alt={getPublicIdFromUrl(
                                        product.gallery[0].image
                                    )}
                                />
                                <CardBody className="my-2 flex items-start flex-col">
                                    <strong className="line-clamp-1">
                                        {product.name}
                                    </strong>
                                    <p className=" text-gray-500 line-clamp-1">
                                        {product.description}
                                    </p>
                                    <strong className="font-semibold">
                                        {renderPrice(
                                            product.salePrice || product.price,
                                            product.priceCurrency
                                        )}
                                    </strong>
                                </CardBody>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
