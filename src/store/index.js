import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import contactsSlice from "./contactsSlice";
import settingsSlice from "./settingsSlice";
import appSlice from "./appSlice";

export const store = configureStore({
	reducer: {
		account: accountReducer,
		contacts: contactsSlice,
		settings: settingsSlice,
		app: appSlice,
	},
});
