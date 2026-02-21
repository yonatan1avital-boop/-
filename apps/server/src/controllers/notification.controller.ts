import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { sendEmailNotification, sendWhatsAppNotification } from '../services/notifications/notification.service';

export async function notify(req: AuthenticatedRequest, res: Response) {
  const { email, whatsapp, message } = z.object({
    email: z.string().email().optional(),
    whatsapp: z.string().optional(),
    message: z.string().min(1)
  }).parse(req.body);

  const output = [];
  if (email) output.push(await sendEmailNotification(email, 'LaVision Reminder', message));
  if (whatsapp) output.push(await sendWhatsAppNotification(whatsapp, message));
  return res.status(200).json(output);
}
