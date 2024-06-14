import { auth } from "@/app/auth";
import FavouriteProducts from "@/components/products/favourite-products";
import { getFavouriteProducts, getUserByEmail } from "@/lib/actions";
import { UserIcon } from "@heroicons/react/24/outline";
import { Avatar, Button } from "@nextui-org/react";

export default async function ProfilePage() {
    const authData = await auth();
    console.log(authData);

    const isAuthenticated = !!authData?.user;
    const user = await getUserByEmail(authData?.user?.email || "undefined");
    const favouriteProducts = await getFavouriteProducts(
        authData?.user?.email as string
    );
    return (
        <main className="flex flex-col gap-4">
            <div className="flex justify-start items-center gap-4">
                <Avatar
                    as="button"
                    fallback={<UserIcon className="w-8 h-8" />}
                    className="transition-transform"
                    name={user.email as string}
                    src={user.image as string}
                    size="lg"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{user.email}</h2>
                    {/* <p>{user.email}</p> */}
                    <p className="text-medium text-default-500 font-semibold">
                        Member at
                    </p>
                </div>
            </div>
            <div className="">
                <div className="flex justify-between items-center">
                    <h2 className="text-foreground text-xl font-semibold">
                        Interests
                    </h2>
                    <Button variant="bordered">Edit</Button>
                </div>
                <div className="h-80">
                    Add your interests to shop a collection of products that are
                    based on what you're into.
                    <p>Comming soon...</p>
                </div>
            </div>
            <FavouriteProducts products={favouriteProducts} />
        </main>
    );
}
