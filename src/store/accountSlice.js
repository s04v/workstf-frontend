import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccount: (state, action) => {
      console.log('updateProfile', action);
      return action.payload;
    }
  }
}); 

export const { updateAccount } = accountSlice.actions;
export default accountSlice.reducer;