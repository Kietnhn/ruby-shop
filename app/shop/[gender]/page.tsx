import NotFound from "@/components/not-found";
import SectionCollections from "@/components/section/SectionCollections";
import SectionLastestProducts from "@/components/section/SectionLastestProducts";
import SectionTopProducts from "@/components/section/SectionTopProducts";
import SubNavbar from "@/components/navbar/sub-navbar";
import { getProductsOfGender } from "@/lib/actions/product";
import { genderRoutes } from "@/lib/constants";
import { generateGendersRoute } from "@/lib/utils";
import React, { Suspense } from "react";
import SectionSaleProducts from "@/components/section/SectionSaleProducts";
import SectionFeatureProducts from "@/components/section/SectionFeatureProducts";
import SectionCategories from "@/components/section/section-categories";
import SectionEssentials from "@/components/section/section-essentials";

export default async function ProductByGenderPage({
    params,
}: {
    params: { gender: string };
}) {
    const key = params.gender as keyof typeof genderRoutes;
    const genderData = genderRoutes[key];
    if (!genderData) {
        return <NotFound href="/" title={"Shop"} />;
    }
    // const products = await getProductsOfGender(params.gender);
    // if (!products || products.length === 0) {
    //     return <p>No products</p>;
    // }

    return (
        <main className="flex-1">
            <SubNavbar title={generateGendersRoute(genderData.gender)} />
            <div className="p-12 flex flex-col gap-20">
                <div className="w-full h-96 flex-center">Intro slide</div>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionTopProducts genderData={genderData} />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionEssentials genderKey={key} />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionSaleProducts genderData={genderData} />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionLastestProducts genderData={genderData} />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionFeatureProducts genderData={genderData} />
                </Suspense>
                <Suspense fallback={<p>Loading...</p>}>
                    <SectionCategories genderKey={key} />
                </Suspense>
            </div>
        </main>
    );
}
