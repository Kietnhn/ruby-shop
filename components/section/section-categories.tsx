import { getCategories } from "@/lib/actions/category";
import React from "react";
import ListCategory from "./list-categories";
import { GenderData } from "@/lib/definitions";
import { genderRoutes } from "@/lib/constants";

export default async function SectionCategories({
    genderKey,
}: {
    genderKey?: keyof typeof genderRoutes;
}) {
    const categories = await getCategories();
    if (!categories) return <></>;
    return (
        <section>
            <ListCategory categories={categories} gender={genderKey} />
        </section>
    );
}
