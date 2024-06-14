"use client";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { City, Country, State } from "country-state-city";
import { Key, useState } from "react";

export default function AccountDetailsForm({ user }: { user: User }) {
    const [addressState, setAddressState] = useState<{
        countryCode: string;
        stateCode: string;
    }>({
        countryCode: "",
        stateCode: "",
    });
    const handleSelectCountry = (key: Key) => {
        const country = Country.getAllCountries().find(
            (country) => country.name === key
        );
        if (!country) return;
        setAddressState({
            ...addressState,
            countryCode: country.isoCode,
        });
    };
    const handleSelectState = (key: Key) => {
        if (!addressState.countryCode) return;
        const state = State.getStatesOfCountry(addressState.countryCode).find(
            (state) => state.name === key
        );
        if (!state) return;
        setAddressState({
            ...addressState,
            stateCode: state.isoCode,
        });
    };
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Account details</h2>
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-nowrap gap-2">
                    <Input
                        className="w-1/2"
                        variant="bordered"
                        label="First Name"
                        labelPlacement="outside"
                        defaultValue={user.firstName || ""}
                        placeholder="Type your first name"
                    />
                    <Input
                        className="w-1/2"
                        variant="bordered"
                        label="Last Name"
                        labelPlacement="outside"
                        defaultValue={user.lastName || ""}
                        placeholder="Type your last name"
                    />
                </div>
                <Input
                    variant="bordered"
                    label="Email"
                    labelPlacement="outside"
                    defaultValue={user.email || ""}
                    placeholder="Type email address"
                />
                <Input
                    variant="bordered"
                    label="Password"
                    labelPlacement="outside"
                    type="password"
                    placeholder="Type password"
                    defaultValue={user.password || ""}
                />
                <Input
                    variant="bordered"
                    label="Phone Number"
                    labelPlacement="outside"
                    placeholder="Type phone number"
                    defaultValue={user.phoneNumber || ""}
                />
                <Input
                    label="Date of birth"
                    isDisabled
                    variant="bordered"
                    labelPlacement="outside"
                    endContent={<CalendarDaysIcon className="w-5 h-5" />}
                    placeholder="mm/dd/yyyy"
                />
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Address</h3>
                <div className="">
                    <Autocomplete
                        defaultItems={Country.getAllCountries()}
                        name="country"
                        label="Country"
                        labelPlacement="outside"
                        placeholder="Select a country"
                        variant="bordered"
                        // isInvalid={!!errors?.country}
                        selectedKey={addressState.countryCode}
                        onSelectionChange={handleSelectCountry}
                        // defaultSelectedKey={user.shippingAddress}
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
                    {/* {errors?.country &&
                                errors?.country.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))} */}
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
                        // isInvalid={!!errors?.country}
                        isDisabled={!addressState.countryCode}
                        selectedKey={addressState.countryCode}
                        onSelectionChange={handleSelectState}
                        // defaultSelectedKey={user.shippingAddress}
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
                    {/* {errors?.country &&
                                errors?.country.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))} */}
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

                        // isInvalid={!!errors?.country}
                        // selectedKey={addressState.countryCode}
                        // onSelectionChange={handleSelectCountry}
                        // defaultSelectedKey={user.shippingAddress}
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
                    {/* {errors?.country &&
                                errors?.country.map((error: string) => (
                                    <p
                                        className="mt-2 text-sm text-red-500"
                                        key={error}
                                    >
                                        {error}
                                    </p>
                                ))} */}
                </div>
                <Input
                    variant="bordered"
                    label="Postal Code"
                    name="postalCode"
                    labelPlacement="outside"
                    placeholder="Type postal code"
                    // defaultValue={user. || ""}
                />
            </div>
            <div className="flex justify-between items-center">
                <p>Delete account</p>
                <Button type="button" color="danger" variant="bordered">
                    Delete
                </Button>
            </div>
            <div className="flex justify-end items-center">
                <Button type="submit" color="primary">
                    Save
                </Button>
            </div>
        </div>
    );
}
