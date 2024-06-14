"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Collapse = ({
    title,
    children,
    initState = true,
}: {
    title: React.ReactNode;
    children: React.ReactNode;
    initState?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(initState);

    return (
        <div className=" rounded-lg overflow-hidden">
            <div
                className=" cursor-pointer py-2 flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="font-semibold text-foreground text-medium capitalize">
                    {title}
                </h4>
                <ChevronDownIcon
                    className={`h-5 w-5 transition-transform duration-300 transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </div>
            <div
                className={`  transition-max-height duration-300 overflow-hidden ${
                    isOpen ? "max-h-screen py-2 " : "max-h-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default Collapse;
