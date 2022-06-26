import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import shopReducer from '../features/shops/shopSlice';
import authReducer from '../features/auth/authSlice';
import addressReducer from '../features/addresses/addressSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    shops: shopReducer,
    auth: authReducer,
    addresses: addressReducer,
  },
});
