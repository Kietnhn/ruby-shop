import { ShippingMethod } from "@prisma/client";
import {
    // GenderRoutesType,
    IAvailableShippingMethod,
    SortByData,
    INavbar,
} from "./definitions";
import {
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    HeartIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
//--------
export const DEFAULT_LOCALE = "en-US";
export const FREE_SHIP_POINT = 500; // $500
//---------
export const MEN_CODE = "m";
export const WOMEN_CODE = "w";
export const MEN_AND_WOMEN_CODE = "mw";
export const UNISEX_CODE = "u";
export const UNISEX_MEN_CODE = "um";
export const UNISEX_WOMEN_CODE = "uw";
export const ALL_GENDER_CODE = "a";
// ------
export const NEW_MEN_CODE = "new-m";
export const NEW_WOMEN_CODE = "new-w";
export const NEW_MEN_AND_WOMEN_CODE = "new-mw";
export const NEW_UNISEX_CODE = "new-u";
export const NEW_UNISEX_MEN_CODE = "new-um";
export const NEW_UNISEX_WOMEN_CODE = "new-uw";
export const NEW_ALL_GENDER_CODE = "new-a";
type GenderRoutesType = {
    [MEN_CODE]: { gender: ["MEN"]; isNew: false };
    [WOMEN_CODE]: { gender: ["WOMEN"]; isNew: false };
    [MEN_AND_WOMEN_CODE]: { gender: ["MEN", "WOMEN"]; isNew: false };
    [UNISEX_CODE]: { gender: ["UNISEX"]; isNew: false };
    [UNISEX_MEN_CODE]: { gender: ["UNISEX", "MEN"]; isNew: false };
    [UNISEX_WOMEN_CODE]: { gender: ["UNISEX", "WOMEN"]; isNew: false };
    [ALL_GENDER_CODE]: { gender: ["MEN", "WOMEN", "UNISEX"]; isNew: false };
    [NEW_MEN_CODE]: { gender: ["MEN"]; isNew: true };
    [NEW_WOMEN_CODE]: { gender: ["WOMEN"]; isNew: true };
    [NEW_MEN_AND_WOMEN_CODE]: { gender: ["MEN", "WOMEN"]; isNew: true };
    [NEW_UNISEX_CODE]: { gender: ["UNISEX"]; isNew: true };
    [NEW_UNISEX_MEN_CODE]: { gender: ["UNISEX", "MEN"]; isNew: true };
    [NEW_UNISEX_WOMEN_CODE]: { gender: ["UNISEX", "WOMEN"]; isNew: true };
    [NEW_ALL_GENDER_CODE]: { gender: ["MEN", "WOMEN", "UNISEX"]; isNew: true };
};
export const genderRoutes: GenderRoutesType = {
    [MEN_CODE]: { gender: ["MEN"], isNew: false },
    [WOMEN_CODE]: { gender: ["WOMEN"], isNew: false },
    [MEN_AND_WOMEN_CODE]: { gender: ["MEN", "WOMEN"], isNew: false },
    [UNISEX_CODE]: { gender: ["UNISEX"], isNew: false },
    [UNISEX_MEN_CODE]: { gender: ["UNISEX", "MEN"], isNew: false },
    [UNISEX_WOMEN_CODE]: { gender: ["UNISEX", "WOMEN"], isNew: false },
    [ALL_GENDER_CODE]: { gender: ["MEN", "WOMEN", "UNISEX"], isNew: false },
    [NEW_MEN_CODE]: { gender: ["MEN"], isNew: true },
    [NEW_WOMEN_CODE]: { gender: ["WOMEN"], isNew: true },
    [NEW_MEN_AND_WOMEN_CODE]: { gender: ["MEN", "WOMEN"], isNew: true },
    [NEW_UNISEX_CODE]: { gender: ["UNISEX"], isNew: true },
    [NEW_UNISEX_MEN_CODE]: { gender: ["UNISEX", "MEN"], isNew: true },
    [NEW_UNISEX_WOMEN_CODE]: { gender: ["UNISEX", "WOMEN"], isNew: true },
    [NEW_ALL_GENDER_CODE]: { gender: ["MEN", "WOMEN", "UNISEX"], isNew: true },
};
export const CHECKOUT_INFORMATION_ROUTE = "information";
export const CHECKOUT_SHIPPING_ROUTE = "shipping";
export const CHECKOUT_PAYMENT_ROUTE = "payment";
export const CHECKOUT_REVIEWS_ROUTE = "reviews";
export const CHECKOUT_ROUTES = {
    [CHECKOUT_INFORMATION_ROUTE]: true,
    [CHECKOUT_SHIPPING_ROUTE]: true,
    [CHECKOUT_PAYMENT_ROUTE]: true,
    // [CHECKOUT_REVIEWS_ROUTE]: true,
};
export const DEFAULT_OFFSET_TABLE = 20;
export const AVAILABLE_SHIPPING_METHODS: IAvailableShippingMethod[] = [
    {
        method: "ECONOMY",
        currency: "USD",
        value: 4.9,
        description: "5 to 8 business days",
    },
    {
        method: "STANDARD",
        currency: "USD",
        value: 6.9,
        description: "3 to 4 business days",
    },
];
export const MENU_SORT_BY: SortByData[] = [
    {
        key: "name-desc",
        label: "Name: Desc",
        value: "name",
        direction: "desc",
    },
    {
        key: "name-asc",
        label: "Name: Asc",
        value: "name",
        direction: "asc",
    },
    {
        key: "newest",
        label: "Newest",
        value: "releaseAt",
        direction: "desc",
    },
    {
        key: "oldest",
        label: "Oldest",
        value: "releaseAt",
        direction: "asc",
    },
    {
        key: "price-low-to-high",
        label: "Price: Low to high",
        value: "price",
        direction: "asc",
    },
    {
        key: "price-high-to-low",
        label: "Price: High to low",
        value: "price",
        direction: "desc",
    },
];

export const AUTH_MENU_NAV: INavbar[] = [
    {
        key: "profile",
        label: "Profile",
        icon: UserIcon,
        isActive: true,
        href: "/member/profile",
    },
    {
        isActive: true,
        href: "/orders",
        key: "orders",
        label: "Orders",
        icon: DocumentDuplicateIcon,
    },
    {
        isActive: true,
        href: "/favourites",
        label: "Favourites",
        key: "favourites",
        icon: HeartIcon,
    },
    {
        isActive: false,
        href: "/member/settings",
        label: "Settings",
        key: "settings",
        icon: Cog6ToothIcon,
    },
];

// settings
// themes
export const AVAILABLE_THEMES: string[] = ["light", "dark"];
// date formats
export const DATE_FORMATS: string[] = [
    "MM/DD/YYYY",
    "DD/MM/YYYY",
    "YYYY/MM/DD",
    "YYYY-MM-DD",
];
// time formats
export const TIME_FORMATS: string[] = ["12", "24"];
// languages
export const AVAILABLE_LANGUAGES: string[] = ["English", "Vietnamese"];
