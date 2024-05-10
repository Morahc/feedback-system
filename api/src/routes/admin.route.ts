import { Router } from "express";
import { validate } from "../middleware";
import { login } from "../controllers/auth.controller";
import { loginUserSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", validate(loginUserSchema), login);

export default router;
