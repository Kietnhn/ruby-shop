"use client";

import {
    ColumnDef,
    RowSelectionState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pagination } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
// import InputFilter from "./products/InputFilter";
// import { TypeFilter } from "../lib/definitions";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setData: Dispatch<SetStateAction<TData[]>> | null;
    enableFilter?: boolean;
    searchId?: string;
    filterId?: string;
    enableSelection?: boolean;
    rowSelection?: RowSelectionState;
    setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
    keyId?: keyof TData;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    setData,
    enableFilter = false,
    enableSelection = false,
    searchId,
    filterId,
    rowSelection,
    setRowSelection,
    keyId,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<[]>([]);
    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: enableFilter ? getFilteredRowModel() : undefined,
        getPaginationRowModel: getPaginationRowModel(),
        state:
            enableFilter && enableSelection
                ? { columnFilters, rowSelection }
                : enableFilter
                ? { columnFilters }
                : enableSelection
                ? { rowSelection }
                : {},

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        meta: {
            updateData:
                typeof setData === "function"
                    ? (rowIndex: number, columnId: string, value: string) =>
                          setData((prev) =>
                              prev.map((row, index) =>
                                  index === rowIndex
                                      ? {
                                            ...prev[rowIndex],
                                            [columnId]: value,
                                        }
                                      : row
                              )
                          )
                    : () => {},
        },
        getRowId: keyId ? (row) => row[keyId] as string : undefined,
    });

    return (
        <>
            {/* {enableFilter && searchId && (
                <div className="flex mb-4">
                    <InputFilter
                        setColumnFilters={setColumnFilters}
                        columnFilters={columnFilters}
                        searchId={searchId}
                        filterId={filterId}
                    />
                </div>
            )} */}
            <div className="border-medium rounded-medium">
                <Table

                // style={{
                //     width: `${table.getTotalSize()}px`,
                // }}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-center group"
                                            style={{
                                                width: `${header.getSize()}px`,
                                            }}
                                        >
                                            <div
                                                className={clsx(
                                                    `flex justify-center items-center `,
                                                    {
                                                        "hover:cursor-pointer":
                                                            header.column.getCanSort(),
                                                    }
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}

                                                {
                                                    {
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[
                                                        header.column.getIsSorted() as
                                                            | "asc"
                                                            | "desc"
                                                    ]
                                                }
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={
                                        row.getIsSelected() ? "selected" : ""
                                    }
                                    onClick={
                                        enableSelection
                                            ? row.getToggleSelectedHandler()
                                            : () => {}
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-center "
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {table.getPageCount() > 1 && (
                <div className="my-4 flex items-center justify-end px-4">
                    <Pagination
                        showControls
                        total={table.getPageCount()}
                        onChange={(e) => table.setPageIndex(e - 1)}
                        initialPage={1}
                    />
                </div>
            )}
        </>
    );
}
