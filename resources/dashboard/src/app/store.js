import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import shopReducer from '../features/shops/shopSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    shops: shopReducer,
  },
});
