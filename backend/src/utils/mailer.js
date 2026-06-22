import nodemailer from 'nodemailer';
import env, { featureFlags } from '../config/env.js';
import logger from './logger.js';

let transporter = null;
if (featureFlags.email) {
  transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });
}

/**
 * Send an email. In dev (no SMTP configured) the message is logged to the
 * console so flows like verification / password reset remain testable.
 */
export async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    logger.info({ to, subject, text: text || stripHtml(html) }, '[mail:dev] (no SMTP configured) email logged');
    return { mocked: true };
  }
  const info = await transporter.sendMail({ from: env.mailFrom, to, subject, html, text: text || stripHtml(html) });
  logger.info({ to, subject, messageId: info.messageId }, '[mail] sent');
  return info;
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const brandWrap = (title, body, cta) => `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#15241d">
    <div style="font-weight:800;font-size:20px;color:#0F5C46;margin-bottom:16px">Sacred Knowledge</div>
    <h1 style="font-size:22px;margin:0 0 12px">${title}</h1>
    <p style="font-size:15px;line-height:1.6;color:#3D4A43">${body}</p>
    ${cta ? `<a href="${cta.url}" style="display:inline-block;margin-top:18px;background:#0F5C46;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:11px">${cta.label}</a>` : ''}
    <p style="font-size:12.5px;color:#8A938C;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
  </div>`;

export const templates = {
  verify: (url) => ({
    subject: 'Verify your Sacred Knowledge email',
    html: brandWrap('Confirm your email', 'Welcome! Please confirm your email address to activate your account.', { label: 'Verify email', url }),
  }),
  reset: (url) => ({
    subject: 'Reset your Sacred Knowledge password',
    html: brandWrap('Reset your password', 'We received a request to reset your password. This link expires in 1 hour.', { label: 'Reset password', url }),
  }),
  bookingConfirmed: (teacher, when) => ({
    subject: 'Your trial lesson is confirmed',
    html: brandWrap('Booking confirmed', `Your trial lesson with <b>${teacher}</b> is confirmed for <b>${when}</b>. We look forward to seeing you, in sha' Allah.`),
  }),
};
