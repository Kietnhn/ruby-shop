import React from "react";
import { getCollections } from "@/lib/actions";
import CarouselCollections from "../carousel-collections";

export default async function SectionCollections() {
    const collections = await getCollections();
    if (!collections) return <></>;
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="mb-2 text-2xl font-semibold">Collections</h3>
            </div>
            <CarouselCollections collections={collections} />
        </section>
    );
}
