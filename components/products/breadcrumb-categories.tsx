"use client";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { Link } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { usePathname } from "next/navigation";
import { getPrevPathName } from "@/lib/utils";
export const BreadcrumbCategories = ({
    categories,
    className,
}: {
    categories: Category[];
    className?: string;
}) => {
    const pathName = usePathname();
    const prevPath = getPrevPathName(pathName);

    return (
        <div className={className}>
            <Breadcrumb>
                <BreadcrumbList>
                    {categories.map((cat, index) => (
                        <React.Fragment key={cat.id}>
                            <BreadcrumbItem>
                                {index === categories.length - 1 ? (
                                    <BreadcrumbPage className="text-medium">
                                        {cat.name}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={`${prevPath}/${cat.id}`}
                                            underline="hover"
                                            className="text-foreground hover:text-black hover:opacity-100"
                                        >
                                            {cat.name}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < categories.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
