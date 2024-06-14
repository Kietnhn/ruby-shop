import { renderPrice } from "@/lib/utils";
import { Chip, Image } from "@nextui-org/react";
import clsx from "clsx";
// import Label from '../label';

export function GridTileImage({
    isInteractive = true,
    active,
    label,
    ...props
}: {
    isInteractive?: boolean;
    active?: boolean;
    label?: {
        title: string;
        amount: number;
        currencyCode: string;
        position?: "bottom" | "center";
    };
} & React.ComponentProps<typeof Image>) {
    return (
        <div
            className={clsx(
                "group flex h-full w-full items-center justify-center overflow-hidden  bg-white dark:bg-black",
                {
                    relative: label,
                }
            )}
        >
            {props.src ? (
                <Image
                    isZoomed
                    {...props}
                    className="w-full h-full object-cover"
                    classNames={{
                        wrapper: "w-full h-full",
                        zoomedWrapper: "w-full h-full",
                    }}
                    loading="lazy"
                />
            ) : null}
            {label ? (
                <div
                    className={clsx(
                        "absolute bottom-0 left-0 flex w-full px-4 pb-4 z-10",
                        {
                            "lg:px-20 lg:pb-[35%]": label.position === "center",
                        }
                    )}
                >
                    {/* <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white"> */}
                    <Chip
                        classNames={{
                            content: "flex items-center p-1",
                            base: "p-0 !h-[unset]",
                        }}
                    >
                        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight  text-medium">
                            {label.title}
                        </h3>
                        <Chip color="primary">
                            <strong
                                suppressHydrationWarning={true}
                                className="text-xs"
                            >
                                {renderPrice(label.amount, label.currencyCode)}
                                <span
                                    className={clsx("ml-1 inline")}
                                >{`${label.currencyCode}`}</span>
                            </strong>
                        </Chip>
                    </Chip>
                    {/* </div> */}
                </div>
            ) : null}
        </div>
    );
}
