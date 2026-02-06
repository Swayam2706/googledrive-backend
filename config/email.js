const { Resend } = require('resend');

const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY);
};

const sendActivationEmail = async (user, activationToken) => {
  const resend = getResend();

  const activationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/activate-account?token=${activationToken}`;
  console.log('Activation Link:', activationUrl);

  const { error } = await resend.emails.send({
    from: 'CloudVault <onboarding@resend.dev>',
    to: user.email,
    subject: 'Activate Your Account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Welcome to CloudVault!</h2>
        <p>Hi ${user.firstName} ${user.lastName},</p>
        <p>Thank you for registering. Please click the button below to activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${activationUrl}" 
             style="background-color: #4285f4; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Activate Account
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${activationUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 10 minutes. If you didn't request this, please ignore this email.
        </p>
      </div>
    `
  });

  if (error) {
    console.error('Resend activation email error:', error);
    throw new Error(error.message);
  }
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resend = getResend();

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  const { error } = await resend.emails.send({
    from: 'CloudVault <onboarding@resend.dev>',
    to: user.email,
    subject: 'Reset Your Password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${user.firstName} ${user.lastName},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #ea4335; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 10 minutes. If you didn't request this, please ignore this email.
        </p>
      </div>
    `
  });

  if (error) {
    console.error('Resend reset email error:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  sendActivationEmail,
  sendPasswordResetEmail
};
