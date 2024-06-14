import React from "react";
import { getPageByHandle } from "@/lib/actions/page";
import NotFound from "@/components/not-found";
import Prose from "@/components/prose";

export default async function Page({
    params,
}: {
    params: { handle: string[] };
}) {
    const handle = params.handle.join("/");
    const page = await getPageByHandle(handle);
    if (!page) {
        return <NotFound href="/" title="page" />;
    }
    return (
        <div>
            <Prose html={page.body} />
        </div>
    );
}
