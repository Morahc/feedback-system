import { Router } from "express";
import authRoutes from "./auth.route";
import reviewRoutes from "./review.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);
router.get("/healthcheck", (req, res) => res.send("Server Ok"));

export default router;
