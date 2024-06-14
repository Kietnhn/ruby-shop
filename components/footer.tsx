import React, { Suspense } from "react";
import { getPageHandles } from "@/lib/actions/page";
import FooterMenu from "./footer-menu";
import Logo from "./logo";
import { Button, Link } from "@nextui-org/react";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./icons";
export default async function Footer() {
    const pages = await getPageHandles();
    const skeleton =
        "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";

    return (
        <footer className="text-sm text-neutral-500 dark:text-neutral-400 bg-content1">
            <div className="mx-auto flex w-full  flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row  md:px-4 min-[1320px]:px-6">
                <div className="w-1/5">
                    <Link href="#" className="text-black  dark:text-white">
                        <div>
                            <Logo />
                        </div>
                        <p className="font-bold text-inherit ml-2">Ruby</p>
                    </Link>
                </div>
                <div className="w-1/5">
                    <Suspense
                        fallback={
                            <div className="flex h-[188px] w-[200px] flex-col gap-2">
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                            </div>
                        }
                    >
                        <FooterMenu menu={pages} />
                    </Suspense>
                </div>
                <div className="w-1/5">
                    <Suspense
                        fallback={
                            <div className="flex h-[188px] w-[200px] flex-col gap-2">
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                            </div>
                        }
                    >
                        <FooterMenu menu={pages} />
                    </Suspense>
                </div>
                <div className="w-1/5">
                    <Suspense
                        fallback={
                            <div className="flex h-[188px] w-[200px] flex-col gap-2">
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                                <div className={skeleton} />
                            </div>
                        }
                    >
                        <FooterMenu menu={pages} />
                    </Suspense>
                </div>
                <div className="w-1/5">
                    <div className="w-full flex gap-2">
                        <Button isIconOnly>
                            <TwitterIcon />
                        </Button>
                        <Button isIconOnly>
                            <FacebookIcon />
                        </Button>
                        <Button isIconOnly>
                            <YoutubeIcon />
                        </Button>
                        <Button isIconOnly>
                            <InstagramIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
                <div className="mx-auto flex w-full flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-6">
                    {/* <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p> */}
                    <p>Designed in California</p>
                    <p className="md:ml-auto">
                        <a
                            href="https://vercel.com"
                            className="text-black dark:text-white"
                        >
                            Crafted by ▲ Vercel
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
