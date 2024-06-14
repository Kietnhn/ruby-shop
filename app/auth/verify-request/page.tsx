import { Card } from "@nextui-org/react";
import { Metadata } from "next";
import Logo from "@/components/logo";

export const metadata: Metadata = {
    title: "Verify",
};
export default function LoginEmailPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <Card className="relative mx-auto flex w-full min-w-[400px] max-w-[22rem] flex-col space-y-2.5 p-4 md:mt-2">
                <div className="flex h-20 w-full items-end rounded-lg bg-black dark:bg-white p-3 md:h-36">
                    <div className="w-32 text-white dark:text-black md:w-36 flex gap-2 items-center">
                        <Logo /> <p className="text-2xl text-inherit">Ruby</p>
                    </div>
                </div>
                <h1>You are login with email, please </h1>
            </Card>
        </main>
    );
}
