const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

  await resend.emails.send({
    from: "Familiar <noreply@aditivashishtha.com>",
    to,
    subject: "Verify your email for Familiar",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #242424;">Welcome to Familiar</h2>
        <p style="color: #444; line-height: 1.5;">
          Confirm your email to start reading and writing.
        </p>
        <a href="${verifyUrl}"
           style="display: inline-block; background: #5c1a2b; color: #fff;
                  padding: 12px 24px; border-radius: 999px; text-decoration: none;
                  margin: 16px 0;">
          Verify email
        </a>
        <p style="color: #999; font-size: 13px;">
          If you didn't sign up, you can ignore this email.
        </p>
      </div>
    `,
  });
};

const sendResetEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await resend.emails.send({
    from: "Familiar <noreply@aditivashishtha.com>",
    to,
    subject: "Reset your Familiar password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #242424;">Reset your password</h2>
        <p style="color: #444; line-height: 1.5;">
          We received a request to reset your Familiar password. Click below to choose a new one. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}"
           style="display: inline-block; background: #5c1a2b; color: #fff;
                  padding: 12px 24px; border-radius: 999px; text-decoration: none;
                  margin: 16px 0;">
          Reset password
        </a>
        <p style="color: #999; font-size: 13px;">
          If you didn't request this, you can safely ignore this email. Your password won't change.
        </p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail, sendResetEmail };
