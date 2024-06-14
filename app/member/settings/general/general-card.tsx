"use client";

import {
    AVAILABLE_LANGUAGES,
    DATE_FORMATS,
    TIME_FORMATS,
} from "@/lib/constants";
import toCapitalize from "@/lib/utils";
import { Select, SelectItem, cn } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { ChangeEvent } from "react";

export default function GeneralCard() {
    const { setTheme, theme, themes } = useTheme();
    const handleSelectTheme = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (!value) return;
        setTheme(value);
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                <div className="w-3/5">
                    <p>Theme</p>
                </div>
                <Select
                    className={cn("w-2/5")}
                    aria-label="theme selection"
                    selectionMode="single"
                    defaultSelectedKeys={[theme || "light"]}
                    onChange={handleSelectTheme}
                >
                    {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                            {toCapitalize(theme)}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center">
                <div className="w-3/5">
                    <p>Date format</p>
                </div>
                <Select
                    className={cn("w-2/5")}
                    aria-label="date format selection"
                    selectionMode="single"
                    defaultSelectedKeys={["MM/DD/YYYY"]}
                    isDisabled
                >
                    {DATE_FORMATS.map((dateFormat) => (
                        <SelectItem key={dateFormat} value={dateFormat}>
                            {dateFormat}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center">
                <div className="w-3/5">
                    <p>Time format</p>
                </div>
                <Select
                    className={cn("w-2/5")}
                    aria-label="time format selection"
                    selectionMode="single"
                    defaultSelectedKeys={["24"]}
                    isDisabled
                >
                    {TIME_FORMATS.map((timeFormat) => (
                        <SelectItem
                            key={timeFormat}
                            value={timeFormat}
                            textValue={timeFormat}
                        >
                            {timeFormat}-hours
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex items-center">
                <div className="w-3/5">
                    <p>Language</p>
                </div>
                <Select
                    className={cn("w-2/5")}
                    aria-label="Language  selection"
                    selectionMode="single"
                    defaultSelectedKeys={["English"]}
                    isDisabled
                >
                    {AVAILABLE_LANGUAGES.map((language) => (
                        <SelectItem key={language} value={language}>
                            {language}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {/* <div className="flex items-center">
              
            </div> */}
        </div>
    );
}
