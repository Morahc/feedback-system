import { Router } from "express";
import { requireAuth, validate } from "../middleware";
import { create, getReviews } from "../controllers/review.controller";
import { createReviewSchema } from "../schemas/review.schema";

const router = Router();

router.get("/", getReviews);

router.post("/", requireAuth, validate(createReviewSchema), create);

export default router;
