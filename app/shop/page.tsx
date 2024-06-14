import { Suspense } from "react";
import SectionLastestProducts from "@/components/section/SectionLastestProducts";
import { ThreeItemGrid } from "@/components/ui/grid/three-items";
import { ThreeItemSkeleton } from "@/components/skeletons";
import SectionBrands from "@/components/section/SectionBrands";
import SectionCollections from "@/components/section/SectionCollections";
import SectionTopSellingProducts from "@/components/section/SectionTopProducts";
import SectionSaleProducts from "@/components/section/SectionSaleProducts";
import SectionFeatureProducts from "@/components/section/SectionFeatureProducts";
import SectionCategories from "@/components/section/section-categories";

export default async function ShopPage() {
    return (
        <main className="p-12 flex flex-col gap-20">
            <Suspense fallback={<ThreeItemSkeleton />}>
                <ThreeItemGrid />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionTopSellingProducts />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionSaleProducts />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionLastestProducts />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionCollections />
            </Suspense>

            <Suspense fallback={<p>Loading...</p>}>
                <SectionFeatureProducts />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionBrands />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <SectionCategories />
            </Suspense>
        </main>
    );
}
