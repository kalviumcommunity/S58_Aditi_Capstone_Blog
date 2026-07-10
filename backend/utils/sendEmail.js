const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS on 587 instead of SSL on 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

  const mailOptions = {
    from: `"Familiar" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email for Familiar",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #242424;">Welcome to Familiar</h2>
        <p style="color: #444; line-height: 1.5;">
          Confirm your email to start reading and writing. This link expires in 24 hours.
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
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
