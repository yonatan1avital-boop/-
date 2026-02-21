import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { loginUser, registerUser } from '../services/auth/auth.service';

export async function register(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const auth = await registerUser(payload);
  return res.status(201).json(auth);
}

export async function login(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const auth = await loginUser(payload);
  return res.status(200).json(auth);
}
