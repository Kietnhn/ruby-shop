import React from "react";
import {
    RadioGroup,
    Radio,
    useRadio,
    VisuallyHidden,
    RadioProps,
    cn,
} from "@nextui-org/react";
import clsx from "clsx";
interface props extends RadioProps {
    textValue?: string;
    ishidecontrol?: boolean;
}
export const CustomRadio = (props: props) => {
    const {
        Component,
        classNames,
        children,
        isSelected,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);
    const { textValue, ishidecontrol = false } = props;
    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center justify-between hover:bg-content2 flex-row",
                " cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary",
                classNames?.base
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div className="flex justify-start items-center gap-2">
                <span
                    {...getWrapperProps()}
                    className={clsx("", {
                        "!hidden": ishidecontrol,
                    })}
                >
                    <span {...getControlProps()} />
                </span>

                <div {...getLabelWrapperProps()}>
                    {children && (
                        <span {...getLabelProps()} className="capitalize">
                            {children}
                        </span>
                    )}
                    {description && (
                        <span className="text-small text-foreground opacity-70 capitalize">
                            {description}
                        </span>
                    )}
                </div>
            </div>
            {textValue && <span className="font-semibold">{textValue}</span>}
        </Component>
    );
};
