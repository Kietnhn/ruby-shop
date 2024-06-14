import { getRootCategories } from "@/lib/actions/category";
import { genderRoutes } from "@/lib/constants";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import { BackpackIcon, FootprintsIcon, ShirtIcon } from "lucide-react";

export default async function SectionEssentials({
    genderKey,
}: {
    genderKey: keyof typeof genderRoutes;
}) {
    const categories = await getRootCategories();
    if (!categories) return <></>;
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="mb-2 text-2xl font-semibold capitalize">
                    Shop by Essentials
                </h3>
            </div>
            <div className="grid gap-3 grid-cols-3">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        isPressable
                        as={Link}
                        shadow="sm"
                        className="m-1 "
                        href={`/shop/${genderKey}/${category.id}`}
                    >
                        <CardBody className="flex gap-4 flex-col">
                            <div className="flex-center">
                                {category.name.toLowerCase() === "clothing" ? (
                                    <div>
                                        <ShirtIcon
                                            className="w-36 h-36 "
                                            strokeWidth={1}
                                        />
                                    </div>
                                ) : category.name.toLowerCase() === "shoes" ? (
                                    <div>
                                        <FootprintsIcon
                                            className="w-36 h-36"
                                            strokeWidth={1}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <BackpackIcon
                                            className="w-36 h-36"
                                            strokeWidth={1}
                                        />
                                    </div>
                                )}
                            </div>
                            <strong className="text-start line-clamp-1">
                                {category.name}
                            </strong>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    );
}
