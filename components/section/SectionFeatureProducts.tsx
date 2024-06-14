import React from "react";
import { getFeatureProducts } from "@/lib/actions/product";

import SectionCarouselProducts from "./section-carousel-products";
import { GenderData } from "@/lib/definitions";
export default async function SectionFeatureProducts({
    genderData,
}: {
    genderData?: GenderData;
}) {
    const featureProducts = await getFeatureProducts(genderData);
    if (!featureProducts || featureProducts.length === 0) return <></>;
    return (
        <SectionCarouselProducts
            title="Feature products"
            products={featureProducts}
        />
    );
}
