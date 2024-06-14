import {
    Account,
    Address,
    Brand,
    Cart,
    Category,
    Collection,
    Discount,
    Employee,
    Gallery,
    Gender,
    Order,
    OrderProduct,
    Product,
    Property,
    Session,
    ShippingMethod,
    StyleGender,
    User,
    UserKind,
    Variation,
} from "@prisma/client";
import React, {
    ForwardRefExoticComponent,
    RefAttributes,
    SVGProps,
} from "react";

export type State = {
    errors?: {};
    message?: string | null;
};
export interface UserNoPassword {
    address: Address | null;
    billingAddress1: Address | null;
    billingAddress2: Address | null;
    shippingAddress: Address | null;
    cart: Cart[];
    createdAt: Date;
    dateOfBirth: Date;
    description: string | null;
    email: string | null;
    emailVerified: Date | null;
    employee: Employee | null;
    favoriteProduct: Product[];
    favoriteProductIds: string[];
    firstName: string;
    gender: Gender;
    id: string;
    image: string | null;
    kind: UserKind;
    lastName: string | null;
    name: string;
    orders: Order[];
    phoneNumber: string;
    phoneVerified: Date | null;
    score: number;
    updatedAt: Date;
}

export interface ITimeline {
    time: Date | null;
    title: string;
    description?: string;
}
export interface IOrderDetails extends Order {
    user: User;
    orderProducts: IOrderProduct[];
    shippingAddress: Address;
    vourcher: null;
}
export interface IOrderProduct extends OrderProduct {
    variation: VariationProductCheckout;
}
export interface FullProduct extends Product {
    variations: Variation[];
    category: Category | null;
    brand: Brand | null;
    collections: Collection[];
    properties: Property[];
    favoriteOf: User[];
}
export type CartData = {
    product: ProductVariations;
    color: string;
    size: string;
};
export type TReview = {
    title: string;
    value: string;
    href: string;
};
export interface ShippingInformationForm {
    shippingAddressId: string | null;
    country: string | null;
    state?: string | null;
    city?: string | null;
    addressLine: string | null;
    postalCode: string | null;
    countryCode: string | null;
    stateCode: string | null;
    lastname?: string | null;
    firstName: string | null;
    phoneNumber: string | null;
    email: string | null;
}
export interface IShippingInformation {
    shippingAddressId: string | null;
    country: string;
    state?: string;
    city?: string;
    addressLine: string;
    postalCode: string;
    lastname?: string;
    firstName: string;
    phoneNumber: string;
    email: string;
}
export interface IUpdateCart {
    createdAt: Date;
    price: number;
    priceCurrency: string;
    quantity: number;
    updatedAt: Date | null;
    userId: string | null;
    variationId: string;
}
export interface IAvailableShippingMethod {
    method: ShippingMethod;
    value: number;
    currency: string;
    description: string;
}
export interface CartCheckout extends Cart {
    variation: VariationProductCheckout;
}
export interface VariationProductCheckout extends Variation {
    product: Product;
}
export interface CartVariationProduct extends Cart {
    variation: VariationProduct;
}
export interface VariationProduct extends Variation {
    product: ProductCategoryVariations;
}
export interface ProductVariations extends Product {
    variations: Variation[];
}
export interface ProductCategoryVariations extends Product {
    variations: Variation[];
    category: Category | null;
}
export interface IProductVCF extends Product {
    variations: Variation[];
    category: Category | null;
    favoriteOf: User[];
}
export interface IProductDiscount extends Product {
    discount: Discount | null;
}
export type GroupedProperties = {
    name: string;
    values: Property[];
};
export interface ICollection extends Collection {
    products: Product[];
}
export interface ICarouselProduct {
    quantity?: number;
    id: string;
    name: string;
    gallery: Gallery[];
    category: {
        name: string;
    } | null;
    sku: string;
    price: number;
    salePrice: number | null;
    priceCurrency: string;
    discount: Discount | null;
}
export interface ITopSelling {
    quantity: number;
    id: string;
    name: string;
    gallery: Gallery[];
    category: {
        name: string;
    } | null;
    sku: string;
    price: number;
    salePrice: number | null;
    priceCurrency: string;
}
export interface ICategory extends Category {
    parent: Category | null;
}
export interface CategoryProducts extends Category {
    products: Product[];
}
export interface ProductCategory extends Product {
    category: Category | null;
}
export interface CategoryParent extends Category {
    parent: Category | null;
}
export interface ProductCategoryParentChildren extends Product {
    category: CategoryParentChildren | null;
}
export interface CategoryParentChildren extends Category {
    parent: Category | null;
    childCategories: Category[];
}
export interface FooterPageMenu {
    title: string;
    url: string;
}
export type ProductBaseOptions = {
    categoryId?: string;
    genders?: StyleGender[];
};
export type PropertiesFilterOption = { name: string; values: string[] };
export type ProductFilterOptions = {
    name?: string;
    brandIds?: string[];
    collectionIds?: string[];
    properties?: PropertiesFilterOption[];
    genders?: StyleGender[];
    priceMin?: number;
    priceMax?: number;
    sizes?: string[];
    colors?: string[];
};
export type ProductSortOptions = {
    type: AvailableSortKey;
    direction: Direction;
};
export interface IBrandsProducts extends Brand {
    products: Product[];
}
export interface IProductsBrand extends Product {
    brand: Brand;
}
export type AvailableFilters = {
    brands: Brand[];
    collections: Collection[];
    properties: Property[];
    maxPrice: number;
    minPrice: number;
    colors: string[];
    sizes: string[];
};

export type AvailableSortKey = "name" | "price" | "releaseAt";
export interface GenderData {
    gender: StyleGender[];
    isNew: boolean;
}
export interface GenderRoutesType {
    [key: string]: GenderData;
}
export interface TopProduct {
    product: Product;
    numberOfOrders: number;
}
export interface SortByData {
    key: string;
    label: string;
    value: AvailableSortKey;
    direction: Direction;
}
export interface INavbar {
    icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & RefAttributes<SVGSVGElement>
    >;
    key: string;
    label: string;
    href: string;
    isActive: boolean;
}
export type Direction = "asc" | "desc";
export type Country = {
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            ell: {
                official: string;
                common: string;
            };
            tur: {
                official: string;
                common: string;
            };
        };
    };
    flag: string;
};
