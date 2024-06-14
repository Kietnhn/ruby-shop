import { DataTable } from "@/components/data-table";
import { getOrders } from "@/lib/actions/order";
import { columns } from "./columns";
import NotFound from "@/components/not-found";

export default async function OrdersPage() {
    const orders = await getOrders();
    if (!orders) {
        return <NotFound href="/shop" title="orders" />;
    }
    if (orders.length === 0) {
        return (
            <main>
                <p>You don't have any orders yet</p>
            </main>
        );
    }
    return (
        <main>
            <h3 className="text-2xl font-semibold">Orders placed</h3>
            <div className="py-4">
                <DataTable data={orders} columns={columns} setData={null} />
            </div>
        </main>
    );
}
