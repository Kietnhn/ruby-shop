import React from "react";
import { getLastestProducts } from "@/lib/actions/product";

import SectionCarouselProducts from "./section-carousel-products";
import { GenderData } from "@/lib/definitions";
export default async function SectionLastestProducts({
    genderData,
}: {
    genderData?: GenderData;
}) {
    const lastestProducts = await getLastestProducts(genderData);
    if (!lastestProducts || lastestProducts.length === 0) return <></>;
    return (
        <SectionCarouselProducts
            title="The latest products"
            products={lastestProducts}
        />
    );
}
