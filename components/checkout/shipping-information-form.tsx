"use client";
import React, { Key, useEffect, useState } from "react";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Link,
    Textarea,
} from "@nextui-org/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
    IShippingInformation,
    ShippingInformationForm as ShippingInformationFormType,
    // State as StateType,
    UserNoPassword,
} from "@/lib/definitions";
import { City, Country, State } from "country-state-city";
import { shipingInformationShema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { CHECKOUT_SHIPPING_ROUTE } from "@/lib/constants";
import { useAppDispatch } from "@/lib/store";
import { setShippingInformation } from "@/features/cart-checkout-slice";
const ShippingInformationForm = ({ user }: { user: UserNoPassword }) => {
    // const { name } = useAppSelector((store) => store.cartCheckout);
    const dispatch = useAppDispatch();
    console.log({ shppingAddress: user.shippingAddress });

    const [shippingInformationForm, setShippingInformationForm] =
        useState<ShippingInformationFormType>({
            shippingAddressId: user.shippingAddress?.id || null,
            addressLine: user.shippingAddress?.addressLine || null,
            city: user.shippingAddress?.city || null,
            country: user.shippingAddress?.country || null,
            state: user.shippingAddress?.state || null,
            postalCode: user.shippingAddress?.postalCode || null,
            countryCode: null,
            stateCode: null,
            firstName: user.firstName || null,
            lastname: user.lastName || null,
            phoneNumber: user.phoneNumber || null,
            email: user.email,
        });
    const [errors, setErrors] = useState<{
        phoneNumber?: string[] | undefined;
        addressLine?: string[] | undefined;
        city?: string[] | undefined;
        country?: string[] | undefined;
        state?: string[] | undefined;
        postalCode?: string[] | undefined;
        firstName?: string[] | undefined;
        lastName?: string[] | undefined;
    }>({});
    const router = useRouter();
    // const [shoppingForm,setShoppingForm] =
    const handleSelectCountry = (key: Key) => {
        const country = Country.getAllCountries().find(
            (country) => country.name === key
        );
        if (!country) return;
        setShippingInformationForm({
            ...shippingInformationForm,
            country: country.name,
            countryCode: country.isoCode,
        });
    };
    const handleSelectState = (key: Key) => {
        if (!shippingInformationForm.countryCode) return;
        const state = State.getStatesOfCountry(
            shippingInformationForm.countryCode
        ).find((state) => state.name === key);
        if (!state) return;
        setShippingInformationForm({
            ...shippingInformationForm,
            state: state.name,
            stateCode: state.isoCode,
        });
    };
    const handleSelectCity = (key: Key) => {
        setShippingInformationForm({
            ...shippingInformationForm,
            city: key as string,
        });
    };
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof shippingInformationForm;
        const value = event.target.value;
        setShippingInformationForm({
            ...shippingInformationForm,
            [name]: value,
        });
    };
    const handleSubmitInformations = () => {
        console.log(shippingInformationForm);
        const data = shipingInformationShema.safeParse(shippingInformationForm);

        if (data.success) {
            console.log("Form submitted successfully:", data.data);
            const informationData = data.data as IShippingInformation;
            dispatch(setShippingInformation(informationData));
            router.push(`/cart/checkout/${CHECKOUT_SHIPPING_ROUTE}`);
            // Perform form submission logic here
        } else {
            console.error("Form validation failed:", data.error);
            setErrors(data.error.flatten().fieldErrors);
        }
    };
    return (
        <div>
            <div className="w-full mb-4">
                <h4 className="font-semibold text-xl mb-2 text-foreground">
                    Contact
                </h4>

                <div className="w-full mb-4">
                    <Input
                        variant="bordered"
                        label="Email address"
                        value={user.email as string}
                        readOnly
                    />
                </div>
                <div className="w-full ">
                    <Input
                        variant="bordered"
                        label="Phone number"
                        value={shippingInformationForm.phoneNumber || ""}
                        name="phoneNumber"
                        onChange={handleChangeValue}
                        isInvalid={!!errors?.phoneNumber}
                        description="A carrier might contact you to confirm delivery."
                        isReadOnly={!!user.phoneNumber}
                    />
                    {errors?.phoneNumber &&
                        errors?.phoneNumber.map((error: string) => (
                            <p
                                className="mt-2 text-sm text-red-500"
                                key={error}
                            >
                                {error}
                            </p>
                        ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-xl mb-2 text-foreground">
                    Shipping address
                </h4>
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4 flex-nowrap">
                        <div className="w-1/2">
                            <Input
                                variant="bordered"
                                label="First name"
                                name="firstName"
                                isInvalid={!!errors?.firstName}
                                onChange={handleChangeValue}
                                value={shippingInformationForm.firstName || ""}
                                // defaultValue={user.}
                                isReadOnly={!!user.firstName}
                            />
                            {errors?.firstName &&
                                errors?.firstName.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                        <div className="w-1/2">
                            <Input
                                variant="bordered"
                                label="Last name (optional)"
                                name="lastname"
                                onChange={handleChangeValue}
                                value={shippingInformationForm.lastname || ""}
                                isReadOnly={!!user.firstName} //if already has  firstname that mean user have information already->need to change in profile page
                            />
                            {errors?.lastName &&
                                errors?.lastName.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    {/* country */}
                    {!!user.shippingAddress ? (
                        <div>
                            <Input
                                variant="bordered"
                                label="Country/Region"
                                defaultValue={
                                    shippingInformationForm.country as string
                                }
                                readOnly
                            />
                        </div>
                    ) : (
                        <div className="">
                            <Autocomplete
                                defaultItems={Country.getAllCountries()}
                                name="country"
                                label="Country/Region"
                                variant="bordered"
                                isInvalid={!!errors?.country}
                                selectedKey={shippingInformationForm.country}
                                onSelectionChange={handleSelectCountry}
                                // defaultSelectedKey={user.shippingAddress}
                            >
                                {(country) => (
                                    <AutocompleteItem
                                        key={country.name}
                                        textValue={country.name}
                                        value={country.name}
                                    >
                                        <div className="flex gap-2 items-center">
                                            <div className="flex gap-2 items-center">
                                                <span className="text-small">
                                                    {country.name}
                                                </span>
                                                <span className="text-tiny text-default-400">
                                                    {country.isoCode}
                                                </span>
                                            </div>
                                        </div>
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                            {errors?.country &&
                                errors?.country.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    )}

                    <div className="flex items-start gap-4 flex-nowrap">
                        <div className="w-1/3">
                            {!!user.shippingAddress ? (
                                <div>
                                    <Input
                                        variant="bordered"
                                        label="State"
                                        defaultValue={
                                            shippingInformationForm.state as string
                                        }
                                        readOnly
                                    />
                                </div>
                            ) : (
                                <div className="w-full">
                                    <Autocomplete
                                        defaultItems={State.getStatesOfCountry(
                                            shippingInformationForm.countryCode as string
                                        )}
                                        name="state"
                                        label="State"
                                        variant="bordered"
                                        isInvalid={!!errors?.state}
                                        isDisabled={
                                            !shippingInformationForm.countryCode
                                        }
                                        selectedKey={
                                            shippingInformationForm.state
                                        }
                                        onSelectionChange={handleSelectState}
                                    >
                                        {(state) => (
                                            <AutocompleteItem
                                                key={state.name}
                                                textValue={state.name}
                                                value={state.name}
                                            >
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex gap-2 items-center">
                                                        <span className="text-small">
                                                            {state.name}
                                                        </span>
                                                        <span className="text-tiny text-default-400">
                                                            {state.isoCode}
                                                        </span>
                                                    </div>
                                                </div>
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                    {errors?.state &&
                                        errors?.state.map((error: string) => (
                                            <p
                                                className="mt-2 text-sm text-red-500"
                                                key={error}
                                            >
                                                {error}
                                            </p>
                                        ))}
                                </div>
                            )}
                        </div>
                        <div className="w-1/3">
                            {/* <Input variant="bordered" label="City" /> */}
                            {!!user.shippingAddress ? (
                                <div>
                                    <Input
                                        variant="bordered"
                                        label="City"
                                        defaultValue={
                                            shippingInformationForm.city as string
                                        }
                                        readOnly
                                    />
                                </div>
                            ) : (
                                <div className="w-full">
                                    <Autocomplete
                                        defaultItems={City.getCitiesOfState(
                                            shippingInformationForm.countryCode as string,
                                            shippingInformationForm.stateCode as string
                                        )}
                                        name="city"
                                        isInvalid={!!errors?.city}
                                        label="City"
                                        variant="bordered"
                                        isDisabled={
                                            !shippingInformationForm.stateCode
                                        }
                                        selectedKey={
                                            shippingInformationForm.city
                                        }
                                        onSelectionChange={handleSelectCity}
                                    >
                                        {(city) => (
                                            <AutocompleteItem
                                                key={city.name}
                                                value={city.name}
                                            >
                                                {city.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                    {errors?.city &&
                                        errors?.city.map((error: string) => (
                                            <p
                                                className="mt-2 text-sm text-red-500"
                                                key={error}
                                            >
                                                {error}
                                            </p>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="w-1/3">
                            {!!user.shippingAddress ? (
                                <div>
                                    <Input
                                        variant="bordered"
                                        label="Postal code"
                                        defaultValue={
                                            shippingInformationForm.postalCode as string
                                        }
                                        readOnly
                                    />
                                </div>
                            ) : (
                                <div className="w-full">
                                    <Input
                                        variant="bordered"
                                        label="Postal code"
                                        name="postalCode"
                                        isInvalid={!!errors?.postalCode}
                                        onChange={handleChangeValue}
                                        value={
                                            shippingInformationForm.postalCode ||
                                            ""
                                        }
                                    />
                                    {errors?.postalCode &&
                                        errors?.postalCode.map(
                                            (error: string) => (
                                                <p
                                                    className="mt-2 text-sm text-red-500"
                                                    key={error}
                                                >
                                                    {error}
                                                </p>
                                            )
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <Textarea
                            minRows={2}
                            variant="bordered"
                            label="Address"
                            name="addressLine"
                            onChange={handleChangeValue}
                            isInvalid={!!errors?.addressLine}
                            value={shippingInformationForm.addressLine || ""}
                            isReadOnly={!!user.shippingAddress}
                        />
                        {errors?.addressLine &&
                            errors?.addressLine.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {error}
                                </p>
                            ))}
                    </div>
                    {shippingInformationForm.shippingAddressId && (
                        <div className="">
                            <Link href="#" className="hover:underline">
                                Change shipping information here
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link href="/cart" className="hover:opacity-70 text-primary">
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Return to cart
                </Link>
                <Button
                    color="primary"
                    className="rounded-md"
                    size="lg"
                    onClick={handleSubmitInformations}
                >
                    Continue to shipping
                </Button>
            </div>
        </div>
    );
};

export default ShippingInformationForm;
