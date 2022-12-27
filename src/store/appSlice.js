import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	active: "",
	objectList: [],
	object: {},
	records: [],
	recordToEdit: null,
	selectedRecords: [],
	skip: 0,
	take: 5,
	total: 0,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		updateActiveApp: (state, action) => {
			state.active = action.payload;
		},
		updateObjectList: (state, action) => {
			state.objectList = action.payload;
		},
		updateObject: (state, action) => {
			state.object = action.payload;
		},
		updateRecords: (state, action) => {
			state.records = action.payload;
		},
		updateRecordToEdit: (state, action) => {
			state.recordToEdit = action.payload;
		},
		updateSelectedRecord: (state, action) => {
			state.selectedRecords = action.payload;
		},
		updateRecordSkip: (state, action) => {
			state.skip = action.payload;
		},
		updateRecordTake: (state, action) => {
			state.take = action.payload;
		},
		updateRecordTotal: (state, action) => {
			state.total = action.payload;
		},
		resetRecords: (state, action) => {
			return initialState;
		},
	},
});

export const {
	updateActiveApp,
	updateObjectList,
	updateObject,
	updateRecords,
	updateRecordToEdit,
	updateSelectedRecord,
	updateRecordSkip,
	updateRecordTake,
	updateRecordTotal,
	resetRecords,
} = appSlice.actions;
export default appSlice.reducer;
