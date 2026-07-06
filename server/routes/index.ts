import { Router, type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import transactionRoutes from "./transaction.routes";
import orderRoutes from "./order.routes";

const BACKEND_URL = "http://localhost:3002";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = Router();
  
  router.use("/transactions", transactionRoutes);
  router.use("/", orderRoutes);

  app.use("/api", router);

  // Catch-all route proxy
  app.all("/api/*", async (req: Request, res: Response) => {
    try {
      const target = `${BACKEND_URL}${req.originalUrl}`;
      const headers: Record<string, string> = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === "string") headers[key] = value;
      }
      delete headers.host;

      const init: any = {
        method: req.method,
        headers,
      };
      if (req.rawBody) {
        init.body = req.rawBody as Buffer;
        init.duplex = "half";
      }

      const resp = await fetch(target, init);
      const contentType = resp.headers.get("content-type") || "application/json";
      res.status(resp.status);
      res.setHeader("content-type", contentType);
      const bodyBuffer = Buffer.from(await resp.arrayBuffer());
      res.send(bodyBuffer);
    } catch (e: any) {
      res.status(502).json({ message: e?.message || "Bad Gateway" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
