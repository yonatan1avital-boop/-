import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/user.model';
import { env } from '../../config/env';
import { ApiError } from '../../utils/api-error';

export async function registerUser(input: { name: string; email: string; password: string }) {
  const existing = await UserModel.findOne({ email: input.email.toLowerCase() });
  if (existing) throw new ApiError(409, 'Email already exists');

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await UserModel.create({
    email: input.email.toLowerCase(),
    name: input.name,
    passwordHash
  });

  return buildAuthResponse(user.id, user.email, user.name, user.role);
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new ApiError(401, 'Invalid credentials');

  return buildAuthResponse(user.id, user.email, user.name, user.role);
}

function buildAuthResponse(id: string, email: string, name: string, role: 'USER' | 'ADMIN') {
  const accessToken = jwt.sign({ sub: id, email, role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
  const refreshToken = jwt.sign({ sub: id, email, role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN
  });

  return {
    accessToken,
    refreshToken,
    user: { id, email, name, role }
  };
}
