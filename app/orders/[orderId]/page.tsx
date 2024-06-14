import NotFound from "@/components/not-found";
import OrderDetails from "@/components/order-details";
import BreadcrumbOrderDetails from "@/components/order/breadcrumb-order-details";
import { getOrderById } from "@/lib/actions/order";

export default async function OrderDetailsPage({
    params,
}: {
    params: { orderId: string };
}) {
    const order = await getOrderById(params.orderId);
    if (!order) {
        return <NotFound href="/orders" title="order details" />;
    }
    return (
        <main>
            <BreadcrumbOrderDetails orderId={params.orderId} />

            <div className="my-4">
                <OrderDetails order={order} />
            </div>
        </main>
    );
}
