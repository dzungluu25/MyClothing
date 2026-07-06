import { Router } from "express";
import { getTransactions, exportTransactions } from "../controllers/transaction.controller";

const router = Router();

router.get("/", getTransactions);
router.get("/export", exportTransactions);

export default router;
