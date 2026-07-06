import type { Request, Response } from "express";
import { queryTransactions, toCSV } from "../services/transaction.service";

export const getTransactions = (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(String(req.query.page), 10) : undefined;
  const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : undefined;
  const from = req.query.from ? String(req.query.from) : undefined;
  const to = req.query.to ? String(req.query.to) : undefined;
  const q = req.query.q ? String(req.query.q) : undefined;
  const result = queryTransactions({ page, limit, from, to, q });
  res.json(result);
};

export const exportTransactions = (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(String(req.query.page), 10) : undefined;
  const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : undefined;
  const from = req.query.from ? String(req.query.from) : undefined;
  const to = req.query.to ? String(req.query.to) : undefined;
  const q = req.query.q ? String(req.query.q) : undefined;
  const result = queryTransactions({ page, limit, from, to, q });
  const csv = toCSV(result.items);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
  res.send(csv);
};
