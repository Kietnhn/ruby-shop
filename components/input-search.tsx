"use client";
import { setSearchValue } from "@/features/search-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
const InputSearch = () => {
    // const { searchValue } = useAppSelector((store) => store.search);
    // const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const handleChangeInput = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("q", value);
        // dispatch(setSearchValue(value));
        router.push("/search" + "?" + params.toString());
    }, 500);
    return (
        <Input
            classNames={{
                base: "max-w-full lg:max-w-[14rem] sm:max-w-[12rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            onValueChange={handleChangeInput}
            size="md"
            defaultValue={query as string}
            startContent={<MagnifyingGlassIcon className="w-5 h-5" />}
            type="search"
        />
    );
};

export default InputSearch;
