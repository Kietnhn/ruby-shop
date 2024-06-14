"use client";
import { Discount, Product } from "@prisma/client";
import React from "react";
import {
    Carousel,
    CarouselContentScrollAble,
    CarouselItem,
} from "../ui/carousel";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import {
    convertDiscountTypeToUnit,
    getPublicIdFromUrl,
    renderPrice,
} from "@/lib/utils";
import {
    ICarouselProduct,
    ITopSelling,
    ProductCategory,
} from "@/lib/definitions";

const SectionCarouselProducts = ({
    products,
    title,
}: {
    products: ICarouselProduct[];
    title: string;
}) => {
    return (
        <section className="">
            <div className="flex justify-between items-center mb-6">
                <h3 className="mb-2 text-2xl font-semibold capitalize">
                    {title}
                </h3>
            </div>
            <div className="overflow-x-auto custom-scrollbar pb-2">
                <div className=" grid grid-flow-col auto-cols-[50%] gap-4 lg:auto-cols-[25%] md:auto-cols-[33.33%]">
                    {products.map((product) => (
                        <SectionCarouselProductItem
                            key={product.id}
                            description={
                                product.category?.name || "No category"
                            }
                            id={product.id}
                            image={product.gallery[0].image}
                            name={product.name}
                            price={product.price}
                            salePrice={product.salePrice}
                            quantity={product?.quantity || null}
                            priceCurrency={product.priceCurrency}
                            discount={product.discount}
                        />
                    ))}
                </div>
            </div>
        </section>
        // <section className="">
        //     <div className="flex justify-between items-center mb-6">
        //         <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
        //     </div>
        //     <Carousel>
        //         <CarouselContentScrollAble>
        //             {products.map((product, index) => (
        //                 <CarouselItem
        //                     key={product.id}
        //                     className="md:basis-1/3 lg:basis-1/4"
        //                 >
        //                     <Card
        //                         isPressable
        //                         shadow="sm"
        //                         className="m-1 "
        //                         as={Link}
        //                         href={""}
        //                     >
        //                         <div className="rounded-medium border bg-card p-0">
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
        //                                     {product.description}
        //                                 </p>
        //                                 <strong>
        //                                     {renderPrice(
        //                                         product.price,
        //                                         product.priceCurrency
        //                                     )}
        //                                 </strong>
        //                             </div>
        //                             {/* {quantity && <p>{quantity} sold</p>} */}
        //                         </CardBody>
        //                     </Card>
        //                 </CarouselItem>
        //             ))}
        //         </CarouselContentScrollAble>
        //     </Carousel>
        // </section>
    );
};

export function SectionCarouselProductItem({
    description,
    image,
    name,
    price,
    id,
    quantity,
    priceCurrency,
    salePrice,
    discount,
}: {
    image: string;
    name: string;
    description: string | null;
    price: number;
    priceCurrency: string;
    id: string;
    salePrice?: number | null;
    quantity?: number | null;
    discount: Discount | null;
}) {
    return (
        // <CarouselItem key={id} className="md:basis-1/3 lg:basis-1/4">
        //     <Card isPressable shadow="sm" className="m-1 " as={Link} href={""}>
        //         <div className="rounded-medium border bg-card p-0">
        //             <Image
        //                 classNames={{
        //                     wrapper: "aspect-square rounded-medium",
        //                 }}
        //                 className="w-full h-full object-cover rounded-medium"
        //                 src={image}
        //                 alt={getPublicIdFromUrl(image)}
        //             />
        //         </div>
        //         <CardBody className=" flex flex-row justify-between items-center">
        //             <div className=" flex items-start flex-col">
        //                 <strong className="line-clamp-1">{name}</strong>
        //                 <p className="text-small text-foreground-500">
        //                     {description}
        //                 </p>
        //                 <strong>
        //                     {renderPrice(
        //                         price
        //                         // priceCurrency
        //                     )}
        //                 </strong>
        //             </div>
        //             {quantity && <p>{quantity} sold</p>}
        //         </CardBody>
        //     </Card>
        // </CarouselItem>
        <Card
            isPressable
            className="shadow-none hover:shadow-md"
            as={Link}
            href={`/products/${id}`}
        >
            <div className="rounded-medium bg-card p-0">
                <Image
                    classNames={{
                        wrapper: "aspect-square rounded-medium",
                    }}
                    className="w-full h-full object-cover rounded-medium rounded-b-none"
                    src={image}
                    alt={getPublicIdFromUrl(image)}
                />
            </div>
            <CardBody className=" flex flex-row justify-between items-center">
                <div className="h-full flex items-start justify-start flex-col w-4/5">
                    <strong className="line-clamp-1">{name}</strong>
                    <p className="text-small text-foreground-500">
                        {description}
                    </p>

                    {discount ? (
                        <>
                            <div className="flex gap-2">
                                <strong>
                                    {renderPrice(
                                        salePrice as number,
                                        priceCurrency
                                    )}
                                </strong>
                                <strong className="text-foreground-400 line-through">
                                    {renderPrice(price, priceCurrency)}
                                </strong>
                            </div>
                            {/* <p className="text-success-700 font-semibold">
                                {discount.value}
                                {convertDiscountTypeToUnit(discount.type)} off
                            </p> */}
                        </>
                    ) : (
                        <strong>{renderPrice(price, priceCurrency)}</strong>
                    )}
                </div>
                {quantity && (
                    <div className="w-1/5">
                        <p className="text-xs text-foreground-500">
                            {quantity} sold
                        </p>
                    </div>
                )}
            </CardBody>
            {discount && (
                <Card
                    shadow="sm"
                    className="absolute top-0 right-0 z-10 rounded-none rounded-bl-medium rounded-tr-medium"
                >
                    <CardBody className="p-1">
                        <p className="text-success-700 font-semibold ">
                            {discount.value}
                            {convertDiscountTypeToUnit(discount.type)}
                            <span className="text-xs ml-0.5">off</span>
                        </p>
                    </CardBody>
                </Card>
            )}
        </Card>
    );
}
export default SectionCarouselProducts;
