import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="fixed inset-0">
            <div className="flex-center h-full">
                <CircularProgress aria-label="Loading..." size="lg" />
            </div>
        </div>
    );
}
