import { createSlice } from "@reduxjs/toolkit";

// TODO: fix structure.   
const initialState = {
	objectList: [],
	activeObject: null,
	objectSchema: [],
	fields: {
		visible: [],
		selected: [],
	},
	app: {
		active: null,
		list: [],
		associations: [],
	}
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
		updateActiveApp: (state, action) => {
			state.app.active = action.payload;
		},
		updateAppList: (state, action) => {
			state.app.list = action.payload;
		},
		updateAppAssociations: (state, action) => {
			state.app.associations = action.payload;
		},
	},
});

const settingsStore = settingsSlice.actions;

export { settingsStore };

export const {
	updateObjectList,
	updateActiveObject,
	updateObjectSchema,
	updateSelectedFields,
	updateVisibleFields,

	updateActiveApp,
	updateAppList,
	updateAppAssociations
} = settingsSlice.actions;

export default settingsSlice.reducer;
