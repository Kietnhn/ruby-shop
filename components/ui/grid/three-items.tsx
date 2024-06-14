import Link from "next/link";
import { GridTileImage } from "./tile";
import { getPublicIdFromUrl } from "@/lib/utils";
import { getTopThreeProducts } from "@/lib/actions/product";
import { Card } from "@nextui-org/react";
import { Product } from "@prisma/client";
import clsx from "clsx";

function ThreeItemGridItem({
    product,
    size,
}: {
    product: Product;
    size: "full" | "half";
}) {
    return (
        <Card
            isPressable
            className={clsx("shadow-none border border-card", {
                "md:col-span-4 md:row-span-2": size === "full",
                "md:col-span-2 md:row-span-1": size === "half",
            })}
            as={Link}
            href={`/products/${product.id}`}
        >
            <GridTileImage
                src={product.gallery[0].image}
                sizes={
                    size === "full"
                        ? "(min-width: 768px) 66vw, 100vw"
                        : "(min-width: 768px) 33vw, 100vw"
                }
                alt={getPublicIdFromUrl(product.gallery[0].image)}
                label={{
                    position: size === "full" ? "center" : "bottom",
                    title: product.name,
                    amount: product.salePrice || product.price,
                    currencyCode: product.priceCurrency,
                }}
            />
        </Card>
    );
}

export async function ThreeItemGrid() {
    // Collections that start with `hidden-*` are hidden from the search page.
    const topThreeProduct = await getTopThreeProducts();

    if (!topThreeProduct[0] || !topThreeProduct[1] || !topThreeProduct[2])
        return null;

    const [firstProduct, secondProduct, thirdProduct] = topThreeProduct;

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="mb-2 text-2xl font-semibold">Treding</h3>
            </div>
            <div className="mx-auto grid max-w-screen-2xl gap-6  md:grid-cols-6 md:grid-rows-2">
                <ThreeItemGridItem size="full" product={firstProduct} />
                <ThreeItemGridItem size="half" product={secondProduct} />
                <ThreeItemGridItem size="half" product={thirdProduct} />
            </div>
        </section>
    );
}
