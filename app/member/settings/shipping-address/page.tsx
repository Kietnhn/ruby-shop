import { auth } from "@/app/auth";
import EditAddressForm from "@/components/forms/edit-address-form";
import NotFound from "@/components/not-found";
import { getUserByEmail } from "@/lib/actions/user";
// this page also account details page
export default async function SettingShippingAddressPage() {
    const authData = await auth();
    console.log(authData);
    const user = await getUserByEmail(authData?.user?.email || "undefined");
    if (!user) {
        return <NotFound href="/shop" title="Setting" />;
    }

    return (
        <main>
            <h3 className="text-xl font-semibold">Shipping Address</h3>
            <div className="my-4">
                <EditAddressForm initialState={user.shippingAddress} />
            </div>
        </main>
    );
}
