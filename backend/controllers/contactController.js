import ContactMessage from "../models/ContactMessage.js";
import { sendContactConfirmation } from "../services/emailService.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    // Send confirmation email
    await sendContactConfirmation({
      name,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};