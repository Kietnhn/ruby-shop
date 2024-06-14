"use client";

import { ICollection } from "@/lib/definitions";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { getPublicIdFromUrl, isVideo, renderPrice } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@prisma/client";
import Prose from "./prose";
import clsx from "clsx";
export default function CarouselCollections({
    collections,
}: {
    collections: ICollection[];
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedCollection, setSelectedCollection] =
        useState<ICollection | null>(null);
    const handleSelecteCollection = (collection: ICollection) => {
        setSelectedCollection(collection);
        onOpen();
    };
    return (
        <>
            <Carousel>
                <CarouselContent>
                    {collections.map((collection, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/3 pb-1"
                        >
                            <Card
                                isPressable
                                onClick={() =>
                                    handleSelecteCollection(collection)
                                }
                                shadow="sm"
                            >
                                <CardBody className="overflow-visible p-0">
                                    <Card className="w-full h-full relative shadow-none  aspect-square rounded-none">
                                        <Image
                                            shadow="sm"
                                            radius="none"
                                            width="100%"
                                            alt={getPublicIdFromUrl(
                                                collection.image
                                            )}
                                            className="w-full object-cover h-full"
                                            classNames={{
                                                wrapper: "h-full",
                                            }}
                                            src={collection.image}
                                        />
                                    </Card>
                                </CardBody>
                                <CardFooter className="flex flex-row justify-between items-center">
                                    <strong className="line-clamp-1">
                                        {collection.name}
                                    </strong>
                                    <p className="line-clamp-1">
                                        {collection.products.length} products
                                    </p>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            {selectedCollection && (
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="4xl"
                    scrollBehavior="inside"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {selectedCollection.name}
                                </ModalHeader>
                                <ModalBody className="flex flex-row ">
                                    <div className="w-1/2">
                                        <Image
                                            shadow="sm"
                                            radius="none"
                                            width="100%"
                                            alt={getPublicIdFromUrl(
                                                selectedCollection.image
                                            )}
                                            className="w-full object-cover h-full"
                                            classNames={{
                                                wrapper: "h-full",
                                            }}
                                            src={selectedCollection.image}
                                        />
                                        <Prose
                                            html={
                                                selectedCollection.description
                                            }
                                        />
                                    </div>
                                    <div className="max-h-[430px] overflow-y-auto w-1/2 custom-scrollbar pr-3">
                                        {selectedCollection.products.map(
                                            (product, index) => (
                                                <Card
                                                    isPressable
                                                    as={Link}
                                                    href={`/products/${product.id}`}
                                                    key={product.id}
                                                    className={clsx(
                                                        "shadow-none hover:shadow-sm duration-200 transition-all",
                                                        {
                                                            "mb-2":
                                                                index !==
                                                                selectedCollection
                                                                    .products
                                                                    .length,
                                                        }
                                                    )}
                                                >
                                                    <div className="flex justify-between items-center gap-4">
                                                        <Image
                                                            radius="none"
                                                            className="w-20 aspect-square object-cover"
                                                            src={
                                                                product.gallery.at(
                                                                    0
                                                                )?.image
                                                            }
                                                            alt={getPublicIdFromUrl(
                                                                product.gallery.at(
                                                                    0
                                                                )
                                                                    ?.image as string
                                                            )}
                                                        />
                                                        <div className="flex-1  flex justify-between items-center">
                                                            <div className="flex flex-col gap-1">
                                                                <strong className="line-clamp-2 leading-none">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </strong>
                                                                <p className="text-small line-clamp-1 ">
                                                                    {
                                                                        product.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            <strong
                                                                suppressHydrationWarning
                                                            >
                                                                {renderPrice(
                                                                    product.salePrice ||
                                                                        product.price,
                                                                    product.priceCurrency
                                                                )}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        )}
                                    </div>
                                </ModalBody>
                                {/* <ModalFooter></ModalFooter> */}
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
