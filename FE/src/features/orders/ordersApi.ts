import api from "../../services/api";
import type { Order, OrderItem } from "./types";

export const ordersApi = {
    addOrder: async(items: OrderItem[]): Promise<Order[]> =>{
        const response = await api.post("/order", items);
        return response.data.data;
    },

    deleteOrder: async(id: number): Promise<number> =>{
        const response = await api.delete(`/order/${id}`);
        return response.data.data;
    },

    getAllOrders: async(): Promise<Order[]> =>{
        const response = await api.get("/order");
        return response.data.data.data;
    },

     getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get("/order/my-orders");
    return response.data.data.data;
  },
};
