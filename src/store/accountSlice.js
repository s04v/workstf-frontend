import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: 0,
	firstName: "",
	lastName: "",
	email: "",
	appList: [],
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		updateAccount: (state, action) => {
			return {...action.payload, appList: state.appList};
		},
		updateAccountAppList: (state, action) => {
			state.appList = action.payload;
		},
	},
});

export const { updateAccount, updateAccountAppList } = accountSlice.actions;
export default accountSlice.reducer;
