"use client";
import { FullProduct } from "@/lib/definitions";
import { renderPrice } from "@/lib/utils";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
const ProductItem = ({ product }: { product: FullProduct }) => {
    return (
        <div className="">
            <motion.div layout={true}>
                <Card
                    isPressable
                    as={Link}
                    href={`/products/${product.id}`}
                    className="shadow-none hover:shadow-medium transition-all duration-200"
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            src={product.gallery[0].image}
                            alt={product.name}
                            className="w-full object-cover h-full rounded-b-none"
                        />
                    </CardBody>
                    <CardFooter className="flex flex-col items-start">
                        <strong className="font-semibold line-clamp-1 text-start">
                            {product.name}
                        </strong>
                        <p className="text-foreground-500 line-clamp-1 text-start">
                            {product.description}
                        </p>

                        <strong>
                            {renderPrice(product.price, product.priceCurrency)}
                        </strong>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default ProductItem;
