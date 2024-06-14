import {
    FullProduct,
    ProductFilterOptions,
    ProductSortOptions,
} from "../definitions";

type TFilterProducts = {
    products: FullProduct[];
    filterOptions: ProductFilterOptions;
    sortOptions: ProductSortOptions;
};

export function filterAndSortProducts(props: TFilterProducts): FullProduct[] {
    const { products, filterOptions, sortOptions } = props;
    // Apply filters
    let filteredProducts = products.filter((product) => {
        // Availability and deletion filter
        if (!product.isAvailable || product.deleted) return false;

        // Name filter
        if (filterOptions.name && !product.name.includes(filterOptions.name)) {
            return false;
        }

        // Brand filter
        if (
            filterOptions.brandIds &&
            filterOptions.brandIds.length > 0 &&
            !filterOptions.brandIds.includes(product.brandId as string)
        ) {
            return false;
        }

        // Collection filter
        if (
            filterOptions.collectionIds &&
            filterOptions.collectionIds.length > 0 &&
            !filterOptions.collectionIds.some((id) =>
                product.collectionIds.includes(id)
            )
        ) {
            return false;
        }

        // Property filter
        if (filterOptions.properties && filterOptions.properties.length > 0) {
            const propertyFilter = filterOptions.properties.every(
                (propFilter) =>
                    propFilter.values.some((value) =>
                        product.propertyIds.includes(value)
                    )
            );
            if (!propertyFilter) return false;
        }

        // Price filter
        if (
            filterOptions.priceMin !== undefined &&
            product.price < filterOptions.priceMin
        ) {
            return false;
        }
        if (
            filterOptions.priceMax !== undefined &&
            product.price > filterOptions.priceMax
        ) {
            return false;
        }

        // Gender filter
        if (
            filterOptions.genders &&
            !filterOptions.genders.includes(product.gender)
        ) {
            return false;
        }

        // Color filter
        if (
            filterOptions.colors &&
            filterOptions.colors.length > 0 &&
            !product.variations.some((variation) =>
                filterOptions.colors?.includes(variation.color)
            )
        ) {
            return false;
        }

        // Size filter
        if (
            filterOptions.sizes &&
            filterOptions.sizes.length > 0 &&
            !product.variations.some((variation) =>
                filterOptions.sizes?.includes(variation.size)
            )
        ) {
            return false;
        }

        return true;
    });

    // Apply sorting
    filteredProducts.sort((a, b) => {
        const fieldA = a[sortOptions.type];
        const fieldB = b[sortOptions.type];
        if (!fieldA || !fieldB) return 0;
        if (fieldA < fieldB) return sortOptions.direction === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOptions.direction === "asc" ? 1 : -1;
        return 0;
    });

    return filteredProducts;
}
