import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const ColorCheckbox = (props: any) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...props,
    });
    const { color, value } = props;

    return (
        <>
            <label
                {...getBaseProps()}
                className="flex-center flex-col cursor-pointer"
            >
                <div
                    className="w-8 h-8 rounded-full relative shadow-medium"
                    style={{ backgroundColor: `rgb(${color?.join(",")})` }}
                >
                    <div
                        className={clsx(
                            "absolute inset-0 rounded-full   duration-200 hidden",
                            {
                                "!flex justify-center items-center bg-[rgba(0,0,0,0.2)] animate-appearance-in":
                                    isSelected,
                            }
                        )}
                    >
                        <CheckIcon className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>

                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </label>
        </>
    );
};
