import { Router } from "express";
import { orderController } from "./order.controller.ts";
import { auth } from "../../middlewares/auth/auth.middleware.ts";

export const router = Router();

router.post("/", auth, orderController.placeOrder);
router.get("/my-orders", auth, orderController.getMyOrders);
router.get("/", auth, orderController.getAllOrders);
router.delete("/:id", auth, orderController.deleteOrder);

export default router;