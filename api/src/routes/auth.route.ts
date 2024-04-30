import { Router } from 'express';
import { validate } from '../middleware';
import { login, logout, register } from '../controllers/stateless.controller';
import { loginUserSchema, createUserSchema } from '../schemas/auth.schema';
import passport from '../config/passport';

const router = Router();

router.post('/register', validate(createUserSchema), register);

router.post(
  '/login',
  validate(loginUserSchema),
  passport.authenticate('local', { failureRedirect: '/login' }),
  login
);

router.post('/logout', logout);

export default router;
