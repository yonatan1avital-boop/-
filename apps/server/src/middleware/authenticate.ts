import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type AuthPayload = {
  sub: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

export type AuthenticatedRequest = Request & {
  user?: AuthPayload;
};

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;
  req.user = payload;
  return next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return next();
}
