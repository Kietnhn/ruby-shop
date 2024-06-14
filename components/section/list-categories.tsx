"use client";

import { ALL_GENDER_CODE, genderRoutes } from "@/lib/constants";
import { ICategory } from "@/lib/definitions";
import { generateGenderOwn } from "@/lib/utils";
import { Link } from "@nextui-org/react";

const ListCategory = ({
    categories,
    gender,
}: {
    categories: ICategory[];
    gender?: keyof typeof genderRoutes;
}) => {
    // Function to get the root categories (those with parentId = null)
    const getRootCategories = () => {
        return categories.filter((category) => category.parentId === null);
    };

    // Function to get the children of a specific parent category
    const getChildren = (parentId: string) => {
        return categories.filter((category) => category.parentId === parentId);
    };

    // Render function for the tree with two levels: root categories and their children
    const renderTree = () => {
        const rootCategories = getRootCategories();

        return (
            <div className="grid grid-cols-3 justify-items-center max-h-52 hover:max-h-[unset] overflow-hidden">
                {rootCategories.map((root) => (
                    <div key={root.id} className="flex flex-col gap-6 ">
                        <div>
                            <p className="text-xl font-semibold">{root.name}</p>
                        </div>
                        <ul className="flex flex-col gap-2 ">
                            <li>
                                <Link
                                    className="text-foreground-600 capitalize"
                                    href={`/shop/${gender}/${root.id}`}
                                >
                                    {generateGenderOwn(gender)} {root.name}
                                </Link>
                            </li>
                            {getChildren(root.id).map((child) => (
                                <li key={child.id}>
                                    <Link
                                        className="text-foreground-600 capitalize"
                                        href={`/shop/${ALL_GENDER_CODE}/${child.id}`}
                                    >
                                        {gender && generateGenderOwn(gender)}{" "}
                                        {child.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return <div className="max-w-[800px] mx-auto">{renderTree()}</div>;
};

export default ListCategory;
