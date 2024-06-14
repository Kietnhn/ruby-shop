import { genderRoutes } from "@/lib/constants";

export async function generateStaticParams() {
    const genderRoutesKeys: string[] = Object.keys(genderRoutes);

    return genderRoutesKeys.map((genderCode) => ({
        gender: genderCode,
    }));
}
export default function GenderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
