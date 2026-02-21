import twilio from 'twilio';
import { env } from '../../config/env';

const twilioClient = env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN
  ? twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
  : null;

export async function sendEmailNotification(email: string, subject: string, message: string) {
  return { channel: 'email', to: email, subject, message, status: 'queued' };
}

export async function sendWhatsAppNotification(to: string, message: string) {
  if (!twilioClient || !env.TWILIO_WHATSAPP_FROM) {
    return { channel: 'whatsapp', to, message, status: 'disabled' };
  }

  await twilioClient.messages.create({ from: env.TWILIO_WHATSAPP_FROM, to, body: message });
  return { channel: 'whatsapp', to, message, status: 'sent' };
}
