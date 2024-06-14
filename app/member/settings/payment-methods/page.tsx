import { auth } from "@/app/auth";
import NotFound from "@/components/not-found";
import { getUser } from "@/lib/actions/user";
import { Button } from "@nextui-org/react";
// this page also account details page
export default async function SettingPaymentMethodPage() {
    const authData = await auth();
    console.log(authData);
    const user = await getUser(authData?.user?.email || "undefined");
    if (!user) {
        return <NotFound href="/shop" title="Setting" />;
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Saved Payment Methods</h2>
            <p className="text-foreground text-medium">
                You currently don’t have any saved payment methods. Add a method
                here to be prefilled for quicker checkout.
            </p>
            <div className="flex justify-end items-center">
                <Button isDisabled>Add payment method</Button>
            </div>
        </div>
    );
}
