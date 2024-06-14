"use client";
import { ITimeline } from "@/lib/definitions";
import React from "react";
type Props = {
    data: ITimeline[];
};
const TimeLine = ({ data }: Props) => {
    const filteredData = data.filter((entry) => entry.time !== null) as {
        time: Date;
        title: string;
        description?: string;
    }[];
    const sortedData = filteredData.sort(
        (a, b) => a.time.getTime() - b.time.getTime()
    );
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {sortedData.map((item) => (
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time
                        className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                        suppressHydrationWarning
                    >
                        {item.time.toDateString()}
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                    </h3>
                    {item?.description && (
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                            {item.description}
                        </p>
                    )}
                </li>
            ))}
        </ol>
    );
};

export default TimeLine;
