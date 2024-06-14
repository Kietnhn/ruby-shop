"use client";

import { renderId, renderPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Chip, Link, Tooltip } from "@nextui-org/react";
import { Order, OrderStatus, PaymentStatus, User } from "@prisma/client";
import {
    CheckIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order Id",
        size: 80,
        enableSorting: false,
        cell: (props) => {
            const orderId = props.getValue() as string;
            return (
                <Tooltip content={orderId}>
                    <Link href={`/orders/${orderId}`}>{renderId(orderId)}</Link>
                </Tooltip>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: (props) => {
            const createdAt = props.getValue() as Date;
            return (
                <p className="" suppressHydrationWarning>
                    {createdAt?.toLocaleDateString()}
                </p>
            );
        },
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment status",
        cell: (props) => {
            const status = props.getValue() as PaymentStatus;
            return (
                <>
                    {status === "PAID" ? (
                        <Chip
                            startContent={<CheckIcon className="w-5 h-5" />}
                            variant="bordered"
                            color="success"
                        >
                            Paid
                        </Chip>
                    ) : status === "PENDING" ? (
                        <Chip
                            startContent={
                                <ExclamationTriangleIcon className="w-5 h-5" />
                            }
                            variant="bordered"
                            color="warning"
                        >
                            Pending
                        </Chip>
                    ) : (
                        <Chip
                            variant="bordered"
                            color="danger"
                            startContent={
                                <ExclamationCircleIcon className="w-5 h-5" />
                            }
                        >
                            Failed
                        </Chip>
                    )}
                </>
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: (props) => {
            const totalPrice = props.getValue() as number;
            const currency = props.row.original.priceCurrency;
            return (
                <p
                    className="text-foreground font-semibold "
                    suppressHydrationWarning
                >
                    {renderPrice(totalPrice, currency)}
                </p>
            );
        },
    },
    {
        accessorKey: "quantity",
        header: "Items",
        cell: (props) => <p>{props.getValue() as number} items</p>,
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: (props) => {
    //         const status = props.getValue() as OrderStatus;
    //         return (
    //             <strong
    //                 className={clsx("", {
    //                     "text-primary": status === "CREATED",
    //                     "text-warning-500": status === "PROCESSING",
    //                     "text-danger-500": status === "CANCELLED",
    //                     "text-success-500": status === "COMPLETED",
    //                 })}
    //             >
    //                 {props.getValue() as string}
    //             </strong>
    //         );
    //     },
    // },
    {
        accessorKey: "paymentMethod",
        header: "Payment method",
    },

    // {
    //     accessorKey: "processedAt",
    //     header: "Processed at",
    //     cell: (props) => {
    //         const processedAt = props.getValue() as Date;
    //         return (
    //             <p className="" suppressHydrationWarning>
    //                 {processedAt?.toLocaleDateString() || "null"}
    //             </p>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "completedAt",
    //     header: "Completed at",
    //     cell: (props) => {
    //         const completedAt = props.getValue() as Date;
    //         return (
    //             <p className="" suppressHydrationWarning>
    //                 {completedAt?.toLocaleDateString() || "null"}
    //             </p>
    //         );
    //     },
    // },

    // {
    //     header: "Actions",
    //     enableSorting: false,
    //     cell(props) {
    //         const orderId = props.row.original.id;
    //         return (
    //             <Tooltip content="View detail" showArrow>
    //                 <Link href={`/dashboard/orders/${orderId}`}>
    //                     <Button isIconOnly color="primary" variant="light">
    //                         <EyeIcon className="w-5 h-5" />
    //                     </Button>
    //                 </Link>
    //             </Tooltip>
    //         );
    //     },
    // },
];
