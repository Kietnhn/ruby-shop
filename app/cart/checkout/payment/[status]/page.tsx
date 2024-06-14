import CheckoutStatus from "@/components/checkout/checkout-status";

export default async function PaymentStatusPage({
    params,
}: {
    params: { status: "success" | "failure" };
}) {
    return (
        <main className="max-w-[1200px] mx-auto h-screen overflow-hidden ">
            <div className="p-12 flex-center h-full">
                <CheckoutStatus status={params.status} />
            </div>
        </main>
    );
}
