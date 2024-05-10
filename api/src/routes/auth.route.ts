import { Router } from "express";
import { validate } from "../middleware";
import { login, logout, register } from "../controllers/auth.controller";
import { loginUserSchema, createUserSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(createUserSchema), register);

router.post("/login", validate(loginUserSchema), login);

router.post("/logout", logout);

export default router;
