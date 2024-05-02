import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

router.use("/auth", authRoutes);
router.get("/healthcheck", (req, res) => res.send("Server Ok"));

export default router;
