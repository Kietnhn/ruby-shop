"use server";
import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";
import {
    FullProduct,
    GenderData,
    ICarouselProduct,
    IProductDiscount,
    IProductsBrand,
    ITopSelling,
    ProductBaseOptions,
    ProductCategory,
    ProductCategoryVariations,
    ProductFilterOptions,
    ProductSortOptions,
    TopProduct,
} from "../definitions";
import { extractValues, getUniqueCategories } from "../utils";
import { genderRoutes } from "../constants";
import { Product } from "@prisma/client";
import { unstable_noStore } from "next/cache";

export async function getRecommendedProducts(
    products?: ProductCategoryVariations[]
): Promise<ICarouselProduct[]> {
    if (!products || products.length === 0) {
        // get Top products instead
        const topProducts = await getTopSelling();
        return topProducts;
    }

    const categories = getUniqueCategories(products);
    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        categoryId: {
                            in: categories,
                        },
                    },
                    {
                        category: {
                            parentId: {
                                in: categories,
                            },
                        },
                    },
                ],
                isAvailable: true,
                deleted: false,
            },
            take: 20,
            select: {
                id: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                name: true,
                gallery: true,
                sku: true,
                price: true,
                priceCurrency: true,
                salePrice: true,
                discount: true,
            },
        });
        return products;
    } catch (error) {
        throw new Error("Error getting recommended products" + error);
    }
}
export async function getFeatureProducts(
    genderData?: GenderData
): Promise<ICarouselProduct[]> {
    try {
        const products = await prisma.product.findMany({
            where: {
                properties: {
                    some: {
                        name: {
                            contains: "features",
                            mode: "insensitive",
                        },
                    },
                },
                gender: genderData && {
                    in: genderData.gender,
                },
                deleted: false,
                isAvailable: true,
            },
            select: {
                id: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                name: true,
                gallery: true,
                sku: true,
                price: true,
                priceCurrency: true,
                salePrice: true,
                discount: true,
            },
            orderBy: {
                releaseAt: genderData?.isNew ? "desc" : "asc",
            },
            take: 20,
        });

        return products;
    } catch (error) {
        throw new Error("Erro at get feature Products" + error);
    }
}
export async function getLastestProducts(
    genderData?: GenderData
): Promise<ICarouselProduct[]> {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                name: true,
                gallery: true,
                sku: true,
                price: true,
                priceCurrency: true,
                salePrice: true,
                discount: true,
            },
            where: {
                isAvailable: true,
                deleted: false,
                gender: genderData && {
                    in: genderData.gender,
                },
            },
            take: 20,
            orderBy: {
                createdAt: "desc",
            },
        });
        return products;
    } catch (error) {
        throw new Error("Erro at get Products" + error);
    }
}
export async function getProductsBrand(): Promise<IProductsBrand[]> {
    try {
        const productsBrand = await prisma.product.findMany({
            where: {
                deleted: false,
                isAvailable: true,

                NOT: {
                    brandId: null,
                },
            },
            include: {
                brand: true,
            },
            take: 20,
        });
        return productsBrand as IProductsBrand[];
    } catch (error) {
        throw new Error("Erro at get Products" + error);
    }
}

export async function getTopThreeProducts() {
    try {
        const products = await prisma.product.findMany({
            take: 3,
            where: {
                isAvailable: true,
                deleted: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return products;
    } catch (error) {
        throw new Error("Erro at get Products" + error);
    }
}
export async function getSaleProducts(
    genderData?: GenderData
): Promise<ICarouselProduct[]> {
    try {
        const products = await prisma.product.findMany({
            where: {
                discountId: {
                    not: null,
                },
                gender: genderData && {
                    in: genderData.gender,
                },
                deleted: false,
                isAvailable: true,
            },
            select: {
                id: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                name: true,
                gallery: true,
                sku: true,
                price: true,
                priceCurrency: true,
                salePrice: true,
                discount: true,
            },
            orderBy: {
                releaseAt: genderData?.isNew ? "desc" : "asc",
            },
        });
        return products;
    } catch (error) {
        throw new Error("Erro at get Sale Products" + error);
    }
}
export async function getTopSelling(
    genderData?: GenderData
): Promise<ICarouselProduct[]> {
    unstable_noStore();

    try {
        const groupProduct = await prisma.orderProduct.groupBy({
            by: ["productId"],
            _sum: {
                quantity: true,
            },
            where: {
                product: {
                    gender: genderData && {
                        in: genderData.gender,
                    },
                    deleted: false,
                    isAvailable: true,
                },
            },
            orderBy: {
                _sum: {
                    quantity: "desc",
                },
            },

            take: 10,
        });
        const productIds = groupProduct.map((item) => item.productId);
        const selling = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },

            select: {
                id: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                name: true,
                gallery: true,
                sku: true,
                price: true,
                priceCurrency: true,
                salePrice: true,
                discount: true,
            },
            orderBy: {
                releaseAt: genderData?.isNew ? "desc" : "asc",
            },
        });
        const result = selling
            .map((item) => {
                const matched = groupProduct.find(
                    (v) => v.productId === item.id
                );
                // if(!matched)
                return {
                    ...item,
                    quantity: matched?._sum.quantity || 0,
                };
            })
            .sort((a, b) => b.quantity - a.quantity);

        return result;
    } catch (error) {
        throw new Error("Error at get top customer" + error);
    }
}

// export async function getTopProducts(genderCode = "a"): Promise<Product[]> {
//     const genderData = genderRoutes[genderCode];

//     if (!genderData) {
//         throw new Error("Invalid gender code");
//     }

//     // fake top products
//     try {
//         const products = await prisma.product.findMany({
//             where: {
//                 isAvailable: true,
//                 deleted: false,
//             },
//             orderBy: {
//                 name: "asc",
//             },
//             take: 20,
//         });
//         return products;
//     } catch (error) {
//         throw new Error("Error getting top products" + error);
//     }
//     // Map the result to the desired format
//     // const formattedTopProducts: TopProduct[] = topProducts.map((product) => ({
//     //     product: product.product,
//     //     numberOfOrders: product._count.productId
//     // }));

//     // return [];
// }
export async function getTopFavoriteProducts(
    genderCode: keyof typeof genderRoutes = "a"
): Promise<TopProduct[]> {
    const genderData = genderRoutes[genderCode];

    if (!genderData) {
        throw new Error("Invalid gender code");
    }
    const topFavoriteProducts = await prisma.product.groupBy({
        by: ["id", "name"],
        where: {
            gender: {
                in: genderData.gender,
            },
        },
        _count: {
            favoriteOfIds: true,
        },
        orderBy: {
            _count: {
                favoriteOfIds: "desc",
            },
        },
    });

    // Map the result to the desired format
    // const formattedTopProducts: TopProduct[] = topProducts.map(product => ({
    //    product: product,
    //     numberOfFavorites: product._count.favoriteOfids,
    // }));

    // return formattedTopProducts;
    return [];
}

export async function getProductsOfGender(
    genderCode: keyof typeof genderRoutes
) {
    const genderData = genderRoutes[genderCode];

    if (!genderData) {
        throw new Error("Invalid gender code");
    }

    let products: Product[];
    try {
        if (genderData.isNew) {
            products = await prisma.product.findMany({
                where: {
                    gender: {
                        in: genderData.gender,
                    },
                    isAvailable: true,
                    deleted: false,
                },
                // orderBy: {
                //     releaseDate: 'desc'
                // }
            });
        } else {
            products = await prisma.product.findMany({
                where: {
                    gender: {
                        in: genderData.gender,
                    },
                    isAvailable: true,
                    deleted: false,
                },
            });
        }
        return products;
    } catch (error) {
        throw new Error("Erro at get ProductsOfGender" + error);
    }
}

export async function updateFieldProduct() {
    // async function updateProduct(product: ProductCategoryVariations) {
    //     const colors = getUniqueColors(product.variations);
    //     const gallery: Gallery[] = [];
    //     colors.forEach((col) => {
    //         const varr = product.variations.find(
    //             (variation) =>
    //                 variation.color === col && variation.images.length > 0
    //         );
    //         if (!varr) return;
    //         gallery.push({
    //             color: col,
    //             image: varr.images[0],
    //         });
    //     });
    //     try {
    //         if (gallery.length > 0) {
    //             await prisma.product.update({
    //                 where: {
    //                     id: product.id,
    //                 },
    //                 data: {
    //                     gallery: gallery,
    //                 },
    //             });
    //         }
    //     } catch (error) {
    //         throw new Error("Error updating" + error);
    //     }
    // }
    try {
        // const products = await prisma.product.findMany({
        //     include: {
        //         variations: true,
        //         category: true,
        //     },
        // });
        // const updatePromises: any = [];

        // Push all update promises to the array
        // products.forEach((product) => {
        //     updatePromises.push(updateProduct(product));
        // });

        // // Await all update promises
        // await Promise.all(updatePromises);
        await prisma.cart.updateMany({
            data: {
                priceCurrency: "USD",
            },
        });
    } catch (error) {
        throw new Error("Error updating" + error);
    }
}
export async function getProducts(offset = 0, limit = 50) {
    try {
        const products = await prisma.product.findMany({
            where: {
                deleted: false,
                isAvailable: true,
            },
            skip: offset,
            take: limit,
        });
        return products;
    } catch (error) {
        throw new Error("Error getting products:" + error);
    }
}

export async function getProductsOfGenderAndCategory(
    baseOptions: ProductBaseOptions,
    filterOptions: ProductFilterOptions,
    sortOptions: ProductSortOptions = {
        direction: "asc",
        type: "name",
    },
    offset = 0,
    limit = 10
): Promise<FullProduct[]> {
    const { categoryId } = baseOptions;
    if (!categoryId) {
        throw new Error("Invalid category");
    }
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                childCategories: true,
            },
        });
        if (!category) return [];
        const relativeCategoriesIds = [
            category?.id,
            ...category.childCategories.map((c) => c.id),
        ] as string[];
        if (category.parentId) {
            relativeCategoriesIds.push(category.parentId);
        }
        const propertiesFilterOption = extractValues(filterOptions?.properties);

        const products = await prisma.product.findMany({
            where: {
                isAvailable: true,
                deleted: false,
                OR: [
                    {
                        categoryId: {
                            in: relativeCategoriesIds,
                        },
                    },
                    {
                        category: {
                            parentId: {
                                in: relativeCategoriesIds,
                            },
                        },
                    },
                ],
                AND: [
                    filterOptions.name
                        ? { name: { contains: filterOptions.name } }
                        : {},

                    filterOptions.brandIds && filterOptions.brandIds.length > 0
                        ? { brandId: { in: filterOptions.brandIds } }
                        : {},
                    filterOptions.collectionIds &&
                    filterOptions.collectionIds.length > 0
                        ? {
                              collectionIds: {
                                  hasSome: filterOptions.collectionIds,
                              },
                          }
                        : {},
                    propertiesFilterOption.length > 0
                        ? { propertyIds: { hasSome: propertiesFilterOption } }
                        : {},
                    filterOptions.priceMin
                        ? { price: { gte: filterOptions.priceMin } }
                        : {},
                    filterOptions.priceMax
                        ? { price: { lte: filterOptions.priceMax } }
                        : {},
                    baseOptions.genders
                        ? { gender: { in: baseOptions.genders } }
                        : {},

                    filterOptions.colors && filterOptions.colors.length > 0
                        ? {
                              variations: {
                                  some: { color: { in: filterOptions.colors } },
                              },
                          }
                        : {},
                    filterOptions.sizes && filterOptions.sizes.length > 0
                        ? {
                              variations: {
                                  some: { size: { in: filterOptions.sizes } },
                              },
                          }
                        : {},
                ],
            },
            include: {
                category: true,
                brand: true,
                collections: true,
                properties: true,
                variations: true,
                favoriteOf: true,
            },
            skip: offset,
            take: limit,
            orderBy: {
                [sortOptions.type]: sortOptions.direction,
            },
        });

        return products;
    } catch (error) {
        throw new Error("Error getting products" + error);
    }
}
export async function findProducts(
    searchString: string,
    offset = 0,
    limit = 10
): Promise<FullProduct[]> {
    try {
        const products = await prisma.product.findMany({
            where: {
                isAvailable: true,
                deleted: false,

                AND: [
                    searchString
                        ? {
                              OR: [
                                  {
                                      name: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      category: {
                                          name: {
                                              contains: searchString,
                                              mode: "insensitive",
                                          },
                                      },
                                  },
                                  {
                                      brand: {
                                          name: {
                                              contains: searchString,
                                              mode: "insensitive",
                                          },
                                      },
                                  },
                                  {
                                      description: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      variations: {
                                          some: {
                                              OR: [
                                                  {
                                                      color: {
                                                          contains:
                                                              searchString,
                                                      },
                                                      size: {
                                                          contains:
                                                              searchString,
                                                      },
                                                  },
                                              ],
                                          },
                                      },
                                  },
                                  {
                                      summary: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      details: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      properties: {
                                          some: {
                                              value: {
                                                  contains: searchString,
                                                  mode: "insensitive",
                                              },
                                          },
                                      },
                                  },
                              ],
                          }
                        : {},
                ],
            },
            include: {
                category: true,
                brand: true,
                collections: true,
                properties: true,
                variations: true,
                favoriteOf: true,
            },
            skip: offset,
            take: limit,
        });
        return products;
    } catch (error) {
        throw new Error("Error at find products" + error);
    }
}
export async function searchProducts(
    searchString: string,
    filterOptions: ProductFilterOptions,
    sortOptions: ProductSortOptions,
    offset = 0,
    limit = 50
): Promise<FullProduct[]> {
    if (!searchString) {
        throw new Error("Missing search string");
    }
    try {
        const propertiesFilterOption = extractValues(filterOptions?.properties);

        const products = await prisma.product.findMany({
            where: {
                isAvailable: true,
                deleted: false,

                AND: [
                    searchString
                        ? {
                              OR: [
                                  {
                                      name: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      category: {
                                          name: {
                                              contains: searchString,
                                              mode: "insensitive",
                                          },
                                      },
                                  },
                                  {
                                      brand: {
                                          name: {
                                              contains: searchString,
                                              mode: "insensitive",
                                          },
                                      },
                                  },
                                  {
                                      description: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      variations: {
                                          some: {
                                              OR: [
                                                  {
                                                      color: {
                                                          contains:
                                                              searchString,
                                                      },
                                                      size: {
                                                          contains:
                                                              searchString,
                                                      },
                                                  },
                                              ],
                                          },
                                      },
                                  },
                                  {
                                      summary: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      details: {
                                          contains: searchString,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      properties: {
                                          some: {
                                              value: {
                                                  contains: searchString,
                                                  mode: "insensitive",
                                              },
                                          },
                                      },
                                  },
                              ],
                          }
                        : {},
                    filterOptions.brandIds && filterOptions.brandIds.length > 0
                        ? { brandId: { in: filterOptions.brandIds } }
                        : {},
                    filterOptions.collectionIds &&
                    filterOptions.collectionIds.length > 0
                        ? {
                              collectionIds: {
                                  hasSome: filterOptions.collectionIds,
                              },
                          }
                        : {},
                    propertiesFilterOption.length > 0
                        ? { propertyIds: { hasSome: propertiesFilterOption } }
                        : {},
                    filterOptions.priceMin
                        ? { price: { gte: filterOptions.priceMin } }
                        : {},
                    filterOptions.priceMax
                        ? { price: { lte: filterOptions.priceMax } }
                        : {},
                    filterOptions.genders
                        ? { gender: { in: filterOptions.genders } }
                        : {},

                    filterOptions.colors && filterOptions.colors.length > 0
                        ? {
                              variations: {
                                  some: { color: { in: filterOptions.colors } },
                              },
                          }
                        : {},
                    filterOptions.sizes && filterOptions.sizes.length > 0
                        ? {
                              variations: {
                                  some: { size: { in: filterOptions.sizes } },
                              },
                          }
                        : {},
                ],
            },
            include: {
                category: true,
                brand: true,
                collections: true,
                properties: true,
                variations: true,
                favoriteOf: true,
            },
            skip: offset,
            take: limit,
        });
        return products;
    } catch (error) {
        throw new Error("Error at search products" + error);
    }
}
export async function getProductDetails(productId: string) {
    const authData = await auth();

    if (!productId) {
        throw new Error("Missing product id in getting product details");
    }
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                variations: true,
                properties: true,
                brand: true,
                category: true,
                collections: true,
                favoriteOf: true,
                //  {
                //     where: authData?.user?.email
                //         ? {
                //               email: authData.user.email,
                //           }
                //         : {},
                // },
            },
        });

        // product?.gallery.forEach((gallery) => {
        //     gallery.
        // })
        return product as FullProduct;
    } catch (error) {
        throw new Error("Error getting product details" + error);
    }
}
