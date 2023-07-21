import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/Auth';

const store = configureStore({
  reducer: {
    auth: AuthReducer, // Use your Auth reducer instead of authSlice
    // Add other reducers as needed
  },
});

export default store;
