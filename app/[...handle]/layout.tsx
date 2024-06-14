import Footer from "@/components/footer";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <div className="w-full">
                <div className=" py-20 sm:mx-auto">
                    <Suspense>{children}</Suspense>
                </div>
            </div>
            <Footer />
        </Suspense>
    );
}
