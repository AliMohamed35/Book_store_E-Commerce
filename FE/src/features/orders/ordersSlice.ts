import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "./ordersApi";
import { type OrderItem, type OrderState } from "./types";

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (items: OrderItem[], { rejectWithValue }) => {
    try {
      const response = await ordersApi.addOrder(items);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order",
      );
    }
  },
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersApi.getAllOrders();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order",
      );
    }
  },
);

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersApi.getMyOrders();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get your orders",
      );
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: number, { rejectWithValue }) => {
    try {
      await ordersApi.deleteOrder(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order",
      );
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        ((state.isLoading = true), (state.error = null));
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.error = null),
          (state.orders = [...state.orders, ...action.payload]));
      })
      .addCase(addOrder.rejected, (state, action) => {
        ((state.isLoading = false), (state.error = action.payload as string));
      })
      .addCase(getAllOrders.pending, (state) => {
        ((state.isLoading = true), (state.error = null));
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (((state.isLoading = false), (state.error = null)),
          (state.orders = action.payload));
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        ((state.isLoading = false), (state.error = action.payload as string));
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
