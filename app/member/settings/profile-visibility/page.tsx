import { auth } from "@/app/auth";
import NotFound from "@/components/not-found";
import { getUser } from "@/lib/actions/user";
// this page also account details page
export default async function SettingProfileVisibilityPage() {
    const authData = await auth();
    console.log(authData);
    const user = await getUser(authData?.user?.email || "undefined");
    if (!user) {
        return <NotFound href="/shop" title="Setting" />;
    }

    return <div>SettingProfileVisibilityPage</div>;
}
