import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISearchSlice {
    searchValue: string;
}
const initialState: ISearchSlice = {
    searchValue: "",
};
const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});
export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
