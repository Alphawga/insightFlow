import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  const { to, subject, html } = payload;

  return await resend.emails.send({
    from: 'InsightFlow Pro <noreply@insightflowpro.com>',
    to,
    subject,
    html,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: 'InsightFlow Pro <noreply@insightflowpro.com>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Welcome to InsightFlow Pro!</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${confirmLink}">${confirmLink}</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: 'InsightFlow Pro <noreply@insightflowpro.com>',
      to: email,
      subject: 'Reset your password',
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
} 