import { ProductFilterOptions, ProductSortOptions } from "@/lib/definitions";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProductSlice {
    filterOptions: ProductFilterOptions;
    sortOptions: ProductSortOptions;
    isShowFilter: boolean;
}
const initialState: IProductSlice = {
    filterOptions: {},
    sortOptions: { type: "name", direction: "asc" },
    isShowFilter: true,
};
const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setIsShowFilter: (state, action: PayloadAction<boolean>) => {
            state.isShowFilter = action.payload;
        },
        setFilterOptions: (
            state,
            action: PayloadAction<ProductFilterOptions>
        ) => {
            state.filterOptions = action.payload;
        },
        setSortOptions: (state, action: PayloadAction<ProductSortOptions>) => {
            state.sortOptions = action.payload;
        },
    },
});
export const { setIsShowFilter, setFilterOptions, setSortOptions } =
    productSlice.actions;
export default productSlice.reducer;
