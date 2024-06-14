"use client";

import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Textarea,
} from "@nextui-org/react";
import { Address } from "@prisma/client";
import { City, Country, State } from "country-state-city";
import { Key, useEffect, useMemo, useState } from "react";
interface IAddressState {
    countryCode: string;
    stateCode: string;
    cityName: string;
    postalCode: string;
    addressLine: string;
}
import _ from "lodash";
import { useFormState, useFormStatus } from "react-dom";
import { editShippingAddress } from "@/lib/actions/user";
export default function EditAddressForm({
    initialState,
}: {
    initialState: Address | null;
}) {
    const initialValue: IAddressState | null = useMemo(() => {
        if (!initialState) return null;
        const country = Country.getAllCountries().find(
            (country) => country.name === initialState.country
        );
        const state = State.getStatesOfCountry(country?.isoCode).find(
            (state) => state.name === initialState.state
        );
        const city = City.getCitiesOfState(
            country?.isoCode as string,
            state?.isoCode as string
        ).find((city) => city.name === initialState.city);
        return {
            countryCode: country?.isoCode || "",
            stateCode: state?.isoCode || "",
            cityName: city?.name || " ",
            postalCode: initialState.postalCode,
            addressLine: initialState.addressLine,
        };
    }, []);
    const [addressState, setAddressState] = useState<IAddressState>(
        initialValue || {
            countryCode: "",
            stateCode: "",
            cityName: "",
            postalCode: "",
            addressLine: "",
        }
    );

    const handleSelectCountry = (key: Key) => {
        const country = Country.getAllCountries().find(
            (country) => country.isoCode === key
        );

        if (!country) return;
        setAddressState({
            ...addressState,
            countryCode: country.isoCode,
            stateCode: "",
            cityName: "",
            postalCode: "",
            addressLine: "",
        });
    };
    const handleSelectState = (key: Key) => {
        if (!addressState.countryCode) return;
        const state = State.getStatesOfCountry(addressState.countryCode).find(
            (state) => state.isoCode === key
        );
        if (!state) return;
        setAddressState({
            ...addressState,
            stateCode: state.isoCode,
            cityName: "",
            postalCode: "",
            addressLine: "",
        });
    };
    const handleSelectCity = (key: Key) => {
        if (!key) return;
        setAddressState({
            ...addressState,
            cityName: key as string,
            addressLine: "",
            postalCode: "",
        });
    };
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof addressState;
        const value = event.target.value;
        setAddressState({
            ...addressState,
            [name]: value,
        });
    };
    // submit
    const editShippingAddressWithId = editShippingAddress.bind(
        null,
        initialState?.id || ""
    );
    const [state, dispatch] = useFormState(editShippingAddressWithId, {
        errors: {},
        message: "",
    });

    return (
        <form className="flex flex-col gap-4" action={dispatch}>
            <div className="">
                <Autocomplete
                    defaultItems={Country.getAllCountries()}
                    name="country"
                    label="Country"
                    labelPlacement="outside"
                    placeholder="Select a country"
                    variant="bordered"
                    isInvalid={!!state?.errors.country}
                    defaultSelectedKey={addressState.countryCode}
                    onSelectionChange={handleSelectCountry}
                >
                    {(country) => (
                        <AutocompleteItem
                            key={country.isoCode}
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
                {state?.errors.country &&
                    state?.errors.country.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="">
                <Autocomplete
                    defaultItems={State.getStatesOfCountry(
                        addressState.countryCode
                    )}
                    name="state"
                    label="State"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Select a State"
                    isInvalid={!!state?.errors.state}
                    isDisabled={!addressState.countryCode}
                    defaultSelectedKey={addressState.stateCode}
                    onSelectionChange={handleSelectState}
                >
                    {(state) => (
                        <AutocompleteItem
                            key={state.isoCode}
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
                {state?.errors.state &&
                    state?.errors.state.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="">
                <Autocomplete
                    defaultItems={City.getCitiesOfState(
                        addressState.countryCode,
                        addressState.stateCode
                    )}
                    name="city"
                    label="City"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Select a city"
                    isDisabled={!addressState.stateCode}
                    isInvalid={!!state?.errors.city}
                    onSelectionChange={handleSelectCity}
                    defaultSelectedKey={addressState.cityName}
                >
                    {(city) => (
                        <AutocompleteItem
                            key={city.name}
                            textValue={city.name}
                            value={city.name}
                        >
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-2 items-center">
                                    <span className="text-small">
                                        {city.name}
                                    </span>
                                </div>
                            </div>
                        </AutocompleteItem>
                    )}
                </Autocomplete>
                {state?.errors.city &&
                    state?.errors.city.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="">
                <Textarea
                    minRows={2}
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Type address line"
                    label="Address"
                    name="addressLine"
                    onChange={handleChangeValue}
                    defaultValue={addressState.addressLine || ""}
                    isInvalid={!!state?.errors.addressLine}
                />
                {state?.errors.addressLine &&
                    state?.errors.addressLine.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="">
                <Input
                    variant="bordered"
                    label="Postal Code"
                    name="postalCode"
                    labelPlacement="outside"
                    placeholder="Type postal code"
                    defaultValue={addressState.postalCode || ""}
                    onChange={handleChangeValue}
                    isInvalid={!!state?.errors.postalCode}
                />
                {state?.errors.postalCode &&
                    state?.errors.postalCode.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            {state?.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
            <EditButton isDisabled={_.isEqual(initialValue, addressState)} />
        </form>
    );
}
function EditButton({ isDisabled }: { isDisabled: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button
            color="primary"
            type="submit"
            isDisabled={isDisabled || pending}
        >
            Edit
        </Button>
    );
}
