import "./env.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,

    tls: {
        rejectUnauthorized: false,
    },
});

export const verifyMailConnection = async () => {
    try {
        await transporter.verify();

        console.log("✅ Mail server connected successfully.");
    } catch (error) {
        console.error("❌ Mail server connection failed:");
        console.error("Code:", error.code);
        console.error("Command:", error.command);
        console.error("Message:", error.message);
    }
};

export const sendEmail = async ({
    to,
    subject,
    html,
    text,
}) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("✅ Email sent successfully:", info.messageId);

        return info;
    } catch (error) {
        console.error("❌ Email sending failed:");
        console.error("Code:", error.code);
        console.error("Message:", error.message);

        throw error;
    }
};

export default transporter;