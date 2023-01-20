import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	objectList: [],
	activeObject: null,
	objectSchema: [],
	fields: {
		visible: [],
		selected: [],
	},
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		updateObjectList: (state, action) => {
			state.objectList = action.payload;
		},
		updateActiveObject: (state, action) => {
			state.activeObject = action.payload;
		},
		updateObjectSchema: (state, action) => {
			state.objectSchema = action.payload;
		},
		updateSelectedFields: (state, action) => {
			state.fields.selected = action.payload;
		},
		updateVisibleFields: (state, action) => {
			state.fields.visible = action.payload;
		},
	},
});

export const {
	updateObjectList,
	updateActiveObject,
	updateObjectSchema,
	updateSelectedFields,
	updateVisibleFields,
} = settingsSlice.actions;
export default settingsSlice.reducer;
