"use client";
import { FullProduct } from "@/lib/definitions";
import { getPublicIdFromUrl, getUniqueSizes, renderPrice } from "@/lib/utils";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Divider,
    RadioGroup,
    Image,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Collapse from "../ui/collapse/collapse-wrapper";
import CustomRadio from "../ui/radio/checkbox-radio";
import { AddToCartButton, FavouriteProductButton } from "../buttons";

const ProductDetails = ({
    product,
    userId,
}: {
    product: FullProduct;
    userId?: string;
}) => {
    const isFavourited = useMemo(
        () => (userId ? product.favoriteOfIds.includes(userId) : false),
        [userId]
    );
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedColor, setSelectedColor] = useState<string>(
        product.gallery[0].color
    );
    const [selectedSize, setSelectedSize] = useState<string>("");
    // const uniqueColors = getUniqueColors(product.variations);
    const uniqueSizes = useMemo(
        () => getUniqueSizes(product.variations).sort(),
        [product]
    );
    const unAvailableSizes = useMemo(
        () =>
            product.variations
                .filter(
                    (variation) =>
                        variation.color === selectedColor &&
                        variation.stock === 0
                )
                .map((varr) => varr.size),
        [product]
    );

    const images = useMemo(
        () =>
            product.gallery
                .filter((item) => item.color === selectedColor)
                .map((item) => ({
                    original: item.image,
                    thumbnail: item.image,
                })),
        [product]
    );

    return (
        <>
            <div className="flex gap-4">
                <div className="w-3/5">
                    <ReactImageGallery
                        items={images}
                        thumbnailPosition="left"
                        showBullets={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                        slideOnThumbnailOver={true}
                    />
                </div>
                <div className="w-2/5">
                    <div className="px-8 flex flex-col gap-4">
                        <div>
                            <h3 className="font-semibold text-2xl text-foreground">
                                {product.name}
                            </h3>

                            <p className="text-foreground text-medium font-semibold">
                                {product.description}
                            </p>
                        </div>
                        <div>
                            <strong>
                                {renderPrice(
                                    product.price,
                                    product.priceCurrency
                                )}
                            </strong>
                        </div>
                        {product.gallery.length > 1 && (
                            <div className="">
                                {/* <h4 className="text-foreground text-medium font-semibold">
                                    Select color
                                </h4> */}
                                <RadioGroup
                                    // aria-label="color"
                                    label="Select color"
                                    value={selectedColor}
                                    onValueChange={setSelectedColor}
                                    classNames={{
                                        base: " capitalize",
                                    }}
                                    orientation="horizontal"
                                >
                                    {product.gallery.map((gallery) => (
                                        <CustomRadio
                                            classNames={{
                                                label: "!p-0 ",
                                            }}
                                            value={gallery.color}
                                            key={gallery.color}
                                            className="text-medium text-foreground"
                                        >
                                            {/* {gallery.color} */}
                                            <Image
                                                src={gallery.image}
                                                alt={getPublicIdFromUrl(
                                                    gallery.image
                                                )}
                                                className="aspect-square w-20 rounded-md"
                                            />
                                        </CustomRadio>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}
                        {uniqueSizes.length > 0 && (
                            <div>
                                {/* <h4 className="text-foreground text-medium font-semibold">
                                    Select Size
                                </h4> */}

                                <RadioGroup
                                    // aria-label="size"
                                    label="Select Size"
                                    // value={filterOptions?.sizes || []}
                                    // onValueChange={(value) =>
                                    //     handleSelectFilter(value, "sizes")
                                    // }
                                    onValueChange={setSelectedSize}
                                    classNames={{
                                        base: " capitalize",
                                    }}
                                    orientation="horizontal"
                                >
                                    {uniqueSizes.map((size) => (
                                        <CustomRadio
                                            value={size}
                                            key={size}
                                            className="text-medium text-foreground"
                                            isDisabled={unAvailableSizes.includes(
                                                size
                                            )}
                                        >
                                            {size}
                                        </CustomRadio>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}
                        <AddToCartButton
                            color={selectedColor}
                            size={selectedSize}
                            product={product}
                        />
                        <FavouriteProductButton
                            productId={product.id}
                            isShowTitles={true}
                            isFavourited={isFavourited}
                            className="w-full font-semibold"
                        />
                        {product.summary && (
                            <div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.summary,
                                    }}
                                ></div>
                            </div>
                        )}
                        <button
                            onClick={onOpen}
                            className="flex items-center justify-start"
                        >
                            <span className="underline cursor-pointer font-semibold hover:opacity-90">
                                View product detail
                            </span>
                        </button>
                        <Divider />
                        <Collapse title="Size & Fit">
                            <ul>
                                <li>Standard fit: easy and traditional</li>
                                <li>
                                    <a href="#">Size Guide</a>
                                </li>
                            </ul>
                        </Collapse>
                        <Divider />
                        <Collapse title="Free Delivery and Returns">
                            <p>
                                Your order of $200 or more gets free standard
                                delivery.
                            </p>
                            <ul>
                                <li>Standard delivered 4-5 Business Days</li>
                                <li>Express delivered 2-4 Business Days</li>
                            </ul>
                            <p>
                                Orders are processed and delivered Monday-Friday
                                (excluding public holidays)
                            </p>
                        </Collapse>
                        <Divider />
                        <Collapse title="Review">
                            <p>Review...</p>
                        </Collapse>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute
                                    tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex
                                    incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do
                                    dolor eiusmod. Et mollit incididunt nisi
                                    consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductDetails;
