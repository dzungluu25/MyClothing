import type { Request, Response } from "express";
import { listOrders, getOrder, createOrder } from "../services/order.service";

const BACKEND_URL = "http://localhost:3002";

export const getOrders = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"] as string | undefined;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const meResp = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { authorization: authHeader } });
    if (!meResp.ok) return res.status(401).json({ message: "Unauthorized" });
    const me = await meResp.json();
    const all = listOrders();
    const mine = all.filter(o => String(o.customerEmail).toLowerCase() === String(me.email).toLowerCase());
    res.json(mine);
  } catch (e: any) {
    res.status(500).json({ message: e?.message || "Error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"] as string | undefined;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const o = getOrder(String(req.params.id));
  if (!o) return res.status(404).json({ message: "Not Found" });
  try {
    const meResp = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { authorization: authHeader } });
    if (!meResp.ok) return res.status(401).json({ message: "Unauthorized" });
    const me = await meResp.json();
    if (String(o.customerEmail).toLowerCase() !== String(me.email).toLowerCase()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(o);
  } catch (e: any) {
    res.status(500).json({ message: e?.message || "Error" });
  }
};

export const checkout = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"] as string | undefined;
  const body = req.body as any;
  const items = Array.isArray(body?.items) ? body.items.map((i: any) => ({
    productId: String(i.productId),
    name: String(i.name),
    image: String(i.image || "https://placehold.co/400x400"),
    category: i.category ? String(i.category) : undefined,
    price: Number(i.price || 0),
    quantity: Number(i.quantity || 1),
  })) : [];
  if (items.length === 0) return res.status(400).json({ message: "Empty order" });

  // Attempt authenticated checkout first
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const meResp = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { authorization: authHeader } });
      if (meResp.ok) {
        const me = await meResp.json();
        const order = createOrder(String(me.fullname || me.email || "User"), String(me.email || ""), items, "Processing");
        return res.json(order);
      }
    } catch {}
  }

  // Development fallback: allow guest checkout without auth
  if (process.env.NODE_ENV !== "production") {
    const order = createOrder("Guest", "guest@local", items, "Processing");
    return res.json({ ...order, unauthenticated: true });
  }

  return res.status(401).json({ message: "Unauthorized" });
};
