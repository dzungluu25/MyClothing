import { Router } from "express";
import { getOrders, getOrderById, checkout } from "../controllers/order.controller";

const router = Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.post("/checkout", checkout);

export default router;
