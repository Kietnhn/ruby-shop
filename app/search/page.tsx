import ShopNavbar from "@/components/navbar/shop-navbar";
import ResultsSearch from "@/components/search/results-search";
import { searchProducts } from "@/lib/actions/product";
import { redirect } from "next/navigation";
import React from "react";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    if (!searchParams.q) {
        redirect("/shop");
    }
    const results = await searchProducts(
        searchParams.q,
        {},
        {
            direction: "asc",
            type: "name",
        }
    );

    return (
        <main className="relative flex-1 px-12">
            <ShopNavbar
                breadcrumbs={[]}
                genderData={null}
                mode="search"
                title={
                    <>
                        <p className="text-medium ">
                            Search results for{" "}
                            <span
                                className="text-xl font-semibold "
                                style={{ textTransform: "none" }}
                            >
                                "{searchParams.q}"
                            </span>
                        </p>

                        {/* <span className="font-semibold text-default-500 text-xl ml-1">
                            ({results.length})
                        </span> */}
                    </>
                }
            />

            <ResultsSearch results={results} />
        </main>
    );
}
