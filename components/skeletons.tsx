export const ThreeItemSkeleton = () => {
    return (
        <section className="mx-auto grid max-w-screen-2xl gap-6  md:grid-cols-6 md:grid-rows-2">
            <div className="md:col-span-4 md:row-span-2 bg-slate-300 animate-pulse">
                <div className="relative block aspect-square h-full w-full"></div>
            </div>
            <div className="md:col-span-2 md:row-span-1 bg-slate-300 animate-pulse"></div>
            <div className="md:col-span-2 md:row-span-1 bg-slate-300 animate-pulse"></div>
        </section>
    );
};
