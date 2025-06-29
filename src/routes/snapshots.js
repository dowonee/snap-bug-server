import { Router } from "express";
import {
  getAllSnapshots,
  getSnapshotById,
  postSnapshot,
} from "../controllers/snapshotController.js";

const router = Router();

router.get("/", getAllSnapshots);
router.get("/:id", getSnapshotById);
router.post("/", postSnapshot);

export default router;
