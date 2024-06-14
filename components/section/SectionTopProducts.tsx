import React from "react";
import { getTopSelling } from "@/lib/actions/product";
import {
    Carousel,
    CarouselContentScrollAble,
    CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardBody, Image } from "@nextui-org/react";
import { getPublicIdFromUrl, renderPrice } from "@/lib/utils";
import Link from "next/link";
import SectionCarouselProducts from "./section-carousel-products";
import { GenderData } from "@/lib/definitions";
export default async function SectionTopSellingProducts({
    genderData,
}: {
    genderData?: GenderData;
}) {
    const topSelling = await getTopSelling(genderData);

    if (!topSelling || topSelling.length === 0) return <></>;

    return (
        // <section className="">
        //     <div className="flex justify-between items-center mb-6">
        //         <h3 className="mb-2 text-2xl font-semibold">
        //             Top selling products
        //         </h3>
        //     </div>
        //     <Carousel>
        //         <CarouselContentScrollAble>
        //             {topSelling.map((product, index) => (
        //                 <CarouselItem
        //                     key={product.id}
        //                     className="md:basis-1/3 lg:basis-1/4"
        //                 >
        //                     <Card
        //                         isPressable
        //                         shadow="sm"
        //                         className="m-1 "
        //                         as={Link}
        //                         href={`/products/${product.id}`}
        //                     >
        //                         <div className="rounded-medium bg-card p-0">
        //                             <Image
        //                                 classNames={{
        //                                     wrapper:
        //                                         "aspect-square rounded-medium",
        //                                 }}
        //                                 className="w-full h-full object-cover rounded-medium"
        //                                 src={product.gallery[0].image}
        //                                 alt={getPublicIdFromUrl(
        //                                     product.gallery[0].image
        //                                 )}
        //                             />
        //                         </div>
        //                         <CardBody className=" flex flex-row justify-between items-center">
        //                             <div className=" flex items-start flex-col">
        //                                 <strong className="line-clamp-1">
        //                                     {product.name}
        //                                 </strong>
        //                                 <p className="text-small text-foreground-500">
        //                                     {product.category?.name ||
        //                                         "No category"}
        //                                 </p>
        //                                 <strong>
        //                                     {renderPrice(
        //                                         product.salePrice ||
        //                                             product.price,
        //                                         product.priceCurrency
        //                                     )}
        //                                 </strong>
        //                             </div>
        //                             <p>{product.quantity} sold</p>
        //                         </CardBody>
        //                     </Card>
        //                 </CarouselItem>
        //             ))}
        //         </CarouselContentScrollAble>
        //     </Carousel>
        // </section>
        <SectionCarouselProducts
            title=" Top selling products"
            products={topSelling}
        />
    );
}
