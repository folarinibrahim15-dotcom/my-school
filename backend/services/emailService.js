import transporter from "../config/mail.js";

/*
|--------------------------------------------------------------------------
| Generic Email Sender
|--------------------------------------------------------------------------
*/

export const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Email Error:", error.message);

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Admission Confirmation Email
|--------------------------------------------------------------------------
*/

export const sendApplicationConfirmation = async ({
  name,
  email,
  applicationNumber,
}) => {
  return sendEmail({
    to: email,
    subject: "Application Received Successfully",
    html: `
      <div style="font-family:Arial,sans-serif">

        <h2 style="color:#1E3A8A">
          Sound Peace International Schools
        </h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>
          Your admission application has been received successfully.
        </p>

        <p>
          <strong>
            Application Number: ${applicationNumber}
          </strong>
        </p>

        <p>Please keep this number safe.</p>

        <p>
          Our admissions team will contact you soon.
        </p>

      </div>
    `,
  });
};

/*
|--------------------------------------------------------------------------
| Contact Confirmation Email
|--------------------------------------------------------------------------
*/

export const sendContactConfirmation = async ({
  name,
  email,
}) => {
  return sendEmail({
    to: email,
    subject: "We Received Your Message",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

        <h2 style="color:#1E3A8A">
          Sound Peace International Schools
        </h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>
          Thank you for contacting
          <strong>Sound Peace International Schools</strong>.
        </p>

        <p>
          We have successfully received your message.
        </p>

        <p>
          Our team will review it and respond as soon as possible.
        </p>

        <br/>

        <p>Regards,</p>

        <strong>
          Sound Peace International Schools
        </strong>

      </div>
    `,
  });
};

/*
|--------------------------------------------------------------------------
| Password Reset Email
|--------------------------------------------------------------------------
*/

export const sendPasswordResetEmail = async ({
  email,
  resetUrl,
}) => {
  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

        <h2 style="color:#1E3A8A">
          Sound Peace International Schools
        </h2>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <p style="margin:30px 0;">
          <a
            href="${resetUrl}"
            style="
              background:#1E3A8A;
              color:#fff;
              padding:12px 24px;
              text-decoration:none;
              border-radius:6px;
              display:inline-block;
            "
          >
            Reset Password
          </a>
        </p>

        <p>
          This link expires in <strong>15 minutes</strong>.
        </p>

        <p>
          If you didn't request a password reset, simply ignore this email.
        </p>

      </div>
    `,
  });
};