import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountSlice';
import contactsSlice from './contactsSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    contact: contactsSlice,
  },
});