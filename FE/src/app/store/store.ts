import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import bookReducer from '../../features/books/booksSlice';
import orderReducer from '../../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
