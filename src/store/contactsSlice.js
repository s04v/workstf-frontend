import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    constacts: [],
    selectedContacts: [],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      return action.payload;
    },
    setSelectedContacts: (state, action) => {
        state.selecterdContacts = action.payload;
    }
  }
}); 

export const { setContacts, setSelectedContacts } = contactsSlice.actions;
export default contactsSlice.reducer;