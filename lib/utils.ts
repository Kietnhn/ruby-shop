import {
    Brand,
    Collection,
    DiscountType,
    Product,
    Property,
    StyleGender,
    User,
    Variation,
} from "@prisma/client";
import {
    FullProduct,
    GenderData,
    GroupedProperties,
    ProductCategory,
    ProductFilterOptions,
    PropertiesFilterOption,
    UserNoPassword,
} from "./definitions";
import { DEFAULT_LOCALE, genderRoutes } from "./constants";
export function convertDiscountTypeToUnit(type: DiscountType) {
    if (type === "PERCENTAGE") return "%";
    return "USD";
}
export const renderId = (value: string): string => {
    if (!value) return "...";
    const end = value.substring(value.length - 4);
    return "..." + end;
};
export default function toCapitalize(str: string): string {
    if (!str) return "";

    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
export const getPublicIdFromUrl = (url: string) => {
    if (!url) return "";
    const urlArray = url.split("/");
    const lastPart = urlArray[urlArray.length - 1];
    const folderPart = urlArray[urlArray.length - 2];
    return folderPart + "/" + lastPart.split(".")[0];
};
export const getPrevPathName = (originalPath: string) => {
    const convertedPath = originalPath.substring(
        0,
        originalPath.lastIndexOf("/")
    );
    return convertedPath;
};
export const renderPrice = (
    price: number,
    currency: string = "USD",
    locale: string = DEFAULT_LOCALE
) => {
    return Intl.NumberFormat(locale, {
        currency: currency,
        style: "currency",
        currencyDisplay: "narrowSymbol",
        // maximumSignificantDigits: 2,
    }).format(price);
};
export function isVideo(url: string): boolean {
    if (!url) return false;
    const part = url.split(".");
    // get the last part of the url
    if (part[part.length - 1].includes("mp4")) {
        return true;
    } else {
        return false;
    }
}
export function generateGendersRoute(gender: StyleGender[]): string {
    let title = "";
    if (gender.length > 2) {
        title = "All";
    } else {
        title = gender.join(" & ");
    }
    return title;
}
export function generateGendersOwn(gender: StyleGender[]): string {
    let title = "";
    if (gender.length == 1) {
        title = gender[0].toLocaleLowerCase() + "'s";
    }
    return title;
}
export function generateGenderOwn(
    genderKey: keyof typeof genderRoutes | undefined
): string {
    if (!genderKey) return "All's";
    const genderData = genderRoutes[genderKey];
    if (genderData.gender.length > 1) return "";
    const result = genderData.gender[0].toLocaleLowerCase() + "'s";
    return result;
}
export function replaceGenderInPathname(
    pathname: string,
    newGenderCode: string
): string {
    const pathArray = pathname.split("/");
    const letter1 = newGenderCode[0];
    const letter2 = newGenderCode[1];
    const key = Object.keys(genderRoutes).find((key) =>
        letter2
            ? key.includes(letter1) && key.includes(letter2)
            : key.includes(letter1)
    );
    if (!key) return pathname;
    pathArray[2] = key;

    return pathArray.join("/");
}
// export const getCategoryPath = (categoryId, path = []) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     if (!category) return path;
//     path.unshift(category.name);
//     if (category.parentId) {
//       return getCategoryPath(category.parentId, path);
//     }
//     return path;
//   };
export function getAlreadyUnique(items: { id: string; [key: string]: any }[]) {
    const ids = items.map((item) => item.id);
    console.log({ ids });

    const uniqueIds = Array.from(new Set(ids));
    console.log({ uniqueIds });

    const results = items.filter((item) => uniqueIds.includes(item.id));
    return results;
}
export function findMinPrice(products: Product[]) {
    if (products.length === 0) return 0;

    // Finding minimum price
    const minPrice = products.reduce((min, product) => {
        return product.price < min ? product.price : min;
    }, Number.POSITIVE_INFINITY);
    return minPrice;
}
export function findMaxPrice(products: Product[]) {
    if (products.length === 0) return 0;

    const maxPrice = products.reduce((max, product) => {
        return product.price > max ? product.price : max;
    }, Number.NEGATIVE_INFINITY);

    return maxPrice;
}
export function getUniqueBrandsFromProducts(products: FullProduct[]) {
    if (products.length === 0) return [];
    const alreadyBrands = products
        .map((fullProduct) => fullProduct.brand)
        .filter((brand) => brand !== null) as Brand[];

    // Filter out unique brands based on ID
    const uniqueBrandsMap: Map<string, Brand> = new Map();
    alreadyBrands.forEach((brand) => {
        if (!uniqueBrandsMap.has(brand.id)) {
            uniqueBrandsMap.set(brand.id, brand);
        }
    });

    // Convert Map values back to an array
    const uniqueBrands: Brand[] = Array.from(uniqueBrandsMap.values());

    return uniqueBrands;
    // const uniqueBrands = getAlreadyUnique(alreadyBrands) as Brand[];
    // return uniqueBrands;
}
export function getUniqueCollectionsFromProducts(products: FullProduct[]) {
    if (products.length === 0) return [];

    const allCollections: Collection[] = products.reduce(
        (collections, fullProduct) => {
            return collections.concat(fullProduct.collections);
        },
        [] as Collection[]
    );

    // Filter out unique collections based on ID
    const uniqueCollectionsMap: Map<string, Collection> = new Map();
    allCollections.forEach((collection) => {
        if (!uniqueCollectionsMap.has(collection.id)) {
            uniqueCollectionsMap.set(collection.id, collection);
        }
    });

    // Convert Map values back to an array
    const uniqueCollections: Collection[] = Array.from(
        uniqueCollectionsMap.values()
    );

    return uniqueCollections;
    // const allCollections: Collection[] = products.reduce(
    //     (collections, fullProduct) => {
    //         return collections.concat(fullProduct.collections);
    //     },
    //     [] as Collection[]
    // );
    // const uniqueCollections = getAlreadyUnique(allCollections) as Collection[];
    // return uniqueCollections;
}
export function getUniquePropertiesFromProducts(products: FullProduct[]) {
    if (products.length === 0) return [];

    const allProperties: Property[] = products.reduce(
        (collections, fullProduct) => {
            return collections.concat(fullProduct.properties);
        },
        [] as Property[]
    );

    // Filter out unique collections based on ID
    const uniquePropertiesMap: Map<string, Property> = new Map();
    allProperties.forEach((collection) => {
        if (!uniquePropertiesMap.has(collection.id)) {
            uniquePropertiesMap.set(collection.id, collection);
        }
    });

    // Convert Map values back to an array
    const uniqueProperties: Property[] = Array.from(
        uniquePropertiesMap.values()
    );

    return uniqueProperties;
}
export function groupPropertiesByName(data: Property[]): GroupedProperties[] {
    const groupedData: { [name: string]: GroupedProperties } = {};

    data.forEach((obj) => {
        if (!groupedData[obj.name]) {
            groupedData[obj.name] = {
                name: obj.name,
                values: [],
            };
        }
        groupedData[obj.name].values.push(obj);
    });

    return Object.values(groupedData);
}
export function extractValues(group?: PropertiesFilterOption[]) {
    if (!group) return [];
    let valuesArray: string[] = [];

    group.forEach((item) => {
        valuesArray.push(...item.values);
    });

    return valuesArray;
}
export function getUniqueCategories(products: ProductCategory[]): string[] {
    const categoriesSet: Set<string> = new Set();
    products.forEach((product) => {
        if (product.categoryId) {
            categoriesSet.add(product.categoryId);
        }
    });
    return Array.from(categoriesSet);
}
export function getUniqueColors(vartiaions: Variation[]): string[] {
    const colorsSet: Set<string> = new Set();
    vartiaions.forEach((variation) => {
        if (variation.color) {
            colorsSet.add(variation.color);
        }
    });
    return Array.from(colorsSet);
}
export function getUniqueSizes(vartiaions: Variation[]): string[] {
    const sizesSet: Set<string> = new Set();
    vartiaions.forEach((variation) => {
        if (variation.size) {
            sizesSet.add(variation.size);
        }
    });
    return Array.from(sizesSet);
}
// Function to get all colors of products
export const getAllColors = (products: FullProduct[]) => {
    if (products.length === 0) return [];

    const colors = new Set<string>(); // Using a Set to store unique colors

    products.forEach((product) => {
        product.variations.forEach((variation) => {
            const colorArray = variation.color?.split("/");
            colorArray.forEach((color) => {
                colors.add(color);
            });
        });
    });

    return Array.from(colors); // Convert Set to array
};
export const getAllSizes = (products: FullProduct[]) => {
    if (products.length === 0) return [];
    const sizes = new Set<string>(); // Using a Set to store unique sizes

    products.forEach((product) => {
        product.variations.forEach((variation) => {
            sizes.add(variation.size);
        });
    });

    return Array.from(sizes); // Convert Set to array
};

export function excludePassword(user: User) {
    // Create a new object to store the result
    const result: any = {};

    // Iterate through the keys of the original object
    for (const key in user) {
        // Check if the key is not in the keysToExclude array
        if (key !== "password") {
            // If not, add it to the result object
            result[key] = user[key as keyof typeof user];
        }
    }

    // Return the resulting object
    return result as UserNoPassword;
}
export const generateAddress = (
    addressLine: string,
    city: string | undefined | null,
    state: string | undefined | null,
    postalCode: string,
    country: string
) => {
    return `${addressLine} ,${city ? city + "," : ""}${
        state ? state + "," : ""
    }${postalCode}, ${country}`;
};

export const filterProducts = (
    products: FullProduct[],
    filterOptions: ProductFilterOptions
) => {
    return products.filter((product) => {
        // Check each product against the filter options
        const nameMatch =
            !filterOptions.name ||
            product.name
                .toLowerCase()
                .includes(filterOptions.name.toLowerCase());
        const brandMatch =
            !filterOptions.brandIds ||
            filterOptions.brandIds.includes(product.brandId as string);
        const collectionMatch =
            !filterOptions.collectionIds ||
            filterOptions.collectionIds.some((id) =>
                product.collectionIds.includes(id)
            );
        const propertiesMatch =
            !filterOptions.properties ||
            filterOptions.properties.every((property) =>
                product.properties.some(
                    (p) =>
                        p.name === property.name &&
                        property.values.includes(p.value)
                )
            );
        const priceMinMatch =
            !filterOptions.priceMin || product.price >= filterOptions.priceMin;
        const priceMaxMatch =
            !filterOptions.priceMax || product.price <= filterOptions.priceMax;
        const allSizes = getAllSizes(products);
        const allColors = getAllColors(products);
        const sizesMatch =
            !filterOptions.sizes ||
            filterOptions.sizes.some((size) => allSizes.includes(size));
        const colorsMatch =
            !filterOptions.colors ||
            filterOptions.colors.some((color) => allColors.includes(color));

        // Return true only if all filters match
        return (
            nameMatch &&
            brandMatch &&
            collectionMatch &&
            propertiesMatch &&
            priceMinMatch &&
            priceMaxMatch &&
            sizesMatch &&
            colorsMatch
        );
    });
};
