import "./env.js";
import nodemailer from "nodemailer";

// console.log("MAIL_HOST:", process.env.MAIL_HOST);
// console.log("MAIL_PORT:", process.env.MAIL_PORT);
// console.log("MAIL_USER:", process.env.MAIL_USER);
// console.log("MAIL_PASS:", process.env.MAIL_PASS ? "Loaded" : "Missing");
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

const transporter = createTransporter();

// Optional: Verify the SMTP connection on startup
export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Mail server connected successfully.");
  } catch (error) {
    console.error("❌ Mail server connection failed:", error.message);
  }
};

export default transporter;