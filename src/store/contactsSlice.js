import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    data: [],
    contactToEdit: null,
    selectedContacts: [],
    skip: 0,
    take: 5,
    total: 0
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateContacts: (state, action) => {
      state.data = action.payload;
    },
    setContactToEdit: (state, action) => {
      state.contactToEdit = action.payload;
    },
    setSelectedContacts: (state, action) => {
        state.selectedContacts = action.payload;
    },
    updateSkip: (state, action) => {
      state.skip = action.payload;
    },
    updateTake: (state, action) => {
      state.take = action.payload;
    },
    updateTotal: (state, action) => {
      state.total = action.payload;
    }
  }
}); 

export const { updateContacts, setContactToEdit, setSelectedContacts,updateSkip, updateTake, updateTotal } = contactsSlice.actions;
export default contactsSlice.reducer;