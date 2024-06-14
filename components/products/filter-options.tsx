"use client";
import {
    getPrevPathName,
    groupPropertiesByName,
    replaceGenderInPathname,
} from "@/lib/utils";
import {
    Checkbox,
    CheckboxGroup,
    Divider,
    Link,
    Slider,
    SliderValue,
} from "@nextui-org/react";
import {
    Brand,
    Category,
    Collection,
    Property,
    StyleGender,
} from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AvailableFilters,
    GenderData,
    ProductBaseOptions,
    ProductFilterOptions,
} from "@/lib/definitions";
import Collapse from "@/components/ui/collapse/collapse-wrapper";
import { CustomCheckbox } from "@/components/ui/checkbox/custom-checkbox";
import { ColorCheckbox } from "@/components/ui/checkbox/color-checkbox";
import colorsData from "color-name";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setFilterOptions } from "@/features/product-slice";

const FilterOptions = ({
    categories,
    baseOptions,
    availableFilters,
    mode = "shop",
}: {
    categories: Category[];
    baseOptions: ProductBaseOptions | null;
    availableFilters: AvailableFilters;
    mode?: "shop" | "search";
}) => {
    const { filterOptions } = useAppSelector((store) => store.product);
    const dispatch = useAppDispatch();

    const pathName = usePathname();
    const router = useRouter();
    const prevPath = getPrevPathName(pathName);
    const {
        brands,
        collections,
        colors,
        maxPrice,
        minPrice,
        properties,
        sizes,
    } = availableFilters;

    const groupedProperties = groupPropertiesByName(properties);

    const handleSelectGender = (value: StyleGender[] | string[]) => {
        console.log({ value });
        let newPathname = replaceGenderInPathname(pathName, "a");

        if (value.length > 2 || value.length === 0) {
            newPathname = replaceGenderInPathname(pathName, "a");
        } else {
            const code = value.map((item) => item[0].toLowerCase()).join("");
            newPathname = replaceGenderInPathname(pathName, code);
        }
        handleSelectFilter(value, "genders");
        router.push(newPathname);
    };
    const handleSelectProperties = (value: string[], groupName: string) => {
        if (filterOptions.properties && filterOptions.properties?.length > 0) {
            const oldProperties = [...filterOptions.properties];

            const existedProertyIndex = oldProperties.findIndex(
                (p) => p.name === groupName
            );
            if (existedProertyIndex >= 0) {
                oldProperties[existedProertyIndex] = {
                    ...oldProperties[existedProertyIndex],
                    values: value,
                };
                const newFilterOptions: ProductFilterOptions = {
                    ...filterOptions,
                    properties: [...oldProperties],
                };
                dispatch(setFilterOptions(newFilterOptions));
            } else {
                // if not exists
                // rest the old properties and new properties
                const newFilterOptions: ProductFilterOptions = {
                    ...filterOptions,
                    properties: [
                        ...oldProperties,
                        {
                            name: groupName,
                            values: value,
                        },
                    ],
                };
                dispatch(setFilterOptions(newFilterOptions));
            }
        } else {
            // add new properties
            const newFilterOptions: ProductFilterOptions = {
                ...filterOptions,
                properties: [
                    {
                        name: groupName,
                        values: value,
                    },
                ],
            };
            dispatch(setFilterOptions(newFilterOptions));
        }
    };
    const handleSelectFilter = (
        value: string[],
        filterName: keyof typeof filterOptions
    ) => {
        const newFilterOptions: ProductFilterOptions = {
            ...filterOptions,
            [filterName]: value,
        };
        dispatch(setFilterOptions(newFilterOptions));
    };
    const handleRangPrice = (value: SliderValue) => {
        if (typeof value === "number") return;
        const minPrice = value[0];
        const maxPrice = value[1];
        console.log(value);
        const newFilterOptions: ProductFilterOptions = {
            ...filterOptions,
            priceMin: minPrice,
            priceMax: maxPrice,
        };
        dispatch(setFilterOptions(newFilterOptions));
    };
    return (
        <div className="h-full w-full mr-4 ">
            <ScrollArea className="h-full overflow-auto w-full pr-4 ">
                <div className="h-full flex flex-col gap-4 ">
                    {mode === "shop" && (
                        <>
                            {/* categoies */}
                            {categories.length > 0 && (
                                <div>
                                    <h4 className="text-medium font-semibold">
                                        Categories
                                    </h4>
                                    <ul className="">
                                        {categories.map((category, index) => (
                                            <li
                                                key={category.id}
                                                className="py-1 "
                                            >
                                                <Link
                                                    className="text-foreground"
                                                    href={`${prevPath}/${category.id}`}
                                                    underline={
                                                        pathName ===
                                                        `${prevPath}/${category.id}`
                                                            ? "always"
                                                            : "hover"
                                                    }
                                                    isDisabled={
                                                        pathName ===
                                                        `${prevPath}/${category.id}`
                                                    }
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <Divider />
                            {/* gender */}
                            <Collapse title="Gender">
                                <CheckboxGroup
                                    aria-label="Gender"
                                    value={baseOptions?.genders || []}
                                    onValueChange={handleSelectGender}
                                >
                                    {["MEN", "WOMEN", "UNISEX"].map(
                                        (gender) => (
                                            <Checkbox
                                                value={gender}
                                                key={gender}
                                            >
                                                {gender}
                                            </Checkbox>
                                        )
                                    )}
                                </CheckboxGroup>
                            </Collapse>
                            <Divider />
                        </>
                    )}
                    {/* price */}
                    <Slider
                        // showSteps={true}
                        classNames={{
                            label: "font-semibold text-medium",
                        }}
                        label="Shop by price"
                        formatOptions={{
                            style: "currency",
                            currency: "USD",
                        }}
                        size="sm"
                        disableThumbScale={true}
                        step={1}
                        maxValue={maxPrice}
                        minValue={minPrice}
                        defaultValue={[minPrice, maxPrice]}
                        onChangeEnd={handleRangPrice}
                        className="max-w-md"
                    />
                    {/* size */}
                    <Collapse title="Size">
                        <CheckboxGroup
                            aria-label="size"
                            value={filterOptions?.sizes || []}
                            onValueChange={(value) =>
                                handleSelectFilter(value, "sizes")
                            }
                            classNames={{
                                base: " capitalize",
                            }}
                            orientation="horizontal"
                        >
                            {sizes.map((size) => (
                                <CustomCheckbox value={size} key={size}>
                                    {size}
                                </CustomCheckbox>
                            ))}
                        </CheckboxGroup>
                    </Collapse>
                    <Divider />
                    {/* colors */}
                    <Collapse title="Color">
                        <CheckboxGroup
                            orientation="horizontal"
                            aria-label="color"
                            value={filterOptions?.colors || []}
                            onValueChange={(value) =>
                                handleSelectFilter(value, "colors")
                            }
                            classNames={{
                                base: " capitalize",
                            }}
                        >
                            {colors.map((color) => (
                                <ColorCheckbox
                                    value={color}
                                    key={color}
                                    color={
                                        colorsData[
                                            color as keyof typeof colorsData
                                        ]
                                    }
                                >
                                    {color}
                                </ColorCheckbox>
                            ))}
                        </CheckboxGroup>
                    </Collapse>
                    {brands.length > 0 && (
                        <>
                            <Divider />
                            <Collapse title="Brand">
                                <CheckboxGroup
                                    aria-label="Brand"
                                    value={filterOptions?.brandIds || []}
                                    onValueChange={(value) =>
                                        handleSelectFilter(value, "brandIds")
                                    }
                                >
                                    {brands.map((brand) => (
                                        <Checkbox
                                            value={brand.id}
                                            key={brand.id}
                                        >
                                            {brand.name}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </Collapse>
                        </>
                    )}
                    {collections.length > 0 && (
                        <>
                            <Divider />

                            <Collapse title="Collection">
                                <CheckboxGroup
                                    aria-label="Collection"
                                    value={filterOptions?.collectionIds || []}
                                    onValueChange={(value) =>
                                        handleSelectFilter(
                                            value,
                                            "collectionIds"
                                        )
                                    }
                                >
                                    {collections.map((collection) => (
                                        <Checkbox
                                            value={collection.id}
                                            key={collection.id}
                                        >
                                            {collection.name}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </Collapse>
                        </>
                    )}
                    {groupedProperties.map((group, index) => {
                        const selectedGroup = filterOptions?.properties?.find(
                            (property) => property.name === group.name
                        );
                        return (
                            <React.Fragment key={index}>
                                <Divider />
                                <Collapse title={group.name}>
                                    <CheckboxGroup
                                        aria-label={group.name}
                                        value={selectedGroup?.values}
                                        onValueChange={(value) =>
                                            handleSelectProperties(
                                                value,
                                                group.name
                                            )
                                        }
                                    >
                                        {group.values.map((property) => (
                                            <Checkbox
                                                value={property.id}
                                                key={property.id}
                                            >
                                                {property.value}
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </Collapse>
                            </React.Fragment>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};

export default FilterOptions;
